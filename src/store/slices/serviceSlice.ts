import {createSlice,PayloadAction} from "@reduxjs/toolkit";
import {Service,IService} from "../types/serviceType";
import { getService } from "../asyncAction/asyncService";


const initialState:IService = {
  data:[],
  current:{},
  loading:false,
  modalOpen:false
}

const serviceSlice = createSlice({
  name:'service',
  initialState,
  reducers:{
    openModal(state,action){
      state.modalOpen = action.payload
    },
    setCurrent(state,action){
      state.current = action.payload
    }
  },
  extraReducers:(builder => {
    builder.addCase(getService.pending,(state)=>{
     // state.data = [], ???
      state.loading = true
    });
    builder.addCase(getService.fulfilled,(state,action)=>{
      state.data = action.payload
      state.loading = false
    });
    builder.addCase(getService.rejected,(state)=>{
      // state.data = [],
      state.loading = true
    });
  })
})

export const {setCurrent,openModal} = serviceSlice.actions

export default serviceSlice.reducer