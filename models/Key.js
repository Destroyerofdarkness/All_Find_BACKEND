const { Schema, model } = require("mongoose");
const crypto = require("crypto")

const keySchema = new Schema({
    key:{
        type:String,
        required:true
    }
})

keySchema.statics.make = async()=>{
const key = crypto.randomBytes(32).toString("hex");
console.log(key);
const hash = crypto.createHash("sha256").update(key).digest("hex");
const newKey = new Key({
    key:hash,
})
await newKey.save();
}

const Key = model("API_Keys", keySchema)

module.exports = Key