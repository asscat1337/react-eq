import {Tickets} from "../../models/Tickets";
import {Service} from "../../models/Service";
import {Ticket} from "./ticket.interface";
import { Terminal } from "../../models/Terminal";
import { CabinetType } from "../../models/CabinetType";
import { Users } from "../../models/Users";


const create = async (newData:Ticket)=>{
  const newTicket = await Tickets.create(newData,{
    raw:true,
    nest:true,
  })
  await Service.increment({pointer:1},{
    where:{
      service_id:newData.service_id
    }
  })
  const data = await Tickets.findOne({
    where:{
      ticket_id:newTicket.ticket_id
    },
    include:[{
      model:Service,
      include:[{
        model:Terminal
      },{
        model:CabinetType
      }]
    }],
    raw:true,
    nest:true
  })
  // говнище
  return {
    ...data
  }
  //

}

const get = async (object:any)=>{
  const {isCall,isComplete,variables} = object
  const data = Tickets.findAll({
    where:{
      isCall,
      isComplete,
      ...variables,
    },
    include:[{
      model:Service,
      include:[{
        model:Terminal
      },
        {
          model:CabinetType
        }
      ],
    }]
  })
  return data
}

const update = async (obj:object,ticket_id:number)=>{
  const data = await Tickets.update({
    ...obj
  },{
    where:{
      ticket_id
    }
  })
  return data
}
const getTv=async(obj:any)=>{
  const {isCall,options} = obj
  const users = await Users.findAll({
    raw:true,
    attributes:['user_id','login','cabinet']
  })
  const ticketData =  await Tickets.findAll({
    where: {
      isCall
    },
    ...options,
    include: [{
      model: Service,
      include: [{
        model: CabinetType
      }, {
        model: Terminal
      }]
    }],
    raw:true,
    nest:true
  })
  const data = ticketData.map((item:any)=>{
    return {
      ...item,
      user:users.find(user=>user.user_id === item.user_id)
    }
  })
  return data
}
const deleteTickets=async(options:any)=>{
  return await Tickets.destroy({
    where:{
      ...options
    }
  })
}



export {
  create,
  get,
  update,
  getTv,
  deleteTickets
}