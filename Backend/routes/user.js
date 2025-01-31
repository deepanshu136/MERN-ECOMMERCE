const express = require("express");
const router = express.Router();
const userSignUpController = require("../controller/userSignUp");
const userSignInController = require("../controller/userSignin");

//API call
router.post("/signup", userSignUpController);
router.post("/signin", userSignInController);

module.exports = router;
