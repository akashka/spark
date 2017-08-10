var AuthenticationController = require('./controllers/authentication'),  
    StudentController = require('./controllers/students'),  
    express = require('express'),
    passportService = require('../config/passport'),
    passport = require('passport');
 
var requireAuth = passport.authenticate('jwt', {session: false}),
    requireLogin = passport.authenticate('local', {session: false});
 
module.exports = function(app){
 
    var apiRoutes = express.Router(),
        authRoutes = express.Router(),
        studentRoutes = express.Router();
 
    // Auth Routes
    apiRoutes.use('/auth', authRoutes);
    authRoutes.post('/register', AuthenticationController.register);
    authRoutes.post('/login', requireLogin, AuthenticationController.login);
 
    authRoutes.get('/protected', requireAuth, function(req, res){
        res.send({ content: 'Success'});
    });
 
    // Student Routes
    apiRoutes.use('/students', studentRoutes); 
    studentRoutes.get('/', requireAuth, AuthenticationController.roleAuthorization(['admin','centeradmin','counsellor']), StudentController.getStudents);
    studentRoutes.post('/', requireAuth, AuthenticationController.roleAuthorization(['admin','centeradmin','counsellor']), StudentController.createStudent);
    studentRoutes.put('/:student_id', requireAuth, AuthenticationController.roleAuthorization(['admin','centeradmin','counsellor']), StudentController.updateStudent);
 
    // Set up routes
    app.use('/api', apiRoutes);
 
}