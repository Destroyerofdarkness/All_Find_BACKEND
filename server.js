//Required Modules
const express = require("express");

const path = require("path");

const mongoose = require("mongoose");

require("dotenv").config();

const app = express();

const cors = require("cors");

//Routes
const gameRoute = require("./routes/game.js");

const animeRoute = require("./routes/anime.js");

const authRoute = require("./routes/auth.js");

const mainRoute = require("./routes/main.js");

const commentRoute = require("./routes/comment.js");

//Options conf
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: process.env.HOST,
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

//Used Routers
app.use("/anime", animeRoute);

app.use("/game", gameRoute);

app.use("/comment", commentRoute);

app.use(authRoute);

app.use(mainRoute);

app.use((req, res) => {
  res.status(404).json({ Path: "Api adress not found" });
});

//Server start and DB connection
app.listen(process.env.PORT, "0.0.0.0", async () => {
  await mongoose
    .connect(process.env.dbURI)
    .then((result) => {
      console.log("Succesfully connected to database");
    })
    .catch((err) => {
      console.log(err);
    });
});
