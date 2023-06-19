import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import userReducer from '../features/user/userSlice';
import groupsReducer from '../features/groups/groupsSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    groups: groupsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
