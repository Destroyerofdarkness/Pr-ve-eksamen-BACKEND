const router = require("express").Router();
const controller = require("../controllers/main_controller.js")

router.get("/msg", controller.load_Basic_msg);


module.exports = router