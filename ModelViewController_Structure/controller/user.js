const express = require("express")
const User = require('../models/user')

async function handleGetAllUsers(req,res){
    try {
        const allUsers = await User.find({});
        return res.status(200).json(allUsers) 
    } catch (error) {
        return res.status(502).send("Error");
    }
}
User.findOne()
async function handleAddNewUser(req,res){
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
}

async function handleGetUserById(req,res){
    try {
        const user = await User.findById(req.params.id);
        if(user){
            return res.status(200).json(user) 
        }
        else{
            return res.status(404).send("404 Not Found");
        }
    } catch (error) {
        return res.status(500).send("server Error");
    }
}

async function handleUpdateUserById(req,res){
    // update user details
    try {
        const user = await User.findByIdAndUpdate(req.params.id,req.body,{runValidators:true});
        if(!user){
            return res.status(404).send("404 Not Found");
        }
        return res.status(200).json(user) 
    } catch (error) {
        return res.status(400).send("Error updating user");
    }
}

async function handleDeleteUserById(req,res){
    try {
        const user = await User.findByIdAndDelete(req.params.id,);
        if(!user){
            return res.status(404).send("404 Not Found");
        }
        return res.status(200).send("user deleted successfully") 
    } catch (error) {
        return res.status(400).send("Error deleting the user");
    }
}

module.exports = {
    handleGetAllUsers,
    handleAddNewUser,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById
}