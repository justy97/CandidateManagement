const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
    name:String,
    education:String,
    email:String,
    // comments:[]
})

module.exports = mongoose.model("Candidate",candidateSchema);