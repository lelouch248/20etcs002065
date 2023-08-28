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

async function execute() {
  const {
    TRAIN_API_COMPANY_NAME,
    TRAIN_API_CLIENT_ID,
    TRAIN_API_OWNER_NAME,
    TRAIN_API_OWNER_EMAIL,
    TRAIN_API_ROLLNO,
    TRAIN_API_CLIENT_SECRET
  } = process.env

  const requestData = {
    "companyName": TRAIN_API_COMPANY_NAME,
    "clientID": TRAIN_API_CLIENT_ID,
    "ownerName": TRAIN_API_OWNER_NAME,
    "ownerEmail": TRAIN_API_OWNER_EMAIL,
    "rollNo": TRAIN_API_ROLLNO,
    "clientSecret": TRAIN_API_CLIENT_SECRET
  }

  const response = await axios.post("http://20.244.56.144/train/auth", {
    "companyName": TRAIN_API_COMPANY_NAME,
    "clientID": TRAIN_API_CLIENT_ID,
    "ownerName": TRAIN_API_OWNER_NAME,
    "ownerEmail": TRAIN_API_OWNER_EMAIL,
    "rollNo": TRAIN_API_ROLLNO,
    "clientSecret": TRAIN_API_CLIENT_SECRET
  })

  const token = response.data.access_token

  console.log(token)
}

execute().then(() => {
  console.log('done')
})