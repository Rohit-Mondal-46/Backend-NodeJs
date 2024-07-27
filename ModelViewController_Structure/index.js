const express = require("express")
const {connection} = require('./connections/user')
const userRouter = require('./routes/user')

const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//DB connection
connection('mongodb://localhost:27017/DBFirstPractice').then(()=>{
    console.log('DB connected')
}).catch(()=>{
    console.log("Error DB Not Connect")
})


//Routes
app.use('/users',userRouter)

//Listening
app.listen(3000,()=>console.log("Server Started"))
