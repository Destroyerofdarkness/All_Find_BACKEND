const { Schema, model } = require("mongoose");


const keySchema = new Schema({
    key:{
        type:String,
        required:true
    }
})

const Key = model("API_Keys", keySchema)

module.exports = Key