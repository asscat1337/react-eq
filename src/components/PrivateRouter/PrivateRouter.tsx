import React from "react";
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import { RootState } from "../../store";

interface PrivateRouter{
  children: any
}

export const PrivateRoute:React.FC<PrivateRouter>=({children:RouteComponent})=>{
  const user = useSelector((state:RootState)=>state.user)
  const toNavigate = localStorage.getItem('toNavigate')

  return user.auth ?
    RouteComponent :
    <Navigate
      to={`/login/${toNavigate}`}
      replace={true}
    />
}