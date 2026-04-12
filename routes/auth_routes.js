const router = require("express").Router();

const controller = require("../controllers/auth_controller.js")

const authorization = require("../middleware/authorize.js")


router.post("/signIn", authorization, controller.sign_in_user);

router.post("/signUp", authorization, controller.sign_up_user);

router.get("/verifyJWT/:token",authorization, controller.sendBackUserAndVerify);

module.exports = router