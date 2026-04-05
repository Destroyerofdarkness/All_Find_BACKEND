const router = require("express").Router();

const controller = require("../controllers/commentControllers");

router.post("/register", controller.comment_register);


module.exports = router;