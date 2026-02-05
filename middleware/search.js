const Games = require("../models/Games");
const Anime = require("../models/anime");

const search = async (req, res, next) => {
  const searchValue = req.query.searchValue?.trim();
  if (!searchValue) {
    res.locals.result = [];
    return next();
  }
  const letters = new RegExp(searchValue);
  const game = await Games.find({ Name: letters });
  console.log("Games:", game);
  const anime = await Anime.find({ Name: letters });
  console.log("anime", anime);
  res.locals.result = [anime, game];
  next();
};

module.exports = { search };
