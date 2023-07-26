import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import userReducer from '../features/user/userSlice';
import groupsReducer from '../features/groups/groupsSlice';
import notificationsReducer from '../features/notifications/notificationsSlice';
import tasksReducer from '../features/tasks/tasksSlice';
import calendarReducer from '../features/calendar/calendarSlice';
import chatReducer from '../features/chat/chatSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    groups: groupsReducer,
    notifications: notificationsReducer,
    tasks: tasksReducer,
    calendar: calendarReducer,
    chat: chatReducer,
  },
  middleware: (getDefaultMiddleware) =>
    process.env.NODE_ENV === 'development'
      ? getDefaultMiddleware().concat(logger)
      : getDefaultMiddleware(),
});
