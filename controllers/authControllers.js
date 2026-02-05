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
       console.log(userId)
       const token = createJWT(userId)
        res.cookie("jwt", token, {httpOnly: true, maxAge: maxValidDate * 1000 })
        res.status(200).json({userId})
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
        console.log("User:", user, "Pass:",pass)
        const userId = await User.register(user,pass)
        const token = createJWT(userId)
        res.cookie("jwt", token, {httpOnly: true, maxAge: maxValidDate *1000})
        res.status(200).json({userId})
    }catch(err){
       const error = handleAuthError(err)
       console.log(error)
       res.status(301).json({error})
    }
}

module.exports = {
    render_login,
    render_register,
    sign_in,
    sign_up,
    logout
}