const router = require("express").Router();
const controller = require("../controllers/homeControllers");

router.get("/getAllContent",controller.get_all_content)

router.get("/result/:id",controller.find_result)

module.exports = router