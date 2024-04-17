const { DATE_TEMPLATE_MASK } = require('./../Constants/TEMPLATES')
const dayjs = require('dayjs')
const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

const dateValidator = (date) => {
    return dayjs(date, DATE_TEMPLATE_MASK, true).isValid()
}

module.exports = dateValidator