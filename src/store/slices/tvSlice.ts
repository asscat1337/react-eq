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
        return item.data.ticket_id !== action.payload
      })
    },
    setLoading(state,action){
      state.loading = action.payload
    },
    setNewTicket(state,action){
      state.queue = [...state.queue,action.payload]
      state.play = true

      if(state.tickets.length > 20){
        state.tickets = state.tickets.slice(0,-1)
      }
    },
    stopPlay(state){
      state.play = false
    },
    prepareTransfer(state,{payload}){
      state.tickets=state.tickets.filter(item=>item.ticket_id !== payload.ticket_id)
    },
    setActive(state,{payload}){
      state.tickets = [payload,...state.tickets]
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
    builder.addCase(getTv.pending,(state)=>{
      state.loading = true
    })
    builder.addCase(getTv.fulfilled,(state,action)=>{
    return {
      ...state,
      tickets:action.payload.data,
      loading:false
    }
    })
    builder.addCase(getTv.rejected,(state)=>{
      state.loading = true
    })
  }
})

export const {setNewTicket,setComplete,stopPlay,setActive,deleteQueue,prepareTransfer,setLoading} = tvSlice.actions
export default tvSlice.reducer