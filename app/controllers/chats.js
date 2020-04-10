var Chat = require('../models/chat');
const BUCKET_NAME = 'olwapp';
const IAM_USER_KEY = 'AKIAJ5YI3ULII2UU4HWA';
const IAM_USER_SECRET1 = 'V717KGCwHmm';
const IAM_USER_SECRET2 = 'AZ2FzCAaMV3DAJ';
const IAM_USER_SECRET3 = 'OSskeDj1nw9XI5h';


exports.getChatListing = function(req, res, next) {
    Chat.find({}, { 
        _id : 1, 
        group_id : 1, 
        dp : 1, 
        name : 1, 
        members : 1, 
        silent_members: 1,
        admin: 1,
        last_login : 1, 
        active : 1
    }, function(err, chats) {
        if (err) { res.send(err); }
        res.json(chats);
    });
}

exports.getChatMessages = function(req, res, next) {
    var userId = req.params.userId;
    var chatId = req.params.chatId;
    Chat.findOne({_id: chatId}, {messages: 1}, function(err, chats) {
        if (err) { res.send(err); }chatId + '/' + userId
        res.json(chats);
    });

    Chat.findOne({_id: chatId}, {_id : 1, last_login : 1}, function(err, chats) {
        if (!err) {
            chats.last_login[userId] = new Date();
            Chat.findOneAndUpdate( {_id: chats._id}, {$set: {last_login: chats.last_login}}, function(err, chat) {
            });
        }
    });
}
 
exports.updateChatMessage = function(req, res, next) {
    var id = req.params.id;
    var message = req.body;
    Chat.findOneAndUpdate( {_id: id}, {$set: {messages: message}}, function(err, chat) {
        if (err) return res.send(err);
        res.json(chat);
    });
}

exports.updateChat = function(req, res, next) {
    var id = req.params.id;
    Chat.findOneAndUpdate( {_id: id}, {$set: {
        group_id : req.body.group_id,
        dp : req.body.dp,
        name : req.body.name,
        members : req.body.members,
        silent_members : req.body.silent_members,
        admin: req.body.admin,
        last_login : req.body.last_login,
        active : req.body.active
    }}, function(err, chat) {
        if (err) return res.send(err);
        res.json(chat);
    });
}

exports.uploadToS3 = function(req, res, next) {
  var buf = new Buffer(req.body.file.replace(/^data:image\/\w+;base64,/, ""), 'base64')
  let s3bucket = new AWS.S3({
    accessKeyId: IAM_USER_KEY,
    secretAccessKey: IAM_USER_SECRET1 + IAM_USER_SECRET2 + IAM_USER_SECRET3,
    Bucket: BUCKET_NAME
  });
  s3bucket.createBucket(function () {
    var params = {
      Bucket: BUCKET_NAME,
      Key: req.body.file_name,
      Body: buf,
      ACL: 'public-read',
      ContentEncoding: req.body.contentEncoding,
      ContentType: req.body.contentType
    };
    s3bucket.upload(params, function (err, data) {
      if (err) {
        res.send(err);
      }
      res.json(data);
    });
  });
}