var jwt = require("jsonwebtoken");
var User = require("../models/user");
var authConfig = require("../../config/auth");
var speakeasy = require("speakeasy");
var nodemailer = require("nodemailer");
var fs = require("fs");
var path = require("path");
var bcrypt = require("bcrypt");
var sgMail = require("@sendgrid/mail");

var apiKey = "SG";
apiKey += ".Jy";
apiKey += "-SHrC";
apiKey += "-TOmdhaQO";
apiKey += "_WEApA";
apiKey += ".LybA2o2680TaJN3qyr";
apiKey += "_b8XPISnq";
apiKey += "_R0fjXb1pq9tLYM4";
sgMail.setApiKey(apiKey);

function generateToken(user) {
  console.log("Generating Token for user " + user.email);
  return jwt.sign(user, authConfig.secret, {
    expiresIn: 1008000000
  });
}

exports.getUsers = function(req, res, next) {
  console.log("Getting list of all user ");
  User.find(function(err, users) {
    if (err) {
      res.send(err);
    }
    res.json(users);
  });
};

function setUserInfo(request) {
  console.log("Setting User Info for " + request.email);
  return {
    active: request.active,
    email: request.email,
    role: request.role,
    center: request.center,
    name: request.name,
    _id: request._id,
    phone_no: request.phone_no,
    whatsapp_no: request.whatsapp_no,
    dob: request.dob,
    gender: request.gender,
    photo: request.photo,
    address: request.address,
    class_group: request.class_group
  };
}

exports.login = function(req, res, next) {
  console.log("Logging in for user " + req.user.email);
  var userInfo = setUserInfo(req.user);
  res.status(200).json({
    token: "JWT " + generateToken(userInfo),
    user: userInfo
  });
};

exports.forgotPassword = function(req, res, next) {
  var email = req.body.email;
  if (!email) {
    return res.status(422).send({ error: "You must enter an email address" });
  }
  User.findOne({ email: email }, function(err, existingUser) {
    if (err) {
      return next(err);
    }
    if (existingUser) {
      var secret = speakeasy.generateSecret({ length: 20 });
      var token = speakeasy.totp({
        secret: secret.base32,
        encoding: "base32"
      });
      console.log(token);

      bcrypt.hash(token, 10, function(err, hash) {
        existingUser.password = hash;
        console.log(existingUser.password);
        var id = existingUser._id;
        delete existingUser._id;

        console.log(id);
        console.log(existingUser);

        User.findOneAndUpdate(
          { _id: id },
          existingUser,
          { upsert: true, new: true },
          function(err, user) {
            if (err) {
              console.log(err);
              return next(err);
            }
            console.log(user);
            sendMail(user, token);
            var userInfo = setUserInfo(user);
            res.status(201).json({
              token: "JWT " + generateToken(userInfo),
              user: userInfo
            });
          }
        );
      });
    }
  });
};

exports.register = function(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  var role = req.body.role;
  var center = req.body.center;
  var name = req.body.name;
  var active = req.body.active;
  var phone_no = req.body.phone_no;
  var whatsapp_no = req.body.whatsapp_no;
  var dob = req.body.dob;
  var gender = req.body.gender;
  var photo = req.body.photo;
  var address = req.body.address;
  var class_group = req.body.class_group;

  if (!email) {
    return res.status(422).send({ error: "You must enter an email address" });
  }
  if (!password) {
    return res.status(422).send({ error: "You must enter a password" });
  }
  User.findOne({ email: email }, function(err, existingUser) {
    if (err) {
      return next(err);
    }
    if (existingUser) {
      return res
        .status(422)
        .send({ error: "That email address is already in use" });
    }
    var user = new User({
      email: email,
      password: password,
      role: role,
      center: center,
      name: name,
      active: active,
      phone_no: phone_no,
      whatsapp_no: whatsapp_no,
      dob: dob,
      gender: gender,
      photo: photo,
      address: address,
      class_group: class_group
    });
    user.save(function(err, user) {
      if (err) {
        return next(err);
      }
      var userInfo = setUserInfo(user);
      res.status(201).json({
        token: "JWT " + generateToken(userInfo),
        user: userInfo
      });
    });
  });
};

exports.update = function(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  var role = req.body.role;
  var center = req.body.center;
  var name = req.body.name;
  var active = req.body.active;
  var phone_no = req.body.phone_no;
  var whatsapp_no = req.body.whatsapp_no;
  var dob = req.body.dob;
  var gender = req.body.gender;
  var photo = req.body.photo;
  var address = req.body.address;
  var class_group = req.body.class_group;

  if (!email) {
    return res.status(422).send({ error: "You must enter an email address" });
  }
  User.findOne({ email: email }, function(err, existingUser) {
    if (err) {
      return next(err);
    }

    var id = existingUser._id;
    delete existingUser._id;
    delete existingUser.__v;

    console.log(password);

    if (existingUser.password != password && password != "") {
      bcrypt.hash(password, 10, function(err, hash) {
        existingUser.email = email;
        if (req.body.password != "") existingUser.password = hash;
        existingUser.role = role;
        existingUser.center = center;
        existingUser.name = name;
        existingUser.active = active;
        existingUser.phone_no = phone_no;
        existingUser.whatsapp_no = whatsapp_no;
        existingUser.dob = dob;
        existingUser.gender = gender;
        existingUser.photo = photo;
        existingUser.address = address;
        existingUser.class_group = class_group;

        delete existingUser.__v;
        delete existingUser._id;

        var eUser = {
          updatedAt: existingUser.updatedAt,
          createdAt: existingUser.createdAt,
          email: existingUser.email,
          password: existingUser.password,
          center: existingUser.center,
          name: existingUser.name,
          active: existingUser.active,
          role: existingUser.role,
          phone_no: existingUser.phone_no,
          whatsapp_no: existingUser.whatsapp_no,
          dob: existingUser.dob,
          gender: existingUser.gender,
          photo: existingUser.photo,
          address: existingUser.address,
          class_group: existingUser.class_group
        };

        console.log(eUser);

        User.findOneAndUpdate(
          { _id: id },
          eUser,
          { upsert: true, new: true },
          function(err, user) {
            if (err) {
              return next(err);
            }
            var userInfo = setUserInfo(user);
            res.status(201).json({
              token: "JWT " + generateToken(userInfo),
              user: userInfo
            });
          }
        );
      });
    } else {
      existingUser.email = email;
      existingUser.role = role;
      existingUser.center = center;
      existingUser.name = name;
      existingUser.active = active;
      existingUser.phone_no = phone_no;
      existingUser.whatsapp_no = whatsapp_no;
      existingUser.dob = dob;
      existingUser.gender = gender;
      existingUser.photo = photo;
      existingUser.address = address;
      existingUser.class_group = class_group;

      delete existingUser.__v;
      delete existingUser._id;

      var eUser = {
        updatedAt: existingUser.updatedAt,
        createdAt: existingUser.createdAt,
        email: existingUser.email,
        password: existingUser.password,
        center: existingUser.center,
        name: existingUser.name,
        active: existingUser.active,
        role: existingUser.role,
        phone_no: existingUser.phone_no,
        whatsapp_no: existingUser.whatsapp_no,
        dob: existingUser.dob,
        gender: existingUser.gender,
        photo: existingUser.photo,
        address: existingUser.address,
        class_group: existingUser.class_group
      };

      console.log(eUser);

      User.findOneAndUpdate(
        { _id: id },
        eUser,
        { upsert: true, new: true },
        function(err, user) {
          if (err) {
            return next(err);
          }
          var userInfo = setUserInfo(user);
          res.status(201).json({
            token: "JWT " + generateToken(userInfo),
            user: userInfo
          });
        }
      );
    }
  });
};

exports.delete = function(req, res, next) {
  var email = req.body.email;

  if (!email) {
    return res.status(422).send({ error: "You must enter an email address" });
  }

  User.findOne({ email: email }, function(err, existingUser) {
    if (err) {
      return next(err);
    }

    User.deleteOne({ email: email }, function(err, userInfo) {
      if (err) throw err;
      console.log("1 document deleted");
      res.status(201).json({
        token: "JWT " + generateToken(userInfo),
        user: userInfo
      });
    });
  });
};

exports.roleAuthorization = function(roles) {
  return function(req, res, next) {
    var user = req.user;

    User.findById(user._id, function(err, foundUser) {
      if (err) {
        res.status(422).json({ error: "No user found." });
        return next(err);
      }

      if (roles.indexOf(foundUser.role) > -1) {
        return next();
      }

      res
        .status(401)
        .json({ error: "You are not authorized to view this content" });
      return next("Unauthorized");
    });
  };
};

sendMail = function(user, token) {
  console.log("Sending mail on reset password to " + user.name);
  var stringTemplate =
    "Dear " +
    user.name +
    "<br/> You requested for new password. Your new password is: <br/> <strong>" +
    token +
    "</strong> <br/> You can change your password after logging in from update profile section." +
    "<br/> If you have any issues logging in, please contact Head Office.";

  var mailOptions = {
    to: user.email,
    from: "info@little-wonders.in",
    subject: "Password reset - Our Little Wonders",
    html: stringTemplate
  };

  sgMail.send(mailOptions, function(err) {
    if (err) console.log(err.response.body);
  });
};

exports.changePassword = function(req, res, next) {
  var email = req.body.email;
  var oldPassword = req.body.oldPassword;
  var newPassword = req.body.newPassword;
  var confirmPassword = req.body.confirmPassword;
  if (!email) {
    return res.status(422).send({ error: "You must enter an email address" });
  }
  if (!oldPassword) {
    return res.status(422).send({ error: "You must enter valid old password" });
  }
  if (!newPassword) {
    return res.status(422).send({ error: "You must enter valid New password" });
  }
  if (newdPassword != confirmPassword) {
    return res
      .status(422)
      .send({ error: "New Password and Confirm Password must match" });
  }

  User.findOne({ email: email }, function(err, existingUser) {
    if (err) {
      return next(err);
    }
    if (existingUser) {
      bcrypt.hash(oldPassword, 10, function(err, hash) {
        
        if (err) {
          return res
            .status(422)
            .send({ error: "You must enter valid Old password" });
        }
        existingUser._id
        if (hash != existingUser.password) {
          return res
            .status(422)
            .send({ error: "You must enter valid Old password" });
        }

        bcrypt.hash(newPassword, 10, function(err, newhash) {
          existingUser.password = newhash;

          var id = existingUser._id;
          delete existingUser.__v;
          delete existingUser._id;

          var eUser = {
            updatedAt: existingUser.updatedAt,
            createdAt: existingUser.createdAt,
            email: existingUser.email,
            password: newhash,
            center: existingUser.center,
            name: existingUser.name,
            active: existingUser.active,
            role: existingUser.role,
            phone_no: existingUser.phone_no,
            whatsapp_no: existingUser.whatsapp_no,
            dob: existingUser.dob,
            gender: existingUser.gender,
            photo: existingUser.photo,
            address: existingUser.address,
            class_group: existingUser.class_group
          };

          console.log(eUser);

          User.findOneAndUpdate(
            { _id: id },
            eUser,
            { upsert: true, new: true },
            function(err, user) {
              if (err) {
                return next(err);
              }
              var userInfo = setUserInfo(user);
              res.status(201).json({
                token: "JWT " + generateToken(userInfo),
                user: userInfo
              });
            }
          );
        });
      });
    }
  });
};

