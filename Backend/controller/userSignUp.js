const userModel = require("../model/userModel");
const bcrypt = require("bcryptjs");

async function userSignUpController(req, res) {
  try {
    const { email, username, password } = req.body;
    console.log("req.body", req.body);

    // Validate that email, username, and password are provided
    if (!email || !username || !password) {
      return res.status(400).json({
        message: "Email, username, and password are required",
        success: false,
        error: true,
      });
    }

    // Check if the user already exists (optional but common)
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "User with this email already exists",
        success: false,
        error: true,
      });
    }
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    // Create a new user
    const userData = new userModel({
      email,
      password: hashPassword,
      username,
      role: "GENERAL",
    });

    // Save the user to the database
    await userData.save();

    // Respond with success if everything is fine
    return res.status(201).json({
      message: "User registered successfully",
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      success: false,
      error: true,
    });
  }
}

module.exports = userSignUpController;
