import { NextFunction, Request, Response, Router } from "express";
import TicketController from '../controller/ticket.controller'
import {auth} from '../middleware/auth.middleware'

const ticketRouter:Router = Router()



ticketRouter.post('/add-ticket',TicketController.create)
ticketRouter.get('/get-ticket',TicketController.get)
ticketRouter.get('/get-tv',TicketController.getTv)
ticketRouter.put('/miss-ticket',(req,res,next)=>TicketController.missTicket(req,res,next))
ticketRouter.put('/update-user',(req:Request,res:Response,next:NextFunction)=>TicketController.updateUser(req,res,next))


export {
  ticketRouter
}