const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const validator = require("validator");


const aniSchema = new Schema({
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
    required: [true, "Enter a valid name"],
    unique: true,
    trim: true,
  },
  Episodes: {
    type: Number,
    required: [true, "Enter a valid number of episodes"],
  },
  Description: { type: String, required: [true, "Enter a valid description"] },
  createdBy: {
    type: String,
    required: true,
  },
});

aniSchema.statics.newMake = async(body)=>{
    const newAnime = new anime({
      link: body.link,
      Name: body.name,
      Episodes:body.episodes,
      Description: body.description,
      createdBy: body.user
    });
     await newAnime.save();
     return;
}



const anime = model("animes", aniSchema);

module.exports = anime;
