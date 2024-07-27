const mongoose = require("mongoose")

const schema = mongoose.Schema({
    originalUrl:{
        type:String,
        required:true,
    },
    shortUrlId:{
        type:String,
        unique:true,
        required:true,
    },
    visitedHistory:[],
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    }
})

const Url = mongoose.model("urls",schema);

module.exports = Url