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
var AWS = require('aws-sdk');
var PDFImage = require("pdf-image").PDFImage;

var smsUrl = "http://alerts.valueleaf.com/api/v4/?api_key=A172d1e496771a5758651f00704e4ad18";
var adminNumber = ["9845012849", "9845679966"];
//var adminNumber = ["7259596963", "7259596963"];
var adminEmail = "admissions@little-wonders.in";
//var adminEmail = "akash.ka01@gmail.in";
var senderID = "LILWON";

//var apiKey = "SG";
//apiKey += ".Jy";
// apiKey += "-SHrC";
// apiKey += "-TOmdhaQO";
// apiKey += "_WEApA";
// apiKey += ".LybA2o2680TaJN3qyr";
// apiKey += "_b8XPISnq";
// apiKey += "_R0fjXb1pq9tLYM4";

var apiKey = "SG";
apiKey += ".41G";
apiKey += "-EH6mS";
apiKey += "-WT7ZWg_5bH";
apiKey += "-g";
apiKey += ".gEep1FU0lKjI8";
apiKey += "D4gd4zpY7a5HR7";
apiKey += "Up9jmE0AENHKO09A";
sgMail.setApiKey(apiKey);

// Image S3
const BUCKET_NAME = 'olwapp';
const IAM_USER_KEY = 'AKIAJ5YI3ULII2UU4HWA';
const IAM_USER_SECRET1 = 'V717KGCwHmm';
const IAM_USER_SECRET2 = 'AZ2FzCAaMV3DAJ';
const IAM_USER_SECRET3 = 'OSskeDj1nw9XI5h';

function uploadToS3(file_name, file) {
  console.log("Uploading File to S3 " + file_name);
  var buf = new Buffer(file.replace(/^data:image\/\w+;base64,/, ""), 'base64')
  let s3bucket = new AWS.S3({
    accessKeyId: IAM_USER_KEY,
    secretAccessKey: IAM_USER_SECRET1 + IAM_USER_SECRET2 + IAM_USER_SECRET3,
    Bucket: BUCKET_NAME
  });
  console.log(s3bucket);
  s3bucket.createBucket(function () {
    var params = {
      Bucket: BUCKET_NAME,
      Key: file_name,
      Body: buf,
      ContentEncoding: 'base64'
      // ContentType: 'image/jpeg'
    };
    s3bucket.upload(params, function (err, data) {
      if (err) {
        console.log('error in callback');
        console.log(err);
      }
      console.log('success');
    });
  });
}

exports.getStudents = function (req, res, next) {
  console.log("Getting Students list");
  var query = { is_Active: true, deleted: false };
  Student.find(query, function (err, students) {
    if (err) {
      console.log("Error in getting students list: " + err);
      res.send(err);
    }
    console.log("Students list successfully received");
    res.json(students);
  });
}

exports.getAllStudents = function (req, res, next) {
  console.log("Getting Students list");
  Student.find(function (err, students) {
    if (err) {
      console.log("Error in getting students list: " + err);
      res.send(err);
    }
    console.log("Students list successfully received");
    res.json(students);
  });
}

exports.getInactiveStudents = function (req, res, next) {
  console.log("Getting Inactive Students list");
  var query = { is_Active: false, deleted: false };
  Student.find(query, function (err, students) {
    if (err) {
      console.log("Error in getting students list: " + err);
      res.send(err);
    }
    console.log("Students list successfully received");
    res.json(students);
  });
}

exports.createStudent = function (req, res, next) {
  console.log("New Student enquiry received for: " + req.body.name);

  if (req.body.photo) {
    uploadToS3(req.body.student_id, req.body.photo);
  }

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
    photo: (req.body.photo ? ('https://s3.ap-south-1.amazonaws.com/olwapp/' + req.body.student_id) : ''),
    enquiry_date: currentTime,
    is_Delivered: false,
    study_year: req.body.study_year,
    is_Indented: false,
    is_Confirmed: false,
    confirmation_date: null,
    indentation_date: null,
    delivery_date: null,
    is_Active: true,
    admin_edit: false,
    deleted: false
  };

  Student.create(student, function (err, student) {
    if (err) {
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

exports.updateStudent = function (req, res, next) {
  console.log(req.body.status + " Student enquiry received for: " + req.body.name);

  console.log(req.body);
  if (req.body.photo && req.body.photo.indexOf('s3.ap-south-1.amazonaws.com') == -1) {
    uploadToS3(req.body.student_id, req.body.photo);
  }

  var currentTime = new Date();
  var student = req.body;
  student.photo = (req.body.photo ? (
    req.body.photo.indexOf('s3.ap-south-1.amazonaws.com') == -1 ?
      ('https://s3.ap-south-1.amazonaws.com/olwapp/' + req.body.student_id) : req.body.photo)
    : '');
  var id = req.body._id;

  if (!student.admin_edit) {
    if (student.status == "confirmed") student.confirmation_date = currentTime;
    else if (student.status == "indented") student.indentation_date = currentTime;
    student.is_Delivered = false;
  }

  delete student._id;
  delete student.student_id;
  delete student.__v;

  Student.findOneAndUpdate({ _id: id }, student, { upsert: true, new: true }, function (err, student) {
    if (err) {
      console.log("Error in updating Student: " + err);
      return res.send(err);
    }
    console.log("Successfully updated Student");
    if (student.status == "confirmed" && student.admin_edit == false) {
      sendAdminMail(student, "confirmed");
      sendAdminSms(student, "confirmed");
      sendParentMail(student, "confirmed");
      sendParentSms(student, "confirmed");
    }

    res.json(student);
  });
}

sendAdminMail = function (student, action) {
  console.log("Sending mail to admin");
  var stringTemplate = "";
  var subjectTemplate = "";

  if (action == "enquiry") {
    subjectTemplate = 'Enquiry received at ' + student.center;
    stringTemplate = fs.readFileSync(path.join(__dirname, '../helpers') + '/admin_enquiry.html', "utf8");
    stringTemplate = stringTemplate.replace('{{parent_name}}', student.parent_name);
    stringTemplate = stringTemplate.replace('{{student_name}}', student.name);
    stringTemplate = stringTemplate.replace('{{phone_no}}', student.phone_number);
    stringTemplate = stringTemplate.replace('{{student_dob}}', moment(student.dob).format("DD-MMM-YYYY"));
    stringTemplate = stringTemplate.replace('{{student_class}}', student.class_group + " - " + student.study_year);
    stringTemplate = stringTemplate.replace('{{locality}}', student.locality);
    stringTemplate = stringTemplate.replace('{{email}}', student.email_id);
    stringTemplate = stringTemplate.replace('{{center_code}}', student.center);
    stringTemplate = stringTemplate.replace('{{counsellor}}', student.counsellor);
    stringTemplate = stringTemplate.replace('{{gender}}', student.gender);
    stringTemplate = stringTemplate.replace('{{student_id}}', student.student_id);
  }
  else if (action == "confirmed") {
    subjectTemplate = 'Student Confirmed at ' + student.center;
    stringTemplate = fs.readFileSync(path.join(__dirname, '../helpers') + '/admin_confirmation.html', "utf8");
    stringTemplate = stringTemplate.replace('{{parent_name}}', student.parent_name);
    stringTemplate = stringTemplate.replace('{{student_name}}', student.name);
    stringTemplate = stringTemplate.replace('{{phone_no}}', student.phone_number);
    stringTemplate = stringTemplate.replace('{{student_dob}}', moment(student.dob).format("DD-MMM-YYYY"));
    stringTemplate = stringTemplate.replace('{{student_class}}', student.class_group + " - " + student.study_year);
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

  sgMail.send(mailOptions, function (err) {
    if (err) console.log(err.response.body);
  });
}

sendParentMail = function (student, action) {
  console.log("Sending mail to Parent");
  var stringTemplate = "";
  var subjectTemplate = "";

  if (action == "enquiry") {
    subjectTemplate = 'Enquiry received at ' + student.center;
    stringTemplate = fs.readFileSync(path.join(__dirname, '../helpers') + '/parent_enquiry.html', "utf8");
  }
  else if (action == "confirmed") {
    subjectTemplate = 'Student Confirmed at ' + student.center;
    stringTemplate = fs.readFileSync(path.join(__dirname, '../helpers') + '/parent_confirmation.html', "utf8");
  }

  var mailOptions = {
    to: student.email_id,
    from: 'info@little-wonders.in',
    subject: 'Enquiry successfully received at Our Little Wonders',
    html: stringTemplate
  };

  sgMail.send(mailOptions, function (err) {
    if (err) console.log(err);
  });
}

sendAdminSms = function (student, action) {
  console.log("Sending SMS to admin");

  var messageData = "";
  if (action == "enquiry") {
    messageData = "ENQUIRY AT " + student.center +
      ", Name: " + student.name +
      ", Email: " + student.email_id +
      ", Phone: " + student.phone_number +
      ", Gender: " + student.gender +
      ", Class: " + student.class_group +
      ", DOB: " + moment(student.dob).format("DD-MMM-YYYY") +
      ", Year: " + student.study_year +
      ", Parent: " + student.parent_name;
  } else if (action == "confirmed") {
    messageData = "CONFIRMATION AT " + student.center +
      ", Name: " + student.name +
      ", Phone: " + student.phone_number +
      ", Gender: " + student.gender +
      ", Class: " + student.class_group +
      ", Type: " + student.class_type +
      ", Shoe: " + student.shoe_size +
      ", Year: " + student.study_year +
      ", Uniform: " + student.uniform_size;
  }

  for (var i = 0; i < adminNumber.length; i++) {
    var formData = smsUrl + "&method=sms&message=" + encodeURIComponent(messageData) + "&to=" + adminNumber[i] + "&sender=" + senderID;
    curl.request(formData,
      function optionalCallback(err, body) {
        if (err) {
          return console.error('Sending SMS to admin failed: ', err);
        }
        console.log('Successfully sent SMS to admin');
      });
  }

  var query = { center_code: student.center };
  Center.findOne(query).exec(function (err, center) {
    if (err) { res.send(err); }
    var formData = smsUrl + "&method=sms&message=" + encodeURIComponent(messageData) + "&to=" + center.phoneno + "&sender=" + senderID;
    curl.request(formData,
      function optionalCallback(err, body) {
        if (err) {
          return console.error('Sending SMS to center failed: ', err);
        }
        console.log('Successfully sent SMS to center');
      });
  });
}

sendParentSms = function (student, action) {
  console.log("Sending SMS to parent");

  var messageData = "";
  if (action == "enquiry") {
    messageData = "Thank you for enquiring about our Preschool. " +
      "We offer child friendly curriculum with bright, creative and safe environment for your child. " +
      "It%27s a preschool like home, near home for your little ones. " +
      "For more details you can log on to www.little-wonders.in";
  } else if (action == "confirmed") {
    messageData = "Welcome to Our Little Wonderz, We will assure you the best. For more details kindly check your mail."
  }

  var formData = smsUrl + "&method=sms&message=" + encodeURIComponent(messageData) + "&to=" + student.phone_number + "&sender=" + senderID;

  curl.request(formData, function optionalCallback(err, body) {
    if (err) {
      return console.error('Sending SMS to parent failed: ', err);
    }
    console.log('Successfully sent SMS to parent');
  });
}

exports.sendIndentationReport = function (req, res, next) {
  var query = { email: req.body.email_id };
  console.log("Sending Indentation Report");
  Indentation.find(function (err, students) {
    if (err) { res.send(err); }
    var stud = [];
    var fields = ['total_amount', 'payment_mode', 'payment_date', 'bank_name', 'email',
      'center_code', 'status', 'num', 'amount', 'shoe_size', 'uniform_size', 'class_type', 'class_group',
      'gender', 'phone_number', 'student_name', 'student_id', 'remarks', 'is_IndentConfirmed'];
    for (var i = 0; i < students.length; i++) {
      for (var j = 0; j < students[i].students_amount.length; j++) {
        stud[stud.length] = {
          total_amount: students[i].total_amount,
          payment_mode: students[i].payment_mode,
          payment_date: moment(students[i].payment_date).add(1, 'd').format('DD-MMM-YYYY'),
          bank_name: students[i].bank_name,
          email: students[i].email,
          center_code: students[i].center_code,
          status: students[i].status,
          num: students[i].num,
          amount: students[i].students_amount[j].amount,
          shoe_size: students[i].students_amount[j].shoe_size,
          uniform_size: students[i].students_amount[j].uniform_size,
          class_type: students[i].students_amount[j].class_type,
          class_group: students[i].students_amount[j].class_group,
          gender: students[i].students_amount[j].gender,
          phone_number: students[i].students_amount[j].phone_number,
          student_name: students[i].students_amount[j].student_name,
          student_id: students[i].students_amount[j].student_id,
          remarks: students[i].students_amount[j].remarks,
          is_IndentConfirmed: students[i].is_IndentConfirmed,
        }
      }
    }
    var csv = json2csv({ data: stud, fields: fields });
    var mailOptions = {
      to: req.body.email_id,
      from: 'info@little-wonders.in',
      subject: "Indentation Reports",
      html: "Attached is the indentation report.",
      attachments: [{
        filename: 'indentation_report.csv',
        content: base64.encode(csv)
      }]
    };
    sgMail.send(mailOptions, function (err) {
      if (err) console.log(err.response.body);
    });

    res.setHeader('Content-disposition', 'attachment; filename=data.csv');
    res.set('Content-Type', 'text/csv');
    res.status(200).send(csv);
  });
}

exports.sendReportsMail = function (req, res, next) {
  console.log('Sending report mail to ' + req.body.email_id);
  var query = { email: req.body.email_id };
  User.findOne(query).exec(function (err, user) {
    if (err) { res.send(err); }
    Student.find(function (err, students) {
      Indentation.find(function (err, indentation) {
        students = _.filter(students, function (o) {
          return (o.is_Active && !o.deleted);
        });
        if (err) { res.send(err); }
        if (user.role == 'centeradmin' || user.role == 'counsellor') {
          students = _.filter(students, function (o) {
            return (o.center == user.center);
          });
        }
        var stud = [];
        var fields = ['student_id', 'name', 'email_id', 'phone_number', 'gender',
          'dob', 'parent_name', 'alternate_contact', 'locality', 'status', 'center', 'counsellor',
          'class_group', 'enquiry_date', 'is_Indented', 'is_confirmed', 'class_type', 'uniform_size',
          'shoe_size', 'confirmation_date', 'indentation_date', 'is_Delivered', 'study_year', 'delivery_date', 
          'indentation_number', 'is_IndentConfirmed', 'idCardRequested', 'idCardPrinted'];
        for (var i = 0; i < students.length; i++) {

          var ind_num = "";
          for (var d = 0; d < indentation.length; d++) {
            for (var k = 0; k < indentation[d].students_amount.length; k++) {
              if (indentation[d].students_amount[k].student_id === students[i].student_id)
                ind_num = indentation[d];
            }
          }

          stud[i] = {
            student_id: students[i].student_id,
            name: students[i].name,
            email_id: students[i].email_id,
            phone_number: students[i].phone_number,
            gender: students[i].gender,
            dob: moment(students[i].dob).add(1, 'd').format('DD-MMM-YYYY'),
            parent_name: students[i].parent_name,
            alternate_contact: students[i].alternate_contact,
            locality: students[i].locality,
            status: students[i].status,
            center: students[i].center,
            counsellor: students[i].counsellor,
            class_group: students[i].class_group,
            enquiry_date: moment(students[i].enquiry_date).add(1, 'd').format('DD-MMM-YYYY'),
            is_Indented: (students[i].is_Indented) ? "Indented" : "Not Indented",
            is_confirmed: (students[i].is_Confirmed) ? "Confirmed" : "Not Confirmed",
            class_type: students[i].class_type,
            uniform_size: students[i].uniform_size,
            shoe_size: students[i].shoe_size,
            confirmation_date: moment(students[i].confirmation_date).add(1, 'd').format('DD-MMM-YYYY'),
            indentation_date: moment(students[i].indentation_date).add(1, 'd').format('DD-MMM-YYYY'),
            is_Delivered: (ind_num.status != 'open') ? "Delivered" : "Not Delivered",
            study_year: students[i].study_year,
            delivery_date: moment(students[i].delivery_date).add(1, 'd').format('DD-MMM-YYYY'),
            indentation_number: ind_num.num,
            is_IndentConfirmed: students[i].is_IndentConfirmed,
            idCardRequested: students[i].idCardRequested,
            idCardPrinted: students[i].idCardPrinted
          }
        }
        var csv = json2csv({ data: stud, fields: fields });
        var mailOptions = {
          to: user.email,
          from: 'info@little-wonders.in',
          subject: "Reports",
          html: "Attached is the report.",
          attachments: [{
            filename: 'report.csv',
            content: base64.encode(csv)
          }]
        };

        sgMail.send(mailOptions, function (err) {
          if (err) console.log(err.response.body);
        });

        res.setHeader('Content-disposition', 'attachment; filename=data.csv');
        res.set('Content-Type', 'text/csv');
        res.status(200).send(csv);
      });
    });
  });
}

exports.editStudent = function (req, res, next) {
  console.log("Student details editing for: " + req.body.name);

  console.log(req.body);
  if (req.body.photo && req.body.photo.indexOf('s3.ap-south-1.amazonaws.com') == -1) {
    uploadToS3(req.body.student_id, req.body.photo);
  }

  var currentTime = new Date();
  var student = req.body;
  student.photo = (req.body.photo ? (
    req.body.photo.indexOf('s3.ap-south-1.amazonaws.com') == -1 ?
      ('https://s3.ap-south-1.amazonaws.com/olwapp/' + req.body.student_id) : req.body.photo)
    : '');
  var id = req.body._id;

  delete student._id;
  delete student.student_id;
  delete student.__v;

  Student.findOneAndUpdate({ _id: id }, student, { upsert: true, new: true }, function (err, student) {
    if (err) {
      console.log("Error in updating Student: " + err);
      return res.send(err);
    }
    console.log("Successfully updated Student");
    res.json(student);
  });
}
