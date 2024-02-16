import mongoose from 'mongoose'
const messageSchma=new mongoose.Schema({
    messageText:String,
    recievedID:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    }
},{
    timestamps:true
})


const messageModel= mongoose.model("Message",messageSchma);
export default messageModel