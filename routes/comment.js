const router = require("express").Router();
const authorization = require("../middleware/authorize");
const controller = require("../controllers/commentControllers");

router.post("/register",authorization ,controller.comment_register);

router.get("/:id",authorization, controller.send_view_comments)


module.exports = router;