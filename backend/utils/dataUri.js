// utils/dataUri.js
const DatauriParser = require("datauri/parser");
const path = require("path");

const getDataUri = (file) => {
  const parser = new DatauriParser();
  return parser.format(path.extname(file.originalname), file.buffer);
};

module.exports = getDataUri;


//Converts the uploaded file (buffer) to base64.
// Uploads it to Cloudinary.
// Returns the hosted file URL in cloudResponse.secure_url.