# Historio
Collaborative writing app in the style of an [exquisite corpse](https://en.wikipedia.org/wiki/Exquisite_corpse "Check it out on Wikipedia"). The objective was to enable users to write texts from scratch and to build upon previous made texts with as much freedom as possible. 

## Used technologies

1. [Neo4j](https://neo4j.com/ "main database") as main database
  - [Cypher](https://reacttraining.com/react-router/ "neo4j query language") the neo4j query language
2. [Mongodb](https://www.mongodb.com/ "user database") as user database
3. [Express.js](https://expressjs.com/ "REST API") for the REST API
4. [React](https://reactjs.org/ "front end js framework") for the front end
  - [React router](https://reacttraining.com/react-router/ "react router") to route between react pages
5. [Password salts](https://en.wikipedia.org/wiki/Salt_(cryptography) "salts") for increased security
6. [Azure](https://azure.microsoft.com/en-us/ "deployment") for cloud deployment 

## How to run
### *Back-end*
To run the backend, two pieces are needed:

- Mongo database with the information on:
  - Users: username, salt and hash
- Express REST API

The Neo4j database is running on a separate server.

**Setup mongo** (for Ubuntu 16.04):
1. *Install mongodb*
```
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 9DA31620334BD75D9DCB49F368818C72E52529D4
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/4.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org

```
2. *Run mongod*
```
sudo service mogod start
```

3. *Populate mongo with dummy users*
```
mongo<./back/DB/mongo/createUserTable.js
```

**Setup Express REST API**:
Asuming node and npm are installed, go to folder ./back/REST/xpress/
```
cd ./back/REST/xpress/
```
Install dependencies:
```
npm install
```
Run node with --experimental-modules so that ES6 imports are allowed:
```
node --experimental-modules index.mjs
```
The back-end should now be running on port 8080.

### *Front-end*

Asuming yarn is installed, go to folder ./front/
```
cd ./front/
```
Install dependencies:
```
yarn install
```
Run the server:
```
yarn start
```
The front-end should now be running on port 3000.
