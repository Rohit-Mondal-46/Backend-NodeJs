const express = require('express')
const cluster = require('cluster')
const os = require('os')

const totalCPUs = os.availableParallelism()


if(cluster.isPrimary){
    //fork
    for(let i=0; i<totalCPUs; i++){
        cluster.fork()
    }
}
else{
    const app = express()
    app.get('/',(req,res)=>{
        res.json({msg:`Served by ${process.pid}`})
    })
    app.listen('3000',()=>console.log(`Server ${process.pid} Started`))
}

