import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {RootState} from "../../store";
import styles from './Navbar.module.scss'
import logout from '../../assets/img/logout-sketch-svgrepo-com.svg'
import {logoutUser} from "../../store/asyncAction/asyncLogin";
import { AppDispatch } from "../../store";
import { useNavigate } from "react-router-dom";


const Navbar:React.FC=()=>{
  const navigate = useNavigate()
  const dispatch:AppDispatch = useDispatch()
  const {user} = useSelector((state:RootState)=>state.user)


  const onLogout=async ()=>{
    await dispatch(logoutUser(user))
      .then(({payload })=>{
         navigate(`/login/${payload.terminal}`)
        localStorage.removeItem('token')
      })
  }

  return (
    <div className={styles.navbar}>
      <div className={styles.content}>
        Панель управления
        <div className={styles.logout} onClick={onLogout}>
          <img src={logout} alt="" />
        </div>
      </div>
    </div>
  )
}

export {
  Navbar
}