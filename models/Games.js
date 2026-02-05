

const mongoose = require("mongoose")
const {Schema, model} = mongoose

const gameSchema = new Schema({
    link: {
    type: String,
    required: [true, "Enter a valid link"]
    },
    Name: {
    type: String,
    unique: true,
    required: [true, "Enter a valid name"],
    trim: true
    },
    Description: {type: String,
    required: [true, "Enter a valid description"]
    },
    createdBy: {
        type: String,
        required: true
    }
})

const game = model("games", gameSchema)

module.exports = game