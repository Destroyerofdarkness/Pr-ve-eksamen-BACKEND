const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { handler_user_errors } = require("../handlers/modelErrorHandler");

const signJWT = (id) => {
  return jwt.sign({ id }, process.env.secret, {
    expiresIn: 24 * 60 * 60,
  });
};
//Sign in & Sign Up
const sign_in_user = async (req, res) => {
  const { BODY } = req.body;
  try {
    const userId = await User.signIn(BODY);
    const token = signJWT(userId);
    res
      .status(200)
      .json({
        token,
        message: "Succesfully signed the user in and made the token!!",
      });
  } catch (err) {
    const errors = handler_user_errors(err);
    res
      .status(400)
      .json({
        errors,
        message: "Couldn't sign the user in because of errors!!",
      });
  }
};

const sign_up_user = async (req, res) => {
  const { BODY } = req.body;
  try {
    const userId = await User.signUp(BODY);
    const token = signJWT(userId);
    res
      .status(200)
      .json({
        token,
        message: "Succesfully signed the user up and made the token!!",
      });
  } catch (err) {
    const errors = handler_user_errors(err);
    res
      .status(400)
      .json({ errors, message: "Couldn't sign up user because of errors!!" });
  }
};

//JWT verification

const sendBackUserAndVerify= async (req, res) => {
  const token = req.params.token;
  try {
    jwt.verify(token, process.env.secret, async (err, decodedToken) => {
      if (err) {
        console.log("Err on JWT verification: ", err);
        res.status(400).json({
          success: false,
          message: `Failed to verify JWT cause: ${err.message}`,
        });
      } else {
        console.log(decodedToken);
        const user = await User.findById(decodedToken.id);
        console.log(user);
        res.status(201).json({
          success: true,
          user: user,
          message: "JWT token verified and user acquiered",
        });
      }
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({err,success:false, message: "Failed to verify JWT cause: Internal Server Error" });
  }
};


module.exports = {
  sign_in_user,
  sign_up_user,
  sendBackUserAndVerify
};
