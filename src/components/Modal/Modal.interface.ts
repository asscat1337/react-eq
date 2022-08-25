import React from "react";

export interface IModal{
  children:React.ReactNode,
  showFooter?:boolean,
  showHeader?:boolean,
  autoClose?:boolean,
  closeTime?:number,
  headerName?:string
}