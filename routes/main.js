const router = require("express").Router();
const controller = require("../controllers/homeControllers");
const authorization = require("../middleware/authorize");
router.get("/getAllContent",authorization, controller.get_all_content)

router.get("/result/:id",authorization, controller.find_result)

router.get("/user/:name",authorization,controller.send_profile_info)

router.put("/update/userBio",authorization,controller.update_user_bio)

module.exports = router