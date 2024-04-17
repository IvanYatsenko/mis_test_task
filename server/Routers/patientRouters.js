const Router = require("express");
const patientController = require("./../Controllers/PatientController");
const router = new Router();

router.get("/patient", patientController.getPatients);
router.get("/patient/:id", patientController.getPatient);
router.post("/patient", patientController.createPatient);
router.delete("/patient/:id", patientController.deletePatient);

module.exports = router;
