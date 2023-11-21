# AOPWIKI Explorer

AOPWiki Explorer is a Labeld property graph (LPFG) adaptation of AOPwiki. LPG schema is adapted using neo4j providing cypher and natural language based query engine to explore AOPs. Explorer provides intutive network visualization of AOPs and different elements attached to it.AOPwiki Explorer is developed under project [**Partnership for the Assessment of Risks from Chemicals (PARC)**](https://www.eu-parc.eu)


## Requirements 🐳
- Docker  
- Docker-compose  

Go to following [documentation](https://docs.docker.com/engine/install/), to install docker and docker compose

## Quick Installation

The recommended method to use AOPWIKI explorer is through Docker

**Step 1: Build the Docker container**   
In [`docker-compose.yaml`](https://github.com/Crispae/AOPWiki_Explorer/blob/main/docker-compose.yaml) file, update your `OPENAI_API_KEY` to run the query translation service.  

Get your OpenAI API key from following [link](https://openai.com/blog/openai-api)

```shell
git https://github.com/Crispae/AOPWiki_Explorer.git
cd AOPWiki_Explorer
```  


**Step 2. Populate graph database with AOP information.**  
Open the jupyter notebook to pouplate the graph database with updated infortmation, The url for jupyter notebook can be found in the console, while docker-compose is running

The url will be like this ```  http://127.0.0.1:8888/lab?token=your_token```  

**Step 3. Acess the interface**  
Open following link on your web browser to access the AOPwiki-Explorer  ```http://127.0.0.1:3000/```


## Examples

Will be available soon

1. Direct cypher query
2. Natural language query
3. Step wise query