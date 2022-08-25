import React from "react";
import styles from './NotFound.module.scss'

const NotFound:React.FC=()=>{
  return (
    <div className={styles.notFound}>
      <span>Страница не найдена😔</span>
      <span>Попробуйте ввести другой запрос</span>
    </div>
  )
}

export {
  NotFound
}