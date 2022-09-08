import React from "react";
import styles from "./TicketQueue.module.scss";
import { AppDispatch, RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { setCurrent } from "../../store/slices/ticketSlice";
import { socket } from "../../socket/socket";
import { Empty } from "../Empty/Empty";
import { deleteTicket } from "../../store/slices/ticketSlice";
import { completeTicket } from "../../store/asyncAction/asyncTicket";


interface TicketQueue {
  data: any,
  setBtn1: React.Dispatch<React.SetStateAction<boolean>>,
  setBtn2: React.Dispatch<React.SetStateAction<boolean>>
}

const TicketQueue = React.memo(({ data, setBtn1, setBtn2 }: TicketQueue) => {
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch: AppDispatch = useDispatch();

  const onClickTicket = (data: any): void => {
    dispatch(setCurrent(data));
    socket.emit("showTv", { ...data, user });
    setBtn2(false);
    setBtn1(true);
  };

  const onClickComplete = (data: any) => {
    socket.emit("complete", data);
    dispatch(deleteTicket(data));
    dispatch(completeTicket(data));
    setBtn1(false);
    setBtn2(true);
  };

  return (
    <div className={styles.tickets}>
      {!user.getCurrentTicket ? (
        <div className={styles.ticketHeader}>
          <h5>Талон</h5>
          <h5>Услуга</h5>
        </div>
      ) : null}
      {data.length ?
        data.map((item: any) => (
          <div className={`${styles.ticket} ${user.getCurrentTicket ? styles.column : ""}`} key={item.ticket_id}>
        <span className={styles.number}>
          Талон:{item.ticket}
        </span>
            {user.getCurrentTicket ? (
              <span className={styles.patient}>
                ФИО:{item.notice}
              </span>
            ) : null}
            <span className={styles.service}>
                Услуга:{item.serviceName}
            </span>
            <div className={styles.ticketsButton}>
              <button className={styles.btn} onClick={() => onClickTicket(item)}>
                <h5>Вызвать</h5>
              </button>
              <button className={styles.btn} onClick={() => onClickComplete(item)}>
                <h5>Обслужен</h5>
              </button>

            </div>
          </div>
        ))
        :
        <Empty />
      }
    </div>
  );
});
export {
  TicketQueue
};