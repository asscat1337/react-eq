import {configureStore} from "@reduxjs/toolkit";
import service from "./slices/serviceSlice";
import terminal from './slices/terminalSlice'
import ticket from './slices/ticketSlice'
import tv from "./slices/tvSlice";
import dashboard from './slices/dashboardSlice'
import login from './slices/loginSlice'
import user from './slices/userSlice'

const store = configureStore({
  reducer:{
    service,
    terminal,
    ticket,
    tv,
    dashboard,
    login,
    user
  },
  // middleware:(getDefaultMiddleware)=>{
  //   return getDefaultMiddleware().concat(socketMiddleware)
  // }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch =typeof store.dispatch

export default store