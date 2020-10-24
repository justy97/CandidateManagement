const express = require("express");
const bodyParser = require("body-parser");
const mongoose=require("mongoose");

const app = express();

// const candidateRoutes = require("./routes/main"),
//         commentRoutes = require("./routes/comments");

// mongoose.connect

app.set('port',(process.env.PORT || 3000));
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));

const posts = require("./routes/api/post.js");

app.use("/api/posts",posts);

app.get('/',(req,res)=>{
    console.log("Main Page");
    res.send("main page");
})

// let port = process.env.PORT;
app.listen(app.get('port'),()=> console.log("server has started"));