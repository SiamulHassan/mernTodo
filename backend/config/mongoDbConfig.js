const mongoose = require("mongoose");

function dbConnection() {
  mongoose.connect(process.env.DB_URL).then(() => console.log("db connectedd"));
}
module.exports = dbConnection;
