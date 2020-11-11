import { combineReducers } from '@reduxjs/toolkit';
import contentReducer from "./reducers/contentReducer";

export default combineReducers({
    content: contentReducer,
  });