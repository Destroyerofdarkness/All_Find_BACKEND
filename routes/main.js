const router = require("express").Router();
const controller = require("../controllers/homeControllers");

router.get("/getAllContent",controller.get_all_content)

router.get("/result/:id",controller.find_result)

router.get("/user/:name",controller.send_profile_info)

module.exports = router