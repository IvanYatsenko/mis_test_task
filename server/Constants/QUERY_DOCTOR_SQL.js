const QUERY_DOCTOR_SQL = {
  CREATE_DOCTOR: `INSERT INTO doctor (name, spec, price) values ($1, $2, $3) RETURNING *`,
  GET_DOCTOR: `SELECT * FROM doctor WHERE id = $1`,
  GET_DOCTORS: `SELECT * FROM doctor`,
  DELETE_DOCTOR: `DELETE FROM doctor WHERE id = $1`,
};

module.exports = QUERY_DOCTOR_SQL;
