from flask import Flask, request
from prompt import generateCypher, db_connect
from langchain.chat_models import ChatOpenAI

from flask_cors import CORS

import os
os.environ["OPENAI_API_KEY"] = "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"

app = Flask(__name__)
CORS(app)

# Graph database connected
graph = db_connect(url="bolt://localhost:7687",
                   username="neo4j",
                   password="qwertyuiop")

# Instansiating llm to  be used
llm = ChatOpenAI(temperature=0, model="gpt-4-0613")


@app.route("/query", methods=["POST"])
def query():

    data = request.get_json()

    # From here the data will be send for processing
    # 1. First the query will be send for embeddign generation
    # 2. Embedded query will be matched using chroma to extract 10 relevant examples
    # 3. Extraced Examples will be fed into prompt with query
    # 4. The prompt will be passed in model to generate the cypher
    # 5. The generated cypher will be returend

    # request is passed to generate cypher
    # Take query and feed in the function to generate the cypher

    cypher = generateCypher(query=data.get(
        "query"), graph=graph, count=10, llm=llm)

    return {"status": "success",
            "result": {"query": data.get("query"),
                       "id": data.get("id"),
                       "cypher": cypher}}


if __name__ == "__main__":

    app.run(debug=True, port=333)
