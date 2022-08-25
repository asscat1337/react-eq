
import {Middleware} from 'redux'
import {Socket} from "socket.io-client";
// import {getSocket} from "../../socket/socket";
// import {startConnection,receiveAllMessage} from "../slices/socketSlice";


const socketMiddleware:Middleware=store=>{
  // let socket: Socket = getSocket();

  return next=>action=>{
    // const isConnectionEstablished = socket && store.getState().socket.isConnected
    // console.log(isConnectionEstablished)
    // socket.on('connect',()=>{
    //   store.dispatch(startConnection())
    // })
    // // socket.on('test1',(data:string)=>{
    // //   console.log(data)
    // //   store.dispatch(receiveAllMessage(data))
    // // })
    //
    // console.log(action)
    //
    // next(action)
  }
}


export default socketMiddleware