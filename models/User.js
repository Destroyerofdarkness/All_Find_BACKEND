const {Schema, model }= require("mongoose");
const argon2 = require("argon2");

const userSchema = new Schema({
    user: {
        unique: true,
        type: String,
        required: [true, "Enter Username"]
    },
    pass: {
        type: String,
        required: [true, "Enter Password"],
        minLength: [6, "Password must be more than 6 letters"]
    }
})
userSchema.pre("save", async function(){
    try{
        this.pass = await argon2.hash(this.pass);
        
    }catch(err){
        console.log(err)
    }
})

userSchema.statics.login = async function(user, pass){
    const username = await User.findOne({user:user})
    if(username){
        const userPass = await argon2.verify(username.pass, pass)
        if(userPass){
            console.log(username._id)
            return username._id
            
        }
        throw Error("Wrong Password")
    }
    throw Error("User not found")
}

userSchema.statics.register = async function(user,pass){
        const newUser = await this.create({user,pass})
        return newUser._id
}

const User = model("Users", userSchema)

module.exports = User