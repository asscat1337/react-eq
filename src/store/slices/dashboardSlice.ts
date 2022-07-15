import {createSlice,PayloadAction} from "@reduxjs/toolkit";
import {IDashboard} from "../types/dashboardTypes";


const initialState: IDashboard= {
  transferNumber:""
}

const dashboard = createSlice({
  name:'dashboard',
  initialState,
  reducers:{
    setNumber(state,action){
      state.transferNumber = action.payload
    }
  }
})

export const {setNumber} = dashboard.actions
export default dashboard.reducer