var express = require("express");
var app = express();
var mongoose = require("mongoose");
var logger = require("morgan");
var bodyParser = require("body-parser");
var cors = require("cors");
var cron = require("node-cron");
var moment = require("moment");
// var http = require("http");
// var socket = require("socket.io");
var MiscController = require("./app/controllers/misc");
var databaseConfig = require("./config/database");
var router = require("./app/routes");

mongoose.connect(databaseConfig.url);
console.log(databaseConfig);


// var server = http.createServer(app).listen((process.env.PORT || 8080), function(){
//   console.log("Express server listening on port " + app.get('port'));
// });

var server = app.listen(process.env.PORT || 8080);
// var io = require('socket.io').listen(server);
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

// var io = socket.listen(server);  
// io.on("connection", socket => {
//   io.emit("started");
  
//   socket.on('disconnect',function(det){
//     console.log("A client disconnected", det);
//   });

//   socket.on("joined", function(data) {
//     console.log("------------------------------------------");
//     console.log("JOINED NOW");
//     console.log(data);
//     // console.log('userId', userId);
//     // console.log('groupId', groupId);
//     // io.emit("user-joined", { userId: userId, groupId: groupId, event: "joined" });
//   });

//   socket.on("left", function(userId, groupId) {
//     io.emit("user-left", { userId: userId, groupId: groupId, event: "left" });
//   });

//   socket.on("add-message", message => {
//     console.log("---------------------------------------------------");
//     console.log(message);
//     console.log("---------------------------------------------------");
//     // io.emit("message", {message: message, groupId: groupId});
//   });
// });
