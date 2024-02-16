const fs = require("fs");
const mysql = require("mysql");

const sqlFilePath = "./commands.sql";
const sqlCommands = fs
  .readFileSync(sqlFilePath, "utf-8")
  .split(";")
  .filter(Boolean);

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "my-secret-pw",
  database: "sql_ex",
});

connection.connect((err) => {
  if (err) {
    console.error("Error in connecting to database", err);
    return;
  }
  console.log("Connected to database successfully!!");

  sqlCommands.forEach((sqlCommand) => {
    connection.query(sqlCommand, (err) => {
      if (err) {
        console.error("Error in executing SQL command:", err);
        return;
      }
      console.log("SQL command executed successfully:", sqlCommand);
    });
  });
});
