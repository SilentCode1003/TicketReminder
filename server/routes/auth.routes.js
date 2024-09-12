import express from 'express'
import { login, logout } from '../controller/auth.controller.js'

export const authRouter = express.Router()

authRouter.post('/', login)

authRouter.post('/logout', logout)