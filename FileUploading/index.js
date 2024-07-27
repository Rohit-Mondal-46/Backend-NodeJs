//Import
const express = require('express')
const ejs = require('ejs')
const path = require('path')
const multer = require('multer');

//Instances
const app = express();
const upload1 = multer({dest:'photos/'}); //1 way of uploading(but not usefull)

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./photos')
    },
    filename:function (req,file,cb){
        cb(null,Date.now()+ '-' + file.originalname)
    }
})
const upload2 = multer({storage:storage})

//MiddleWare
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.set("view engine",'ejs')
app.set('views',path.resolve('./views'))


//DB connection (for now not required)


//Routing
app.get('/',(req,res)=>{
    return res.render('home')
})

const uploads = upload2.fields([{
    name:'photo',
    maxCount:1
},{
    name:'resume',
    maxCount:1
},{
    name:'sign',
    maxCount:1
}])

// app.post('/photo',upload2.single('photo'),(req,res)=>{ //single file upload
//     console.log(req.body);
//     console.log(req.file);
//     return res.end('file uploaded');
// })

app.post('/photo',uploads,(req,res)=>{ //Multiple uploads
    return res.end('file uploaded');
})


//Listening
app.listen('3000',console.log('server started'))