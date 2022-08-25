import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  persistReducer,
  REHYDRATE,
  PERSIST,
  PURGE,
  REGISTER,
  persistStore
} from "redux-persist";
import storage from "redux-persist/es/storage";
import service from "./slices/serviceSlice";
import terminal from "./slices/terminalSlice";
import ticket from "./slices/ticketSlice";
import tv from "./slices/tvSlice";
import dashboard from "./slices/dashboardSlice";
import login from "./slices/loginSlice";
import user from "./slices/userSlice";


const persistConfig = {
  key:'root',
  storage,
  blacklist:['tv']
}
const rootReducer = combineReducers({
  service,
  terminal,
  ticket,
  tv,
  dashboard,
  login,
  user
})
const persistedReducer = persistReducer(persistConfig,rootReducer)

const store = configureStore({
  reducer:persistedReducer,
  middleware:getDefaultMiddleware =>{
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    });
  }
})

const persistore = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch =typeof store.dispatch

export {persistore}
export default store