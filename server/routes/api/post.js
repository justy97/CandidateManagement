const express = require("express");
const mongodb = require("mongodb");

const router = express.Router();

// Get All Candidates
router.get("/",(req,res)=>{
    res.send("Get All - Route");
})

// Add Candidate

// Delete Candidate: nor specified, but can build. 

module.exports = router;