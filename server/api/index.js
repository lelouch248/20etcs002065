const externalTrainApi = require('../external-api/train')
const logic = require('./trains')

async function getTrain(trainNumber) {
    const data = await externalTrainApi.getTrain(req.params.trainNumber)
    return data
}

async function listTrains() {
    const data = await externalTrainApi.listTrains()
    return logic.sort(logic.filterByTime(data))
}

module.exports = {
    getTrain,
    listTrains
}