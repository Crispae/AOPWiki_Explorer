# This module will take care of embedding generation and storinf the embedding using chroma for retival.
import json
import chromadb
from chromadb.utils import embedding_functions
from chromadb.config import Settings
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

        # client for handling the Indexing of embedding
        self.chroma_client = chromadb.Client(Settings(
            chroma_db_impl="duckdb+parquet",
            persist_directory=self.storage_path
        ))

    def embedExamples(self, examples, collection_name, persistant=True):
        """
        Function to embedd the examples
        using chroma to embed the examples and store it.

        """

        # processing data to create the collection
        frame = pd.DataFrame(examples).to_dict(orient="list")
        ids = frame["id"]
        doc = frame["question"]
        meta_data = list(map(lambda x: {"id": x[0], "question": x[1]},
                             zip(ids, doc)))

        # creating a collection to embed and store the query

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

        # Making the collection persistant
        if persistant:
            self.chroma_client.persist()

    def get_collection(self, collection_name):
        """
        Get the collection if already available in the persistant storage

        Note: Default collection name will be aopgraph

        """

        # If collection_name is not available, that error is handled by chroma db itself.
        self.collection = self.chroma_client.get_collection(
            name=collection_name,)

    def getRawExample(self,):
        """
        This will provides all the raw examples availables in the examples file

        """

        return self._raw_examples

    def getSimilarExample(self, query, count):

        # This interface will take query and provide the similar examples

        results = self.collection.query(query_texts=query,
                                        n_results=count)

        similar_examples = [
            self._raw_examples[int(i)-1] for i in results["ids"][0]]

        return similar_examples


if __name__ == "__main__":

    emb = Embedder(persistant_path="./aop")
    emb.get_collection(collection_name="aopquery")
    query = " Provide me the information about AOP 450"
    # query the examples
    similar_query = emb.getSimilarExample(query=query,
                                          count=3)

    print(similar_query)
