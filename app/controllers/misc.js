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
    var query = { is_Active: true, deleted: false, is_Indented: true };
    Student.find(query, function (err, students) {
        if (err) {
            console.log("Error in getting students list: " + err);
            res.send(err);
        }
        if (students.length > 0) {
            let list = _.filter(students, function (stu) {
                return datecompare(stu.dob)
            });
            console.log(list.length + " students have b'day today");
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
    console.log("Sending b-day SMS");
    var messageData = "Dear " + student.name + ", Our Little Wonders wishes you a very happy birthday. Though you are small and a cutie pie, but you are a star in our life. May god bless you and keep you safe. This wish is to tell you how much we love you. Have a funfilled happy birthday.";
    var formData = smsUrl + "&method=sms&message=" + encodeURIComponent(messageData) + "&to=" + student.phone_number + "&sender=" + senderID;
    curl.request(formData, function optionalCallback(err, body) {
        if (err) {
            return console.error('Sending SMS to parent failed: ', err);
        }
        console.log('Successfully sent b-day SMS');
    });
}

sendBirthdayEmail = function (student) {
    console.log("Sending b-day mail");

    var subjectTemplate = 'Happy Birthday ' + student.name;
    var stringTemplate = fs.readFileSync(path.join(__dirname, '../helpers') + '/happy.html', "utf8");
    stringTemplate = stringTemplate.replace('{{today_date}}', moment().format('dddd, DD MMMM YYYY'));
    stringTemplate = stringTemplate.replace('{{student_name}}', student.name);

    var mailOptions = {
        to: student.email_id,
        from: 'info@little-wonders.in',
        subject: subjectTemplate,
        html: stringTemplate,
        cc: student.counsellor
    };

    sgMail.send(mailOptions, function (err) {
        if (err) console.log(err);
        console.log('Successfully sent b-day mail');
    });
}
