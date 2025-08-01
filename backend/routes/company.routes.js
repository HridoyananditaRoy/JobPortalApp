const express = require('express');
const router = express.Router();
const User = require('../models/user.models.js');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const authenticatedUser = require('../middlewares/auth.middleware.js')
const {registerCompany, getCompany, getCompanyById, updateCompany} = require("../controllers/company.controllers.js");
const singleUpload = require('../middlewares/multer.js');

// Register Company
router.post('/register',authenticatedUser,singleUpload, registerCompany);

// Get All company
router.get('/get',authenticatedUser, getCompany);

// Get Company by Id
router.get('/get/:id',authenticatedUser, getCompanyById);

//Update company
router.put('/update',authenticatedUser,singleUpload, updateCompany);

module.exports = router;