FROM node:16
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "run", "start"]

FROM mongo:latest

EXPOSE 27017

# Set default volume for MongoDB data
VOLUME /data/db

# docker run -d -p 2717:27017 -v C:\data\db:/data/db --name scheduler-db mongo:latest


