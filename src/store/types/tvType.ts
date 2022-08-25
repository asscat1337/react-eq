type Ticket = {
  ticket_id:number,
  ticket:number,
  isCall:boolean,
  service:any,
  user:any
}
type soundQueue = {
  sound:string[],
  data:Ticket
}


export interface ITv{
  tickets:Ticket[],
  loading:boolean,
  play:boolean,
  sound:string[],
  queue:soundQueue[],
}