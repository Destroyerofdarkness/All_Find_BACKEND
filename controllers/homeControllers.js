const games = require("../models/Games")
const animes = require("../models/anime")
const User = require("../models/User.js")
const {findContent, findUsersCreations}= require("../handlers/modelHandlers.js")

const find_result = async(req,res)=>{
    const id = req.params.id
    try{
        const content = await findContent(id)
        console.log("content:",content)
        res.status(200).json({content})
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
}


const render_profile = async(req,res, next)=>{
    const username = req.params.name
    try{
        const userInfo = await findUsersCreations(username)
        console.log(userInfo)

       res.render("profile", {name:`${username} - Profile`, games: userInfo.Games, anime: userInfo.Anime})
    }catch(err){
        console.log(err)
        res.status(500).send({err})
        next()
    }
}


module.exports = {
    home_get,
    home_redirect,
    find_result,
    render_profile
}