const dbPool = require("../Server/pgPool");
const QUERY_DOCTOR_SQL = require("./../Constants/QUERY_DOCTOR_SQL");
const validator = require('./../Service/Validator')

class DoctorController {
  async createDoctor(request, response) {
    try {
      const { name, spec, price } = request.body;
      if (validator.validDoctorCreate(name, spec, price)) {
        const result = await dbPool.query(QUERY_DOCTOR_SQL.CREATE_DOCTOR, [
          name,
          spec,
          price,
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

  async getDoctor(request, response) {
    const id = request.params.id;
    if (Number(id)) {
      try {
        const result = await dbPool.query(QUERY_DOCTOR_SQL.GET_DOCTOR, [id]);
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

  async getDoctors(request, response) {
    try {
      const result = await dbPool.query(QUERY_DOCTOR_SQL.GET_DOCTORS);
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

  async deleteDoctor(request, response) {
    const id = request.params.id;
    if (Number(id)) {
      try {
        const result = await dbPool.query(QUERY_DOCTOR_SQL.DELETE_DOCTOR, [id]);
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

module.exports = new DoctorController();
