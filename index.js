// after step-4 mentioned on README.md 
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb'); // moved from bottom 
require('dotenv').config()
// console.log(process.env) // remove this after you've confirmed it is working
// console.log(process.env.DB_PASS) // remove this after you've confirmed it is working
const app = express();
const port = process.env.PORT || 5000;

// middlewares 
app.use(cors());
app.use(express.json());

// mongoDB credentials starts  
// const { MongoClient, ServerApiVersion } = require('mongodb'); // moved up 
// const uri = "mongodb+srv://<username>:<password>@cluster0.mcet7hn.mongodb.net/?retryWrites=true&w=majority";
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mcet7hn.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
// mongodb credentials ends 

app.get('/', (req, res) => {
    res.send('CarServe server is running')
})

app.listen(port, () => {
    console.log(`CarServe server is running on port: ${port}`);
})
