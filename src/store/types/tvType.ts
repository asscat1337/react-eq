type Ticket = {
  ticket_id:number,
  ticket:number,
  isCall:boolean
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