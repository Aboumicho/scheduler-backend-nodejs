FROM node:16

FROM mongo:latest

EXPOSE 27017

# Set default volume for MongoDB data
VOLUME /data/db

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=8080

CMD ["npm", "start"]

# docker run -d -p 2717:27017 -v C:\data\db:/data/db --name scheduler-db mongo:latest


