import {Request,Response,NextFunction} from "express";
import {createRelationShip} from "../services/service/service.service";

class ServiceUserController{
  async createRelationship(req:Request,res:Response,next:NextFunction):Promise<Response>{
    try{
      const data = await createRelationShip(req.body)
      return res.status(200).json(data)
    }catch (e) {
      return res.status(500).json(e)
    }
  }
}

export default new ServiceUserController()