const oldDateAndWorkValidator = require("./server/Helpers/oldDateAndWorkValidator");
const server = require("./server/Server/server");
const notificationService = require("./server/Service/Notification");
server.listen(5000, () => {
  //   // notificationService.listen(10000);
});

// const dayjs = require('dayjs')
// const customParseFormat = require('dayjs/plugin/customParseFormat')
// dayjs.extend(customParseFormat)



// console.log(oldDateAndWorkValidator('2024-04-21'))
// , 'YYYY-MM-DD', true).isValid())

// console.log(dayjs('22-45', 'HH-mm', true).isValid())