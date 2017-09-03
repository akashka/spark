var jwt = require('jsonwebtoken');  
var User = require('../models/user');
var authConfig = require('../../config/auth');
var speakeasy = require('speakeasy');
var nodemailer = require('nodemailer');
var fs = require('fs');
var path = require("path");
var bcrypt = require('bcrypt');

function generateToken(user){
    return jwt.sign(user, authConfig.secret, {
        expiresIn: 10080
    });
}

exports.getUsers = function(req, res, next) {
    User.find(function(err, users) {
        if (err) { res.send(err); }
        res.json(users);
    });
}
 
function setUserInfo(request){
    return {
        _id: request._id,
        email: request.email,
        role: request.role,
        center: request.center,
        name: request.name,
        active: request.active
    };
}
 
exports.login = function(req, res, next){
    console.log(req);
    var userInfo = setUserInfo(req.user);
    res.status(200).json({
        token: 'JWT ' + generateToken(userInfo),
        user: userInfo
    });
}

exports.forgotPassword = function(req, res, next){
    var email = req.body.email;
    if(!email){
        return res.status(422).send({error: 'You must enter an email address'});
    }
    User.findOne({email: email}, function(err, existingUser){
        if(err){
            return next(err);
        }
        if(existingUser){
            var secret = speakeasy.generateSecret({length: 20});
            var token = speakeasy.totp({
              secret: secret.base32,
              encoding: 'base32'
            });
                console.log(token);

            bcrypt.hash(token, 10, function(err, hash) {
                existingUser.password = hash;
                console.log(existingUser.password);

                User.findOneAndUpdate(existingUser._id, existingUser, {new: true}, function(err, user){
                    if(err){
                        return next(err);
                    }
                    sendMail(existingUser);
                });
            });

        }
    });
}
 
exports.register = function(req, res, next){
    var email = req.body.email;
    var password = req.body.password;
    var role = req.body.role;
    var center = req.body.center;
    var name = req.body.name;
    var active = req.body.active;

    if(!email){
        return res.status(422).send({error: 'You must enter an email address'});
    }
    if(!password){
        return res.status(422).send({error: 'You must enter a password'});
    }
    User.findOne({email: email}, function(err, existingUser){
        if(err){
            return next(err);
        }
        if(existingUser){
            return res.status(422).send({error: 'That email address is already in use'});
        }
        var user = new User({
            email: email,
            password: password,
            role: role,
            center: center,
            name: name,
            active: active
        });
        user.save(function(err, user){
            if(err){
                return next(err);
            }
            var userInfo = setUserInfo(user);
            res.status(201).json({
                token: 'JWT ' + generateToken(userInfo),
                user: userInfo
            })
        });
    });
}

exports.update = function(req, res, next){
    var email = req.body.email;
    var password = req.body.password;
    var role = req.body.role;
    var center = req.body.center;
    var name = req.body.name;
    var active = req.body.active;

    if(!email){
        return res.status(422).send({error: 'You must enter an email address'});
    }
    if(!password){
        return res.status(422).send({error: 'You must enter a password'});
    }
    User.findOne({email: email}, function(err, existingUser){
        if(err){
            return next(err);
        }
        if(existingUser){
            existingUser.email = email;
            existingUser.password = password;
            existingUser.role = role;
            existingUser.center = center;
            existingUser.name = name;
            existingUser.active = active;
        }
        user.findOneAndUpdate(existingUser._id, existingUser, {new: true}, function(err, user){
            if(err){
                return next(err);
            }
            var userInfo = setUserInfo(user);
            res.status(201).json({
                token: 'JWT ' + generateToken(userInfo),
                user: userInfo
            })
        });
    });
}
 
exports.roleAuthorization = function(roles){
 
    return function(req, res, next){
 
        var user = req.user;
 
        User.findById(user._id, function(err, foundUser){
 
            if(err){
                res.status(422).json({error: 'No user found.'});
                return next(err);
            }
 
            if(roles.indexOf(foundUser.role) > -1){
                return next();
            }
 
            res.status(401).json({error: 'You are not authorized to view this content'});
            return next('Unauthorized');
 
        });
 
    }
 
}

sendMail = function(user) {
  let smtpTransport = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 587,
    service: 'Sendgrid',
    auth: {
      user: 'axisrooms',
      pass: 'admin1!'
    }
  });

  console.log(user);

  var stringTemplate = "Hi" + user.name + 
    "<br/> <br/> You requested for new password. Your new password is: <br/> <br/>"
    + user.password + "<br/> <br/> You can change your password after logging in from update profile section."
    + "<br/> <br/> If you facing any issues logging in, please contact Head Office.";

  var mailOptions = {
    to: user.email,
    from: 'info@little-wonders.in',
    subject: 'Password reset - Our Little Wonderz',
    html: stringTemplate,
  };

  smtpTransport.sendMail(mailOptions, function(err) {
    if(err) console.log(err);
  });
}