import React from "react";
import {useParams} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {getUsers} from "../../store/asyncAction/asyncLogin";
import styles from './Login.module.scss'
import { Select } from "../../components/Select/Select";
import { AppDispatch, RootState } from "../../store";
import {loginUser} from "../../store/asyncAction/asyncUser";
import {useNavigate} from "react-router-dom";


const Login:React.FC=()=>{
  const navigate = useNavigate()
  const params = useParams()
  const dispatch:AppDispatch = useDispatch()
  const [login,setLogin] = React.useState<any>("")
  const [password,setPassword] = React.useState<string>("")
  const [rememberMe,setRememberMe] = React.useState<boolean>(false)
  const {data} = useSelector((state:RootState)=>state.login)
  const {auth,user} = useSelector((state:RootState)=>state.user)

  React.useEffect(()=>{
    async function start(){
      await dispatch(getUsers(params.id!))
      localStorage.setItem('toNavigate',params.id!)
    }
    start()

    if(auth){
      navigate(`/dashboard?id=${user.terminal}`)
    }

  },[])

  const mapped = data.map(item=>{
    return {
      id:item.user_id,
      label:item.login
    }
  })

  const onClick=async ()=>{
    try{
      await dispatch(loginUser({login:login.label,password,rememberMe }))
        .then(({payload})=>{
          localStorage.setItem('token',payload.tokens.accessToken)
          navigate(`/dashboard?id=${payload.user.terminal}`)
        })
    }catch (e){
      console.log(e)
    }
  }

  const handleChangeLogin=(data:any)=>{
    setLogin(data)
  }

  const changeRemember=()=>{
    setRememberMe(!rememberMe)
    console.log('click')
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.loginContainer}>
          <div className={styles.header}>
            <h1>Авторизация</h1>
          </div>
          <div className={styles.login}>
            <Select
              options={mapped}
              setCurrent={handleChangeLogin}
            />
          </div>
          <div className={styles.password}>
            <input
              type="password"
              value={password}
              onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setPassword(e.target.value)}
            />
          </div>
          <div className={styles.rememberMe}>
            <label>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={changeRemember}
                id="rememberMe"
              />
             <span> Запомнить меня</span>
            </label>
          </div>
          <div className={styles.btnConfirm}>
            <button onClick={onClick}>Авторизация</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export {
  Login
}