import React from "react";
import styles from "../../pages/Dashboard/Dashboard.module.scss";



const PanelDashboard=React.memo(({current}:any)=>{
  return (
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
  )
})

export {
  PanelDashboard
}