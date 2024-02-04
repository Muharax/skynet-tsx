const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "roor",
  password: "",
  database: "skynet",
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySQL Connected...");
});

module.exports = db;
