const jwt = require("jsonwebtoken")

const User = require("../models/User.js")

const {handleAuthError}= require("../handlers/errorHandler.js")

const maxValidDate = 3*24*60*60

const createJWT = (id)=>{
    return jwt.sign({id}, process.env.secret, {
        expiresIn: maxValidDate
    })
}

const sign_in = async(req,res)=>{
    const {user,pass} = req.body
    try{
       const userId = await User.login(user,pass)
       console.log("User ID:",userId)
       const token = createJWT(userId)
       res.status(200).json({token})
    }
    catch(err){
        const error = handleAuthError(err)
        console.log(error)
        res.status(300).json({error})
    }
}

const sign_up = async(req,res)=>{
    const {user ,pass} = req.body
    try{
        const userId = await User.register(user,pass)
        const token = createJWT(userId)
        res.status(200).json({token})
    }catch(err){
       const error = handleAuthError(err)
       console.log(error)
       res.status(301).json({error})
    }
}

module.exports = {
    sign_in,
    sign_up,
}