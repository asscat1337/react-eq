import {createSlice} from "@reduxjs/toolkit";
import {IUser} from "../types/userTypes";
import {loginUser} from "../asyncAction/asyncUser";
import { logoutUser, refresh } from "../asyncAction/asyncLogin";

const initialState:IUser = {
  user:{
    user_id:0,
    login:"",
    terminal:"",
    expired:0,
    sendNotice:false
  },
  auth:false,
  loading:false,
  tokens:{
    refreshToken:"",
    accessToken:""
  },
}

const UserSlice = createSlice({
  name:'user',
  initialState,
  reducers:{},
  extraReducers:builder => {
    builder.addCase(loginUser.pending,(state,action)=>{
      state.loading = true
    })
    builder.addCase(loginUser.fulfilled,(state,action)=>{
      return {
        ...state,
        user:action.payload.user,
        auth:true,
        loading:false,
        tokens:action.payload?.tokens,
      }
    })
    builder.addCase(loginUser.rejected,(state,action)=>{
      state.loading = true
    })
    builder.addCase(logoutUser.fulfilled,(state,action)=>{
      state.auth = action.payload.logout
      state.tokens = {
        refreshToken:"",
        accessToken:""}
      state.user = {
        user_id:0,
        login:"",
        terminal:"",
        expired:0,
        sendNotice:false
      }
    })
    builder.addCase(refresh.fulfilled,(state,action)=>{
      return {
        ...state,
        auth:true,
        tokens:action.payload.token,
        user:action.payload.user,
      }
    })
  }
})

export default UserSlice.reducer