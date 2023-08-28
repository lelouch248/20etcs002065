require('dotenv').config()
const express = require("express");
const app = express();
port = 3000;
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const trainApi = require('./external-api/train')

async function execute() {
  try {
    const trains = await trainApi.listTrains()
    console.log(JSON.stringify(trains, null, 2))
    console.log("Still in try block")
  } catch {
    console.log("In catch block")
  }
}

execute().then(() => {
  console.log('done')
})