const router = require("express").Router();

const controller = require("../controllers/category_controller")


router.post("/post",controller.post_category);

router.get("/get", controller.get_categories);

module.exports = router