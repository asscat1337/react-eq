import {createSlice,PayloadAction} from "@reduxjs/toolkit";
import {IDashboard} from "../types/dashboardTypes";
import {getTransferUser} from "../asyncAction/asyncUser";


const initialState: IDashboard= {
  transferNumber:0,
  transferUser:[],
  loading:false
}

const dashboard = createSlice({
  name:'dashboard',
  initialState,
  reducers:{
    setNumber(state,action){
      state.transferNumber = action.payload
    }
  },
  extraReducers:builder => {
    builder.addCase(getTransferUser.pending,(state,action)=>{
      state.loading = true
    })
    builder.addCase(getTransferUser.fulfilled,(state,action)=>{
      // state.loading = false,
      state.transferUser = action.payload
    })
    builder.addCase(getTransferUser.rejected,(state,action)=>{
      state.loading = true
    })
  }
})

export const {setNumber} = dashboard.actions
export default dashboard.reducer