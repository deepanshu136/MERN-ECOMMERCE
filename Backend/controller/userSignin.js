const bcrypt = require("bcryptjs");
const userModel = require("../model/userModel");

async function userSignInController(req, res) {
  try {
    const { email, password } = req.body;
    console.log("req.body", req.body);

    // Validate that email and password are provided
    if (!email || !password) {
      return res.status(400).json({
        message: "Email or password is required",
        success: false,
        error: true,
      });
    }

    // Check if the user exists
    const existingUser = await userModel.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({
        message: "User with this email does not exist",
        success: false,
        error: true,
      });
    }

    // Compare the provided password with the stored hash
    const isPasswordValid = bcrypt.compareSync(password, existingUser.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Password is incorrect",
        success: false,
        error: true,
      });
    }

    // If the sign-in is successful, return a success message
    return res.status(200).json({
      message: "Sign in successful",
      user: {
        id: existingUser._id,
        email: existingUser.email,
        username: existingUser.username,
        role: existingUser.role || "GENERAL", // Include the role if it exists
      },
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

module.exports = userSignInController;
