const express = require("express");
const router = express.Router({mergeParams:true});
const mongodb = require("mongodb");
const Candidate = require("../../models/candidate");
const Comment = require("../../models/comment");

// Add Comment
router.post("/",(req,res)=>{
    Candidate.findById(req.params.id,(err,candidate)=>{
        if(err){
            console.log(err);
        }
        else{
            candidate.comments.push({
                text:req.body.text,
                author:req.body.author,
                rating:req.body.rating,
            });
            candidate.save();
            res.status(201).send();
        }
    })
    
})


module.exports = router;