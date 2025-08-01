const bcrypt = require('bcryptjs');
const User = require('../models/user.models');
const jwt = require("jsonwebtoken");
const cloudinary = require('../utils/cloudinary');
const getDataUri = require('../utils/dataUri.js');


const register = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ msg: "No data received", success: false });
    }
    const { fullName, email, phoneNumber, password, role } = req.body || {};

    if (!fullName || !email || !phoneNumber || !password || !role) {
      return res.status(401).json({
        msg: "Some Fields are missing!",
        success: false
      });
    }
const user = await User.findOne({ email });
if (user) {
  return res.status(400).json({
    msg: "User already exists!",
    success: false
  });
}

const file = req.file;
if (!file || !file.buffer) {
  return res.status(400).json({ msg: "Invalid or missing profile picture", success: false });
}

const fileUri = getDataUri(file);
const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
  timeout: 60000,
});


    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullName,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: {
        profilePhoto: cloudResponse.secure_url
      }
    });

    res.status(200).json({
      msg: 'User Registered Successfully',
      success: true
    });

  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({
      msg: 'Something went wrong',
      success: false
    });
  }
}

const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        msg: "Some Fields are missing!",
        success: false
      });
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({
        msg: "User not found!",
        success: false
      });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({
        msg: "Password doesn't match!",
        success: false
      });
    }

    if (role !== existingUser.role) {
      return res.status(400).json({
        msg: "Account doesn't exist with current role!",
        success: false
      });
    }

    const tokenData = {
      id: existingUser._id
    }

    const token = await jwt.sign(
      // { userId: existingUser._id },

      //If you only set the token as an HTTP-only cookie, JavaScript running in the browser cannot access it.
      //  But if you also send the token in the response body,
      //then your frontend can read and store it 
      // in localStorage or sessionStorage if needed.
      tokenData,
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );

    return res.status(200)
      .cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'strict'
      })
      .json({
        token,
        msg: `Welcome back ${existingUser.fullName}`,
        user: {
          _id: existingUser._id,
          fullName: existingUser.fullName,
          email: existingUser.email,
          role: existingUser.role,
          profile: existingUser.profile
        },
        success: true
      });

  } catch (error) {
    return res.status(500).json({
      msg: 'Something went wrong',
      success: false
    });
  }
}


const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      msg: 'User Logged out successfully!',
      success: true
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Something went wrong',
      success: false
    });
  }
}

const updateProfile = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, bio, skills } = req.body;

    const file = req.file;
    let cloudResponse;

    // If a file is uploaded, upload it to Cloudinary
    if (file) {
      const fileUri = getDataUri(file);
      cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    }

    // Convert skills to array
    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",");
    }

    const userId = req.id;
    let user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: "User not found.",
        success: false
      });
    }

    // Updating fields
    if (fullName) user.fullName = fullName;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skillsArray) user.profile.skills = skillsArray;

    if (cloudResponse) {
      user.profile.resume = cloudResponse.secure_url;
      user.profile.resumeOriginalName = file.originalname;
    }

    await user.save();

    return res.status(200).json({
      message: "Profile updated successfully.",
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        profile: user.profile
      },
      success: true
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong!",
      success: false
    });
  }
};


module.exports = {
  register,
  login,
  logout,
  updateProfile
}