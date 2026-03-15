const anime = require("../models/anime");

const { handleAnimeError } = require("../handlers/errorHandler.js");
const handleError = handleAnimeError;

const anime_make = async (req, res) => {
  const { user } = req.body;
  console.log("User registering anime: ", user);
  console.log("Info:", req.body);
  try {
   const name = await anime.newMake(req.body);
    console.log("Anime registered succesfully");
    res
      .status(200)
      .json({ 
        success: true, 
        newAnime: name,
        message: "Anime registered succesfully!!" });
  } catch (err) {
    const error = handleError(err);
    console.log(error);
    res
      .status(400)
      .json({
        error,
        message:
          "The anime couldn't be registered cause criterias weren't met!!",
      });
  }
};

const anime_page_delete = async (req, res) => {
  const { animeId } = req.body;
  try {
    const result = await anime.findByIdAndDelete(animeId);
    console.log("DELETED", result);
    res
      .status(200)
      .json({
        success: true,
        message: `Deleted anime with the ID: ${animeId} `,
      });
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .json({
        success: false,
        message: `Failed to delete anime with the ID: ${animeId}`,
      });
  }
};

module.exports = {
  anime_make,
  anime_page_delete,
};
