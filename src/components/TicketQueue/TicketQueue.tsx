import React from "react";
import styles from './TicketQueue.module.scss'
import { AppDispatch } from "../../store";
import { useDispatch } from "react-redux";
import { setCurrent } from "../../store/slices/ticketSlice";
import { socket } from "../../socket/socket";
import {Empty} from "../Empty/Empty";


interface TicketQueue {
  data:any,
  setBtn1:React.Dispatch<React.SetStateAction<boolean>>,
  setBtn2:React.Dispatch<React.SetStateAction<boolean>>
}

const TicketQueue:React.FC<TicketQueue>=({data,setBtn1,setBtn2})=>{
  const dispatch:AppDispatch = useDispatch()

  const onClickTicket=(data:any):void=>{
   dispatch(setCurrent(data))
    socket.emit('show tv',data)
    setBtn2(false);
    setBtn1(true);
  }

  return (
      <div className={styles.tickets}>
        <div className={styles.ticketHeader}>
          <h5>Талон</h5>
          <h5>Услуга</h5>
        </div>
        {data.length ?
          data.map((item:any)=>(
              <div className={styles.ticket} key={item.ticket_id}>
        <span className={styles.number}>
          {item.ticket}
        </span>
                <span className={styles.service}>
          Прохождение КТ
        </span>
                <button className={styles.btn} onClick={()=>onClickTicket(item)}>
                  <h5>Вызвать</h5>
                </button>
              </div>
            ))
        :
          <Empty/>
        }
      </div>
  )
}
export {
  TicketQueue
}