const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    CompanyName:{
        type:String,
        required:true
    },
     desc:{
        type:String,
        required:true
    },
     website:{
        type:String,
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
     logo:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},{timestamps:true});

const Company  = mongoose.model("Company",companySchema);
module.exports = Company;