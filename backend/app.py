import os
import time

from Embedding import generate_embedding
from flask import Flask, request
from flask_cors import CORS
from langchain.chat_models import ChatOpenAI
from prompt import db_connect, generateCypher

## add sleep 30 sec
time.sleep(30)

app = Flask(__name__)
CORS(app)


PERSISTANT_PATH = "aoptest2"
COLLECTION_NAME = "test2"

## When app starts generate example embeddings
generate_embedding(persistant_path=PERSISTANT_PATH, collection_name=COLLECTION_NAME)
print("Generate embedding with examples")


# Read environment variables for Neo4j connection
neo4j_url = os.getenv("NEO4J_URL", r"bolt://neo4j:7687")
neo4j_username = os.getenv("NEO4J_USERNAME", "neo4j")
neo4j_password = os.getenv("NEO4J_PASSWORD", "1234")


# Connect graph database
graph = db_connect(url=neo4j_url, username=neo4j_username, password=neo4j_password)


# Instansiating llm to  be used
llm = ChatOpenAI(temperature=0, model="gpt-4-0613")


@app.route("/", methods=["GET", "POST"])
def home():
    return "<p>Backend</>"


@app.route("/query", methods=["POST"])
def query():

    ## requested data from frontend
    data = request.get_json()

    try:
        cypher = generateCypher(
            query=data.get("query"),
            graph=graph,
            count=10,
            llm=llm,
            persistant_path=PERSISTANT_PATH,
            collection_name=COLLECTION_NAME,
        )

        print(cypher)

        return {
            "status": "success",
            "result": {
                "query": data.get("query"),
                "id": data.get("id"),
                "cypher": cypher,
            },
        }

    ## Handle any unexpected Error
    except Exception as e:
        print(e)
        return {"status": "fail", "result": "error"}


if __name__ == "__main__":

    app.run(host="0.0.0.0", debug=True, port=3336, use_reloader=False)
