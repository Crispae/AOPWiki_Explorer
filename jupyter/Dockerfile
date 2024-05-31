FROM jupyter/base-notebook

LABEL author="saurav kumar"
LABEL description="Image definition for AOPWiki Explorer jupyter."

# Switch to root user
USER root

## Install python and pip
RUN apt-get update && apt-get install -y  git

# Switch to the non-root user
USER jovyan

## Install py2neo as it was deprecated
WORKDIR /home/jovyan
RUN git clone https://github.com/overhangio/py2neo.git
WORKDIR /home/jovyan/py2neo
RUN pip install .

## install xm2dict
RUN pip install xmltodict pandas
WORKDIR /home/jovyan/work

## Switch back to root to set permission
USER root
RUN chown -R jovyan:users /home/jovyan/work

## Switch back to non-root user
USER jovyan

## Loading essential data
COPY data data
COPY GraphEnricher.ipynb GraphEnricher.ipynb

CMD ["jupyter", "lab", "--ip=0.0.0.0", "--port=8888", "--no-browser", "--notebook-dir=/home/jovyan/work","--NotebookApp.token=''", "--NotebookApp.password=''", "--allow-root"]
