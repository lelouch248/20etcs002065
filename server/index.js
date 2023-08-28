require('dotenv').config()
const express = require("express");
const app = express();
port = 3001;
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const api = require('./api')

app.get('/trains', async (req, res) => {
  const data = await api.listTrains()
  res.json(data)
})

app.get('/trains/:trainNumber', async (req, res) => {
  const data = await api.getTrain(req.params.trainNumber)
  res.json(data)
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});