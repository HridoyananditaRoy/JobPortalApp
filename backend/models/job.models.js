const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
     desc:{
        type:String,
        required:true
    },
     requirements:{
        type:String,
        required:true
    },
     salary:{
        type:Number,
        required:true
    },
     location:{
        type:String,
        required:true
    },
     jobType:{
        type:String,
        required:true
    },
     experience:{
        type:String,
        required:true
    },
    numberOfPos:{
         type:Number,
        required:true
    },
    created_By:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    company: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Company",
  required: true
},

    applications:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Application'
    }]
},{timestamps:true});

const Job  = mongoose.model("Job",jobSchema);
module.exports = Job;