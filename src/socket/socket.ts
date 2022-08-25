import { io,Socket } from "socket.io-client";
import {ServerToClientEvents,ClientToServerEvents} from "../@types/socket";


export const socket:Socket<ServerToClientEvents,ClientToServerEvents> = io(process.env.REACT_APP_SOCKET_URL as string,{
  // forceNew:true,
  // reconnectionAttempts:10,
  // reconnectionDelay:500,
  // transports:['websocket']
}).connect()