import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {ITicket,Ticket} from "../types/ticketType";
import {createTicket,getTicket,missedTicket,updateUser} from "../asyncAction/asyncTicket";


const initialState:ITicket = {
  data:[],
  loading:true,
  current:{}
}

const ticketSlice = createSlice({
  name:'ticket',
  initialState,
  reducers:{
    setTicket(state,action:PayloadAction<Ticket>){
      state.data = [...state.data,action.payload]
    },
    setCurrent(state,action:PayloadAction<any>){
      return {
        ...state,
        current:action.payload
      }
    },
    deleteTicket(state,action:PayloadAction<any>){
      return {
        ...state,
        data: state.data.filter(item => item.ticket_id !== action.payload.ticket_id),
        current:{
          ticket:""
        }
      }
    },
    loadingData(state,action){
      state.loading = action.payload
    }
  },
  extraReducers:builder => {
    builder.addCase(createTicket.pending,(state,action)=>{
      state.loading = true
    })
    builder.addCase(createTicket.fulfilled,(state,action)=>{
      state.loading = false
    })
    builder.addCase(createTicket.rejected,(state,action)=>{
      state.loading = true
    })
    builder.addCase(getTicket.pending,(state,action)=>{
      state.loading = true
    })
    builder.addCase(getTicket.fulfilled,(state,action)=>{
      state.loading = false
      state.data = action.payload
    })
    builder.addCase(getTicket.rejected,(state,action)=>{
      state.loading = true
    })
    builder.addCase(missedTicket.fulfilled,(state,action)=>{
      return {
        ...state,
        data:state.data.filter(item=>item.ticket_id !== action.payload.ticket_id)
      }
    })
    builder.addCase(missedTicket.rejected,(state,action)=>{
      state.loading = false
    })
  }
})

export const {setTicket,setCurrent,deleteTicket,loadingData} = ticketSlice.actions

export default ticketSlice.reducer