import React from "react";

type Terminal = {
  name?:string,
  description?:string,
  org_name?:string,
  isActive?:boolean
}

type Service = {
  letter?:string,
  serviceName?:string,
  pointer?:number,
  status?:boolean,
  start_time?:string,
  end_time?:string,
}

export  interface ITicketModal{
  open?:boolean,
  children?:React.ReactNode,
  terminalInfo:Terminal,
  serviceInfo:Service,
  ref:React.ForwardedRef<HTMLDivElement>,
  style:React.CSSProperties,
  animate?:boolean
}