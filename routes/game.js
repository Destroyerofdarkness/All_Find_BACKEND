const express = require("express")
const router = express.Router()
const gameRoute = require("../controllers/gameControllers")

const {authenticate} = require("../middleware/jwtAuth")

router.get("/register",authenticate, gameRoute.register_game )

router.post("/register", gameRoute.registrer_game_post)


router.post("/:id", gameRoute.game_delete)

//router.put(":/id", gameRoute.update_content)

module.exports = router