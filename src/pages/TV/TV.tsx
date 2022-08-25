import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { useSearchParams } from "react-router-dom";
import { socket } from "../../socket/socket";
import styles from "./TV.module.scss";
import logo from "../../assets/img/tv-logo.png";
import { getTv } from "../../store/asyncAction/asyncTicket";
import { setNewTicket, setComplete, prepareTransfer } from "../../store/slices/tvSlice";
import { Player } from "../../components/Player/Player";
import { Timer } from "../../components/Timer/Timer";
import { generateSound } from "../../utils/generate-sound";
import {setLoading} from "../../store/slices/tvSlice";
import { Loader } from "../../components/Loader/Loader";

const TV: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { tickets,play,queue,loading} = useSelector((state: RootState) => state.tv);
  const [urlSearchParams, setUrlSearchParams] = useSearchParams("");

  React.useEffect(() => {
    async function start() {
      await dispatch(getTv());
    }

    const url = window.location.search;
    setUrlSearchParams(url);
    socket.on('disconnect',()=>{
      socket.emit("joinRoom", urlSearchParams.get("id"));
      dispatch(setLoading(true))
    })
    socket.on('connect',()=>{
      socket.connect()
      dispatch(setLoading(false))
    })
    start();
  }, []);

  const generate = React.useCallback(async (value: any) => {
    return await generateSound({ ticket: value.ticket, cabinet: value.user.cabinet });
  }, []);

  React.useEffect(() => {
    socket.on("translateTv", async (data) => {
      const sound = await generate(data);
      dispatch(setNewTicket({ data, sound }));
    });
    socket.on("completeTv", (data) => {
      dispatch(setComplete(data));
    });

    socket.on("prepareTransfer",(data)=>{
      dispatch(prepareTransfer(data))
    })


    return ()=>{
      socket.off('translateTv')
      socket.off('completeTv')
      socket.off('prepareTransfer')
    }

  }, [generate]);

  React.useEffect(() => {
  }, [play]);


  return (
    <div className={styles.container}>
      {loading && <Loader/>}
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
                    {ticket.service.typeCabinet?.title} {ticket.user?.cabinet}
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