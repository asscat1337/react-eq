import React from "react";
import styles from "./Modal.module.scss";
import {useDispatch} from "react-redux";
import { IModal } from "./Modal.interface";
import { AppDispatch } from "../../store";
import { openModal } from "../../store/slices/serviceSlice";


const Modal: React.FC<IModal> = ({
  children,
  showFooter = true,
  showHeader = true,
  autoClose = false,
  closeTime = 6000}): JSX.Element => {

  const dispatch:AppDispatch = useDispatch()

  React.useEffect(() => {
    if(autoClose){
      setTimeout(() => {
        dispatch(openModal(false))
      }, closeTime);
    }
  }, [autoClose]);

  return (
    <div className={styles.modal} onClick={()=>dispatch(openModal(false))}>
      <div className={styles.container} onClick={(e:React.MouseEvent<HTMLDivElement>)=>e.stopPropagation()}>
        {showHeader && (
          <div className={styles.header}>
            Header
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
};

export { Modal };