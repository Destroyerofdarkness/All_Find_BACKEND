const crypto = require("crypto");
const Key = require("../models/Key")


const authorize = async(req,res, next)=>{
    const authHeader = req.headers.authorization
    try {
        const hash = crypto.createHash("sha256").update(authHeader).digest('hex');
        const key = await Key.find({key:hash})
        if(!key){
            throw Error("Provided key doesn't exist")
        }
        console.log("Found the Key")
        next()
    } catch (err) {
        res.status(403).json({err, message:"Forbidden access"});
    }
}

module.exports = authorize;