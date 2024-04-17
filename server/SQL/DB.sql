-- Пример создания таблиц и зависимостей
create TABLE doctor(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50)  NOT NULL,
    spec VARCHAR(50)  NOT NULL,
    price NUMERIC(7,2)  NOT NULL
);

create TABLE patient(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50)  NOT NULL,
    phone VARCHAR(20)  NOT NULL,
    email VARCHAR(50)  NOT NULL,
    gender BOOLEAN DEFAULT(FALSE) NOT NULL
);

create TABLE schedule(
  id SERIAL PRIMARY KEY,
  doctor_id INTEGER,
  FOREIGN KEY (doctor_id) REFERENCES doctor (id),
  date DATE NOT NULL,
  time_from TIME NOT NULL,
  time_to TIME NOT NULL,
  patient_id INTEGER,
  FOREIGN KEY (patient_id) REFERENCES patient (id),
  type BOOLEAN DEFAULT(FALSE) NOT NULL
);