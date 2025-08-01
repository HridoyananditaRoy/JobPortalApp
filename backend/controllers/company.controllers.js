const bcrypt = require('bcryptjs');
const Company = require('../models/company.models');
const jwt = require("jsonwebtoken");
const cloudinary = require('../utils/cloudinary.js');
const getDataUri = require('../utils/dataUri');


const registerCompany = async (req, res) => {
    try {
        const { CompanyName, desc, website, location, jobType } = req.body;
        //validate
        if (!CompanyName || !desc || !website || !location || !jobType) {
            return res.status(400).json({
                msg: "Some details are missing!",
                success: false,
            });
        }

        //checks if company already exists
        const companyExists = await Company.findOne({ CompanyName });
        if (companyExists) {
            return res.status(400).json({
                msg: "Company Exists! Duplicate Company.",
                success: false
            });
        }


        let logo = ""; //setting the logo from Cloudinary
        if (req.file) {
            const fileUri = getDataUri(req.file);
            const result = await cloudinary.uploader.upload(fileUri.content);
            logo = result.secure_url;
        }

        const newCompany = await Company.create({
            CompanyName,
            desc,
            website,
            location,
            jobType,
            logo, // this will be the one you just set
            recruiter: req.user._id,// <- comes from middleware

            // Assuming `req.id` comes from middleware after verifying JWT
            userId: req.id //comes from MongoDb durig genertion of tokens
        })

        res.status(200).json({
            msg: "Company created successfully!",
            success: true,
            company: newCompany
        });
    } catch (error) {
        console.error("Register company error:", error.message);
        return res.status(500).json({
            msg: "Something went wrong!",
            success: false
        });
    }
}

const getCompany = async (req, res) => {
    try {
        const userId = req.id;
        const company = await Company.find({ userId });
        if (!company) {
            return res.status(404).json({
                msg: "Companies not found!",
                success: false
            });
        }

        res.status(200).json({
            msg: "Companies retrieved successfully!",
            success: true,
            companies: company
        });

    } catch (error) {
        console.error("Register company error:", error.message);
        return res.status(500).json({
            msg: "Something went wrong!",
            success: false
        });
    }
}

const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId); //object used in () not ({})
        if (!company) {
            return res.status(404).json({
                msg: "Company not found!",
                success: false
            });
        }

        res.status(200).json({
            msg: "Company got successfully updated!",
            company,
            success: true
        });

    } catch (error) {
        console.error("Register company error:", error.message);
        return res.status(500).json({
            msg: "Something went wrong!",
            success: false
        });
    }
}

const updateCompany = async (req, res) => {
    try {
        const { CompanyName, desc, location, website, companyId } = req.body;

        const updateData = {
            ...(CompanyName && { CompanyName }),
            ...(desc && { desc }),
            ...(location && { location }),
            ...(website && { website }),
        };


        // Upload new logo if file exists
        if (req.file) {
            const fileUri = getDataUri(req.file); // Convert buffer to Data URI
            const cloudinaryUpload = await cloudinary.uploader.upload(fileUri.content);
            updateData.logo = cloudinaryUpload.secure_url;
        }

        const company = await Company.findByIdAndUpdate(companyId, updateData, {
            new: true,
        });

        if (!company) {
            return res.status(404).json({
                msg: 'Company not found for update!',
                success: false,
            });
        }

        return res.status(200).json({
            msg: 'Company updated successfully!',
            success: true,
            company,
        });
    } catch (error) {
        console.error('Update company error:', error.message);
        return res.status(500).json({
            msg: 'Something went wrong!',
            success: false,
        });
    }
};


module.exports = {
    registerCompany,
    getCompany,
    getCompanyById,
    updateCompany
};