import React from "react";
import {setCurrent} from "../../store/slices/ticketSlice";
import styles from './NoticeQueue.module.scss'
import { AppDispatch, RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../../socket/socket";


interface INotice{
  data:any,
  setBtn1:React.Dispatch<React.SetStateAction<boolean>>
  setBtn2:React.Dispatch<React.SetStateAction<boolean>>
}


const NoticeQueue =React.memo(({data,setBtn1,setBtn2}:INotice)=>{
  const {user} = useSelector((state:RootState)=>state.user)
  const dispatch:AppDispatch = useDispatch()

  const onCallTicket=(item:any)=>{
    dispatch(setCurrent(item))
    socket.emit('showTv',{...item,user})
    setBtn1(true)
    setBtn2(false)
  }

  return (
    <div className={styles.notice}>
      <div className={styles.header}>
        Результат
      </div>
      {data.map((item:any)=>(
        <div className={styles.noticeTicket} key={item.ticket_id}>
          <span>Талон:{item.ticket}</span>
          <span>Услуга:{item.serviceName}</span>
          <span>ФИО:{item.notice}</span>
          <button
            className={styles.call}
            onClick={()=>onCallTicket(item)}
          >
            Вызвать
          </button>
        </div>
      ))}
    </div>
  )
})

export {
  NoticeQueue
}