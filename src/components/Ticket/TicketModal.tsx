import React from "react";
import dayjs from "dayjs";
import styles from './TicketModal.module.scss'
import {ITicketModal} from "./TicketModal.interface";
import logo from '../../assets/img/logo-tick.png'



const TicketModal:React.FC<ITicketModal>=React.forwardRef(
  (props,ref)=>(
      <div className={`${styles.ticketModal} ${props.animate ? styles.animate : ""}`} ref={ref} style={props.style}>
        <div className={styles.content}>
          <div className={styles.img}>
            <img src={logo} alt="" />
          </div>
          <div className={styles.orgName}>
            <h5>{props?.terminalInfo.org_name}</h5>
          </div>
          <div className={styles.ticket}>
            <h5>
              {props?.serviceInfo.letter}{props?.serviceInfo.pointer}
            </h5>
          </div>
          <div className={styles.serviceName}>
            <p>Название услуги</p>
            <h5>{props?.serviceInfo.serviceName}</h5>
          </div>
          <div className={styles.date}>
            <h3>
              {dayjs().format('DD.MM.YYYY')}
            </h3>
          </div>
          {props?.children}
        </div>
      </div>
)
)

export {
  TicketModal
}