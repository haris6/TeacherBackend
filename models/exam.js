var mongoose = require('mongoose');

var examSchema = new mongoose.Schema ({
    teacher:{
        type: mongoose.Types.ObjectId,
        ref: 'Teacher',
    },
    title:{
        type: String,
    },   
    questions:{
        type:[String],
    },
    starttime:{
        type: String,
        //required: true,
    },
    endtime:{
        type: String,
        //required: true,
    },
})

module.exports = mongoose.model("Exam",examSchema) ;