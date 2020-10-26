const express = require("express");
const router = express.Router();
const mongodb = require("mongodb");
const Candidate = require("../../models/candidate");
const multer = require("multer");
const fs = require("fs");

// file upload setup
const storage = multer.diskStorage({
    destination:"./uploads",
    filename:function(req,file,cb){
        cb(null,file.originalname+'-'+Date.now()+".pdf");
    }
});

const upload = multer({storage:storage});

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
router.post("/",upload.single("file"),async(req,res)=>{
    const candidates = await loadCandidatessCollection();
    let fileName = req.file.filename;
    // console.log(fileName);
    res.json({file:req.file});
    const candidate = new Candidate({
        name:req.body.name,
        education:req.body.education,
        email:req.body.email,
        resume:fileName,
        state:0
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

// Update Candidate State
router.put("/:id/edit",async(req,res)=>{
    const candidates = await loadCandidatessCollection();
    const newState = req.body.newState;
    try{
        candidates.updateOne(
            {"_id" : new mongodb.ObjectId(req.params.id)},
            { $set:{"state":newState }}
        );
    }catch(err){
        console.log(err);
    }
})

// Upload File
router.post("/upload",upload.single("file"),async(req,res)=>{
    console.log("uploaded file");
    let fileName = req.file.filename;
    console.log(fileName);
    res.json({file:req.file});
})

// GET local pdf
router.get('/asset/:filename',(req,res)=>{  
    const filePath = "./uploads/"+req.params.filename;
    fs.readFile(filePath,(err,data)=>{
        // console.log("err:" + err);
        res.contentType("application/pdf");
        res.send(data);
    })
})

async function loadCandidatessCollection() {
    const client = await mongodb.MongoClient.connect
    (process.env.DATABASEURL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    });
    
    return client.db("kanban").collection("candidates");
}

module.exports = router;