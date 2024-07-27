const User = require('../models/user')
// const { v4: uuidv4 } = require('uuid'); ////StateFull auth
const {setUser} = require('../service/authStateLess');
// const {setUser} = require('../service/Auth') //StateFull auth


async function handleSignup(req,res){
    const {name,email,password,role} = req.body;
    const user = await User.create({
        name,email,password,role
    })
    if(!user)
        return res.status(400).send("Error")
    return res.redirect("/user/login");
}

async function handleLogin(req,res){
    const {email,password} = req.body;
    const user = await User.findOne({email,password})
    if(!user)
        return res.status(404).send("Wrong Credentials");
    // const sessionId = uuidv4(); //StateFull auth
    // setUser(sessionId,user); //StateFull auth
    // res.cookie("uid",sessionId) //StateFull auth


    const token = setUser(user)
    res.cookie("token",token)
    return res.redirect("/");
}


module.exports = {
    handleLogin,handleSignup
}