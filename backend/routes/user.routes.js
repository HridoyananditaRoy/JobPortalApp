const express = require('express');
const router = express.Router();
const User = require('../models/user.models.js');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const authenticatedUser = require('../middlewares/auth.middleware.js')
const {register, login, logout, updateProfile} = require("../controllers/user.controllers.js")
const singleUpload = require('../middlewares/multer.js');

// Register
router.post('/register',singleUpload, register);

// Login
router.post('/login', login);

// Logout
router.post('/logout', logout);

//update profile
router.put('/update',authenticatedUser, singleUpload, updateProfile);

module.exports = router;
