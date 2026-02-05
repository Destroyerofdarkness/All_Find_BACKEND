const games = require("../models/Games");
const animes = require("../models/anime");
const User = require("../models/User");

async function findContent(id) {
  const game = await games.findById(id);
  if (game) {
    console.log(game);
    return game;
  }
  const anime = await animes.findById(id);
  if (anime) {
    return anime;
  }
}

async function findUsersCreations(Name) {
  const user = await User.findOne({ user: Name });
  if (!user) {
    throw Error("User not found");
  }
  console.log(user);
  const Games = await games.find({ createdBy: user.user });
  const Anime = await animes.find({ createdBy: user.user });
  console.log("Games:", Games, "Anime:", Anime);
  return { Games, Anime };
}

module.exports = { findContent, findUsersCreations };
