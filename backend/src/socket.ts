import { find } from "./services/serviceUser/serviceUser.service";
import { update } from "./services/ticket/ticket.service";
import {io} from './server'
import { Socket } from "socket.io";

const connection = new Set()


const socket=async ()=>io.on('connection',(sock:Socket)=>{
    console.log(`connected ${sock.id}`);
    connection.add(sock)
    sock.on("joinRoom", async (room:any) => {
      sock.join(room);
      console.log(room)
    });
  sock.on("createTicket", async (data:any) => {
    const findCurrent = await find(data.service_id);
    findCurrent.map(async (curr)=>{
      if(curr.service_id === data.service_id){
         sock.broadcast.to(`ackt${curr.user_id}`).emit("getTicket", data);
      }
    })
  });
  sock.on("showTv", async (data:any) => {
    await update({ isCall: 1 }, data.ticket_id);
    const {service} = data
    const {terminal} = service

    sock.to(terminal.name).emit("translateTv", data);
  });
  sock.on("complete", (data:any) => {
    console.log(data)
    io.in("ackt").emit("completeTv", data);
  });
  sock.on("completeTransfer",(data:any)=>{
    io.in("ackt").emit("prepareTransfer",data)
  })
  sock.on("transferTicket", async(data:any) => {
    console.log(data)
    const sendObject = data.sendNotice && {
      notice:data.notice
    }
    const {service} = data
    const {terminal} = service
    await update({
      user_id:data.transferNumber,
      isCall:0,
      ...sendObject
    },data.ticket_id)
    io.in(`${terminal.name}${data.transferNumber}`).emit("transferData",data)
  });

  sock.on('disconnect',async (  )=>{
    console.log(`socket ${sock.id} disconnected`)
    connection.delete(sock)
    sock.disconnect(true)
  })
})

export {
  socket
};