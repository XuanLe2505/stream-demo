const mysql = require("mysql2");
const migration = require("mysql-migrations");

const connection = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  port: 3306,
  password: "thoaiky1992",
  database: "stream",
});

migration.init(connection, __dirname);
