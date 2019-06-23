var Indentation = require('../models/indentation');
var Student = require('../models/student');
var Center = require('../models/center');
var sgMail = require('@sendgrid/mail');
var curl = require('curlrequest');
var fs = require('fs');
var path = require("path");
var moment = require('moment');

var smsUrl = "http://alerts.valueleaf.com/api/v4/?api_key=A172d1e496771a5758651f00704e4ad18";
var adminNumber = ["9845012849", "9845679966"];
//var adminNumber = ["7259596963", "7259596963"];
var adminEmail = "admissions@little-wonders.in";
//var adminEmail = "akash.ka01@gmail.in";
var senderID = "LILWON";

// var apiKey = "SG";
// apiKey += ".Jy";
// apiKey += "-SHrC";
// apiKey += "-TOmdhaQO";
// apiKey += "_WEApA";
// apiKey += ".LybA2o2680TaJN3qyr";
// apiKey += "_b8XPISnq";
// apiKey += "_R0fjXb1pq9tLYM4";

// New 1
// var apiKey = "SG";
// apiKey += ".j";
// apiKey += "-8tJ1";
// apiKey += "XzR1ChOGIX";
// apiKey += "EA";
// apiKey += ".Fvc8A";
// apiKey += "-MQwQnB1EH1LFzn5M4bS";
// apiKey += "157Hyv5oAcmW96MVhU";

var apiKey = "SG";
apiKey += ".41G";
apiKey += "-EH6mS";
apiKey += "-WT7ZWg_5bH";
apiKey += "-g";
apiKey += ".gEep1FU0lKjI8";
apiKey += "D4gd4zpY7a5HR7";
apiKey += "Up9jmE0AENHKO09A";

sgMail.setApiKey(apiKey);

exports.getIndentations = function (req, res, next) {
  console.log("Getting list of Indentations");
  Indentation.find(function (err, indentations) {
    if (err) {
      console.log("Error in getting list of Indentations");
      return res.send(err);
    }
    res.json(indentations);
  });
}

exports.createIndentation = function (req, res, next) {
  console.log("New Indentation received");
  var indentation = req.body;
  indentation.status = "open";

  Indentation.find(function (err, indentations) {
    if (err) {
      console.log("Error in getting list of Indentations");
      return res.send(err);
    }
    indentation.num = "IND" + indentations.length;

    Indentation.create(indentation, function (err, indentation) {
      if (err) {
        console.log("Error in creating Indentation");
        return res.send(err);
      }
      sendMail(indentation);
      sendSms(indentation);

      res.json(indentation);
    });

    for (var i = 0; i < indentation.students_amount.length; i++) {
      if (indentation.students_amount[i].is_dispatched) {

        var query = { student_id: indentation.students_amount[i].student_id };
        Student.findOne(query).exec(function (err, student) {
          student.is_Delivered = true;
          student.delivery_date = new Date();
          var id = student._id;
          delete student._id;
          delete student.__v;

          Student.findOneAndUpdate({ _id: id }, student, { upsert: true, new: true }, function (err, stu) {
            console.log("Successfully updated Indentation for Student");
          });
        });

      }
    }
  });
}

exports.updateIndentation = function (req, res, next) {
  console.log(" Indentation confirmation received");
  var currentTime = new Date();
  var indentation = req.body;
  var id = req.body._id;
  delete indentation._id;
  delete indentation.__v;

  indentation.status = "closed";
  for (var i = 0; i < indentation.students_amount.length; i++) {
    if (!indentation.students_amount[i].is_dispatched) indentation.status = "partial";
  }
  indentation.deliveryTime.push(currentTime);

  Indentation.findOneAndUpdate({ _id: id }, indentation, { upsert: true, new: true }, function (err, indentation) {
    if (err) {
      console.log("Error in updating Indentation: " + err);
      return res.send(err);
    }
    console.log("Successfully updated Indentation");
    sendUpdateMail(indentation);
    sendUpdateSms(indentation);
    res.json(indentation);
  });

  for (var i = 0; i < indentation.students_amount.length; i++) {
    if (indentation.students_amount[i].is_dispatched) {

      var query = { student_id: indentation.students_amount[i].student_id };
      Student.findOne(query).exec(function (err, student) {
        student.is_Delivered = true;
        student.delivery_date = new Date();
        var id = student._id;
        delete student._id;
        delete student.__v;

        Student.findOneAndUpdate({ _id: id }, student, { upsert: true, new: true }, function (err, stu) {
          console.log("Successfully updated Indentation for Student");
        });
      });

    }
  }

}

sendMail = function (indentation) {
  console.log("Sending indentation mail");

  var amt = "<table> <thead> <td> Student ID </td> <td> Amount </td> <td> Name </td> <td> Phone No </td> <td> Gender </td> <td> Class Group </td> <td> Class Type </td> <td> Shoe Size </td> <td> Uniform Size </td> </thead> <tbody>";
  for (var i = 0; i < indentation.students_amount.length; i++) {
    amt += "<tr><td>" + indentation.students_amount[i].student_id + "</td>";
    amt += "<td>" + indentation.students_amount[i].amount + "</td>";
    amt += "<td>" + indentation.students_amount[i].student_name + "</td>";
    amt += "<td>" + indentation.students_amount[i].phone_number + "</td>";
    amt += "<td>" + indentation.students_amount[i].gender + "</td>";
    amt += "<td>" + indentation.students_amount[i].class_group + "</td>";
    amt += "<td>" + indentation.students_amount[i].class_type + "</td>";
    amt += "<td>" + indentation.students_amount[i].shoe_size + "</td>";
    amt += "<td>" + indentation.students_amount[i].uniform_size + "</td></tr>";
  }
  amt += "</tbody> </table>";

  var stringTemplate = fs.readFileSync(path.join(__dirname, '../helpers') + '/admin_indentation.html', "utf8");
  stringTemplate = stringTemplate.replace('{{total_amount}}', indentation.total_amount);
  stringTemplate = stringTemplate.replace('{{payment_mode}}', indentation.payment_mode);
  stringTemplate = stringTemplate.replace('{{payment_date}}', moment(indentation.payment_date).format("DD-MMM-YYYY"));
  stringTemplate = stringTemplate.replace('{{bank_name}}', indentation.bank_name);
  stringTemplate = stringTemplate.replace('{{cheque_no}}', indentation.cheque_no);
  stringTemplate = stringTemplate.replace('{{center_code}}', indentation.center_code + "(" + indentation.num + ")");
  stringTemplate = stringTemplate.replace('{{counsellor}}', indentation.email_id);
  stringTemplate = stringTemplate.replace('{{transaction_no}}', indentation.transaction_no);
  stringTemplate = stringTemplate.replace('{{amt}}', amt);

  var mailOptions = {
    to: adminEmail,
    from: 'info@little-wonders.in',
    subject: "New indentation received",
    html: stringTemplate
  };

  sgMail.send(mailOptions, function (err) {
    if (err) console.log(err.response.body);
  });
}

sendSms = function (indentation) {
  console.log("Sending Indentation SMS");

  var messageData = "Indentation from " + indentation.center_code +
    ", Indent Num: " + indentation.num +
    ", Total Amount: " + indentation.total_amount +
    ", Payment Date: " + moment(indentation.payment_date).format("DD-MMM-YYYY") +
    ", Payment Mode: " + indentation.payment_mode +
    ", Bank: " + indentation.bank_name +
    ", Cheque No: " + indentation.cheque_no +
    ", Transaction No: " + indentation.transaction_no +
    ", Counsellor: " + indentation.email;

  for (var i = 0; i < adminNumber.length; i++) {
    var formData = smsUrl + "&method=sms&message=" + encodeURIComponent(messageData) + "&to=" + adminNumber[i] + "&sender=" + senderID;
    curl.request(formData,
      function optionalCallback(err, body) {
        if (err) {
          return console.error('Sending Indentation SMS failed: ', err);
        }
        console.log('Successfully sent Indentation SMS');
      });
  }

  var query = { center_code: indentation.center_code };
  Center.findOne(query).exec(function (err, center) {
    if (err) { res.send(err); }
    var formData = smsUrl + "&method=sms&message=" + encodeURIComponent(messageData) + "&to=" + center.phoneno + "&sender=" + senderID;
    curl.request(formData,
      function optionalCallback(err, body) {
        if (err) {
          return console.error('Sending Indentation SMS to center failed: ', err);
        }
        console.log('Successfully sent Indentation SMS to center');
      });
  });
}

sendUpdateMail = function (indentation) {

  // send mail
}

sendUpdateSms = function (indentation) {
  console.log("Sending Dispatch SMS");

  var messageData = "Dispatch for " + indentation.center_code + " with Indent num: " +
    indentation.num + " done. Status: " + indentation.status + ". ";
  for (var i = 0; i < indentation.students_amount.length; i++) {
    if (indentation.students_amount[i].is_dispatched)
      messageData += indentation.students_amount[i].student_name + " - Full. ";
    else if (indentation.students_amount[i].is_partial)
      messageData += indentation.students_amount[i].student_name + " - Partial. ";
  }

  for (var i = 0; i < adminNumber.length; i++) {
    var formData = smsUrl + "&method=sms&message=" + encodeURIComponent(messageData) + "&to=" + adminNumber[i] + "&sender=" + senderID;
    curl.request(formData,
      function optionalCallback(err, body) {
        if (err) {
          return console.error('Sending Dispatch SMS failed: ', err);
        }
        console.log('Successfully sent Dispatch SMS');
      });
  }

}

exports.approveIndentation = function (req, res, next) {
  console.log(" Indentation approved by admin");
  var indentation = req.body;
  var id = req.body._id;
  delete indentation._id;
  delete indentation.__v;

  Indentation.findOneAndUpdate({ _id: id }, indentation, { upsert: true, new: true }, function (err, indentation) {
    if (err) {
      console.log("Error in approving Indentation: " + err);
      return res.send(err);
    }
    console.log("Successfully approved Indentation");
    // sendUpdateMail(indentation);
    // sendUpdateSms(indentation);
    res.json(indentation);
  });
}
