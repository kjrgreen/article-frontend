import { combineReducers } from '@reduxjs/toolkit';
import contentReducer from '../features/content/contentSlice';

export default combineReducers({
    content: contentReducer,
  });