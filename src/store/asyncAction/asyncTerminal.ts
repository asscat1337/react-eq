import {createAsyncThunk} from "@reduxjs/toolkit";
import { $http } from "../../http/http";


const getTerminal = createAsyncThunk(
  'terminal/get-terminal',
  async (payload?:string)=>{
    const {data} = await $http.get('/terminal/get-terminal',{
      params:{
        name:payload
      }
    })
    return data
  }
)

export {
  getTerminal
}