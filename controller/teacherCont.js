const bcrypt = require('bcryptjs/dist/bcrypt');
var Teacher = require('../models/teacher');
var Exam = require('../models/exam')
var jwt = require('jsonwebtoken');


const TeacherController = {
    Signup:async (req,res,next)=>{
        try{
            const salt = await  bcrypt.genSalt(10);
            const hashedPass = await bcrypt.hash(req.body.password, salt);
            const myTeacher = new User({name: req.body.name, email: req.body.email, password:hashedPass});
            await myTeacher.save();
            res.status(201).json(myComp);
        }
        catch(e){
            res.status(500).json(e);
            console.log(e);
        }
        
    },

    Login:async (req,res,next)=>{
        try{
            const {email, password} = req.body;
            const teacher = await Teacher.findOne({email});
            if(!teacher){
                res.status(500).json({message:"user not found"}); 
            }
            else{
                const validpassword = await bcrypt.compare(password,teacher.password);
                console.log(validpassword);
                if(validpassword){
                    var myToken = refreshToken({id:teacher._id});
                    res.cookie("myToken", myToken, {httpOnly:true, path:"/user/login" });
                    console.log(teacher);
                    console.log(myToken);
                    res.status(201).json({teacher,myToken});
                }
                else{ 
                    res.status(500).json({message:"Password incorrect"});  
                }
            }
        }
        catch(e){
            console.log(e.message);
        }
        
    },

    accessToken:async (req, res, next)=>{
        try{
            const reftoken = req.cookies.refreshtoken
            if(!reftoken) return res.json({message: "you are not logged in"})
            console.log(refToken);
            jwt.verify(reftoken, process.env(refreshTokenSecret) , (err, user) => {
            if(err) return res.json({message: "you are not logged in"})
            const accessToken = accessToken({id: user._id});
            res.json(accessToken)
            })
        }
        catch(e){
            return res.json({message: e.message})
        }
    },

    addExam: async(req,res,next)=>{
        try {
            const myExam = new Exam({
                title: req.body.title,
                teacher: req.body.teacher,
                questions: req.body.questions,
                starttime: req.body.starttime,
                endtime: req.body.endtime,
            });
            if (myExam) {
                await myExam.save();
                res.status(201).json(myExam);
            }
            else {
                res.status(500).json({ message: "couldn't create Exam" });
            }
        }
        catch (e) {
            res.status(500).json(e);
            console.log(e);
        }
    },

    getExams: async (req,res,next)=>{
        try{
            Exam.find({}).exec(function (error, results) {
                if (error) {
                    return next(error);
                }
                // Respond with valid data
                res.json(results);
            });
        }
        catch(e){
            res.status(500).json(e);
            console.log(e);
        }
    },

    submitExam: async (req,res,next)=>{
        try{

        }
        catch(e){
            res.status(500).json(e);
            console.log(e);
        }
    },
}

const accessToken = (payload) => {
    return jwt.sign(payload, config.accessTokenSecret);
}

const refreshToken = (payload) => {
    return jwt.sign(payload, config.refreshTokenSecret);
}

module.exports = {TeacherController}
