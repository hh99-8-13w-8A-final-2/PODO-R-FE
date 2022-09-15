import { combineReducers, configureStore } from "@reduxjs/toolkit";
import user from "./modules/userSlice";
import musicalSlice from "./modules/musicalSlice";
import thunk from "redux-thunk";
// import logger from "redux-logger";
const middlewares = [thunk];

// 리듀서 통합
const rootReducer = combineReducers({
  user, musicalSlice,
  devTools: false,
});

// 스토어 연결
const store = configureStore({
  reducer: rootReducer,

  middleware: [...middlewares],
});

export default store;
