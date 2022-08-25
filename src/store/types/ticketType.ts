export type Ticket = {
  serviceName?:string,
  ticket_id?:number,
  date?:string,
  time?:string,
  ticket?:string,
  notice?:string
}


export interface ITicket {
  data:Ticket[],
  loading:boolean,
  current:Ticket
}