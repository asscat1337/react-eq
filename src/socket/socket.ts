import { io,Socket } from "socket.io-client";
import {ServerToClientEvents,ClientToServerEvents} from "../@types/socket";

const isProduction = process.env.REACT_APP_NODE_ENV === "dev" ?
  process.env.REACT_APP_DEV_SOCKET :
  process.env.REACT_APP_PROD_SOCKET

console.log(isProduction,process.env.REACT_APP_NODE_ENV)

export const socket:Socket<ServerToClientEvents,ClientToServerEvents> = io(isProduction as string,{
  forceNew:true,
  reconnection:true,
  transports:['websocket']
}).connect()
