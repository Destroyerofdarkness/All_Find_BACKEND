const games = require("../models/Games")
const animes = require("../models/anime")
const User = require("../models/User.js")
const {findContent, findUsersCreations}= require("../handlers/modelHandlers.js")

const get_all_content = async(req,res)=>{
    try{
        const game = await games.find()
        const anime = await animes.find()
        res.status(200).json({game,anime})
    }catch(err){
        console.log(err)
        res.status(401).json({err})
    }
}

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


const send_profile_info = async(req,res, next)=>{
    const username = req.params.name
    try{
        const userInfo = await findUsersCreations(username)
        console.log("Userinfo:",userInfo)

       res.status(200).json({userInfo, user: username})
    }catch(err){
        console.log(err)
        res.status(500).send({err})
        next()
    }
}


module.exports = {
    find_result,
    send_profile_info,
    get_all_content,
}