const express = require("express");
const router = express.Router();

const {authenticate}= require("../middleware/jwtAuth")

const homeController = require("../controllers/homeControllers");

router.get("/home",homeController.home_get );

router.get("/result/:id", homeController.find_result)

router.get("/", homeController.home_redirect);

router.get("/profile/:name", homeController.render_profile)



module.exports = router;