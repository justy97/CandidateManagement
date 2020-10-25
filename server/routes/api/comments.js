const express = require("express");
const router = express.Router({mergeParams:true});
const mongodb = require("mongodb");
const Candidate = require("../../models/candidate");
const Comment = require("../../models/comment");

// Add Comment
router.post("/",(req,res)=>{
    // const new_comment = new Comment({
    //     text:"comment text1111",
    //     author:"comment author111"
    // });
    // console.log(req.params);
    Candidate.findById(req.params.id,(err,candidate)=>{
        if(err){
            console.log(err);
        }
        else{
            candidate.comments.push({
                text:req.body.text,
                author:req.body.author
            });
            candidate.save();
            res.status(201).send();

            // Comment.create(new_comment,(err,new_comment)=>{
            //     if(err) console.log(err);
            //     else{
            //         candidate.comments.push(new_comment);
            //         candidate.save();
            //         res.status(201).send();
            //     }
            // })
        }
    })
    
})

// Delete Comment
router.delete("/:id",async(req,res)=>{
    await Comment.findByIdAndRemove(req.params.id,(err)=>{

    })
    res.status(200).send();
})

module.exports = router;