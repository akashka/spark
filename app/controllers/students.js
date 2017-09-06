var Student = require('../models/student');
var moment = require('moment');
var nodemailer = require('nodemailer');
var fs = require('fs');
var path = require("path");

exports.getStudents = function(req, res, next){
 
    Student.find(function(err, students) {
 
        if (err){
            res.send(err);
        }
 
        res.json(students);
 
    });
 
}
 
exports.createStudent = function(req, res, next){
    var currentTime = new Date();
    var from = req.body.dob.split("-");
    var f = new Date(from[2], from[1] - 1, from[0]);
    var student = {
        student_id: req.body.student_id,
        name: req.body.name,
        email_id: req.body.email_id,
        phone_number: req.body.phone_number,
        gender: req.body.gender,
        dob: f,
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
    console.log(student.dob);

    Student.create(student, function(err, student) { 
        if (err){
            console.log(err);
            res.send(err);
        }
      //  sendMail(student);
    });
 
}
 
exports.updateStudent = function(req, res, next){

    console.log(req.body);
    var currentTime = new Date();
    var student = req.body;
    var id = req.body._id;
    if(student.status == "confirmed") student.confirmation_date = currentTime;
    else if (student.status == "indented") student.indentation_date = currentTime;
    delete student._id;
    delete student.student_id;
    delete student.email_id;
    console.log(student);

    console.log(id);

    Student.findOneAndUpdate( {_id: id}, student, {upsert: true, new: true}, function(err, student) {
        if (err) return res.send(err);
        res.json(student);
    }); 
}

sendMail = function(student) {
  let smtpTransport = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 587,
    service: 'Sendgrid',
    auth: {
      user: '',
      pass: ''
    }
  });

  var image = "../../../client/src/assets/images/logo_littleW_0.png";

  var stringTemplate = fs.readFileSync(path.join(__dirname, '../helpers') + '/thankyou.html', "utf8");
   stringTemplate = stringTemplate.replace('{{center_name}}', student.center);
   stringTemplate = stringTemplate.replace('{{parent_name}}', student.parent_name);
   stringTemplate = stringTemplate.replace('{{student_name}}', student.name);
   stringTemplate = stringTemplate.replace('{{phone_no}}', student.phone_number);
   stringTemplate = stringTemplate.replace('{{student_dob}}', student.dob);
   stringTemplate = stringTemplate.replace('{{student_class}}', student.class_group);
   stringTemplate = stringTemplate.replace('{{locality}}', student.locality);

  var mailOptions = {
    to: student.email_id,
    from: 'info@little-wonders.in',
    subject: 'Enquiry successfully received at Our Little Wonderz',
    html: stringTemplate,
    attachments: [{
        filename: 'logo.png',
        path: image,
        cid: 'logo-cid'
    }]
  };

  smtpTransport.sendMail(mailOptions, function(err) {
    if(err) console.log(err);
  });
}