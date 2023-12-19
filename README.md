
<div align="center">
  <img src="frontend/public/logo.png" alt="" width="150">
  <h3><a href="http://aopexplorer.insilicohub.org/" >AOPWiki Explorer</a></h3>
</div>  


AOPWiki Explorer is a Labeld property graph (LPG) adaptation of AOPwiki. LPG schema is adapted using neo4j providing cypher and natural language based query engine to explore AOPs. Explorer provides intutive network visualization of AOPs and different AOP objects linked to it.AOPwiki Explorer is developed under project [**Partnership for the Assessment of Risks from Chemicals (PARC)**](https://www.eu-parc.eu)  

#### Updates:
1. [21/09/2023] **Preprint available at [biorxiv](https://www.biorxiv.org/content/10.1101/2023.11.21.568076v1)**
2. [4/09/2023]  **Usage documentation released https://crispae.github.io/AOPWiki_Explorer/**
3. [18/12/2023] **WebApp is available at http://aopexplorer.insilicohub.org/**  

## Requirements 🐳
- Docker  
- Docker-compose  

Follow the documentation [documentation](https://docs.docker.com/engine/install/), to install docker and docker compose

## Quick Installation

The recommended method to use AOPWIKI explorer is through Docker container.

## Step 1: Clone the Repository
Open the command prompt and write the following command
  ```shell
git clone https://github.com/Crispae/AOPWiki_Explorer.git
cd AOPWiki_Explorer
```  
## Step 2: Build Docker Container

In the [`docker-compose.yaml`](https://github.com/Crispae/AOPWiki_Explorer/blob/main/docker-compose.yaml) file, it's essential to update the `OPENAI_API_KEY` to enable the query translation service.

### Instructions:

1. **Obtain Your OpenAI API Key:**
   - Get your OpenAI API key from the [OpenAI API page](https://openai.com/blog/openai-api).

2. **Update the `OPENAI_API_KEY`:**
   - Locate the `docker-compose.yaml` file in the cloned repository.
   - Replace the placeholder for `OPENAI_API_KEY` with your obtained API key.

3. **Build the Docker Container:**
   - After updating the OpenAI key, initiate the container build using the following command:
   ```shell
   docker compose up

## Step 3: Populate the Graph Database with AOP Information

To update the graph database with the latest AOP information, follow these steps. This process is a one-time setup.

### Instructions:

1. **Open the Jupyter Notebook:**
   - Access the Jupyter Lab by clicking on the provided URL captured from the console while running the Docker instance. The URL will resemble: `http://127.0.0.1:8888/lab?token=your_token`

2. **Run the `GraphEnricher.ipynb` Notebook:**
   - After accessing the Jupyter Lab, locate and run the `GraphEnricher.ipynb` notebook within the interface.

3. **Updating the Database:**
   - If it's the first installation on your system:
     - Run the entire Jupyter Notebook. This process will update the database with the latest AOP information.

   - If it's an update to the existing installation:
     - Uncomment the relevant cells in the notebook to delete the information in the graph database before running the notebook. This step ensures that the database gets updated with the most recent information.

These steps are essential for maintaining an updated graph database containing the latest AOP information. Make sure to follow these instructions to keep the database current.


## Step 4. Acess the interface  
Open following link on your web browser to access the AOPwiki-Explorer  ```http://127.0.0.1:3000/```

## Usage
  The detailed usage and application of this tool is available in the following [documentation](https://crispae.github.io/AOPWiki_Explorer/)

## Contributing

We welcome contributions from the community. If you encounter any issues, have suggestions, or would like to contribute to the project, please open an issue or submit a pull request on the [GitHub repository](https://github.com/Crispae/AOPWiki_Explorer).

## License
This project is licensed under the MIT License. See the [LICENSE file](https://github.com/Crispae/AOPWiki_Explorer/blob/main/LICENSE.txt) for more information.

## Citation
```bibtex
@article {Kumar2023.11.21.568076,
	author = {Saurav Kumar and Deepika Deepika and Luke T Slater and Vikas Kumar, Sr.},
	title = {AOPWIKI-EXPLORER: An Interactive Graph-based Query Engine leveraging Large Language Models},
	elocation-id = {2023.11.21.568076},
	year = {2023},
	doi = {10.1101/2023.11.21.568076},
	publisher = {Cold Spring Harbor Laboratory},
	URL = {https://www.biorxiv.org/content/early/2023/11/21/2023.11.21.568076},
	eprint = {https://www.biorxiv.org/content/early/2023/11/21/2023.11.21.568076.full.pdf},
	journal = {bioRxiv}
}
```
## Funding
The work done here has been supported by funding from the European Union's Horizon 2020 research and innovation program under grant agreement No. 101057014 (PARC).

## Contacts
For any inquiries or questions, please contact:

    Saurav Kumar
    Email: saurav.kumar@iispv.cat
