import {createSlice} from "@reduxjs/toolkit";
import {ITv} from "../types/tvType";
import {getTv} from "../asyncAction/asyncTicket";

const initialState:ITv={
  tickets:[],
  loading:false,
  play:false,
  sound:[],
  queue:[],
}

const tvSlice = createSlice({
  name: 'tv',
  initialState,
  reducers: {
    deleteQueue(state,action){
      state.queue = state.queue.filter((item)=>{
        console.log(item.data.ticket_id,action.payload)
        return item.data.ticket_id !== action.payload
      })
    },
    setNewTicket(state,action){
      state.queue = [...state.queue,action.payload]
      // state.sound = action.payload.sound
      state.play = true

      if(state.tickets.length > 20){
        state.tickets = state.tickets.slice(0,-1)
      }
    },
    stopPlay(state){
      state.play = false
    },
    setActive(state,{payload}){
      state.tickets = [...state.tickets,payload]
    },
    setComplete(state,action){
      return {
        ...state,
        tickets:state.tickets.map(ticket=>{
          if(ticket.ticket_id === action.payload.ticket_id){
            return {
              ...ticket,
              isCall:true
            }
          }
          return ticket
        })
      }
    }
  },
  extraReducers:builder => {
    builder.addCase(getTv.pending,(state,action)=>{
      state.loading = true
    })
    builder.addCase(getTv.fulfilled,(state,action)=>{
    return {
      ...state,
      tickets:action.payload.data,
      loading:false
    }
    })
    builder.addCase(getTv.rejected,(state,action)=>{
      state.loading = true
    })
  }
})

export const {setNewTicket,setComplete,stopPlay,setActive,deleteQueue} = tvSlice.actions
export default tvSlice.reducer