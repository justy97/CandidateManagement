const express = require("express");
const bodyParser = require("body-parser");
const mongoose=require("mongoose");
const cors = require("cors");
const multer = require("multer");

const app = express();

// mongoose.connect(process.env.DATABASEURL, {
mongoose.connect("mongodb://127.0.0.1:27017/kanban", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

app.use(bodyParser.json());
app.set('port',(process.env.PORT || 3000));
// app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));
app.use(cors());

const candidateRoutes = require("./routes/api/candidates.js");//routes to candidates
const commentRoutes = require("./routes/api/comments.js");//routes to comments
app.use("/api/candidates",candidateRoutes);
app.use("/api/candidates/:id/comments",commentRoutes);

app.get('/',(req,res)=>{
    console.log("Main Page");
    res.send("main page");
})

let port = process.env.PORT;
app.listen(app.get('port'),()=> console.log("server has started"));