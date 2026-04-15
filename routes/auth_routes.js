const router = require("express").Router();

const controller = require("../controllers/auth_controller.js")




router.post("/signIn", controller.sign_in_user);

router.post("/signUp", controller.sign_up_user);

router.get("/verifyJWT/:token", controller.sendBackUserAndVerify);

module.exports = router