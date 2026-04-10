const User = require("../models/User");
const jwt = require("jsonwebtoken");

const signJWT = (id)=>{
    return jwt.sign({id},process.env.secret, {
        expiresIn: 24*60*60
    })
}


const sign_in_user = async (req, res) => {
  const { BODY } = req.body;
  try {
    const userId = await User.signIn(BODY);
    const token = signJWT(userId);
    res.status(200).json({token, message: "Succesfully signed the user in and made the token!!"})
  } catch (err) {
    console.log(err);
    res.status(400).json({err, message: "Couldn't sign the user in because of errors!!"})
  }
};

const sign_up_user = async(req,res)=>{
    const {BODY} = req.body;
    try {
    const userId = await User.signUp(BODY);
    const token = signJWT(userId);
    res.status(200).json({token, message: "Succesfully signed the user up and made the token!!"})
    } catch (err) {
        console.log(err);
        res.status(400).json({err, message: "Couldn't sign up user because of errors!!"});
    }
}

module.exports = {
    sign_in_user,
    sign_up_user
}