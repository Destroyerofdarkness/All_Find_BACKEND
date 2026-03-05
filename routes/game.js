const express = require("express");
const router = express.Router();
const gamecontroller = require("../controllers/gameControllers");

router.post("/register", gamecontroller.registrer_game_post);

router.delete("/delete", gamecontroller.delete_game);

module.exports = router;
