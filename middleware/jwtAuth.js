const jwt = require("jsonwebtoken");
const User = require("../models/User")

const authenticate = (req, res, next) => {
  const token = req.cookies.jwt;
  console.log("User Token:", token);
  if (token) {
    jwt.verify(token, process.env.secret, (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.redirect("/login");
      }else{
        console.log(decodedToken.id);
        next()
      }
    });
  } else {
    res.redirect("/login");
  }
};

const checkCurrentUser = (req, res, next) => {
  const token = req.cookies.jwt;
    if(token){
      res.redirect("/")
    }else{
      next()
    }
};


const checkUser =(req,res,next)=>{
  const token = req.cookies.jwt;
  console.log("User Token:", token);
  if (token) {
    jwt.verify(token, process.env.secret, async (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.locals.user = null
        next()
      }else{
        console.log(decodedToken.id);
        const user = await User.findById(decodedToken.id)
        console.log(user)
        res.locals.user = user.user
        next()
      }
    });
  } else {
    res.locals.user = null
    next()
  }
}

module.exports = { authenticate, checkUser, checkCurrentUser };
