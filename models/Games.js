const mongoose = require("mongoose");
const validator = require("validator");
const { Schema, model } = mongoose;

const gameSchema = new Schema({
  link: {
    type: String,
    required: [true, "Enter a valid link"],
    validate: {
      validator: (value) => {
        return validator.isURL(value, {
          protocols: ["http", "https", "ftp"],
          require_protocol: true,
        });
      },
      message: "The Provided Link is not valid..",
    },
  },
  Name: {
    type: String,
    unique: true,
    required: [true, "Enter a valid name"],
  },
  Description: { type: String, required: [true, "Enter a valid description"] },
  createdBy: {
    type: String,
    required: true,
  },
});


gameSchema.statics.newMake = async(body)=>{
    const newGame = new game({
      link: body.link,
      Name: body.name,
      Description: body.description,
     createdBy: body.user
    });
     await newGame.save();
     return;
}


const game = model("games", gameSchema);

module.exports = game;
