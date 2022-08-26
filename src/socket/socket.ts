import { io,Socket } from "socket.io-client";
import {ServerToClientEvents,ClientToServerEvents} from "../@types/socket";

const isProduction = process.env.REACT_APP_NODE_ENV === "dev" ?
  process.env.REACT_APP_DEV_SOCKET :
  process.env.REACT_APP_PROD_SOCKET


export const socket:Socket<ServerToClientEvents,ClientToServerEvents> = io(isProduction as string,{
  forceNew:true,
  reconnectionAttempts:10,
  reconnectionDelay:1000,
  transports:['websocket']
}).connect()