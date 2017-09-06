var Indentation = require('../models/indentation');
 
exports.getIndentations = function(req, res, next) {
    Indentation.find(function(err, indentations) {
        if (err) { res.send(err); }
        res.json(indentations);
    });
}
 
exports.createIndentation = function(req, res, next) {
    var indentation = req.body;
    Indentation.create(indentation, function(err, indentation) {
        if (err) { res.send(err); }
        Indentation.find(function(err, indentations) {
            if (err){ res.send(err); }
            res.json(indentations);
        });
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