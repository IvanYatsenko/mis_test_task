const dbPool = require("../Server/pgPool");

class Notification {
  notifications = [];

  setNotifications = (values) => {
    if (values.length > 0) {
      values.forEach(async (schedule) => {
        const patientPool = await dbPool.query(
          `SELECT name FROM patient WHERE id = $1`,
          [schedule.patient_id]
        );
        const doctorPool = await dbPool.query(
          `SELECT spec FROM doctor WHERE id = $1`,
          [schedule.doctor_id]
        );

        const patient = patientPool.rows[0];
        const doctor = doctorPool.rows[0];
        const notificationStr = `Привет ${patient.name}! Напоминаем что вы записаны к ${doctor.spec} завтра в ${schedule.time_from}!`;
        // Проверка даты оповещения, если больше 2 дней то status = 2, если до 2 дней, но больше чем 2 часа то status = 1, если меньше чем 2 часа status = 0
        const result = {
          id: schedule.id,
          date: `${schedule.date} - ${schedule.time_from}`,
          message: notificationStr,
          status: 0,
          time_interval: 0,
        };

        // Проверка на статус и задать интервал времени time_interval. Если status = 0 удалить из БД
        this.notifications.push(result);
      });
    }
  };

  _getNotifications = async () => {
    const result = await dbPool.query(
      `SELECT id, time_from, date, patient_id, doctor_id FROM schedule`
    );
    this.setNotifications(result.rows);
  };

  listen = (time) => {
    setInterval(() => {
      this._getNotifications();
      console.log(this.notifications);
    }, time);
  };
}

module.exports = new Notification();
