import { Request, Response, NextFunction } from 'express';
import { create,get } from '../services/service/service.service';

class ServiceController {
  async create(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const newService = await create(req.body);
      return res.status(200).json(newService);
    } catch (e) {
      return res.status(500).json(e);
    }
  }
  async get(req:Request,res:Response,next:NextFunction):Promise<Response>{
    try{
      const data = await get()

      return res.status(200).json(data)
    }catch (e) {
      return res.status(500).json(e)
    }
  }
}

export default new ServiceController();
