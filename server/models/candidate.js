const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
    name:String,
    education:String,
    email:String,
    resume:String,
    state:Number,
    comments:[
        {
            text: String,
            author:String,
            rating:Number
        }
    ]
})

module.exports = mongoose.model("Candidate",candidateSchema);