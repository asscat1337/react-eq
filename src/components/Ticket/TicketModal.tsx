import React from "react";
import dayjs from "dayjs";
import styles from './TicketModal.module.scss'
import {ITicketModal} from "./TicketModal.interface";
import logo from '../../assets/img/logo-tick.png'



const TicketModal:React.FC<ITicketModal>=({
                                            generateTicket,
                                            open,
                                            pos,
                                            terminalInfo,
                                            serviceInfo,
                                            style,
                                            animate,
                                            children,
                                            setAnimate,
                                            setPos})=>{

  // React.useEffect(()=>{
  //   const timer = setInterval( ()=>{
  //     if(pos >= document.documentElement.clientHeight){
  //       generateTicket()
  //     }else{
  //       setPos(prev=>prev+200)
  //     }
  //   },500)
  //
  //   return ()=>{
  //     clearInterval(timer)
  //   }
  // },[open,pos])

  return (
   <div className={`${styles.ticketModal} ${animate ? styles.animate : ""}`}  style={style}>
     <div className={styles.content}>
       <div className={styles.img}>
         <img src={logo} alt="" />
       </div>
       <div className={styles.orgName}>
         <h5>{terminalInfo.org_name}</h5>
       </div>
       <div className={styles.ticket}>
         <h5>
           {serviceInfo.letter}{serviceInfo.pointer}
         </h5>
       </div>
       <div className={styles.serviceName}>
         <p>Название услуги</p>
         <h5>{serviceInfo.serviceName}</h5>
       </div>
       <div className={styles.date}>
         <h3>
           {dayjs().format('DD.MM.YYYY')}
         </h3>
       </div>
       {children}
     </div>
   </div>
 )
}

export {
  TicketModal
}