const router = require("express").Router();
const {checkCurrentUser}= require("../middleware/jwtAuth.js")
const controller = require("../controllers/authControllers.js")

router.post("/login", controller.sign_in)

router.post("/register", controller.sign_up)

module.exports = router