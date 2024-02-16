import express from 'express'
import {editUser, getUserInfo, signIn, signUp, updatedPassword, verifyAccount}  from './users.controller.js';
import { auth } from '../../middleware/auth.js';
import { validation } from '../../middleware/validation.js';
import { signInSchema, signUpSchema } from './user.validation.js';
const userRoutes=express.Router()


userRoutes.post('/signUp',validation(signUpSchema),signUp)


userRoutes.post('/signIn',validation(signInSchema),signIn)

userRoutes.post('/Edit',auth(),editUser)

userRoutes.get('/getUserInfo',auth(),getUserInfo)

userRoutes.post('/updatedPassword',auth(),updatedPassword)

userRoutes.get('/user/verify/:token',verifyAccount)
export default userRoutes;