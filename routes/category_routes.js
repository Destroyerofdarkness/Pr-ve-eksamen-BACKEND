const router = require("express").Router();

const controller = require("../controllers/category_controller")


router.post("/post",controller.post_category);

module.exports = router