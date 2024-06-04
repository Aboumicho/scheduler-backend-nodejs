import { MongoClient } from "mongodb";

// Replace the uri string with your connection string.
const uri = "mongodb://localhost:27017";

const client = new MongoClient(uri);
let database;
async function run() {
    try {
      database = client.db('Scheduler');
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
}

export {run, database};