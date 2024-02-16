import express from 'express'
import { addMessage, getUserMessage } from './messages.controller.js'
import { auth } from '../../middleware/auth.js'
import { validation } from '../../middleware/validation.js'
import messageSchema from './message.validation.js'


const messageRoutes=express.Router()


messageRoutes.post("/addMessage/:id",validation(messageSchema),addMessage)
messageRoutes.get("/getUserMessage",auth(),getUserMessage)
export default messageRoutes