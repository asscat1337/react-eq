interface ServerToClientEvents{
  hello:()=>void,
  joinRoom:(room:any)=>void,
  createTicket:(data:any)=>void,
  showTv:(data:any)=>void,
  complete:(data:any)=>void,
  completeTransfer:(data:any)=>void,
  transferTicket:(data:any)=>void
}
interface ClientToServerEvents{
  test:()=>void,
  getTicket:(data:any)=>void,
  translateTv:(data:any)=>void,
  completeTv:(data:any)=>void,
  prepareTransfer:(data:any)=>void,
  transferData:(data:any)=>void,
}



export {
  ServerToClientEvents,
  ClientToServerEvents
}