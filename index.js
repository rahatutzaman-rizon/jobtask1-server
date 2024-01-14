const express = require('express');
const cors = require('cors');

const { MongoClient } = require('mongodb');
const app = express();

// MongoDB URI
const uri = "mongodb+srv://redwantamim525:tLViZdMCh9nivt6u@cluster0.bdroz0j.mongodb.net/jobinfo?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, { useUnifiedTopology: true });

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();

    const jobinfo = client.db('jobinfo').collection('taskinfo');
    const link = client.db('jobinfo').collection('link');

    app.get("/task", async (req, res) => {
      const cursor = jobinfo.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/link", async (req, res) => {
      const cursor = link.find();
      const result = await cursor.toArray();
      res.send(result);
    });


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}

run().catch(console.dir);

app.get('/', async (req, res) => {
  res.send('server is running');
});

const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
