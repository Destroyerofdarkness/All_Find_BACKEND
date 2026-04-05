const Comment = require("../models/Comment.js");

const comment_register = async (req, res) => {
  const { BODY } = req.body;
  try {
    console.log("Registering comment with:", BODY);
    await Comment.publish(BODY);
    res
      .status(200)
      .json({ success: true, message: "Succesfully published the comment" });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err,
      success: false,
      message: "Unable to insert the comment into the database!!",
    });
  }
};

const send_view_comments = async (req, res) => {
  const id = req.params.id;
  try {
    console.log(id)
    const viewComments = await Comment.find({connection:id});
    if(viewComments.length === 0){
      throw Error("No comments found!!")
    }
    console.log(viewComments)
    res
      .status(200)
      .json({
        viewComments,
        success: true,
        message: "Found the view comments succesfully"
      });
  } catch (err) {
    console.log(err);
    res
      .status(404)
      .json({
        err: err.message,
        success: false,
        message: "Failed to find comments for the given view",
      });
  }
};

module.exports = { comment_register, send_view_comments };
