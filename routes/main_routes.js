const router = require("express").Router();

const controller = require("../controllers/main_controller.js")

const authorization = require("../middleware/authorize.js")


router.get("/msg",authorization ,controller.load_Basic_msg);


module.exports = router