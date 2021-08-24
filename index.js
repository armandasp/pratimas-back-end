const cors = require('cors');
const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express());

const client = new MongoClient(process.env.MONGODB_URI);

app.get('/memberships', async (req, res) => {
  try {
    const connect = await client.connect();
    const data = await connect
      .db('nodeJS-pratimas')
      .collection('services')
      .find()
      .toArray();
    connect.close();
    res.send(data);
  } catch (e) {
    res.status(500).send({ e });
  }
});

app.post('/memberships', async (req, res) => {
    
})

const port = process.env.PORT || 8080;
app.listen(port, console.log('server is sunning on port 3000'))