// const testdata = require('../testdata')

const MIN_TIME_WINDOW = 30 * 60
const MAX_TIME_WINDOW = 12 * 60 * 60
const ONE_DAY = 24 * 60 * 60

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
  const diff = timeToCheck >= currentTime ? timeToCheck - currentTime : timeToCheck + ONE_DAY - currentTime
  return diff > MIN_TIME_WINDOW && diff <= MAX_TIME_WINDOW
}

function filterByTime(trains) {
  const currentTime = getCurrentTimeInDaySeconds()
  return trains.filter(x => {
    const et = calculateTrainDepartureTimeInDaySeconds(x.departureTime, x.delayedBy)
    return withinTimeWindow(currentTime, et)
  })
}

function sort(trains, coachTypeFilter) {
  const presortedTrains = trains.map(x => {
    return {
      ...x,
      ePrice: coachTypeFilter === "AC" ? x.price.AC : coachTypeFilter === "sleeper" ? x.price.sleeper : Math.min(x.price.AC, x.price.sleeper),
      eSeatsAvailable: coachTypeFilter === "AC" ? x.seatsAvailable.AC : coachTypeFilter === "sleeper" ? x.seatsAvailable.sleeper : Math.max(x.seatsAvailable.AC, x.seatsAvailable.sleeper),
      eDepartureTime: calculateTrainDepartureTimeInDaySeconds(x.departureTime, x.delayedBy)
    }
  })

  return presortedTrains.sort((a, b) => {
    const priceSorting = a.ePrice - b.ePrice
    if (priceSorting !== 0)
        return priceSorting

    const ticketsSorting = b.eSeatsAvailable - a.eSeatsAvailable
    if (ticketsSorting !== 0)
        return ticketsSorting

    return b.eDepartureTime - a.eDepartureTime
  })
}

module.exports = {
  filterByTime,
  sort
}