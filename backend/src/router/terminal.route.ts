import { Router } from 'express';
import ServiceController from '../controller/service.controller'
import TerminalController from '../controller/terminal.controller'

const terminalRoute: Router = Router();

terminalRoute.get('/get-service',ServiceController.get);
terminalRoute.get('/get-terminal',TerminalController.get)
terminalRoute.post('/create-terminal',TerminalController.create)

export { terminalRoute };
