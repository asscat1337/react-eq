import { Terminal } from "../../models/Terminal";
import {Service} from "../../models/Service";
import { TerminalType } from "./terminal.interface";


const get = async (name:string)=>{
  return await Terminal.findOne({
    where: {
      name
    },
    include:[{
      model:Service,
      as:"service",
      where:{
        status:1
      }
    }]
  })
}
const create = async (data:TerminalType)=>{
  return await Terminal.create(data)
}


export {
  get,
  create
}

