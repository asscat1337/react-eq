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
  async(payload:number,thunkAPI)=>{
    console.log(payload)
    const {data} = await $http.get('/ticket/get-ticket',{
      headers:{
        authorization:`Bearer ${localStorage.getItem('token')}`
      },
      params:{
        user_id:payload
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

export {
  createTicket,
  getTicket,
  getTv,
  missedTicket
}