import { find } from "./services/serviceUser/serviceUser.service";
import { update } from "./services/ticket/ticket.service";
import { io } from "./server";
import { Socket } from "socket.io";
import { rooms } from "./utils/rooms";

const connection = new Set();


const socket = async () => io.on("connection", (sock: Socket) => {
  console.log(`connected ${sock.id}`);
  connection.add(sock);
  sock.on("joinRoom", async (room: any) => {
    sock.join(room);
  });
  sock.on("createTicket", async (data: any) => {
    const findCurrent = await find(data.service_id);
    const { service } = data;
    const { terminal } = service;
    findCurrent.map(async (curr) => {
      if (curr.service_id === data.service_id) {
        const toRooms = rooms(terminal.name, curr.user_id);
        sock.broadcast.to(toRooms).emit("getTicket", data);
      }
    });
  });
  sock.on("showTv", async (data: any) => {
    await update({ isCall: 1 }, data.ticket_id);
    const { service } = data;
    const { terminal } = service;

    sock.to(terminal.name).emit("translateTv", data);
  });
  sock.on("complete", (data: any) => {
    const { service } = data;
    const { terminal } = service;
    io.in(terminal.name).emit("completeTv", data);
  });
  sock.on("completeTransfer", (data: any) => {
    const { service } = data;
    const { terminal } = service;
    io.in(terminal.name).emit("prepareTransfer", data);
  });
  sock.on("transferTicket", async (data: any) => {
    const sendObject = data.sendNotice && {
      notice: data.notice
    };
    const { service } = data;
    const { terminal } = service;
    const currentRoom = rooms(terminal.name, data.transferNumber);
    await update({
      user_id: data.transferNumber,
      isCall: 0,
      ...sendObject
    }, data.ticket_id);
    io.in(currentRoom).emit("transferData", data);
  });

  sock.on("disconnect", async () => {
    console.log(`socket ${sock.id} disconnected`);
    connection.delete(sock);
    sock.disconnect(true);
  });
});

export {
  socket
};