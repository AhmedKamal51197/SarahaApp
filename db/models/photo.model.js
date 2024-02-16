import mongoose from "mongoose";
 const photoSchema=mongoose.Schema({
    image:String,
    title:String
},{
    timestamps:true
})
//Schema.pre get element by element from Databasxe
photoSchema.pre('init',function(doc){
    doc.image="http://localhost:3000/uploads/"+doc.image
})
export const photoModel= mongoose.model('photo',photoSchema) 