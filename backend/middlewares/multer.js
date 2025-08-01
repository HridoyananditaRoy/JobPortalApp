
// middlewares/multer.js
const multer = require("multer");
const DataUriParser = require("datauri/parser");
const path = require("path");

const storage = multer.memoryStorage();
const upload = multer({ storage });

const singleUpload = upload.single("file"); // or whatever field name you expect

module.exports = singleUpload;
