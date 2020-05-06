var express = require("express");
var app = express();
var mongoose = require("mongoose");
var logger = require("morgan");
var bodyParser = require("body-parser");
var cors = require("cors");
var cron = require("node-cron");
var moment = require("moment");
var MiscController = require("./app/controllers/misc");
var databaseConfig = require("./config/database");
var router = require("./app/routes");

mongoose.connect(databaseConfig.url);

var server = app.listen(process.env.PORT || 8080);
console.log("App listening on port 8080");

app.use(
  bodyParser.urlencoded({
    parameterLimit: 10000000,
    limit: "5000mb",
    extended: true
  })
); // Parses urlencoded bodies
app.use(bodyParser.json({ limit: "5000mb" })); // Send JSON responses
app.use(logger("dev")); // Log requests to API using morgan
app.use(cors());

router(app);

// Birthday Messages
cron.schedule(
  "0 8 * * *",
  () => {
    MiscController.sendBirthdayMessage();
  },
  {
    scheduled: true,
    timezone: "Asia/Kolkata"
  }
);
