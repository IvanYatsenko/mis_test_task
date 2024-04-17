const { TIME_TEMPLATE_MASK, TIME_FROM_MIN, TIME_TO_MAX } = require('./../Constants/TEMPLATES')
const dayjs = require('dayjs')
const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

const getTimesOfDay = () => {
    let result = []
    for (let timeDay = dayjs(TIME_FROM_MIN, TIME_TEMPLATE_MASK, true);
        dayjs(timeDay, TIME_TEMPLATE_MASK, true) < dayjs(TIME_TO_MAX, TIME_TEMPLATE_MASK, true).add(1, 'minute');
        timeDay = dayjs(timeDay, TIME_TEMPLATE_MASK, true).add(30, 'minute')) {
        result.push(timeDay.format(TIME_TEMPLATE_MASK))
    }
    return result
}

module.exports = getTimesOfDay