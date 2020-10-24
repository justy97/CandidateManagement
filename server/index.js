const express = require("express");
const bodyParser = require("body-parser");
const mongoose=require("mongoose");

const app = express();

// // mongoose.connect(process.env.DATABASEURL, {
// mongoose.connect("mongodb://127.0.0.1:27017/kanban", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
// .then(() => console.log('Connected to DB!'))
// .catch(error => console.log(error.message));

const candidates = require("./routes/api/candidates.js");//routes to candidates

app.use(bodyParser.json());
app.set('port',(process.env.PORT || 3000));
// app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));


app.use("/api/candidates",candidates);

app.get('/',(req,res)=>{
    console.log("Main Page");
    res.send("main page");
})

let port = process.env.PORT;
app.listen(app.get('port'),()=> console.log("server has started"));