const express = require("express")

const router = express.Router()

const AniController = require("../controllers/animeControllers")

const {authenticate} = require("../middleware/jwtAuth")

router.get("/register", authenticate, AniController.register_anime_page )

router.post("/register", AniController.anime_make)

router.post("/:id",authenticate, AniController.anime_page_delete)


module.exports = router