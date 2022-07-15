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

export {
  loginUser
}