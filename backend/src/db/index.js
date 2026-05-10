const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "booking_hotel",
  password: "1234",
  port: 5433,
});

module.exports = pool;