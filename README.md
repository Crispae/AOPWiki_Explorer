
<div align="center">
  <img src="frontend/public/logo.png" alt="" width="150">
  <h3>AOPWiki Explorer</h3>
</div>


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
docker compose up
```  
  
**Step 2. Populate graph database with AOP information.**  
Open the jupyter notebook to pouplate the graph database with updated infortmation, The url for jupyter notebook can be found in the console, while docker-compose is running

The url will be like this ```  http://127.0.0.1:8888/lab?token=your_token```  

steps to update the graph database
1. Open the jupyter lab from the above link
2. Run `GrapEnricher.ipynb` notebook.
3. If running first time on your system
   Run the whole jupyter notebook, it will update the database
4. If once, already installed
     Before running the script, confirm, if nodes are already present, it will re-populate the database again


**Step 3. Acess the interface**  
Open following link on your web browser to access the AOPwiki-Explorer  ```http://127.0.0.1:3000/```


## Contributing

We welcome contributions from the community. If you encounter any issues, have suggestions, or would like to contribute to the project, please open an issue or submit a pull request on the [GitHub repository](https://github.com/Crispae/AOPWiki_Explorer).

## License
This project is licensed under the MIT License. See the [LICENSE file](https://github.com/Crispae/AOPWiki_Explorer/LICENSE.txt) for more information.

## Contacts
For any inquiries or questions, please contact:

    Saurav Kumar
    Email: saurav.kumar@iispv.cat
