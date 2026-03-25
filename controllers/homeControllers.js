const games = require("../models/Games");
const animes = require("../models/anime");
const User = require("../models/User.js");
const {
  findContent,
  findUsersCreations,
} = require("../handlers/modelHandlers.js");

const get_all_content = async (req, res) => {
  try {
    const game = await games.find();
    const anime = await animes.find();
    res.status(200).json({
      message: "Got all games and anime from the database",
      success:true,
      games: game,
      anime: anime,
      length: anime.length + game.length,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ err, success:false, message: "Failed to get all info fom the database!" });
  }
};

const find_result = async (req, res) => {
  const id = req.params.id;
  try {
    const content = await findContent(id);
    console.log("content:", content);
    res.status(200).json({ content, success:true, message: "Found result!!" });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ err, success:false, message: "Failed to find Result of the search!!" });
  }
};

const send_profile_info = async (req, res) => {
  const username = req.params.name;
  try {
    const user = await User.findOne({user:username})
    const userInfo = await findUsersCreations(username);
    console.log("Userinfo:", userInfo);

    res.status(200).json({ userInfo, user: user, success:true, message: `Found info of the user: ${username}` });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err, success:false, message: `Failed to find info of the user: ${username}` });
  }
};

const update_user_bio = async(req,res)=>{
  const {user} = req.body
  try {
    console.log(req.body)
    await User.updateBio(req.body)
    res.status(200).json({success:true, message: `Updated the bio of the user with an ID: ${user}`})
  } catch (err) {
    console.log(err)
    res.status(500).json({err, success: false, message: `Failed to Update The Info of a User With ID: ${user}`})
  }
}

module.exports = {
  find_result,
  send_profile_info,
  get_all_content,
  update_user_bio
};
