require('dotenv').config()
const axios = require("axios")
const { wrapWithAuth } = require("./auth")

async function retrieveTrainsInternal(accessToken) {
  return await axios.get("http://20.244.56.144/train/trains", {
    headers: {
      "Authorization": `Bearer ${accessToken}`
    }
  })
}

async function retrieveTrains() {
  const response = await wrapWithAuth(retrieveTrainsInternal)
  return response.data
}

module.exports = retrieveTrains