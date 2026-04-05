const Comment = require("../models/Comment.js");

const comment_register = async (req, res) => {
  const { BODY } = req.body;
  try {
    console.log("Registering comment with:", BODY);
    await Comment.publish(BODY);
    res.status(200).json({success:true, message: "Succesfully published the comment"});
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .json({
        err,
        success: false,
        message: "Unable to insert the comment into the database!!",
      });
  }
};

module.exports = {comment_register}
