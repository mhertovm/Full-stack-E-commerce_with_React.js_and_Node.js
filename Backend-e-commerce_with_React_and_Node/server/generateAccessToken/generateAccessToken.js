require('dotenv').config();
const SECRET = process.env.T_SECRET;
const jwt = require("jsonwebtoken");

function generateAccessToken (email) {
    return jwt.sign({ email }, SECRET, { expiresIn: "43200s" });
}

 module.exports = { generateAccessToken };