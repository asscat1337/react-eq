import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import {stopPlay,setActive,deleteQueue} from "../../store/slices/tvSlice";

interface IPlay{
  queue:any[],
  play:boolean
}

//TODO:исправить падение в ошибки,когда массив пустой
const Player:React.FC<IPlay>=({queue,play})=>{
  const dispatch:AppDispatch = useDispatch()
  const [playing,setIsPlaying] = React.useState(false)
  const [trackIndex,setTrackIndex] = React.useState<number>(0)
  const [queueIndex,setQueueIndex] = React.useState<number>(0)
  const audioRef = React.useRef<HTMLAudioElement>(new Audio())
  const intervalRef = React.useRef()


  const track = queue[queueIndex]?.sound
  const data = queue[queueIndex]?.data



  const startTimer=()=>{
    clearInterval(intervalRef.current)
    //@ts-ignore
    intervalRef.current = window.setInterval(()=>{
      if(audioRef.current.ended){
        onNext()
      }
    },1000)
  }

  React.useEffect(()=>{
    audioRef.current.play()
  },[playing])

  React.useEffect(()=>{
    if(data===undefined) return
    dispatch(setActive(data))
  },[data,play])

  React.useEffect(()=>{
    audioRef.current = new Audio(track[trackIndex])
    audioRef.current.play()
    startTimer()

    if(trackIndex >= track.length - 1){
      dispatch(deleteQueue(data.ticket_id))
    }
  },[trackIndex,play])

  React.useEffect(()=>{
      return ()=> {
        clearInterval(intervalRef.current)
        audioRef.current = new Audio()
        dispatch(stopPlay())
        setIsPlaying(false)
        setTrackIndex(0)
        setQueueIndex(0)
      }
  },[queue.length === 0])


  const onNext=()=>{
    if(trackIndex < track.length - 1){
      setTrackIndex(trackIndex+1)
    }else{
       setTrackIndex(0)
       audioRef.current.pause()
    }
  }

  return (
    <div></div>
  )
}

export {
  Player
}