//Importing
const express = require('express')
const http = require('http')
const { Server } = require("socket.io");
const path = require('path')

const app = express()
app.use(express.static(path.resolve('./public')))
const server = http.createServer(app)
const io = new Server(server)

app.get('/',(req,res)=>{
    res.sendFile("/public/index.html")
})

io.on("connection", (socket)=>{
    // console.log('a user connected')
    socket.on("message",(msg)=>{
        console.log(msg);
        if(msg=='hii')
            io.emit('reply','hello user');
        else
            io.emit('reply',msg)
    })
})

server.listen(3000,()=> console.log("Server Started"))