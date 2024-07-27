//imports
const express = require("express")
let users = require("./MOCK_DATA.json")
const fs = require("fs")
const PORT = 3005

//instance
const app = express();


//MiddleWare
app.use(express.urlencoded({extended:true}));


//Custom MiddleWare
app.use('/users/:id',(req,res,next)=>{
    console.log("Hello from Middleware 1");
    console.log(req.params.id);
    // (Number(req.params.id) < 500) ? next():res.json({"msg":"Rejected from M1"});
    // if(req.params.id){
    //     if(Number(req.params.id) < 500){
    //         next();
    //     }
    //     else{
    //         res.json({"msg":"Rejected from M1"});
    //     }
    // }
    // else{
        next();
    // }
    
})

//Routes
app.get("/users",(req,res)=>{
    res.setHeader("X-name","rohti")
    return res.json(users)
})

app.route('/users/:id')
.get((req,res)=>{
    const user = users.find(item => item.id===Number(req.params.id));
    if(user)
        res.json(user)
    else
    res.status(404).send("404 Not Found")
})
.patch((req,res)=>{
    //update user details
    if(Number(req.params.id)>users[users.length-1].id){
        res.status(404).end("404 Not Found")
    }
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
    if(Number(req.params.id)>users[users.length-1].id){
        res.status(404).end("404 Not Found")
    }
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
    if(!req.body.email || !req.body.first_name ||  !req.body.last_name || !req.body.gender){
        res.status(400).end("All fields are required")
    }
    users.push({...req.body,id:users[users.length -1].id + 1});
    fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=>{
        res.status(201).json({
            "status":`success with id: ${users.length}`
        })
    })
})





//listening
app.listen(PORT,()=>console.log("Server Started"))
