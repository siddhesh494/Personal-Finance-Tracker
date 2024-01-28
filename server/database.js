const mysql = require('mysql2')

// create the connection
const connection = mysql.createPool({
  host:"127.0.0.1",
  user:"root",
  database: "finance_tracker",
  password:"siddhesh"

}).promise();

module.exports = connection