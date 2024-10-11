const express = require("express");
const dbConnect = require("./mongo.js");
const mongoDB = require("mongodb");

const app = express();

app.use(express.json());

app.get("/webtoons",async(req,res)=>{
    let data = await dbConnect();
    data = await data.find().toArray();
    res.send(data);
});

app.get("/webtoons/:id",async(req,res)=>{
    try{
        let data = await dbConnect();
        const webId = new mongoDB.ObjectId(req.params.id);
        let result = await data.findOne({ _id: webId });
        if (!result) {
            return res.status(404).send("Webtoon not found");
        }
        
        res.send(result);
         }catch (error) {
        res.status(500).send("Error retrieving the webtoon: " + error.message);
      }
});

app.post("/webtoons",async(req,res)=>{
    let data = await dbConnect();
    let result = await data.insertOne(req.body)
    res.send(result);
});

app.delete("/webtoons/:id",async(req,res)=>{
    let delId = req.params.id;
    let data = await dbConnect();
    let result = await data.deleteOne({_id: new mongoDB.ObjectId(req.params.id)});
    res.send(result);
})

app.listen(5000,()=>{
    console.log(`listening to port 5000`);
});
