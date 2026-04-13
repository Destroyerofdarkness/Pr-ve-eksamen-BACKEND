const router = require("express").Router();

const controller = require("../controllers/report_controller.js")

const authorization = require("../middleware/authorize.js")


router.post("/publish", authorization, controller.report_publish);


module.exports = router;