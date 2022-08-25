import React from "react";
import dayjs from "dayjs";
import styles from "../../pages/TV/TV.module.scss";



export const Timer:React.FC=()=>{
  const [currentTime,setCurrentTime] = React.useState<string>("")
  const [currentDate,setCurrentDate] = React.useState<string>("")

  React.useEffect(()=>{
       setInterval(()=>{
        setCurrentTime(dayjs().format('HH:mm:ss'))
         setCurrentDate(dayjs().format('DD-MM-YYYY'))
       },1000)
  },[])

  return (
    <React.Fragment>
      <div className={styles.date}>
        {currentDate}
      </div>
      <div className={styles.time}>
        {currentTime}
      </div>
    </React.Fragment>
  )
}