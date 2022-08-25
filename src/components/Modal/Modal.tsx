import React from "react";
import styles from "./Modal.module.scss";
import {useDispatch} from "react-redux";
import { IModal } from "./Modal.interface";
import { AppDispatch } from "../../store";
import { openModal } from "../../store/slices/serviceSlice";
import close from '../../assets/img/close.svg'


const Modal = React.memo(({children,
                           showFooter = true,
                           showHeader = true,
                           closeTime = 1000,
                            headerName = "",
                           autoClose = false}:IModal)=>{
  const dispatch:AppDispatch = useDispatch()

  const onCloseModal=()=>{
    dispatch(openModal(false))
  }

  React.useEffect(() => {
    if(autoClose){
      setTimeout(() => {
        onCloseModal()
      }, closeTime);
    }
  }, [autoClose]);

  return (
    <div className={styles.modal} onClick={onCloseModal}>
      <div className={styles.container} onClick={(e:React.MouseEvent<HTMLDivElement>)=>e.stopPropagation()}>
        {showHeader && (
          <div className={styles.header}>
           <div className={styles.name}>
             {headerName}
           </div>
            <div className={styles.close}>
              <img src={close} alt="Закрыть" onClick={onCloseModal} />
            </div>
          </div>
        )}
        <div className={styles.body}>
          {children}
        </div>
        {showFooter && (
          <div className={styles.footer}>
            footer
          </div>
        )}
      </div>
    </div>
  );
})

export { Modal };