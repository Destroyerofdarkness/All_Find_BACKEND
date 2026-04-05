const router = require("express").Router();

const controller = require("../controllers/commentControllers");

router.post("/register", controller.comment_register);

router.get("/:id", controller.send_view_comments)


module.exports = router;