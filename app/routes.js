var AuthenticationController = require('./controllers/authentication'),  
    StudentController = require('./controllers/students'),  
    CenterController = require('./controllers/centers'),  
    IndentationController = require('./controllers/indentations'),  
    MiscController = require('./controllers/misc'),
    ChatController = require('./controllers/chats'),
    express = require('express'),
    passportService = require('../config/passport'),
    passport = require('passport'),
    path = require('path'),
    fs = require('fs'),
    htmlToImage = require('html-to-image');

var requireAuth = passport.authenticate('jwt', {session: false}),
    requireLogin = passport.authenticate('local', {session: false});
 
module.exports = function(app){

    app.all('/*', function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin", "X-Requested-With", "Content-Type", "Accept");
      res.header("Access-Control-Allow-Methods", "GET, POST","PUT","DELETE","HEAD","OPTIONS");
      next();
    });
 
    var apiRoutes = express.Router(),
        authRoutes = express.Router(),
        studentRoutes = express.Router(),
        centerRoutes = express.Router();
        indentationRoutes = express.Router();
        miscRoutes = express.Router();
        chatRoutes = express.Router();

    // Auth Routes
    apiRoutes.use('/auth', authRoutes);
    authRoutes.post('/register', AuthenticationController.register);
    authRoutes.post('/update', AuthenticationController.update);
    authRoutes.post('/delete', AuthenticationController.delete);
    authRoutes.post('/login', requireLogin, AuthenticationController.login);
    authRoutes.post('/forgotPassword', AuthenticationController.forgotPassword);
    authRoutes.get('/', AuthenticationController.getUsers);
    authRoutes.get('/protected', requireAuth, function(req, res){
        res.send({ content: 'Success'});
    });
 
    // Student Routes
    apiRoutes.use('/students', studentRoutes); 
    studentRoutes.get('/', requireAuth, AuthenticationController.roleAuthorization(['admin','centeradmin','counsellor','dispatcher']), StudentController.getStudents);
    studentRoutes.get('/allStudents', requireAuth, AuthenticationController.roleAuthorization(['admin','centeradmin','counsellor','dispatcher']), StudentController.getAllStudents);
    studentRoutes.get('/inactiveStudents', requireAuth, AuthenticationController.roleAuthorization(['admin','centeradmin','counsellor','dispatcher']), StudentController.getInactiveStudents);
    studentRoutes.post('/', requireAuth, AuthenticationController.roleAuthorization(['admin','centeradmin','counsellor','dispatcher']), StudentController.createStudent);
    studentRoutes.put('/editStudent/:student_id', requireAuth, AuthenticationController.roleAuthorization(['admin','centeradmin','counsellor','dispatcher']), StudentController.editStudent);
    studentRoutes.put('/:student_id', requireAuth, AuthenticationController.roleAuthorization(['admin','centeradmin','counsellor','dispatcher']), StudentController.updateStudent);
    studentRoutes.put('/sendReportsMail/:email_id', requireAuth, AuthenticationController.roleAuthorization(['admin','centeradmin','counsellor','dispatcher']), StudentController.sendReportsMail);
    studentRoutes.put('/sendIndentationReport/:email_id', requireAuth, AuthenticationController.roleAuthorization(['admin','centeradmin','counsellor','dispatcher']), StudentController.sendIndentationReport);

     // Center Routes
    apiRoutes.use('/centers', centerRoutes); 
    centerRoutes.get('/', requireAuth, AuthenticationController.roleAuthorization(['admin','centeradmin','counsellor','dispatcher']), CenterController.getCenters);
    centerRoutes.post('/', requireAuth, AuthenticationController.roleAuthorization(['admin','centeradmin','counsellor','dispatcher']), CenterController.createCenter);
    centerRoutes.put('/:_id', requireAuth, AuthenticationController.roleAuthorization(['admin','centeradmin','counsellor','dispatcher']), CenterController.updateCenter);
 
    // Indentation Routes
    apiRoutes.use('/indentations', indentationRoutes); 
    indentationRoutes.put('/approve/:_id', requireAuth, AuthenticationController.roleAuthorization(['admin','centeradmin','counsellor','dispatcher']), IndentationController.approveIndentation);
    indentationRoutes.get('/', requireAuth, AuthenticationController.roleAuthorization(['admin','centeradmin','counsellor','dispatcher']), IndentationController.getIndentations);
    indentationRoutes.post('/', requireAuth, AuthenticationController.roleAuthorization(['admin','centeradmin','counsellor','dispatcher']), IndentationController.createIndentation);
    indentationRoutes.put('/:_id', requireAuth, AuthenticationController.roleAuthorization(['admin','centeradmin','counsellor','dispatcher']), IndentationController.updateIndentation);

    // Misc Routes
    apiRoutes.use('/misc', miscRoutes);
    miscRoutes.get('/idcard/:_id', function (req, res) {
        MiscController.printIdCard({
            student_id: req.params._id,
        }, {
            success: function (pdf) {
                var output = fs.createWriteStream('./id_card.pdf');
                pdf.stream.pipe(output);
                let filename = "id_card";
                filename = encodeURIComponent(filename) + '.pdf';
                var file = fs.readFileSync(path.join(__dirname, '..') + '/id_card.pdf');
                res.setHeader('Content-Type', 'application/pdf');
                res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"');
                pdf.stream.pipe(res);
            },
            error: function (err) {
                res.status(403).send(err);
            }
        });
    });

    // Chat Routes
    apiRoutes.use('/chats', chatRoutes); 
    chatRoutes.get('/list', requireAuth, AuthenticationController.roleAuthorization(['admin','centeradmin','counsellor','dispatcher','teacher','parent']), ChatController.getChatListing);
    chatRoutes.get('/messages/:chatId/:userId', requireAuth, AuthenticationController.roleAuthorization(['admin','centeradmin','counsellor','dispatcher','teacher','parent']), ChatController.getChatMessages);
    chatRoutes.put('/messages/:id', requireAuth, AuthenticationController.roleAuthorization(['admin','centeradmin','counsellor','dispatcher','teacher','parent']), ChatController.updateChatMessage);
    chatRoutes.put('/:id', requireAuth, AuthenticationController.roleAuthorization(['admin','centeradmin','counsellor','dispatcher','teacher','parent']), ChatController.updateChat);

    chatRoutes.post('/uploadToS3', requireAuth, AuthenticationController.roleAuthorization(['admin','centeradmin','counsellor','dispatcher','teacher','parent']), ChatController.uploadToS3);

    // Set up routes
    app.use('/api', apiRoutes);
 
}
