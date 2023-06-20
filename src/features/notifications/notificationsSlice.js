import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserNotifications } from '../../utils/firebase/firebase';
import { ACTION_STATUS } from '../../utils/reducer/reducer.utils';

const initialState = {
  notifications: [],
  status: ACTION_STATUS.IDLE,
  error: null,
};

export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async ({ uid }, { rejectWithValue }) => {
    try {
      const notifications = await getUserNotifications(uid);
      return notifications;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.status = ACTION_STATUS.PENDING;
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.notifications = action.payload;
        state.status = ACTION_STATUS.IDLE;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.status = ACTION_STATUS.FAILED;
        state.error = action.payload;
      });
  },
});

export const getNotifications = (state) => state.notifications.notifications;
export const getNotificationsError = (state) => state.notifications.error;

export const {} = notificationSlice.actions;

export default notificationSlice.reducer;
