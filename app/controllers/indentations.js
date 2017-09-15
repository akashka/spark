var Indentation = require('../models/indentation');
var sgMail = require('@sendgrid/mail');
var curl = require('curlrequest');
var fs = require('fs');
var path = require("path");

var smsUrl = "http://alerts.valueleaf.com/api/v4/?api_key=A172d1e496771a5758651f00704e4ad18";
var adminNumber = "7259596963";
var adminEmail = "akash.ka01@gmail.com";
var senderID = "LILWON";

var apiKey = "SG";
apiKey += ".Jy";
apiKey += "-SHrC";
apiKey += "-TOmdhaQO";
apiKey += "_WEApA";
apiKey += ".LybA2o2680TaJN3qyr";
apiKey += "_b8XPISnq";
apiKey += "_R0fjXb1pq9tLYM4";
sgMail.setApiKey(apiKey);

exports.getIndentations = function(req, res, next) {
    console.log("Getting list of Indentations");
    Indentation.find(function(err, indentations) {
        if (err) { 
            console.log("Error in getting list of Indentations");
            return res.send(err); 
        }
        res.json(indentations);
    });
}
 
exports.createIndentation = function(req, res, next) {
    console.log("New Indentation received");
    var indentation = req.body;
    Indentation.create(indentation, function(err, indentation) {
        if (err) { 
            console.log("Error in creating Indentation");
            return res.send(err); 
        }
        sendMail(indentation);
        sendSms(indentation);

        res.json(indentation);
    });
}
 
exports.updateIndentation = function(req, res, next) {
    var indentation = req.body;
    delete indentation._id;
    
    Indentation.findOneAndUpdate(req.body._id, indentation, {upsert: true, new: true}, function(err, indentation) {
        if (err) return res.send(err);
        res.json(indentation);
    });
}

sendMail = function(indentation) {
    console.log("Sending indentation mail");

    var amt = "<table> <thead> <td> Student ID </td> <td> Amount </td> <td> Name </td> <td> Phone No </td> <td> Gender </td> <td> Class Group </td> <td> Class Type </td> <td> Shoe Size </td> <td> Uniform Size </td> </thead> <tbody>";
    for(var i = 0; i < indentation.students_amount.length; i++) {
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
     stringTemplate = stringTemplate.replace('{{center_code}}', indentation.center_code);
     stringTemplate = stringTemplate.replace('{{counsellor}}', indentation.email_id);
     stringTemplate = stringTemplate.replace('{{transaction_no}}', indentation.transaction_no);
     stringTemplate = stringTemplate.replace('{{amt}}', amt);

      var mailOptions = {
        to: adminEmail,
        from: 'info@little-wonders.in',
        subject: "New indentation received",
        html: stringTemplate
      };

      sgMail.send(mailOptions, function(err) {
        if(err) console.log(err.response.body);
      });
}

sendSms = function(indentation) {
    console.log("Sending Indentation SMS");

    var messageData = "";
    messageData = "Indentation from " + indentation.center_code + 
        ", Total Amount: " + indentation.total_amount + 
        ", Payment Date: " + moment(indentation.payment_date).format("DD-MMM-YYYY") +
        ", Payment Mode: " + indentation.payment_mode +
        ", Bank: " + indentation.bank_name +
        ", Cheque No: " + indentation.cheque_no +
        ", Transaction No: " + indentation.transaction_no +
        ", Counsellor: " + indentation.email;

    var formData = smsUrl + "&method=sms&message=" + encodeURIComponent(messageData) + "&to=" + adminNumber + "&sender=" + senderID;
    curl.request(formData, 
      function optionalCallback(err, body) {
      if (err) {
        return console.error('Sending Indentation SMS failed: ', err);
      }
      console.log('Successfully sent Indentation SMS');
    });
}