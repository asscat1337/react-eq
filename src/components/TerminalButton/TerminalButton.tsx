import React from "react";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { ITerminalButton } from "./TerminalButton.interface";
import styles from "./TerminalButton.module.scss";
import { AppDispatch } from "../../store";
import {updatePointer} from "../../store/slices/terminalSlice";
import { openModal, setCurrent } from "../../store/slices/serviceSlice";
import { createTicket } from "../../store/asyncAction/asyncTicket";
import { socket } from "../../socket/socket";


const TerminalButton: React.FC<ITerminalButton> = ({ name, setOpen, current }): JSX.Element => {
  const dispatch: AppDispatch = useDispatch();
  const time = dayjs().format("HH:mm:ss");
  const onClickButton = async (): Promise<void> => {
    if (time > current.end_time! || time < current.start_time!) {
      dispatch(openModal(true));
      return;
    }
    setOpen(true);
    await dispatch(setCurrent(current));
    await dispatch(createTicket(current))
      .then(({ payload }) => {
        dispatch(updatePointer(payload));
        window.print();
        setOpen(false);
        socket.emit("test", payload);
      });
  };

  return (
    <button className={styles.button} onClick={onClickButton}>
      <h1 className={styles.buttonText}>{name}</h1>
    </button>
  );
};

export {
  TerminalButton
};