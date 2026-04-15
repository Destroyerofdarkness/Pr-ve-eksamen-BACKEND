const router = require("express").Router();

const controller = require("../controllers/report_controller.js")

router.get("/all",controller.all_reports);

router.post("/publish", controller.report_publish);

router.put("/update", controller.update_report);

router.delete("/delete",controller.delete_report);


module.exports = router;