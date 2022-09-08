import React from "react";

export interface ITerminalButton{
  name?:string,
  key?:number,
  setOpen?:React.Dispatch<boolean>,
  current?:any,
  animate?:boolean
}