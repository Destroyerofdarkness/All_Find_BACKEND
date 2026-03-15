const jwt = require("jsonwebtoken");

const User = require("../models/User.js");

const { handleAuthError } = require("../handlers/errorHandler.js");

const maxValidDate = 3 * 24 * 60 * 60;

const createJWT = (id) => {
  return jwt.sign({ id }, process.env.secret, {
    expiresIn: maxValidDate,
  });
};

const sign_in = async (req, res) => {
  const { user, pass } = req.body.BODY;
  try {
    const userId = await User.login(user, pass);
    console.log("User ID:", userId);
    const token = createJWT(userId);
    res
      .status(200)
      .json({ token, message: "User signed in and token created!!" });
  } catch (err) {
    const error = handleAuthError(err);
    console.log(error);
    res.status(400).json({ error, message: "Failed To Sign in User!!" });
  }
};

const sign_up = async (req, res) => {
  const { user, pass } = req.body.BODY;
  try {
    const userId = await User.register(user, pass);
    const token = createJWT(userId);
    res
      .status(200)
      .json({
        token,
        success: true,
        message: "User Created and Token created!!",
      });
  } catch (err) {
    const error = handleAuthError(err);
    console.log(error);
    res
      .status(400)
      .json({ error, success: false, message: "User Failed To Sign Up" });
  }
};

const sendBackUser = async (req, res) => {
  const token = req.params.token;
  try {
    await jwt.verify(token, process.env.secret, async (err, decodedToken) => {
      if (err) {
        console.log("err:", err);
        res.status(400).json({
          success: false,
          message: `Failed to verify JWT cause: ${err.message}`,
        });
      } else {
        console.log(decodedToken);
        const user = await User.findById(decodedToken.id);
        console.log(user);
        res.status(201).json({
          success: true,
          user: user,
          message: "JWT token verified and user acquiered",
        });
      }
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Failed to verify JWT cause: Internal Server Error" });
  }
};

module.exports = {
  sign_in,
  sign_up,
  sendBackUser,
};
