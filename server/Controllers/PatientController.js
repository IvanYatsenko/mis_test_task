const dbPool = require("../Server/pgPool");
const QUERY_PATIENT_SQL = require("./../Constants/QUERY_PATIENT_SQL");
const validator = require('./../Service/Validator')
class PatientController {
  async createPatient(request, response) {
    try {
      const { name, phone, email, gender } = request.body;
      if (validator.validPatientCreate(name, phone, email, gender)) {
        const result = await dbPool.query(QUERY_PATIENT_SQL.CREATE_PATIENT, [
          name,
          phone,
          email,
          gender,
        ]);
        response.status(201)
        response.json(result.rows[0]);
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

  async getPatient(request, response) {
    const id = request.params.id;
    if (Number(id)) {
      try {
        const result = await dbPool.query(QUERY_PATIENT_SQL.GET_PATIENT, [id]);
        if (result.rows.length > 0) {
          response.status(201)
          response.json(result.rows[0]);
        } else {
          response.status(201)
          response.send("No data")
        }
        response.end()
      } catch (e) {
        const err = new Error(`${e.severity}: ${e.code} - ${e.detail}`)
        response.status(400)
        console.log(e.code)
        response.send(err.message)
        response.end()
      }
    } else {
      response.status(400)
      response.send("Error params request")
      response.end()
    }
  }

  async getPatients(request, response) {
    try {
      const result = await dbPool.query(QUERY_PATIENT_SQL.GET_PATIENTS);
      if (result.rows.length > 0) {
        response.status(201)
        response.json(result.rows);
      } else {
        response.status(400)
        response.send("No data")
      }
      response.end()
    } catch (e) {
      const err = new Error(`${e.severity}: ${e.code} - ${e.detail}`)
      response.status(400)
      console.log(e.code)
      response.send(err.message)
      response.end()
    }
  }

  async deletePatient(request, response) {
    const id = request.params.id;
    if (Number(id)) {
      try {
        const result = await dbPool.query(QUERY_PATIENT_SQL.DELETE_PATIENT, [id]);
        if (result.rowCount === 0) {
          response.status(400)
          response.send("No data")
        } else {
          response.status(201)
          response.send(result.command);
        }
      } catch (e) {
        const err = new Error(`${e.severity}: ${e.code} - ${e.detail}`)
        response.status(400)
        console.log(e.code)
        response.send(err.message)
      } finally {
        response.end()
      }
    } else {
      response.status(400)
      response.send("Error params request")
    }
  }
}

module.exports = new PatientController();
