const QUERY_PATIENT_SQL = {
  CREATE_PATIENT: `INSERT INTO patient (name, phone, email, gender) values ($1, $2, $3, $4) RETURNING *`,
  GET_PATIENT: `SELECT * FROM patient WHERE id = $1`,
  GET_PATIENTS: `SELECT * FROM patient`,
  DELETE_PATIENT: `DELETE FROM patient WHERE id = $1`,
};

module.exports = QUERY_PATIENT_SQL;
