// const jwt = require("jsonwebtoken");
// const User = require('../models/user.models.js'); // ✅ import User model

// const authenticatedUser = async (req, res, next) => {
// try {
//         const token = req.headers.authorization?.split(" ")[1];
//         if (!token) return res.status(401).json({ msg: "No token provided" });

//         const decoded = jwt.verify(token, process.env.SECRET_KEY);
//         if (!decoded?.id) return res.status(401).json({ msg: "Invalid token" });

//         const user = await User.findById(decoded.id);
//         if (!user) return res.status(401).json({ msg: "User not found" });

//         req.user = user;
//         req.id = user._id; 
//         next();
//     } catch (err) {
//         console.error('Auth error:', err);
//         res.status(401).json({ msg: "Authentication failed" });
//     }
// };


// module.exports = authenticatedUser;


const jwt = require("jsonwebtoken");
const User = require('../models/user.models.js');

const authenticatedUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    console.log("Incoming token:", token);

    if (!token) return res.status(401).json({ msg: "No token provided" });

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log("Decoded token:", decoded);

    if (!decoded?.id) return res.status(401).json({ msg: "Invalid token structure" });

    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ msg: "User not found" });

    req.user = user;
    req.id = user._id;
    next();
  } catch (err) {
    console.error("Auth error:", err);
    res.status(401).json({ msg: "Authentication failed" });
  }
};

module.exports = authenticatedUser;
