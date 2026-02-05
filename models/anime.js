const mongoose = require("mongoose");
const { trim } = require("validator");
const {Schema, model} = mongoose

const aniSchema = new Schema({
    link: {
    type: String,
    required:[true, "Enter a valid link"],
    },
    Name: {
        type: String,
        required: [true, "Enter a valid name"],
        unique: true,
        trim: true
    },
    Episodes: {
    type: Number,
    required:[true, "Enter a valid number of episodes"],
},
    Description: {type: String,
        required: [true, "Enter a valid description"]
    },
    createdBy: {
        type: String,
        required: true
    }
})
const anime = model("animes", aniSchema)

module.exports = anime