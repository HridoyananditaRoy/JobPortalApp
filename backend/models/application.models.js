const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
   
     job:{
        type:String,
        required:true
    },
    applicant:{
        type:mongoose.Schema.Types.ObjectId, //applicant: References a User document.
        ref:'User'
    },
    status:{
        type:String,
        enum:['accepted', 'rejected', 'pending']
    }

},{timestamps:true});

const Application  = mongoose.model("Application",applicationSchema);
module.exports = Application;