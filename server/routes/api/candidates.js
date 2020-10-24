const { Router } = require("express");
const express = require("express");
const mongodb = require("mongodb");

const router = express.Router();

// Get All Candidates
router.get("/",async(req,res)=>{
     const candidates = await loadCandidatessCollection();
     res.send(await candidates.find({}).toArray());
})

// Add Candidate
router.post("/",async(req,res)=>{
    const candidates = await loadCandidatessCollection();
    await candidates.insertOne({
        name:req.body.name
    });
    res.status(201).send();
})

// Delete Candidate: nor specified, but can build. 
router.delete("/:id",async(req,res)=>{
    const candidates = await loadCandidatessCollection();
    await candidates.deleteOne({
        _id: new mongodb.ObjectID(req.params.id)
    });
    res.status(200).send();
})

async function loadCandidatessCollection() {
    const client = await mongodb.MongoClient.connect
    ("mongodb://127.0.0.1:27017/kanban",{
        useNewUrlParser:true,
        useUnifiedTopology:true
    });
    
    return client.db("kanban").collection("candidates");
}

module.exports = router;