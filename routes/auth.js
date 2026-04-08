const router = require("express").Router();
const controller = require("../controllers/authControllers.js")
const authorization = require("../middleware/authorize");
router.post("/login", authorization, controller.sign_in)

router.post("/register",authorization, controller.sign_up)

router.get("/verifyJWT/:token", authorization,controller.sendBackUser)

module.exports = router