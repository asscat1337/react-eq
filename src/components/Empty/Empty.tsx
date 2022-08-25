import React from "react";
import styles from './Empty.module.scss'


const Empty:React.FC=():JSX.Element=>{
  return (
    <div className={styles.container}>
        <h5>Сейчас пока что ничего нет😔</h5>
    </div>
  )
}


export {
  Empty
}