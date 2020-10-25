const express = require("express");
const router = express.Router();
const mongodb = require("mongodb");
const Candidate = require("../../models/candidate");

// Get All Candidates
router.get("/",async(req,res)=>{
    //  res.send(await candidates.find({}).toArray());
     Candidate.find({},(err,allcandidates)=>{
        if(err) console.log(err);
        else{
            res.send(allcandidates);
        }
     })
})

// Add Candidate
router.post("/",async(req,res)=>{
    const candidates = await loadCandidatessCollection();
    const candidate = new Candidate({
        name:req.body.name,
        education:req.body.education,
        email:req.body.email
    })

    await candidates.insertOne(candidate);
    res.status(201).send();
})

// Delete Candidate
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