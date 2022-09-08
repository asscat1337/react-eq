import React from "react";
import {useDispatch,useSelector} from "react-redux";
import { AppDispatch, RootState } from "../../store";
import {useParams} from "react-router-dom";
import { getTerminal } from "../../store/asyncAction/asyncTerminal";
import {TerminalButton} from "../../components/TerminalButton/TerminalButton";
import {TicketModal} from "../../components/Ticket/TicketModal";
import {socket} from '../../socket/socket'
import styles from './Terminal.module.scss'
import { Modal } from "../../components/Modal/Modal";
import { setCurrent } from "../../store/slices/serviceSlice";
import { createTicket } from "../../store/asyncAction/asyncTicket";
import { updatePointer,setLoading } from "../../store/slices/terminalSlice";
import { Loader } from "../../components/Loader/Loader";



const Terminal:React.FC=()=>{
  const params = useParams()
  const dispatch:AppDispatch = useDispatch()
  const [open,setOpen] = React.useState<boolean>(false)
  const [pos,setPos] = React.useState<number>(0)
  const [animate,setAnimate] = React.useState<boolean>(false)
  const {services,data,loading} = useSelector((state:RootState)=>state.terminal)
  const {current,modalOpen} = useSelector((state:RootState)=>state.service)

  React.useEffect(()=>{
    dispatch(getTerminal(params.id))
    socket.on('connect',()=>{
      socket.connect()
      socket.emit('joinRoom',params.id)
      dispatch(setLoading(false))
    })
    socket.on('disconnect',()=>{
      dispatch(setLoading(true))
    })
  },[])

  const generateTicket=()=>{
    dispatch(setCurrent(current));
    // dispatch(createTicket(current))
    //   .then(({ payload }) => {
    //     setOpen(false)
    //     dispatch(updatePointer(payload));
    //     // window.print();
    //     // socket.emit("createTicket", payload);
    //     setOpen(false)
    //     setPos(0)
    //     setAnimate(false)
    //   });
  }
    return (
        <div className={styles.wrapper}>
          {loading && <Loader/>}
          {open && (
              <TicketModal
                generateTicket={generateTicket}
                pos={pos}
                open={open}
                setAnimate={setAnimate}
                setPos={setPos}
                terminalInfo={data}
                serviceInfo={current}
                style={{'top':pos}}
                animate
              />
          )}
          {modalOpen && (
            <Modal
              showHeader={false}
              showFooter={false}
              autoClose={true}
              closeTime={5000}
            >
              <h1>Время работы услуги завершено</h1>
            </Modal>
          )}
            <h1 className={styles.name}>{data.description}</h1>
            <div className={services.length === 1 ? styles.buttonsSimple : styles.buttons}>
              {services.map(service=>(
                <div className={styles.btn} key={service?.service_id}>
                  <TerminalButton
                    animate={animate}
                    setOpen={setOpen}
                    name={service.serviceName}
                    current={service}
                  />
                </div>
              ))
              }
            </div>
        </div>
    )
}

export default Terminal