import React from "react";

interface IAnimate{
  children:React.ReactNode,
  pos:number
}

const Animate=({children,pos}:IAnimate)=>{
  return (
    <div style={{'top':pos,position:'fixed'}}>
      {children}
    </div>
  )
}

export {
  Animate
}