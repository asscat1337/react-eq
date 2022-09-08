import {createAsyncThunk} from "@reduxjs/toolkit";
import { $http } from "../../http/http";


const createTicket = createAsyncThunk(
  'ticket/create-ticket',
  async(payload:any,thunkAPI)=>{
    const {data} = await $http.post('/ticket/add-ticket',payload)
    return data
  }
)

const getTicket = createAsyncThunk(
  'ticket/get-ticket',
  async(payload:any,thunkAPI)=>{
    const {data} = await $http.get('/ticket/get-ticket',{
      headers:{
        authorization:`Bearer ${localStorage.getItem('token')}`
      },
      params:{
        user_id:payload.user_id,
        currentTicket:payload.getCurrentTicket
      }
    })
    return data
  }
)
const getTv = createAsyncThunk(
  'ticket/get-tv',
  async(thunkAPI)=>{
    const {data} = await $http.get('/ticket/get-tv')
    return data
  }
)
const missedTicket = createAsyncThunk(
  'ticket/miss-ticket',
  async(payload:any,thunkAPI)=>{
     await $http.put('/ticket/miss-ticket',payload)
     return payload
  }
)
const updateUser = createAsyncThunk(
  'ticket/update-user',
  async (payload:any,thunkAPI)=>{
    try{
      await $http.put('/ticket/update-user',payload)
    }catch (e) {
      console.log(e)
    }
  }
)
const completeTicket = createAsyncThunk(
  'ticket/complete-ticket',
  async(payload:any,thunkAPI)=>{
    try{
      await $http.put('/ticket/complete-ticket',payload)
    }catch(e){
      console.log(e)
    }
  }
)


export {
  createTicket,
  getTicket,
  getTv,
  missedTicket,
  updateUser,
  completeTicket
}