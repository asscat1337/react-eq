import {createAsyncThunk} from "@reduxjs/toolkit";
import { $http } from "../../http/http";



const loginUser = createAsyncThunk(
  'user/login',
  async(payload:any,thunkAPI)=>{
    try{
      const {data} = await $http.post('/user/login',payload)
      return data
    }catch (e) {

    }
  }
)
const getTransferUser = createAsyncThunk(
  'user/get-transfer',
  async(payload:any,thunkAPI)=>{
    try {
      const {data} = await $http.get('/user/get-transfer',{
        params:{
          terminal:payload.terminal,
          user_id:payload.user_id
        }
      })
      return data
    }catch (e) {
      console.log(e)
    }
  }
)


export {
  loginUser,
  getTransferUser
}