var express = require('express');
const { TeacherController } = require('../controller/teacherCont');
var router = express.Router();

router.post('/signup', TeacherController.Signup)
router.post('/login', TeacherController.Login)
router.post('/addExam', TeacherController.addExam)
router.post('/getExams', TeacherController.getExams)

module.exports = router;