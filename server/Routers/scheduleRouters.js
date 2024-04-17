const Router = require("express");
const scheduleController = require("./../Controllers/ScheduleController");
const router = new Router();

router.get("/schedule", scheduleController.getSchedules);
router.get("/schedule/:id", scheduleController.getSchedule);
router.post("/schedule", scheduleController.createSchedule);
router.delete("/schedule/:id", scheduleController.deleteSchedule);

module.exports = router;
