const { DATE_TEMPLATE_MASK, FREE_DAYS } = require('../Constants/TEMPLATES')
const dayjs = require('dayjs')
const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

const oldDateAndWorkValidator = (date) => {
    let flag_day = false

    FREE_DAYS.forEach(dayName => {
        if (dayjs(date, DATE_TEMPLATE_MASK, true).format('dddd') === dayName) {
            flag_day = true
        }
    })

    if (!flag_day && dayjs() < dayjs(date, DATE_TEMPLATE_MASK, true).add(1, 'day')) {
        return true
    }
    return false
}

module.exports = oldDateAndWorkValidator