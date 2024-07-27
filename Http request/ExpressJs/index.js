const express = require('express')

const app = express();

app.get('/',(req,res)=>{
    return res.send("Hello form home page " + req.query.name);
})
app.get('/about',(req,res)=>{
    return res.send("Hello form about page");
})
app.get('/contact',(req,res)=>{
    return res.send("Hello form contact page");
})

app.listen(3000,()=>console.log("server started"));
