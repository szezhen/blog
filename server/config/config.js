const dotenv = require("dotenv");
const path = require("path");

// Setting up the dotenv config
dotenv.config({
  path: path.resolve(__dirname, "../.env.local")
});

module.exports = {
  mongoURI: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET
};
