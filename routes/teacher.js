var express = require('express');
const { TeacherController } = require('../controller/teacherCont');
var router = express.Router();


router.post('/signup', UserController.Signup)

router.post('/login', UserController.Login)




module.exports = router;