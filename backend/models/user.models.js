const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['Student', 'Recruiter']
    },
    profile: {
        profilePhoto: { type: String, default: "" },
        resume: { type: String, default: "" },
        resumeOriginalName: { type: String, default: "" },
        bio: { type: String, default: "" },
        skills: [{ type: String }],
        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Company'
        }
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;