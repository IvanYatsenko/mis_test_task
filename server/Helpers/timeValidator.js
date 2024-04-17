const { TIME_TEMPLATE_MASK } = require('./../Constants/TEMPLATES')
const dayjs = require('dayjs')
const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

const timeValidator = (time) => {
    return dayjs(time, TIME_TEMPLATE_MASK, true).isValid()
}

module.exports = timeValidator