async function userSignInController(req, res) {
  try {
    const { email, password } = req.body;
    console.log("req.body", req.body);
    //validate email or password
    if (!email || !password) {
      return res.status(400).json({
        message: "email or password is required",
        success: false,
        err: true,
      });
    }
    //check if user exists
    const existingUser = await userModel.findOne({
      email,
    });
    if (!existingUser) {
      return res.status(404).json({
        message: "User with this email does not exist",
        success: false,
        error: true,
      });
    }
    //compare password
    const isPasswordValid = bcrypt.compareSync(password, existingUser.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Password is incorrect",
        success: false,
        error: true,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
      success: false,
      error: true,
    });
  }
}

module.exports = userSignInController;
