const express = require("express");

const path = require("path");

const mongoose = require("mongoose");

require("dotenv").config();

const app = express();

const cors = require("cors");

const {checkUser} = require("./middleware/jwtAuth.js")

const {search}= require("./middleware/search.js")

const gameRoute = require("./routes/game.js");

const animeRoute = require("./routes/anime.js");

const authRoute = require("./routes/auth.js")

const mainRoute = require("./routes/main.js")

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.use(search)

app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET","POST", "DELETE","PUT"],
    allowedHeaders: ["Content-Type","Authorization"]
}))


app.use("/home/anime", animeRoute);

app.use("/home/game", gameRoute);

app.use(authRoute)

app.use(mainRoute)

app.use((req, res) =>{
    res.status(404).json({Path: "Api adress not found"});
});


app.listen(process.env.PORT,"0.0.0.0", async()=>{
await mongoose.connect(process.env.dbURI)
.then((result)=>{
    console.log("Succesfully connected to database")
})
.catch((err)=>{
    console.log(err)
})
});
