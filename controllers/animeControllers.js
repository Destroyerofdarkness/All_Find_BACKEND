const anime = require("../models/anime");

const {handleAnimeError} = require("../handlers/errorHandler.js")
const handleError = handleAnimeError
const register_anime_page = (req, res) => {
  res.render("anime/registerAni", { name: "Register Anime" });
};

const anime_make = async (req, res) => {
  const { link, name, episodes, description, user } = req.body;
  console.log("User: ",user)
  try {
    const newAnime = new anime({
      link: link,
      Name: name,
      Episodes: episodes,
      Description: description,
      createdBy: user
    });
    const success = await newAnime.save();
    console.log("Anime registered succesfully");
    res.status(200).json({success})
  } catch (err) {
    const error = handleError(err);
    console.log(error);
    res.status(301).json({ error });
  }
};

const anime_page_delete = async (req, res) => {
  const id = req.params.id;
  try{
    const result = await anime
    .findByIdAndDelete(id)
    console.log("DELETED", result);
      res.redirect("/home");
  }catch(err){
    console.log(err)
    res.status(301).send(err)
  }  
};

module.exports = {
  anime_make,
  register_anime_page,
  anime_page_delete,
};
