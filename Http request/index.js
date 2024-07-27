const http = require('http')
const fs = require('fs')

const myServer = http.createServer((req,res)=>{
    // const userData = `new request come at ${Date.now()}\n`
    // fs.appendFile('./text1.txt',userData,(err,data)=>{
    //     res.end(`you are welcome to my server @ ${data}`);
    // })
    res.end('hii');
    console.log(req);
})

myServer.listen(3005,()=> console.log('Server Started'))