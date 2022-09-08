import { create, get, update,getTv} from "../services/ticket/ticket.service";
import {Op} from 'sequelize'
import dayjs from "dayjs";
import {Request,Response,NextFunction} from "express";
import {TicketDto} from '../dtos/ticket.dto'

class TicketController {
  async create(req:Request,res:Response,next:NextFunction):Promise<Response>{
    try {
      const date = dayjs().format('YYYY-MM-DD')
      const time = dayjs().format('HH:mm:ss')
      const ticket = new TicketDto({...req.body,date,time})
      const createData = await create({...ticket})
      return res.status(200).json(createData)
    }catch (e) {
      console.log(e)
      return res.status(500).json(e)
    }
  }
  async get(req:Request,res:Response,next:NextFunction):Promise<Response>{
    try{
      const {currentTicket,user_id} = req.query
      const variables = JSON.parse(currentTicket as string) ? {user_id:user_id} : {
          [Op.or]:[
            {user_id:user_id},
            {user_id:0}
          ]
      }
      const data = await get({
        isCall:0,
        isComplete:0,
        variables,
        user_id
      })
      return res.status(200).json(data)
    }catch (e) {
      console.log(e)
      return res.status(500).json(e)
    }
  }
  async getTv(req:Request,res:Response,next:NextFunction):Promise<Response>{
    try {
      const data = await getTv(
        {
          isCall:1,
          options:{
            limit: 20,
            order: [
              ['ticket_id', 'DESC']
            ]}
        }

      )
      return res.status(200).json({data:data})
    }catch (e) {
      console.log(e)
      return res.status(500).json(e)
    }
  }
  async updateIsCall(req:Request,res:Response,next:NextFunction):Promise<Response>{
    try{
      const {ticket_id} = req.body
      const data = await update({isCall:1},ticket_id)

      return res.status(200).json(data)
    }catch (e) {
      return res.status(500).json(e)
    }
  }
  async missTicket(req:Request,res:Response,next:NextFunction):Promise<Response>{
    try{
      const {ticket_id} = req.body

      await update({isComplete:1},ticket_id)

      return res.status(200).json({message:'Неявка'})
    }catch (e) {
      return res.status(500).json(e)
    }
  }
  async updateUser(req:Request,res:Response,next:NextFunction):Promise<Response>{
    try{
      const {user_id,ticket_id} = req.body
      const data = await update({
        user_id
      },ticket_id)

      return res.status(200).json(data)
    }catch (e) {
      return res.status(500).json(e)
    }
  }
  async transferTicket(req:Request,res:Response,next:NextFunction):Promise<Response>{
    try{
      const {user_id,ticket_id} = req.body

      const data = await update({
        user_id
      },ticket_id)

      return res.status(200).json(data)
    }catch (e) {
      return res.status(500).json(e)
    }
  }

  async completeTicket(req:Request,res:Response,next:NextFunction):Promise<any>{
    try{
      const {ticket_id} = req.body

      const data = await update({
        isCall:1
      },ticket_id)

      return res.status(200).json(data)

    }catch (e) {
      return res.status(500).json(e)
    }
  }
}


export default new TicketController()