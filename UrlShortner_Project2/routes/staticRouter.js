const express = require("express")
const staticRouter = express.Router();
const Url = require("../models/url");
// const { authStatus } = require("../middleware/auth");
const { restrictedTo } = require("../middleware/auth");


staticRouter.get('/',restrictedTo(['NORMAL']),async (req,res)=>{
    try {
        const allUrls = await Url.find({createdBy:req.user?._doc._id});
        // console.log('at home ',allUrls);
        if(!allUrls)
            return res.status(500).send("Server error");
        return res.render("home",{urls:allUrls})
    } catch (error) {
        return res.status(400).send("Error!");
    }
})


staticRouter.get('/user/signup',async (req,res)=>{
    return res.render("signup")
})


staticRouter.get('/user/login',async (req,res)=>{
    return res.render("login")
})


module.exports = staticRouter;