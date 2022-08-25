export class UserDto{
  user_id:number;
  login:string;
  terminal:string;
  sendNotice:boolean;
  getCurrentTicket:boolean;
  cabinet:number;
  setting?:any

  constructor(model:any) {
    this.user_id = model.user_id
    this.login = model.login
    this.sendNotice = model.sendNotice
    this.terminal = model.terminal
    this.getCurrentTicket = model.getCurrentTicket
    this.cabinet = model.cabinet
    this.setting = model.setting
  }
}