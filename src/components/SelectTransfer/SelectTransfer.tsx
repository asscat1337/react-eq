import React from "react";
import { Select } from "../Select/Select";
import { setNumber } from "../../store/slices/dashboardSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { socket } from "../../socket/socket";
import { deleteTicket } from "../../store/slices/ticketSlice";
import styles from './SelectTransfer.module.scss'

interface ISelectTransfer{
 setBtn1:React.Dispatch<React.SetStateAction<boolean>>
  setBtn2:React.Dispatch<React.SetStateAction<boolean>>
}

const SelectTransfer=React.memo(({
                        setBtn1,
                        setBtn2
}:ISelectTransfer)=>{
  const dispatch:AppDispatch = useDispatch()
  const {user} = useSelector((state:RootState)=>state.user)
  const {transferUser,transferNumber} = useSelector((state:RootState)=>state.dashboard)
  const {current} = useSelector((state:RootState)=>state.ticket)

  const [value,setValue] = React.useState<string>("")

  const handleChange=React.useCallback((e:React.ChangeEvent<HTMLInputElement>)=>{
    setValue(e.target.value)
  },[])

  const onConfirmTransfer=()=>{
    const notice = user.getCurrentTicket ? current.notice : value
    const object = {...current,transferNumber,notice,sendNotice:user.sendNotice}
    socket.emit('transferTicket',object)
    setBtn2(true);
    setBtn1(false);
    dispatch(deleteTicket(object))
    socket.emit('completeTransfer',object)
    setValue("")
  }

  const handleChangeTransfer=(data:any)=>{
    dispatch(setNumber(data.id))
  }

  return (
    <div>
      <div className={styles.select}>
        <Select
          options={transferUser}
          setCurrent={handleChangeTransfer}
        />
      </div>
      {user.sendNotice && (
        <input
          className={styles.transferInput}
          value={value}
          onChange={handleChange}
          type="text"
          placeholder="Введите ФИО"
        />
      )}
      <button
        onClick={onConfirmTransfer}
        className={styles.transferButton}
      >
        <h1>Перевести</h1>
      </button>
    </div>
  )
})

export {
  SelectTransfer
}