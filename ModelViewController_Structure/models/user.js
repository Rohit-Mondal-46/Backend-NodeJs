const mongoose = require("mongoose")

//Schema
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

module.exports = User