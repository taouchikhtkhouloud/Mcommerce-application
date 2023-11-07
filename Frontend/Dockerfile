# Dockerfile for React client

# Build react client
FROM node:latest

# Working directory be app
WORKDIR /usr/src/app

COPY package*.json ./

###  Installing dependencies

RUN npm install --silent

# copy local files to app folder
COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm","start"]