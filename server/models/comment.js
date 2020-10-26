const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    text:String,
    author:String,
    rating:Number,
})

module.exports = mongoose.model("Comment",commentSchema);