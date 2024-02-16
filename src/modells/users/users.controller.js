import bcrypt from 'bcrypt'
import  jwt  from 'jsonwebtoken'
import userModel from '../../../db/models/user.model.js'
import sendOurMail from '../../utils/sendOirMail.js'
import handleAsyncError from '../../utils/handleAsyncError.js'
export const  signUp= handleAsyncError(async(req,res)=>{
   let  {name,email,password,Cfpassword,age} = req.body

   let founded = await userModel.findOne({email},{})
    if(founded)
    {
      return res.json({message:"user is already exist"})
    }
    let hashedPassword= bcrypt.hashSync(password,10)

   let addUser=await userModel.insertMany({name,email,age,password:hashedPassword})
   let token=jwt.sign({id:addUser[0]._id},"VERIFYACCOUNT")
   sendOurMail({email,url:`http://localhost:3000/user/verify/${token}`})   
   res.json({message:"added done",addUser})
  
})



export const signIn= handleAsyncError(async(req,res)=>{
   let {email,password} =req.body
   // console.log(email,password);
    let founded= await userModel.findOne({email,isVerify:true},{});
    //console.log(founded.password)
    if(!founded)
    {
     return res.json({message:"User Not Found you must register first or verify your account"})
    }
    if(!bcrypt.compareSync(password,founded.password))
    {
     return res.json({message:"Incorrect password"})
    }
    let token=jwt.sign({id:founded._id,name:founded.name},"OpenSource44")
    return res.json({message:"Welcome",token})
    
  })
 
export const editUser= handleAsyncError(async(req,res)=>{
  console.log(req.userId,req.headers.name);
   await userModel.updateOne({_id:req.userId},{$set:{name:req.headers.name}})
   let updatedUser= await userModel.findById({_id:req.userId},{name:1})
  res.json({message:"updated done",updatedUser})
})

export const getUserInfo= handleAsyncError(async(req,res)=>{
  let userInfo= await userModel.findById({_id:req.userId})
  res.json({message:"your Info",userInfo})
})

export const updatedPassword=handleAsyncError(async(req,res)=>{
  // console.log("hi")
  let currentUser= await userModel.findById({_id:req.userId});
  if(!bcrypt.compareSync(req.headers.oldpassword,currentUser.password))
  {
    return res.json({message:"Incorrect password"})
  }
  else if(req.headers.newpassword!=req.headers.cnewpassword)
  {
    return res.json({message:"New password and confirm paswword should be match"});
  }
  else
  {
    //console.log(currentUser.password);
    let newHashPassword=bcrypt.hashSync(req.headers.newpassword,10);
     currentUser.password=newHashPassword;
      currentUser.save()
     // console.log(currentUser.password);

     res.json({message:"Password Changed"})
  }
})

export const verifyAccount = handleAsyncError((req,res)=>{
  jwt.verify(req.params.token,"VERIFYACCOUNT",async (error,decoded)=>{
    if(error)
    {
      return res.json({message:"invalid Token"})
    }
  
    let updatedUser = await userModel.findByIdAndUpdate(decoded.id,{isVerify:true},{new:true})
      res.json({message:"hello",updatedUser})
  })
  
})