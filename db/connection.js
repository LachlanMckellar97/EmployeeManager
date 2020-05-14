const mysql = require("mysql");
const util = require("util");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Mckellar12!",
  database: "employeemanager_db"
});

connection.connect();

connection.query = util.promisify(connection.query);

module.exports = connection;