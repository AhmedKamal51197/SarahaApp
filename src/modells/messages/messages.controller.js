import { isValidObjectId } from "mongoose"
import messageModel from "../../../db/models/message.model.js"
import userModel from "../../../db/models/user.model.js"
import sendOurMail from "../../utils/sendOirMail.js"
import handleAsyncError from "../../utils/handleAsyncError.js"

export const addMessage = handleAsyncError(async (req,res)=>{
   const messageText = req.body.messageText
   const id = req.params.id

    if(!messageText) return res.json({message:"message required"});
      
    //try {
        let foundUser= await userModel.findOne({
            _id:id
         })
    if(!foundUser) 
     {
      //  throw new Error("Object Not Found")
        res.json({meesage:"user not found"});
    }
     else{
        let addText= await messageModel.insertMany({messageText,recievedID:id})
        res.json({message:"message sent",addText});
     }

    // } catch (error) {
    //     res.json({
    //         Message: "ObjectID is incorrect"
    //     })
    // }

    //  console.log(foundUser instanceof userModel)
     
})
export const getUserMessage=handleAsyncError(async(req,res)=>{
        let allmessage=await messageModel.find({recievedID:req.userId})
        res.json({message:"massege box",allmessage})

})
