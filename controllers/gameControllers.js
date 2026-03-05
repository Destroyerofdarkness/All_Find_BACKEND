const games = require("../models/Games");
const {handleGameError} = require("../handlers/errorHandler.js");
const handleError = handleGameError



const registrer_game_post = async (req, res) => {
  const {user } = req.body;
  try {
    console.log("User creating game:",user)
    console.log("Info:",req.body)
    console.log(req.body)
    await games.newMake(req.body)
    console.log("Data: ",req.body)
    
    console.log("Game registered");
    res.status(200).json({success:true})
  } catch (err) {
    console.log(err)
    const error = handleError(err);
    console.log(error);
    res.status(301).json({ error });
  }
};

const delete_game = async(req,res)=>{
  const {gameId} =req.body
  try {
    await games.findByIdAndDelete(gameId)
    res.status(200).json({success:true})
  } catch (err) {
    console.log(err)
    res.status(500)
  }
}

module.exports = {
  registrer_game_post,
  delete_game
};
