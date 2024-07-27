const express = require("express")
const userRouter = express.Router();
const {handleDeleteUserById,handleUpdateUserById,handleGetAllUsers,handleAddNewUser,handleGetUserById} = require('../controller/user')
userRouter.get('/',handleGetAllUsers)

userRouter.post(`/post`,handleAddNewUser)

userRouter.route('/:id')
.get(handleGetUserById)
.patch(handleUpdateUserById)
.delete(handleDeleteUserById)


module.exports = userRouter;
