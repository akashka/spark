var Classroom = require('../models/classroom');
 
exports.getClassroom = function(req, res, next) {
    Classroom.find(function(err, classrooms) {
        if (err) { res.send(err); }
        res.json(classrooms);
    });
}
 
exports.createClassroom = function(req, res, next) {
    var classroom = req.body;
    Classroom.create(classroom, function(err, classroom) {
        if (err) { res.send(err); }
        Classroom.find(function(err, classrooms) {
            if (err){ res.send(err); }
            res.json(classrooms);
        });
    });
}
 
exports.updateClassroom = function(req, res, next) {
    var id = req.body._id;
    var classroom = req.body;
    delete classroom._id;

    Classroom.findOneAndUpdate( {_id: id}, classroom, {upsert: true, new: true}, function(err, classroom) {
        if (err) return res.send(err);
        res.json(classroom);
    });
}