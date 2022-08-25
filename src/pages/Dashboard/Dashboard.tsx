import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TicketQueue } from "../../components/TicketQueue/TicketQueue";
import { NoticeQueue } from "../../components/NoticeQueue/NoticeQueue";
import styles from "./Dashboard.module.scss";
import { socket } from "../../socket/socket";
import { AppDispatch, RootState } from "../../store";
import { setTicket, setCurrent, deleteTicket, loadingData } from "../../store/slices/ticketSlice";
import { getTicket, missedTicket,updateUser } from "../../store/asyncAction/asyncTicket";
import {getTransferUser} from "../../store/asyncAction/asyncUser";
import { openModal } from "../../store/slices/serviceSlice";
import { Modal } from "../../components/Modal/Modal";
import { Navbar } from "../../components/Navbar/Navbar";
import { logoutUser, refresh } from "../../store/asyncAction/asyncLogin";
import { ButtonComponent } from "../../components/ButtonComponent/ButtonComponent";
import { PanelDashboard } from "../../components/PanelDashboard/PanelDashboard";
import { SelectTransfer } from "../../components/SelectTransfer/SelectTransfer";
import { Loader } from "../../components/Loader/Loader";


const Dashboard: React.FC = () => {
  const navigate = useNavigate()
  const dispatch: AppDispatch = useDispatch();
  const { data, current,loading } = useSelector((state: RootState) => state.ticket);
  const {user,setting} = useSelector((state:RootState)=>state.user)
  const {modalOpen} = useSelector((state:RootState)=>state.service)
  const [btn1, setBtn1] = React.useState<boolean>(false);
  const [btn2, setBtn2] = React.useState<boolean>(true);
  const location = useLocation();

  React.useEffect(()=>{
    async function start(){
      if(localStorage.getItem('token')){
        await dispatch(refresh())
          .then(async ({payload})=>{
            if(!payload.valid){
              await dispatch(logoutUser(user))
              navigate(`/login/${user.terminal}`)
            }
          })
          .catch(e=>{
            if(e){
              navigate(`/login/${user.terminal}`)
            }
          })
      }
    }
    start()
  },[])

  React.useEffect(() => {
    dispatch(getTicket(user));
    const search = location.search;
    const id = new URLSearchParams(search).get("id");
    socket.on('connect',()=>{
      console.log('сокет подключен')
      socket.emit("joinRoom", `${id}${user.user_id}`);
      dispatch(loadingData(false))
    })
    socket.on("getTicket", (data) => {
      dispatch(setTicket(data));
    });
    socket.on("transferData",data=>{
      dispatch(setTicket({...data,notice:data.notice}))
    })

    socket.on('disconnect',()=>{
      console.log('сокет отключен')
      dispatch(loadingData(true))
    })

    return () => {
      socket.off("getTicket");
      socket.off("transferData")
      socket.off("joinRoom")
      // socket.disconnect()
    };
  }, []);

  const onClickNext = async() => {
    try{
      const variable = user.getCurrentTicket ? data[0] : data.filter((item:any)=>item.notice === null)[0]
      setBtn2(false);
      setBtn1(true);
      dispatch(setCurrent(variable))
    }catch (e) {
      console.log(e)
    }finally {
      await dispatch(updateUser({user_id:user.user_id,ticket_id:data[0].ticket_id}))
      socket.emit('showTv',{...data[0],user})
    }
  };
  const onClickComplete = () => {
    setBtn2(true);
    setBtn1(false);
    dispatch(deleteTicket(current))
    socket.emit('complete',current)
  };
  const onTransfer=async ()=>{
    try{
      if(setting.isActive){
        const object = {...current,
          transferNumber:setting.transferToUser,
          notice:current.notice,
          sendNotice:user.sendNotice
        }
        socket.emit('transferTicket',object)
        socket.emit('completeTransfer',object)
        setBtn2(true);
        setBtn1(false);
        dispatch(deleteTicket(object))
        return
      }
      dispatch(openModal(true))
      await dispatch(getTransferUser({terminal:user.terminal,user_id:user.user_id}))
    }catch (e) {
      console.log(e)
    }
  }
  const onMissed=async (data:any)=>{
    await dispatch(missedTicket(data))
      .then(()=>{
        setBtn1(false)
        setBtn2(true)
      })
  }

  return (
    <div>
      {loading && <Loader/>}
    <Navbar/>
    <div className={styles.container}>
      {modalOpen && (
        <Modal
          headerName="Перевод талона"
          autoClose={false}
          showFooter={false}
        >
          <SelectTransfer
            setBtn1={setBtn1}
            setBtn2={setBtn2}
          />
        </Modal>
      )}
      <div className={styles.panel}>
        <PanelDashboard
          current={current}
        />
        <div className={styles.actions}>
          <ButtonComponent
            btn1={btn1}
            btn2={btn2}
            onClickNext={onClickNext}
            onClickComplete={onClickComplete}
            onMissed={onMissed}
            onTransfer={onTransfer}
            current={current}
          />
        </div>
      </div>
      <TicketQueue
        data={user.getCurrentTicket ? data : data.filter(item=>item.notice === null)}
        setBtn1={setBtn1}
        setBtn2={setBtn2}
      />
      {user.sendNotice ? (
        <NoticeQueue
          data={data.filter(item=>item.notice !== null)}
          setBtn1={setBtn1}
          setBtn2={setBtn2}
        />
      ):null}
    </div>
    </div>
  );
};

export {
  Dashboard
};