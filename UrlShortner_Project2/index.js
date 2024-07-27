//Importing
const express = require("express")
const connection = require('./connections/url')
const urlRouter = require('./routes/url')
const staticRouter = require('./routes/staticRouter')
const userRouter = require('./routes/user')
const ejs = require('ejs')
const cookieParser = require('cookie-parser')
// const {AccessToLoggedOnly} = require("./middleware/auth")
const {authentication,restrictedTo} = require("./middleware/auth")



const app = express();
const path = require('path')


//Middleware
app.use(cookieParser());
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(authentication);



//DB connection
connection('mongodb://localhost:27017/url-shortner-project2')
.then(()=>console.log('DB connected'))
.catch(()=>console.log('DB not connected'))


//Ejs setup
app.set('view engine','ejs');
app.set("views",path.resolve('./views'))


//Routes
app.use('/',staticRouter)
app.use('/url',restrictedTo(['NORMAL']),urlRouter)
app.use('/user',userRouter)


//Listening
app.listen(3001,()=>console.log("server started"))