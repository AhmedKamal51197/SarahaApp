import mongoose from 'mongoose'
const userSchma=new mongoose.Schema({
    name:String,
    email:String,
    age:Number,
    password:String,
    isVerify:{
        type:Boolean,
        default:false
    }
},
{
    timestamps:true
}
)
const userModel= mongoose.model("User",userSchma)
export default userModel