import express from "express";
import mongoose from "mongoose";
import server from "./schemas/setApolloServer";
import { insertDept } from "./databases/addDept";
import { insertPeople } from "./databases/addPeople";

const app = express();

//Create MongoDB Connection
const MONGO_PORT = 27017;
const MONGO_URL = "localhost";
const dbName = "Company";
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${MONGO_URL}:${MONGO_PORT}/${dbName}`);

// Load Data for first time
async function loadData() {
    insertDept();
    insertPeople();
}

//uncomment loadData function during first ever execution to load the database
//loadData();

server.applyMiddleware({ app });

app.listen({ port: 8000 }, () =>
  console.log(`Server ready at http://localhost:8000${server.graphqlPath}`)
);
