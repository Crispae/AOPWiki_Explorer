from flask import Flask, request
from prompt import generateCypher, db_connect
from Embedding import generate_embedding
from langchain.chat_models import ChatOpenAI
from flask_cors import CORS
import time

## add sleep 30 sec
time.sleep(30)

app = Flask(__name__)
CORS(app)



PERSISTANT_PATH = "aoptest2"
COLLECTION_NAME ="test2"

## When app starts generate example embeddings
generate_embedding(persistant_path=PERSISTANT_PATH,collection_name=COLLECTION_NAME)
print("Generate embedding with examples")


# Connect graph database
graph = db_connect(url=r"bolt://neo4j:7687",
                   username="neo4j",
                   password="1234")


# Instansiating llm to  be used
llm = ChatOpenAI(temperature=0, model="gpt-4-0613")



@app.route("/",methods=["GET","POST"])
def home():
    return "<p>Backend</>"


@app.route("/query", methods=["POST"])
def query():

    ## requested data from frontend
    data = request.get_json()

    try:
        cypher = generateCypher(query=data.get("query"),
                            graph=graph,
                            count=10,
                            llm=llm,
                            persistant_path=PERSISTANT_PATH,
                            collection_name=COLLECTION_NAME)
        
        print(cypher)

        return {"status": "success",
                "result": {"query": data.get("query"),
                        "id": data.get("id"),
                        "cypher": cypher}}
    
    ## Handle any unexpected Error
    except Exception as e:
        print(e)
        return {"status":"fail",
                "result":"error"
        }


if __name__ == "__main__":

    app.run(host='0.0.0.0',debug=True, port=3336,  use_reloader=False)
