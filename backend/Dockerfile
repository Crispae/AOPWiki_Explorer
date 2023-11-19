# Use Python 3.11 as the base image
FROM python:3.11

# Install git
RUN apt-get update && apt-get install -y git

# Set author and description labels
LABEL author="saurav kumar"
LABEL description="Image definition for query translation tool"

# Set the working directory in the container
WORKDIR /app

# Copy necessary application files into the container
COPY app.py requirements.txt Embedding.py examples.json prompt.py /app/

# Install Python dependencies from requirements.txt
RUN pip install -r requirements.txt

EXPOSE 3336

# Define the command to run your application
CMD [ "python", "app.py" ]
