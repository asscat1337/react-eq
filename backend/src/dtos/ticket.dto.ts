export class TicketDto {
  ticket: string;
  date:string;
  time:string;
  service_id:number;
  serviceName:string;
  isCall:boolean;
  cabinet:number;
  isComplete:boolean;

  constructor(model:any) {
    this.service_id = model.service_id
    this.date = model.date
    this.time = model.time
    this.ticket = `${model.letter}${model.pointer}`
    this.serviceName = model.serviceName
    this.isCall = model.isCall
    this.cabinet = model.cabinet
    this.isComplete = model.isComplete

  }
}