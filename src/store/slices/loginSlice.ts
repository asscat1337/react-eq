import {createSlice} from "@reduxjs/toolkit";
import {ILogin} from "../types/loginTypes";
import {getUsers,loginUser} from "../asyncAction/asyncLogin";


const initialState:ILogin = {
  data:[],
  loading:true,
  current:{
    user_id:0,
    login:"",
    terminal:""
  }
}

const login = createSlice({
  name:'login',
  initialState,
  reducers:{
    setCurrent(state,action){
      state.current.login = action.payload
    }
  },
  extraReducers:builder => {
    builder.addCase(getUsers.pending,(state,action)=>{
      return state
    })
    builder.addCase(getUsers.fulfilled,(state,action)=>{
      return {
        ...state,
        data:action.payload,
        loading:false
      }
    })
    builder.addCase(getUsers.rejected,(state,action)=>{
      state.loading = true
    })
    builder.addCase(loginUser.pending,(state,action)=>{
      return state
    })
    builder.addCase(loginUser.fulfilled,(state,action)=>{
      return {
        ...state,
        data:action.payload,
        loading:false
      }
    })
    builder.addCase(loginUser.rejected,(state,action)=>{
      state.loading = true
    })
  }
})

export const {setCurrent} = login.actions

export default login.reducer