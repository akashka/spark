var Student = require('../models/student');
 
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
    var student = {
        student_id: (req.body.name.substring(0, 3) + req.body.phone_number.substring(0, 3) + currentTime.getMinutes()), 
        name : req.body.name,
        dob : moment(req.body.dob, 'DD/MM/YYYY').toDate(),
        gender : req.body.gender,
        email_id: req.body.email_id,
        phone_number: req.body.phone_number,
        status: "enquiry",
        enquiry_details: {
            enquiry_date: currentTime,
            enquiry_center: req.body.center,
            enquiry_counsellor: req.body.counsellor
        }
    };
 
    Student.create(student, function(err, student) {
 
        if (err){
            res.send(err);
        }
 
        Student.find(function(err, students) {
 
            if (err){
                res.send(err);
            }
 
            res.json(students);
 
        });
 
    });
 
}
 
exports.updateStudent = function(req, res, next){
    var currentTime = new Date();
    var student = {
        status : "confirmed",
        confirm_details: {
            confirm_date: currentTime,
            confirm_center: req.body.center,
            confirm_counsellor: req.body.counsellor
        }
    }

    Student.findOneAndUpdate(req.body.student_id, student, {new: true}, function(err, student) {
        if (err) return res.send(err);
        res.json(student);
    });
 
}