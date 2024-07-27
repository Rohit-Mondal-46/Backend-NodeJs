const express = require("express")
const userRouter = express.Router();
const {handleLogin,handleSignup} = require('../controller/user')


userRouter.post("/signup",handleSignup)
userRouter.post("/login",handleLogin)


module.exports = userRouter;