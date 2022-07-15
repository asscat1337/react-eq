import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TicketQueue } from "../../components/TicketQueue/TicketQueue";
import { NoticeQueue } from "../../components/NoticeQueue/NoticeQueue";
import styles from "./Dashboard.module.scss";
import { socket } from "../../socket/socket";
import { AppDispatch, RootState } from "../../store";
import { setTicket,setCurrent,deleteTicket} from "../../store/slices/ticketSlice";
import { getTicket, missedTicket } from "../../store/asyncAction/asyncTicket";
import { openModal } from "../../store/slices/serviceSlice";
import { Modal } from "../../components/Modal/Modal";
import { Select } from "../../components/Select/Select";
import {setNumber} from "../../store/slices/dashboardSlice";
import { Navbar } from "../../components/Navbar/Navbar";
import { refresh } from "../../store/asyncAction/asyncLogin";


const Dashboard: React.FC = () => {
  const navigate = useNavigate()
  const dispatch: AppDispatch = useDispatch();
  const { data, current } = useSelector((state: RootState) => state.ticket);
  const {user} = useSelector((state:RootState)=>state.user)
  console.log(user)
  const {transferNumber} = useSelector((state:RootState)=>state.dashboard)
  const {modalOpen} = useSelector((state:RootState)=>state.service)
  const [btn1, setBtn1] = React.useState<boolean>(false);
  const [btn2, setBtn2] = React.useState<boolean>(true);
  const location = useLocation();

  React.useEffect(()=>{

    async function start(){
      if(localStorage.getItem('token')){
        await dispatch(refresh())
          .then(({payload})=>{
            localStorage.setItem('token',payload.tokens.accessToken)
          })
      }
    }
    start()
  },[])
  React.useEffect(()=>{
    if(user.expired < Date.now()){
      navigate(`/login/${user.terminal}`)
    }

  },[])

  React.useEffect(() => {
    dispatch(getTicket(user.user_id));
    const search = location.search;
    const id = new URLSearchParams(search).get("id");
    socket.emit("connected room", `${id}${user.user_id}`);
    socket.on("test2", (data) => {
      dispatch(setTicket(data));
    });
    return () => {
      socket.off("test2");
    };
  }, []);

  const onClickNext = () => {
    setBtn2(false);
    setBtn1(true);
    dispatch(setCurrent(data[0]))
    socket.emit('show tv',data[0])
  };
  const onClickComplete = () => {
    setBtn2(true);
    setBtn1(false);
    dispatch(deleteTicket(current))
    socket.emit('complete',current)
  };
  const onTransfer=()=>{
    dispatch(openModal(true))
  }
  const onMissed=async (data:any)=>{
    await dispatch(missedTicket(data))
      .then(()=>{
        setBtn1(false)
        setBtn2(true)
      })
  }

  const onConfirmTransfer=()=>{
    console.log(transferNumber)
    socket.emit('transfer ticket',transferNumber)

  }

  return (
    <React.Fragment>
      <Navbar/>
    <div className={styles.container}>
      {modalOpen && (
        <Modal
          autoClose={false}
        >
          <Select
            options={[
            {label:"test1",id:1},
            {label:"test2",id:2},
            {label:"test3",id:3},
            {label:"test4",id:4},
            {label:"test5",id:5},
            {label:"test6",id:6},
            {label:"test7",id:7},
            {label:"test8",id:8},
            {label:"test9",id:9},
            {label:"test10",id:10},
            {label:"test11",id:11},
            {label:"test12",id:12},
            {label:"test13",id:13},
            {label:"test14",id:14},
              ]
            }
            setCurrent={(data:string)=>dispatch(setNumber(data))}
          />
          <button onClick={onConfirmTransfer}>Перевести</button>
        </Modal>
      )}
      <div className={styles.panel}>
        <div className={styles.panelInfo}>
          <div className={styles.ticket}>
            <p>Талон</p>
            {current.ticket && (
              <span>{current.ticket}</span>
            )}
          </div>
          <div className={styles.service}>
            <p>Название услуги</p>
            {current.serviceName && (
              <span>{current.serviceName}</span>
            )}
          </div>
        </div>
        <div className={styles.actions}>
          <div className={styles.buttons}>
            <button
              className={styles.btn}
              disabled={btn1}
              onClick={onClickNext}>
              Следующий
            </button>
            <button
              className={styles.btn}
              disabled={btn2}
              onClick={onClickComplete}>
              Обслужен
            </button>
            <button
              onClick={()=>onMissed(current)}
              className={styles.btn}
              disabled={btn2}
            >
              Неявка
            </button>
            <button
              className={styles.btn}
              disabled={btn2}
            >
              Повтор вызова
            </button>
            <button
              onClick={onTransfer}
              className={styles.btn}
              disabled={btn2}>
              Перевод
            </button>
          </div>
        </div>
      </div>
      <TicketQueue
        data={data}
        setBtn1={setBtn1}
        setBtn2={setBtn2}
      />
      {user.sendNotice && (
        <NoticeQueue />
      )}
    </div>
    </React.Fragment>
  );
};

export {
  Dashboard
};