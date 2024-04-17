const QUERY_SCHEDULE_SQL = {
  CREATE_SCHEDULE: `INSERT INTO schedule (doctor_id, date, time_from, time_to, patient_id, type) values ($1, $2, $3, $4, $5, $6) RETURNING *`,
  GET_SCHEDULE: `SELECT * FROM schedule WHERE id = $1`,
  GET_SCHEDULES: `SELECT * FROM schedule`,
  DELETE_SCHEDULE: `DELETE FROM schedule WHERE id = $1`,
  GET_SCHEDULE_OF_DATE: `SELECT * FROM schedule WHERE date = $1 AND time_from=$2`
};

module.exports = QUERY_SCHEDULE_SQL;
