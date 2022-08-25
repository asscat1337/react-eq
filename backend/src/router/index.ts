import express from "express";
import {serviceRoute} from'./service.route'
import {terminalRoute} from './terminal.route'
import {ticketRouter} from "./ticket.router";
import { userRouter } from "./user.router";

const router = express()

router.use('/service',serviceRoute)
router.use('/terminal',terminalRoute)
router.use('/ticket',ticketRouter)
router.use('/user',userRouter)


export {
  router

}