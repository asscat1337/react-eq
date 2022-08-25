import {Router,Request,Response,NextFunction} from 'express'
import UserController from '../controller/user.controller'

const userRouter:Router = Router()


userRouter.post('/create',(req:Request,res:Response,next:NextFunction)=>UserController.createUser(req,res,next))
userRouter.get('/get-user/:id',(req:Request,res:Response,next:NextFunction)=>UserController.getUser(req,res,next))
userRouter.post('/login',(req:Request,res:Response,next:NextFunction)=>UserController.login(req,res,next))
userRouter.get('/logout',(req:Request,res:Response,next:NextFunction)=>UserController.logout(req,res,next))
userRouter.get('/refresh',(req:Request,res:Response,next:NextFunction)=>UserController.refresh(req,res,next))
userRouter.get('/get-transfer',(req:Request,res:Response,next:NextFunction)=>UserController.getUserTransfer(req,res,next))

export {
  userRouter
}