const mongoose = require('mongoose')

const schema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true,
        default:"NORMAL"
    }
    

},{timestamp:true})

const User = mongoose.model("users",schema);

module.exports = User;