const cors = require('cors');
const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const client = new MongoClient(process.env.MONGODB_URI);

app.get('/memberships', async (req, res) => {
  try {
    const connect = await client.connect();
    const data = await connect
      .db('nodeJS-pratimas')
      .collection('services')
      .find()
      .toArray();
    await connect.close();
    res.send(data);
  } catch (e) {
    res.status(500).send({ e });
  }
});

app.post('/memberships', async (req, res) => {
  if (!req.body.name || !req.body.price || !req.body.description) {
    return res.status(400).send({ error: 'incorrect data passed' });
  }
  try {
    const connect = await client.connect();
    const response = await connect
      .db('nodeJS-pratimas')
      .collection('services')
      .insertOne({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
      });
    await connect.close();
    return res.send(response);
  } catch (e) {
    return res.status(500).send({ error: 'data not passed correctly' });
  }
});

app.delete('/memberships/:id', async (req, res) => {
  try {
    const connect = await client.connect();
    const data = await connect
      .db('nodeJS-pratimas')
      .collection('services')
      .deleteOne({ _id: ObjectId(req.params.id) })
      .toArray();
    await connect.close();
    return res.send(data);
  } catch (e) {
    res.status(500).send({ error: 'something wrong' });
  }
});

const port = process.env.PORT || 8080;
app.listen(port, console.log('server is running on port 3000'));
