import {createSlice} from "@reduxjs/toolkit";
import {ITerminal} from "../types/terminalType";
import {getTerminal} from "../asyncAction/asyncTerminal";

const initialState:ITerminal = {
  data:{},
  services:[],
  loading:false
}

const TerminalSlice = createSlice({
  name:'terminal',
  initialState,
  reducers:{
    updatePointer(state,action){
      console.log(action.payload.service.pointer)
      state.services = state.services.map(item=>{
        if(item.service_id === action.payload.service_id){
          return {
            ...item,
            pointer:action.payload.service.pointer
          }
        }
        return item
      })
    },
    setLoading(state,action){
      state.loading = action.payload
    }
  },
  extraReducers:builder => {
    builder.addCase(getTerminal.pending,(state)=>{
      state.loading = true
    });
    builder.addCase(getTerminal.fulfilled,(state,action)=>{
      state.data = action.payload
      state.services = action.payload.service
      state.loading = false
    });
    builder.addCase(getTerminal.rejected,(state)=>{
      state.loading = true
    })
  }

})
export const {updatePointer,setLoading} = TerminalSlice.actions
export default TerminalSlice.reducer