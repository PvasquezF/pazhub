FROM node:latest
WORKDIR /servidor
COPY package*.json ./

RUN npm i express
RUN npm i body-parser
RUN npm i request-promise
RUN npm i request
RUN npm i mysql
RUN npm i cors

COPY . .

CMD ["npm","start"]

