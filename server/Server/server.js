const express = require("express");
const doctorRouters = require("./../Routers/doctorRouters");
const patientRouters = require("./../Routers/patientRouters");
const scheduleRouters = require("./../Routers/scheduleRouters");

const server = express();
server.use(express.json());
server.use("/api", doctorRouters);
server.use("/api", patientRouters);
server.use("/api", scheduleRouters);
server.get("/", (req, res) => {
  console.log("params", req.query);
  // console.log(res);
  res.json(req.query);
  console.log({ ...req.query });
});

// http://localhost:5000/?date=DD-MM-YYYY&time_from=10-00&time_to=11-00&is_free=true&doctor_id=1&patient_id=2

// params {
//   date: 'DD-MM-YYYY',
//   time_from: '10-00',
//   time_to: '11-00',
//   is_free: 'true',
//   doctor_id: '1',
//   patient_id: '2'
// }
module.exports = server;
