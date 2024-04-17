const Router = require("express");
const doctorController = require("./../Controllers/DoctorController");
const router = new Router();

router.get("/doctor", doctorController.getDoctors);
router.get("/doctor/:id", doctorController.getDoctor);
router.post("/doctor", doctorController.createDoctor);
router.delete("/doctor/:id", doctorController.deleteDoctor);

module.exports = router;
