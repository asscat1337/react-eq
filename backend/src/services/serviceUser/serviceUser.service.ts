import {ServiceUser} from "../../models/ServiceUser";



const find=(id:number)=>{
  return ServiceUser.findAll({
    where:{
      service_id:id
    },
    raw:true
  })
}

export {
  find
}