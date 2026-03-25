const router = require("express").Router();
const controller = require("../controllers/homeControllers");

router.get("/getAllContent",controller.get_all_content)

router.get("/result/:id",controller.find_result)

router.get("/user/:name",controller.send_profile_info)

router.put("/update/userBio",controller.update_user_bio)

module.exports = router