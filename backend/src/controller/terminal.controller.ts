import { Request, Response, NextFunction } from "express";
import { get,create } from "../services/terminal/terminal.service";

class TerminalController {
  async get(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const { name } = req.query;
      const data = await get(name as string);
      return res.status(200).json(data);
    } catch (e) {
      console.log(e)
      return res.status(500).json(e);
    }
  }
  async create(req:Request,res:Response,next:NextFunction):Promise<Response>{
    try{
      const data = await create(req.body)
      return res.status(200).json(data)
    }catch (e) {
      return res.status(500).json(e)
    }
  }
}

export default new TerminalController();