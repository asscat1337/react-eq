import {createSlice} from "@reduxjs/toolkit";
import {IUser} from "../types/userTypes";
import {loginUser} from "../asyncAction/asyncUser";
import { logoutUser} from "../asyncAction/asyncLogin";

const initialState:IUser = {
  user:{
    user_id:0,
    login:"",
    terminal:"",
    expired:0,
    sendNotice:false,
    getCurrentTicket:false,
  },
  setting:{},
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
    builder.addCase(loginUser.pending,(state)=>{
      state.loading = true
    })
    builder.addCase(loginUser.fulfilled,(state,action)=>{
      return {
        ...state,
        user:action.payload.user,
        setting:action.payload.user.setting,
        auth:true,
        loading:false,
        tokens:action.payload.tokens,
      }
    })
    builder.addCase(loginUser.rejected,(state)=>{
      state.loading = true
    })
    builder.addCase(logoutUser.fulfilled,(state)=>{
      state.auth = false
      state.tokens = {
        refreshToken:"",
        accessToken:""}
      state.user = {
        user_id:0,
        login:"",
        terminal:"",
        expired:0,
        sendNotice:false,
        getCurrentTicket:false,
      }
    })
  }
})

export default UserSlice.reducer