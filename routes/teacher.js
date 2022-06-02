var express = require('express');
const { TeacherController } = require('../controller/teacherCont');
var router = express.Router();

router.post('/signup', TeacherController.Signup)
router.post('/login', TeacherController.Login)

module.exports = router;