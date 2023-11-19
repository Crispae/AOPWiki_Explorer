FROM node

LABEL author="saurav kumar"
LABEL description="Image definition for AOPWiki Explorer frontend."


WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm","start"]
