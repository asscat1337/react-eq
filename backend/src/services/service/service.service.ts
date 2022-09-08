import { Service } from "../../models/Service";
import {Terminal} from "../../models/Terminal";
import {ServiceUser} from "../../models/ServiceUser";
import { IService,IServiceUser} from "./service.interface";


const create = async (data: IService) => {
  await Service.create({
    ...data
  });
  return data;
};
const get = async()=>{
  const data = await Service.findAll()
  return data
}

const createRelationShip=async(payload:IServiceUser)=>{
  const {user_id,service_id} = payload
  const data = await ServiceUser.create({
    user_id,
    service_id
  })
  return data
}
const updatePointer=async (data:any,terminalId:number)=>{
  return await Service.update({
    ...data
  },{
    where:{
     terminalId
    }
    }
  )
}


export {
  create,
  get,
  createRelationShip,
  updatePointer
};