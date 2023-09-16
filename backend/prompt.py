# Here the Full fledge prompt will be assembled

from langchain.graphs import Neo4jGraph
from langchain import PromptTemplate, FewShotPromptTemplate
from langchain.output_parsers.pydantic import PydanticOutputParser
from pydantic import BaseModel, Field
from langchain import LLMChain
from typing import Optional, List
from Embedding import Embedder


# Db connect should happens only oncem
def db_connect(url,
               username,
               password):
    """
    This function will connect to the database

    """

    return Neo4jGraph(url=url,
                      username=username,
                      password=password)


def get_schema(graph, custom=False):
    """
    Build schema from neo4j graph or prvide custom schema

    """

    if custom:
        # These a custom designed schema will be provided
        pass

    else:
        return graph.schema


def get_examples(query,
                 count,
                 model=None,
                 api_key=None,
                 collection_name="aopgraph"):
    """
    Provide examples similar to user query

   Already embedded set of examples will be available for querying

    """
    # creating embedding object
    embd = Embedder(persistant_path="aopwiki",
                    model_name=model, openai_key=api_key)

    # get collection of already embedded examples
    embd.get_collection(collection_name=collection_name)

    examples = embd.getSimilarExample(query=query, count=count)

    return examples


class cypher(BaseModel):
    cypher: str = Field(
        description="Neo4j cypher query generated as per the user question.")


# This parser will be used to extract cypher
cypher_parser = PydanticOutputParser(pydantic_object=cypher)


def _prompt(query, graph, examples):
    """
    Here assembly of prompt will be done, the components will be
    1. Instrucution
    2. examples
    3. output format
    4. query

    """
    # Schema
    schema = get_schema(graph=graph,)

    # Formated examples
    pydantic_examples = [{"question": query.get("question"), "result": cypher.parse_obj(
        {"cypher": query.get("cypher")}).json().replace("{", "{{").replace("}", "}}")} for query in examples]

    # Prefix and suffix template

    pydantic_template_prefix = """ Task: Generate Neo4j Cypher statement to query a graph database.
          \nInstructions:\nUse only the provided node, relationship types and properties in the schema.
          \n Follow the schema strictly; do not generate any random node or relationship types.
          \n If the user asks for information out of the context of the schema, return "Error."
          \n As the generated cypher will be rendered as network, return only nodes and relationship.
          \n Strictly follows the given relations and properties in the given schema, do not generate it.
          \nSchema:\n{schema}
          \n{format_instruction}"""

    pydantic_template_suffix = """\nNote: Do not include any explanations or apologies in your responses.
    \nDo not respond to any questions that might ask anything else than for you to construct a Cypher statement.
    \nDo not include any text except the generated Cypher statement.
    \n By adhering to the above instructions and schema, you will create Cypher queries that accurately retrieve the required information from the graph database without introducing any unrelated data.
    \n\nThe question is:
    \n{question}
    \nResult:\n"""

    example_prompt = PromptTemplate(input_variables=["question", "result"],
                                    template="question: {question}\nResult:\n{result}")

    pydantic_prompt = FewShotPromptTemplate(
        examples=pydantic_examples,
        example_prompt=example_prompt,
        prefix=pydantic_template_prefix,
        suffix=pydantic_template_suffix,
        input_variables=["question"],
        partial_variables={"format_instruction": cypher_parser.get_format_instructions(),
                           "schema": schema}
    )

    return pydantic_prompt


def create_prompt(query, graph, examples_count):

    # getting graph and examples

    examples = get_examples(query=query,
                            count=examples_count,
                            model=None,
                            api_key=None,)

    return _prompt(query=query, graph=graph, examples=examples)


def generateCypher(query, graph, count, llm):
    """ It will generate cypher from the query of the user """

    # prompt to generate cypher
    cypher_prompt = create_prompt(
        query=query, examples_count=count, graph=graph)

    # Run the model to generate the cypher
    print(cypher_prompt)
    cypher_chain = LLMChain(llm=llm, prompt=cypher_prompt)
    cypher_output = cypher_chain.run(query)

    # Now cypher will parsed out.
    parsed_cypher = cypher_parser.parse(cypher_output).cypher

    # Parse error should also be provided, to reflect it on the front end
    if parsed_cypher == "Error":
        raise ValueError(
            "Query from the the user is not related to AOP graph network")

    return parsed_cypher
