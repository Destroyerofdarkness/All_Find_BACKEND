const games = require("../models/Games");
const { handleGameError } = require("../handlers/errorHandler.js");
const handleError = handleGameError;

const registrer_game_post = async (req, res) => {
  const { user } = req.body.BODY;
  try {
    console.log("User creating game:", user);
    console.log("Info:", req.body);
    const name = await games.newMake(req.body.BODY);
    console.log("Game registered");
    res.status(200).json({
      success: true,
      newGame: name,
      message: "Game registered and saved in the database!!",
    });
  } catch (err) {
    console.log(err);
    const error = handleError(err);
    console.log(error);
    res.status(400).json({
      error,
      success: false,
      message: "Failed to register the game and save it in the database!!",
    });
  }
};

const delete_game = async (req, res) => {
  const  gameId  = req.body.BODY;
  try {
    console.log("Deleting game with ID:", gameId)
    await games.findByIdAndDelete(gameId);
    res
      .status(200)
      .json({ success: true, message: `Game with ID: ${gameId} deleted!!` });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({
        success: false,
        message: `Failed to delete game with ID: ${gameId}`,
      });
  }
};

module.exports = {
  registrer_game_post,
  delete_game,
};
