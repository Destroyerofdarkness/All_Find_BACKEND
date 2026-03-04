const express = require("express")

const router = express.Router()

const AniController = require("../controllers/animeControllers")

router.post("/register", AniController.anime_make)

router.post("/:id", AniController.anime_page_delete)


module.exports = router