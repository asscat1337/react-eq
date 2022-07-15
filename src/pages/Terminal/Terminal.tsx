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



const Terminal:React.FC=()=>{
  const ref = React.useRef<HTMLDivElement | null>(null)
  const params = useParams()
  const dispatch:AppDispatch = useDispatch()
  const [open,setOpen] = React.useState<boolean>(false)
  const [score,setScore] = React.useState<number>(0)
  const {services,data} = useSelector((state:RootState)=>state.terminal)
  const {current,modalOpen} = useSelector((state:RootState)=>state.service)

  React.useEffect(()=>{
    dispatch(getTerminal(params.id))
    socket.on('connect',()=>{
      socket.emit('connected room',params.id)
    })
  },[])
  
    return (
        <div className={styles.wrapper}>
          {open && (
            <TicketModal
              ref={ref}
              terminalInfo={data}
              serviceInfo={current}
            >
            </TicketModal>
          )}
          {modalOpen && (
            <Modal
              showHeader={false}
              showFooter={false}
              autoClose={true}
              closeTime={5000}
            >
              <h1>Время работы терминала завершено</h1>
            </Modal>
          )}
            <h1 className={styles.name}>{data.description}</h1>
            <div className={services.length === 1 ? styles.buttonsSimple : styles.buttons}>
              {services.map(service=>(
                <div className={styles.btn} key={service?.service_id}>
                  <TerminalButton
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