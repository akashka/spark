var Student = require('../models/student');
var Indentation = require('../models/indentation');
var Center = require('../models/center');
var User = require('../models/user');
var moment = require('moment');
var nodemailer = require('nodemailer');
var fs = require('fs');
var path = require("path");
var request = require('request-promise');
var curl = require('curlrequest');
var sgMail = require('@sendgrid/mail');
var _ = require('lodash-node');
var json2csv = require('json2csv');
var base64 = require('base-64');
var AWS = require('aws-sdk')

var smsUrl = "http://alerts.valueleaf.com/api/v4/?api_key=A172d1e496771a5758651f00704e4ad18";
var adminNumber = ["9845012849", "9845679966"];
//var adminNumber = ["7259596963", "7259596963"];
var adminEmail = "admissions@little-wonders.in";
//var adminEmail = "akash.ka01@gmail.in";
var senderID = "LILWON";

var apiKey = "SG";
apiKey += ".Jy";
apiKey += "-SHrC";
apiKey += "-TOmdhaQO";
apiKey += "_WEApA";
apiKey += ".LybA2o2680TaJN3qyr";
apiKey += "_b8XPISnq";
apiKey += "_R0fjXb1pq9tLYM4";

// var apiKey = "SG";
// apiKey += ".41G";
// apiKey += "-EH6mS";
// apiKey += "-WT7ZWg_5bH";
// apiKey += "-g";
// apiKey += ".gEep1FU0lKjI8";
// apiKey += "D4gd4zpY7a5HR7";
// apiKey += "Up9jmE0AENHKO09A";
sgMail.setApiKey(apiKey);

// Image S3
const BUCKET_NAME = 'olwapp';
const IAM_USER_KEY = 'AKIAJ5YI3ULII2UU4HWA';
const IAM_USER_SECRET1 = 'V717KGCwHmm';
const IAM_USER_SECRET2 = 'AZ2FzCAaMV3DAJ';
const IAM_USER_SECRET3 = 'OSskeDj1nw9XI5h';


/*
    Send Birthday Message / Email
*/
function datecompare(date1) {
    if (date1 == undefined) return false;
    var day1 = date1.getDate();
    var mon1 = date1.getMonth();
    var date2 = new Date();
    var day2 = date2.getDate();
    var mon2 = date2.getMonth();
    if (day1 === day2 && mon1 == mon2) return true;
    else return false;
}

exports.sendBirthdayMessage = function (req, res, next) {
    console.log("Sending out Birthday Messages if any student");
    var query = { is_Active: true, deleted: false };
    Student.find(query, function (err, students) {
        if (err) {
            console.log("Error in getting students list: " + err);
            res.send(err);
        }
        if (students.length > 0) {
            let list = _.filter(students, function (stu) {
                return datecompare(stu.dob)
            });
            if (list != undefined && list.length > 0) {
                for (var l = 0; l < list.length; l++) {
                    sendBirthdaySMS(list[l]);
                    sendBirthdayEmail(list[l]);
                }
            }
        }
    });
}

sendBirthdaySMS = function (student) {
    console.log("Sending SMS to parent");
    var messageData = "";
    var formData = smsUrl + "&method=sms&message=" + encodeURIComponent(messageData) + "&to=" + student.phone_number + "&sender=" + senderID;
    curl.request(formData, function optionalCallback(err, body) {
        if (err) {
            return console.error('Sending SMS to parent failed: ', err);
        }
        console.log('Successfully sent SMS to parent');
    });
}

sendBirthdayEmail = function (student) {
    console.log("Sending mail to Parent");

    var subjectTemplate = 'Happy Birthday ' + student.name;
    var stringTemplate = fs.readFileSync(path.join(__dirname, '../helpers') + '/birthday.html', "utf8");

    var mailOptions = {
        to: student.email_id,
        from: 'info@little-wonders.in',
        subject: subjectTemplate,
        html: stringTemplate,
        cc: student.counsellor
    };

    sgMail.send(mailOptions, function (err) {
        if (err) console.log(err);
    });
}


/*
    Gemerate Reports for Dashboard
*/
exports.getStats = function (req, res, next) {
    console.log('Generating Report for the Dashboard');
    var query = { is_Active: true, deleted: false };
    Student.find(query, function (err, students) {
        let res = _.groupBy(students, function (b) { return b.center });
        res.json(res);
    });
} 