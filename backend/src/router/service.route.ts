import { Router,Request,Response,NextFunction} from 'express';
import ServiceController from '../controller/service.controller'
import ServiceUserController from '../controller/serviceUser.controller'

const serviceRoute: Router = Router();

serviceRoute.post('/add-service',(req:Request,res:Response,next:NextFunction)=>ServiceController.create(req,res,next));
serviceRoute.post('/create-relationship',(req:Request,res:Response,next:NextFunction)=>ServiceUserController.createRelationship(req,res,next))


export { serviceRoute };
