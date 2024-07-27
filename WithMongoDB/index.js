const express = require("express")
const mongoose = require("mongoose")
const app = express();


//middleware
app.use(express.urlencoded({extended:true}));

//DB connection
const schema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    gender:{
        type:String,
    },
   
});

const User = mongoose.model("users",schema)

const connection = mongoose.connect("mongodb://localhost:27017/DBFirstPractice")

connection
.then(()=>console.log("DB connect"))
.catch((err)=>console.log("DB Connection Err",err));

//Routes
app.get("/users",async (req,res)=>{
    try {
        const allUsers = await User.find({});
        return res.status(200).json(allUsers) 
    } catch (error) {
        return res.status(500).send("server Error");
    }
})

app.post(`/users/post`,async (req,res)=>{
    if(!req.body.firstName || !req.body.email){
        res.status(400).send({msg:"both firstName and email required "})
    }
    const user = await User.create({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        gender:req.body.gender
    })
    if(user)
        res.status(201).send({"msg":"success"});
    else
        res.status(400).send({"msg":"some Err Occured from userSide"})
})

app.

//listening
app.listen(3000,()=>console.log("Server Started"))
