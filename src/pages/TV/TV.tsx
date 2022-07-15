import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { useSearchParams } from "react-router-dom";
import { socket } from "../../socket/socket";
import styles from "./TV.module.scss";
import logo from "../../assets/img/tv-logo.png";
import { getTv } from "../../store/asyncAction/asyncTicket";
import { setNewTicket, setComplete } from "../../store/slices/tvSlice";
import { Player } from "../../components/Player/Player";
import { Timer } from "../../components/Timer/Timer";
import { generateSound } from "../../utils/generate-sound";

const TV: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { tickets, sound, play,queue } = useSelector((state: RootState) => state.tv);
  const [urlSearchParams, setUrlSearchParams] = useSearchParams("");

  React.useEffect(() => {
    async function start() {
      await dispatch(getTv());
    }

    const url = window.location.search;
    setUrlSearchParams(url);
    socket.emit("connected room", urlSearchParams.get("id"));
    start();
  }, []);

  const generate = React.useCallback(async (value: any) => {
    return await generateSound({ ticket: value.ticket, cabinet: value.cabinet });
  }, []);

  React.useEffect(() => {
    socket.on("translate tv", async (data) => {
      const sound = await generate(data);
      dispatch(setNewTicket({ data, sound }));
    });
    socket.on("complete tv", (data) => {
      dispatch(setComplete(data));
    });


    return ()=>{
      socket.off('translate tv')
      socket.off('complete tv')
    }

  }, [generate]);

  React.useEffect(() => {
  }, [play]);


  return (
    <div className={styles.container}>
      {play && (
        <Player
          queue={queue}
          play={play}
        />
      )}
      <div className={styles.wrapper}>
        <div className={styles.wrapperRight}>
          <div className={styles.name}>
            Амбулаторный центр компьютерной томографии
          </div>
          <div className={styles.logo}>
            <img src={logo} alt="tv-logo" />
          </div>
          <div className={styles.dates}>
            <Timer />
          </div>
        </div>
        <div className={styles.wrapperLeft}>
          <div className={styles.ticketMain}>
            <div className={styles.ticketContainer}>
              {tickets.map(ticket => (
                <div className={!ticket?.isCall ? `${styles.ticket} ${styles.active}` : styles.ticket}
                     key={ticket?.ticket_id}>
                  <div className={styles.number}>
                    {ticket?.ticket}
                  </div>
                  <div className={styles.cabinet}>
                    Кабинет 001
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export {
  TV
};