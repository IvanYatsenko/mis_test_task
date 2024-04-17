const dbPool = require("../Server/pgPool");
const QUERY_SCHEDULE_SQL = require("../Constants/QUERY_SCHEDULE_SQL");
const validator = require("../Service/Validator");
const timesRangeAndWorktimeValidator = require("../Helpers/timesRangeAndWorktimeValidator");
const oldDateAndWorkValidator = require("../Helpers/oldDateAndWorkValidator");

class ScheduleController {

  async createSchedule(request, response) {
    try {
      const { doctor_id, date, time_from, time_to, patient_id, type } =
        request.body;
      if (validator.validScheduleCreate(doctor_id, date, time_from, time_to, patient_id, type) &&
        oldDateAndWorkValidator(date) &&
        timesRangeAndWorktimeValidator(time_from, time_to)) {
        const poolScheduleOfDate = await dbPool.query(QUERY_SCHEDULE_SQL.GET_SCHEDULE_OF_DATE, [date, time_from])
        const scheduleOfDate = poolScheduleOfDate.rows
        if (scheduleOfDate.length > 0) {
          scheduleOfDate.forEach(schedule => {
            if (schedule.patient_id === patient_id || schedule.doctor_id === doctor_id) {
              response.status(400)
              response.send("Doctor or Patient of busy")
            }
          })
        } else {
          const result = await dbPool.query(QUERY_SCHEDULE_SQL.CREATE_SCHEDULE, [
            doctor_id,
            date,
            time_from,
            time_to,
            patient_id,
            type,
          ]);
          response.status(201)
          response.json(result.rows[0]);
        }
      } else {
        response.status(400)
        response.send("Error request body fields")
      }
    } catch (e) {
      const err = new Error(`${e.severity}: ${e.code} - ${e.detail}`)
      response.status(400)
      console.log(e.code)
      response.send(err.message)
    } finally {
      response.end()
    }
  }
  // THIS STOP CODE

  async getSchedule(request, response) {
    const id = request.params.id;
    const result = await dbPool.query(QUERY_SCHEDULE_SQL.GET_SCHEDULE, [id]);
    response.json(result.rows);
  }

  async getSchedules(request, response) {
    if (Object.keys(request.query).length == 0) {
      const result = await dbPool.query(QUERY_SCHEDULE_SQL.GET_SCHEDULES);
      response.json(result.rows);
    }

    const { date, time_from, time_to, is_free, doctor_id, patient_id } =
      request.query;
    response.send(
      `${date}, ${time_from}, ${time_to}, ${is_free}, ${doctor_id}, ${patient_id}`
    );
  }

  async deleteSchedule(request, response) {
    const id = request.params.id;
    const result = await dbPool.query(QUERY_SCHEDULE_SQL.DELETE_SCHEDULE, [id]);
    response.json(result.rows[0]);
  }
}

module.exports = new ScheduleController();
