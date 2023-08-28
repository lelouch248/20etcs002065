require('dotenv').config()
const axios = require("axios");

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

const authHolder = {
  authData: null
}

async function performAuth() {
  const response = await axios.post("http://20.244.56.144/train/auth", requestData)
  return response.data
}

async function wrapWithAuth(f) {
  if (!authHolder.authData) {
    authHolder.authData = await performAuth()
  }
  let response = await f(authHolder.authData.access_token)
  if ((response.data && response.data.message) || !response.data) {
    authHolder.authData = await performAuth()
    response = await f(authHolder.authData.access_token)
  }
  return response
}

module.exports = {
  wrapWithAuth,
  performAuth
}