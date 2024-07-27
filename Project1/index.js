//imports
const express = require("express")
let users = require("./MOCK_DATA.json")
const fs = require("fs")
//instance
const app = express();
app.use(express.urlencoded({extended:true}));
//Routes
app.get("/users",(req,res)=>{
    return res.json(users)
})

app.route('/users/:id')
.get((req,res)=>{
    const user = users.find(item => item.id===Number(req.params.id));
    if(user)
        res.json(user)
    else
    res.send("not found")
})
.patch((req,res)=>{
    //update user details
    const newUsers = users.map(item => {
        if(item.id === Number(req.params.id)){
            return {...item,...req.body}
        }
        return item;
    })
    users = newUsers;
    fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=>{
        res.json({
            "status":`success with user the given details`
        })
    })
})
.delete((req,res)=>{
    const newUsers = users.filter(item => {
        if(item.id !== Number(req.params.id)){
            return item;
        }
    })
    users = newUsers;
    fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=>{
        res.json({
            "status":`success with user the given details`
        })
    })
})





app.post(`/users/post`,(req,res)=>{
    users.push({...req.body,id:users.length + 1});
    fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=>{
        res.json({
            "status":`success with id: ${users.length}`
        })
    })
})





//listening
app.listen(3000,()=>console.log("Server Started"))
