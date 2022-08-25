import { createAsyncThunk } from "@reduxjs/toolkit";
import { $http } from "../../http/http";


const getUsers = createAsyncThunk(
  "user/get-users",
  async (payload: string, thunkAPI) => {
    const { data } = await $http.get(`/user/get-user/${payload}`);
    return data;
  }
);

const loginUser = createAsyncThunk(
  'user/login-user',
  async(payload:any,thunkAPI)=>{
    const {data} = await $http.post('/user/login',payload)

    return data
  }
);

const logoutUser = createAsyncThunk(
  'user/logout-user',
  async(payload:any,thunkAPI)=>{
        const {data} = await $http.get('/user/logout')
        return {...data,...payload}
  }
)
const refresh = createAsyncThunk(
  'user/refresh',
  async(thunkAPI)=>{
    const {data} = await $http.get('/user/refresh')
    return {
      ...data
    }
  }
)

export {
  getUsers,
  loginUser,
  logoutUser,
  refresh
};