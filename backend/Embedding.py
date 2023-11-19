# This module will take care of embedding generation and storinf the embedding using chroma for retival.
import json
import chromadb
from chromadb.utils import embedding_functions
import pandas as pd
import os

class Embedder:

    def __init__(self,
                 persistant_path,
                 model_name=None,
                 openai_key=None
                 ):

        # Load the raw examples
        with open("examples.json", "r") as file:
            self._raw_examples = json.load(file)  # RAW examples loaded

        # Name fo collection of text
        self.collection_name = None

        # collection variable
        self.collection = None

        # Model for embedding generation, default is sentence transformer
        if model_name:
            self.model = embedding_functions.OpenAIEmbeddingFunction(
                model_name=model_name, api_key=openai_key)
            
        else:
            self.model = None

        # path to store the persistant data
        self.storage_path = os.path.join(
            os.path.dirname(__file__), persistant_path)

        # Creating a directory to store the embedding data
        if not os.path.isdir(self.storage_path):
            os.makedirs(self.storage_path)

        ## Instansiating chroma client
        self.chroma_client = chromadb.PersistentClient(path=self.storage_path)



    # NOTE: Add functionality to first check, if collection is present and 
    # then check the ids and examples already available in collection
    def embedExamples(self, examples, collection_name):
        """
        Methods to handles the embedding generation and storgae of examples.

        """

        # processing data to create the collection
        frame = pd.DataFrame(examples).to_dict(orient="list")
        ids = frame["id"]
        doc = frame["question"]
        meta_data = list(map(lambda x: {"id": x[0], "question": x[1]},
                             zip(ids, doc)))


        # Using custom model
        if self.model:
            self.collection = self.chroma_client.get_or_create_collection(name=collection_name,
                                                                          embedding_function=self.model)
        # using default sentence transformer model
        else:
            self.collection = self.chroma_client.get_or_create_collection(
                name=collection_name)

        # Adding documents in the collections
        self.collection.add(
            documents=doc,
            metadatas=meta_data,
            ids=ids)


    def get_collection(self, collection_name):
        """
        Get the collection if already available in the persistant storage

        """

        # If collection_name is not available, that error is handled by chroma db itself.
        self.collection = self.chroma_client.get_collection(
            name=collection_name,)

    def getRawExample(self,):
        """
            Retrive raw examples from the given JSON file

        """

        return self._raw_examples

    def getSimilarExample(self, query, count):

        """
        Retrive top-k queries based on the given query

        """

        results = self.collection.query(query_texts=query,
                                        n_results=count)

        similar_examples = [
            self._raw_examples[int(i)-1] for i in results["ids"][0]]

        return similar_examples



def generate_embedding(persistant_path : str,collection_name: str):
    
    EMBEDDING_PERSISTANT_PATH = "test"
    
    ## Instansiating embedding function
    embedder = Embedder(persistant_path=persistant_path)
    
    ## Loading examples stored in json file
    example_queries = embedder.getRawExample()
    
    ## Embed the examples in vector database
    embedder.embedExamples(examples=example_queries,collection_name=collection_name,)


if __name__ == "__main__":

    emb = Embedder(persistant_path="./aop")
    emb.get_collection(collection_name="aopquery")
    query = " Provide me the information about AOP 450"
    # query the examples
    similar_query = emb.getSimilarExample(query=query,
                                          count=3)
    
    print(similar_query)
