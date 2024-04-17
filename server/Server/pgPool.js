const Pool = require("pg").Pool;

const pgPool = new Pool({
  user: "postgres",
  password: "postgres",
  host: "localhost",
  port: 5432,
  database: "mis",
});

module.exports = pgPool;
