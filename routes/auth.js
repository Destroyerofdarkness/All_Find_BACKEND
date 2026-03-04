const router = require("express").Router();
const controller = require("../controllers/authControllers.js")

router.post("/login", controller.sign_in)

router.post("/register", controller.sign_up)

router.get("/verifyJWT/:token",controller.sendBackUser)

module.exports = router