var Student = require('../models/student');
var moment = require('moment');
var nodemailer = require('nodemailer');
var fs = require('fs');
var path = require("path");
var request = require('request-promise');
var curl = require('curlrequest');
var sgMail = require('@sendgrid/mail');

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

exports.getStudents = function(req, res, next){
    console.log("Getting Students list");
    Student.find(function(err, students) {
        if (err){
            console.log("Error in getting students list: " + err);
            res.send(err);
        }
        console.log("Students list successfully received");
        res.json(students);
    });
}
 
exports.createStudent = function(req, res, next){
    console.log("New Student enquiry received for: " + req.body.name);
    var currentTime = new Date();
    var student = {
        student_id: req.body.student_id,
        name: req.body.name,
        email_id: req.body.email_id,
        phone_number: req.body.phone_number,
        gender: req.body.gender,
        dob: req.body.dob,
        parent_name: req.body.parent_name,
        alternate_contact: req.body.alternate_contact,
        locality: req.body.locality,
        status: "enquiry",
        center: req.body.center,
        counsellor: req.body.counsellor,
        class_group: req.body.class_group,
        photo: req.body.photo,
        enquiry_date: currentTime
    };

    Student.create(student, function(err, student) { 
        if (err){
            console.log("Error in saving enquiry of student:  " + err);
            return res.send(err);
        }
        sendAdminMail(student, "enquiry");
        sendParentMail(student, "enquiry");
        sendParentSms(student, "enquiry");
        sendAdminSms(student, "enquiry");

       res.json(student);
    });
}
 
exports.updateStudent = function(req, res, next){
    console.log(req.body.status + " Student enquiry received for: " + req.body.name);
    var currentTime = new Date();
    var student = req.body;
    var id = req.body._id;
    if(student.status == "confirmed") student.confirmation_date = currentTime;
    else if (student.status == "indented") student.indentation_date = currentTime;
    delete student._id;
    delete student.student_id;
    delete student.email_id;

    Student.findOneAndUpdate( {_id: id}, student, {upsert: true, new: true}, function(err, student) {
        if (err) {
          console.log("Error in updating Student: " + err);
          return res.send(err);
        }
        console.log("Successfully updated Student");
        if(student.status == "confirmed") {
           sendAdminMail(student, "confirmed");
           sendAdminSms(student, "confirmed");
           sendParentMail(student, "confirmed");
           sendParentSms(student, "confirmed");
        }

        res.json(student);
    }); 
}

sendAdminMail = function(student, action) {
  console.log("Sending mail to admin");
  var stringTemplate = "";
  var subjectTemplate = "";

  if(action == "enquiry") 
  {
    subjectTemplate = 'Enquiry received at ' + student.center;
    stringTemplate = fs.readFileSync(path.join(__dirname, '../helpers') + '/admin_enquiry.html', "utf8");
     stringTemplate = stringTemplate.replace('{{parent_name}}', student.parent_name);
     stringTemplate = stringTemplate.replace('{{student_name}}', student.name);
     stringTemplate = stringTemplate.replace('{{phone_no}}', student.phone_number);
     stringTemplate = stringTemplate.replace('{{student_dob}}', moment(student.dob).format("DD-MMM-YYYY"));
     stringTemplate = stringTemplate.replace('{{student_class}}', student.class_group);
     stringTemplate = stringTemplate.replace('{{locality}}', student.locality);
     stringTemplate = stringTemplate.replace('{{email}}', student.email_id);
     stringTemplate = stringTemplate.replace('{{center_code}}', student.center);
     stringTemplate = stringTemplate.replace('{{counsellor}}', student.counsellor);
     stringTemplate = stringTemplate.replace('{{gender}}', student.gender);
     stringTemplate = stringTemplate.replace('{{student_id}}', student.student_id);
  } 
  else if(action == "confirmed"){
    subjectTemplate = 'Student Confirmed at ' + student.center;
    stringTemplate = fs.readFileSync(path.join(__dirname, '../helpers') + '/admin_confirmation.html', "utf8");
     stringTemplate = stringTemplate.replace('{{parent_name}}', student.parent_name);
     stringTemplate = stringTemplate.replace('{{student_name}}', student.name);
     stringTemplate = stringTemplate.replace('{{phone_no}}', student.phone_number);
     stringTemplate = stringTemplate.replace('{{student_dob}}', moment(student.dob).format("DD-MMM-YYYY"));
     stringTemplate = stringTemplate.replace('{{student_class}}', student.class_group);
     stringTemplate = stringTemplate.replace('{{locality}}', student.locality);
     stringTemplate = stringTemplate.replace('{{email}}', student.email_id);
     stringTemplate = stringTemplate.replace('{{center_code}}', student.center);
     stringTemplate = stringTemplate.replace('{{counsellor}}', student.counsellor);
     stringTemplate = stringTemplate.replace('{{enquiry_date}}', student.enquiry_date);
     stringTemplate = stringTemplate.replace('{{gender}}', student.gender);
     stringTemplate = stringTemplate.replace('{{student_id}}', student.student_id);
     stringTemplate = stringTemplate.replace('{{class_type}}', student.class_type);
     stringTemplate = stringTemplate.replace('{{uniform_size}}', student.uniform_size);
     stringTemplate = stringTemplate.replace('{{shoe_size}}', student.shoe_size);
  }
  
  var mailOptions = {
    to: adminEmail,
    from: 'info@little-wonders.in',
    subject: subjectTemplate,
    html: stringTemplate
  };

  sgMail.send(mailOptions, function(err) {
    if(err) console.log(err.response.body);
  });
}

sendParentMail = function(student, action) {
  console.log("Sending mail to Parent");
  var stringTemplate = "";
  var subjectTemplate = "";

  if(action == "enquiry") 
  {
    subjectTemplate = 'Enquiry received at ' + student.center;
    stringTemplate = fs.readFileSync(path.join(__dirname, '../helpers') + '/parent_enquiry.html', "utf8");
  }
  else if(action == "confirmed"){
    subjectTemplate = 'Student Confirmed at ' + student.center;
    stringTemplate = fs.readFileSync(path.join(__dirname, '../helpers') + '/parent_confirmation.html', "utf8");
  }

  var mailOptions = {
    to: student.email_id,
    from: 'info@little-wonders.in',
    subject: 'Enquiry successfully received at Our Little Wonders',
    html: stringTemplate
  };

  sgMail.send(mailOptions, function(err) {
    if(err) console.log(err);
  });
}

sendAdminSms = function(student, action) {
    console.log("Sending SMS to admin");

    var messageData = "";
    if(action == "enquiry") {
      messageData = "ENQUIRY AT " + student.center + 
                ", Name: " + student.name + 
                ", Email: " + student.email_id +
                ", Phone: " + student.phone_number +
                ", Gender: " + student.gender +
                ", Class: " + student.class_group +
                ", DOB: " + moment(student.dob).format("DD-MMM-YYYY") +
                ", Parent: " + student.parent_name;
    } else if(action == "confirmed"){
      messageData = "CONFIRMATION AT " + student.center + 
                ", Name: " + student.name + 
                ", Phone: " + student.phone_number +
                ", Gender: " + student.gender +
                ", Class: " + student.class_group +
                ", Type: " + student.class_type +
                ", Shoe: " + student.shoe_size +
                ", Uniform: " + student.uniform_size;
    }

    var formData = smsUrl + "&method=sms&message=" + encodeURIComponent(messageData) + "&to=" + adminNumber + "&sender=" + senderID;
    curl.request(formData, 
      function optionalCallback(err, body) {
      if (err) {
        return console.error('Sending SMS to admin failed: ', err);
      }
      console.log('Successfully sent SMS to admin');
    });
}

sendParentSms = function(student, action) {
    console.log("Sending SMS to parent");

    var messageData = "";
    if(action == "enquiry") {
      messageData = "Thank you for inquiring about our Preschool. " +
          "We offer child friendly curriculum with bright, creative and safe environment for your child. " +
          "It’s a preschool like home, near home for your little ones. " +
          "For more details you can log on to www.little-wonders.in";
    } else if(action == "confirmed"){
      messageData = "Thank you for your child admission in our Preschool. " +
          "We offer child friendly curriculum with bright, creative and safe environment for your child. " +
          "It’s a preschool like home, near home for your little ones. " +
          "For more details you can log on to www.little-wonders.in";
    }

    var formData = smsUrl + "&method=sms&message=" + encodeURIComponent(messageData) + "&to=" + student.phone_number + "&sender=" + senderID;

    curl.request(formData, function optionalCallback(err, body) {
      if (err) {
        return console.error('Sending SMS to parent failed: ', err);
      }
      console.log('Successfully sent SMS to parent');
    });
}