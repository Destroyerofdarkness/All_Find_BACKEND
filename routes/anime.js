const express = require("express")

const router = express.Router()
const authorization = require("../middleware/authorize");
const AniController = require("../controllers/animeControllers")

router.post("/register",authorization, AniController.anime_make)

router.delete("/delete",authorization, AniController.anime_page_delete)


module.exports = router