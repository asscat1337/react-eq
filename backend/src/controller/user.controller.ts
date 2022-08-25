import { Response, Request, NextFunction } from "express";
import { create, get, loginUser, refresh } from "../services/user/user.service";
import { Op } from "sequelize";
import {Settings} from "../models/Settings";


class UserController {
  async createUser(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const data = await create(req.body);

      return res.status(200).json(data);
    } catch (e) {
      return res.status(500).json(e);
    }
  }

  async getUser(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const { id } = req.params;
      const data = await get({terminal:id});

      return res.status(200).json(data);
    } catch (e) {
      console.log(e);
      return res.status(500).json(e);
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const data = await loginUser(req.body);
      res.cookie("cookie", data.tokens.refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000
      });
      return res.status(200).json(data);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ error: e });
    }
  }

  async logout(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      res.clearCookie("cookie");
      return res.status(200).json({ logout: true });
    } catch (e) {
      return res.status(500).json(e);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction):Promise<Response> {
    try{
      const { cookie } = req.cookies;
      const data = await refresh(cookie);
      return res.status(200).json(data)
    }catch (e) {
      return res.status(500).json(e)
    }
  }
  async getUserTransfer(req:Request,res:Response,next:NextFunction):Promise<Response>{
    try{
      const {terminal,user_id} = req.query

      const data = await get({terminal,user_id:{[Op.ne]:user_id}})

      const mappedData = data.map(item=>{
        return {
          id:item.user_id,
          label:item.login
        }
      })

      return res.status(200).json(mappedData)
    }catch (e) {
      console.log(e)
      return res.status(500).json(e)
    }
  }
}

export default new UserController();