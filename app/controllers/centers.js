var Center = require('../models/center');
 
exports.getCenters = function(req, res, next) {
    Center.find(function(err, centers) {
        if (err) { res.send(err); }
        res.json(centers);
    });
}
 
exports.createCenter = function(req, res, next) {
    var center = req.body;
    Center.create(center, function(err, center) {
        if (err) { res.send(err); }
        Center.find(function(err, centers) {
            if (err){ res.send(err); }
            res.json(centers);
        });
    });
}
 
exports.updateCenter = function(req, res, next) {
    var center = req.body;
    delete center._id;

    Center.findOneAndUpdate(req.body._id, center, {upsert: true, new: true}, function(err, center) {
        if (err) return res.send(err);
        res.json(center);
    });
 
}