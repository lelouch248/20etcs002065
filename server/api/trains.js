// const testdata = require('../testdata')

const MAX_TIME_WINDOW = 12 * 60 * 60

function constructTimeInDaySeconds(hours, minutes, seconds) {
  return (hours * 60 * 60) + (minutes * 60) + seconds
}

function getCurrentTimeInDaySeconds() {
  const date = new Date()
  return constructTimeInDaySeconds(date.getHours(), date.getMinutes(), date.getSeconds())
}

function calculateTrainDepartureTimeInDaySeconds(departureTime, delayedBy) {
  return constructTimeInDaySeconds(departureTime.Hours, departureTime.Minutes + delayedBy, departureTime.Seconds)
}

function withinTimeWindow(currentTime, timeToCheck) {
  console.log(currentTime)
  console.log(timeToCheck)
  if (timeToCheck - currentTime < MAX_TIME_WINDOW) {
    return true
  }
  return timeToCheck - currentTime
}

function filterByTime(trains) {
  return trains.filter(x => {
    const et = calculateTrainDepartureTimeInDaySeconds(x.departureTime, x.delayedBy)
  })
}

console.log(withinTimeWindow(constructTimeInDaySeconds(20, 0, 0)), constructTimeInDaySeconds(02, 0, 0))