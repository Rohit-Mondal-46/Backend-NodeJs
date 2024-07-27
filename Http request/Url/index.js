const http = require('http')
const url = require('url')


const myServer = http.createServer((req,res)=>{
    // res.end("hii there")
    const myUrl = url.parse(req.url,true);
    // console.log(myUrl)
    // console.log(myUrl.query.name)
    if(myUrl.pathname !== '/favicon.ico'){
        switch(myUrl.query.name){
                case 'rohit':    
                res.end("hii rohit")
                break;
                case 'rahul': res.end("hii rahul")
                break;
                case 'amit': res.end(
                    `<html>
                        <h6>your response ${myUrl.query.name}</h6>
                        <form>
                            <input placeholder="hello..."></input>
                        </form>
                    </html>`
                )
                break;
                default:
                    res.end('404 Not Found');
            }
        }
    // if(req.url !== '/favicon.ico')
    //     console.log(req.url);
}) 

myServer.listen(5000,()=>console.log("Server initiated"))