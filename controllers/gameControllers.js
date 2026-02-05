const games = require("../models/Games");
const {handleGameError} = require("../handlers/errorHandler.js");
const { json } = require("express");
const handleError = handleGameError

//Register game and go to the page
const register_game = (req, res) => {
  res.render("games/register", { name: "Register Game" });
  console.log("Loaded in register page");
};

const registrer_game_post = async (req, res) => {
  const { link, name, description, user } = req.body;
  try {
    console.log("User: ",user)
    const newGame = new games({
      link: link,
      Name: name,
      Description: description,
     createdBy: user
    });
    const success = await newGame.save();
    console.log("Game registered");
    res.status(200).json({success})
  } catch (err) {
    const error = handleError(err);
    console.log(error);
    res.status(301).json({ error });
  }
};

// Delete and go to game page
const game_delete = async(req, res) => {
  const id = req.params.id;
  console.log(req.body, "REQ DELETE");
    try{
      const result = await games.findByIdAndDelete(id)
      console.log("Deleted", result);
      res.redirect("/home");
    }catch(err){
      console.log(err);
    }
};
const update_content = async (req, res) => {
  try {
    const id = req.params.id;
    const { description } = req.body;
    await games.findByIdAndUpdate(
      { id: id },
      { $set: { description: description } },
      { new: true }
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  register_game,
  game_delete,
  registrer_game_post,
  update_content,
};
