require('dotenv').config()
const axios = require("axios")
const { wrapWithAuth } = require("./auth")

async function retrieveTrain(trainNumber) {
  async function retrieveTrainInternal(accessToken) {
    return await axios.get(`http://20.244.56.144/train/trains/${trainNumber}`, {
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    })
  }
  const response = await wrapWithAuth(retrieveTrainInternal)
  return response.data
}

module.exports = retrieveTrain