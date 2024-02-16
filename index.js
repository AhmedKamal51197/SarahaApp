import express from 'express'
import { initConnection } from './db/connection.js'
import userRoutes from './src/modells/users/users.routes.js'
import messageRoutes from './src/modells/messages/messages.routes.js'
import multer from 'multer'
import { v4 as uuidv4 } from 'uuid';
import { photoModel } from './db/models/photo.model.js'
const app =express()
const port=3000

initConnection()


app.use('/uploads',express.static("uploads/"))
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads/')
    },
    filename:function(req,file,cb){
        cb(null,uuidv4()+"_"+file.originalname)
    }
})
const uploads=multer({storage})
app.post('/uploads',uploads.single('image'),async(req,res)=>{
    console.log(req.file)
    let addImages=await photoModel.insertMany({image:req.file.filename,title:req.body.title})
    res.json({message:"addedImage done",addImages})
})

app.get('/photo',async(req,res)=>{
    let allPhotos=await photoModel.find();
    // allPhotos.forEach(photo => {
    //     photo.image="http://localhost:3000/uploads/"+photo.image
    // });
    res.json({message:"all photo",allPhotos})
})

app.use(express.json())
app.use(userRoutes)
app.use(messageRoutes)

app.get("/",(req,res)=>res.send("helloworld"))
app.listen(port,()=>console.log(`app listen ${port}`))