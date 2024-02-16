import Joi from "joi"
let messageSchema=Joi.object({
    messageText:Joi.string().min(10).max(300).required(),
    params:{
      id:Joi.string().required()
      //.hex().length(24)
    }
})
export default messageSchema