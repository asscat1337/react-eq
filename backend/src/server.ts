import 'dotenv/config';

import express from "express";
import cors from 'cors'
import helmet from "helmet";
import {Server} from "socket.io";
import {router} from "./router";
import cookieParser from "cookie-parser";
import {createAdapter} from "@socket.io/redis-adapter";
import {pubClient,subClient} from "./redis";
import { ClientToServerEvents, ServerToClientEvents } from "./types/socket.types";
import {createServer} from "http";
// import {socket} from "./socket";
import * as cron from 'cron'
import path from "path";
import { deleteTickets } from "./services/ticket/ticket.service";
import { socket } from "./socket";

const app = express();
const http = createServer(app)
const io = new Server<ServerToClientEvents,ClientToServerEvents>(http,{
  cors:{
    credentials:true,
    origin:'*'
  }
})
app.use(cookieParser())
app.use(cors({
  credentials:true,
  origin:'http://localhost:3000',
}))
app.use(express.static(path.resolve('../','build')))
app.use(express.json());

app.use('/api',router)

if(process.env.NODE_ENV === 'production'){
  app.get('*',(req,res)=>{
    res.sendFile(path.resolve('../','build','index.html'))
  })
  app.use(helmet());
}
const cronJob = cron.CronJob

new cronJob('20 16 * * 0-6',async ()=>{
  await deleteTickets({
    isCall:1
  })
},null,true,'Asia/Yekaterinburg')



Promise.all([pubClient.connect(),subClient.connect()])
  .then(async ()=>{
    try{
      await socket()
      io.adapter(createAdapter(pubClient,subClient,{
        requestsTimeout:5000
      }))
      http.listen(process.env.PORT, () => {
        console.log(`server started on ${process.env.PORT}`);
      });
    }catch (e) {
      console.log(e)
    }
  })

export {
  io
}
