const dateValidator = require("../Helpers/dateValidator")
const timeValidator = require("../Helpers/timeValidator")


class Validator {
    validDoctorCreate(name, spec, price) {
        if (typeof name == "string" &&
            typeof spec == "string" &&
            typeof price == "number") {
            if (name.trim() &&
                spec.trim() &&
                /^(0|[1-9]\d*)(\.[0-9]{1,2})?$/.test(price)) {
                return true
            }
        }
        return false
    }

    validPatientCreate(name, phone, email, gender) {
        if (typeof name == 'string' &&
            typeof phone == 'string' &&
            typeof email == 'string' &&
            typeof gender == 'boolean') {
            if (name.trim() &&
                phone.trim() &&
                /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu.test(email)) {
                return true
            }
        }
        return false
    }

    validScheduleCreate(doctor_id, date, time_from, time_to, patient_id, type) {
        if (typeof doctor_id == 'number' &&
            typeof date == 'string' &&
            typeof time_from == 'string' &&
            typeof time_to == 'string' &&
            typeof patient_id == 'number' &&
            typeof type == 'boolean') {
            if (dateValidator(date) && timeValidator(time_from) && timeValidator(time_to)) {
                return true
            }
        }
        return false
    }
}

module.exports = new Validator()