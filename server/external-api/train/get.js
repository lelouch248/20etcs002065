require('dotenv').config()
const axios = require("axios")
const { wrapWithAuth } = require("./auth")

async function retrieveTrain(trainNumber) {
  async function retrieveTrainInternal(accessToken) {
    return await axios.get(`http://20.244.56.144/train/${trainNumber}`, {
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    })
  }
  const response = wrapWithAuth(retrieveTrainInternal)
  return response.data
}

module.exports = retrieveTrain