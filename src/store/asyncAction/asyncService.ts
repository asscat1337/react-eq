import {createAsyncThunk,PayloadAction} from "@reduxjs/toolkit";
import {$http} from "../../http/http";
import { Service } from "../types/serviceType";


const getService = createAsyncThunk(
  'service/get-data',
  async (thunkAPI)=>{
    const {data} = await $http.get('/terminal/get-service')

    return data
  }
)

export {getService}