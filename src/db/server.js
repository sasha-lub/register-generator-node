const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const db = require("./controllers/DataBaseUtils");

const PORT = 3030;

const app = express();
app.use(cors());

db.setUpConnection();

app.use(bodyParser.json());

app.get('/models', (req, res) => {
  db.listModels().then(data => res.send(data));
});

app.post('/models', (req, res) => {
  db.createModel(req.body).then(data => res.send(data));
});

app.get('/models/:name', (req, res) => {
  db.findByName(req.params.name).then(data => res.send(data));
});

const server = app.listen(PORT, () => {
  console.log('SERVER STARTED!');
});

