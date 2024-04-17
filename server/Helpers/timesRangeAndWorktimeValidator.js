const { TIME_TEMPLATE_MASK, TIME_FROM_MIN, TIME_TO_MAX } = require('./../Constants/TEMPLATES')
const dayjs = require('dayjs')
const customParseFormat = require('dayjs/plugin/customParseFormat')
const getTimesOfDay = require('./getTimesOfDay')
dayjs.extend(customParseFormat)

const timesRangeAndWorktimeValidator = (time_from, time_to) => {
  const timesOfDay = getTimesOfDay()

  let flag_to
  let flag_from

  timesOfDay.forEach(time => {
    if (time_from === time) {
      flag_from = true
    }
    if (time_to === time) {
      flag_to = true
    }
  })

  if (flag_from && flag_to) {
    if (dayjs(time_to, TIME_TEMPLATE_MASK, true) - dayjs(time_from, TIME_TEMPLATE_MASK, true) === 30 * 60 * 1000) {
      return true
    }
  }
  return false
}

module.exports = timesRangeAndWorktimeValidator