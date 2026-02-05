const router = require("express").Router();
const {checkCurrentUser}= require("../middleware/jwtAuth.js")
const controller = require("../controllers/authControllers.js")

router.get("/login", checkCurrentUser,controller.render_login)

router.get("/register",checkCurrentUser , controller.render_register)

router.get("/logout", controller.logout)

router.post("/login", controller.sign_in)

router.post("/register", controller.sign_up)

module.exports = router