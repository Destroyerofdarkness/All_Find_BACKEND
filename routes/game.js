const express = require("express");
const router = express.Router();
const gamecontroller = require("../controllers/gameControllers");
const authorization = require("../middleware/authorize");

router.post("/register",authorization, gamecontroller.registrer_game_post);

router.delete("/delete",authorization, gamecontroller.delete_game);

module.exports = router;
