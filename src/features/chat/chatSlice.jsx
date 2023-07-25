import { createSlice } from '@reduxjs/toolkit';
import { ACTION_STATUS } from '../../utils/reducer/reducer.utils';

const initialState = {
  messages: [],
  status: ACTION_STATUS.IDLE,
  error: null,
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
  },
  //   extraReducers(builder) {
  //     builder
  //   .addCase(fetchNotifications.pending, (state) => {
  //     state.status = ACTION_STATUS.PENDING;
  //     state.error = null;
  //   })
  //   .addCase(fetchNotifications.fulfilled, (state, action) => {
  //     state.notifications = action.payload;
  //     state.status = ACTION_STATUS.IDLE;
  //   })
  //   .addCase(fetchNotifications.rejected, (state, action) => {
  //     state.status = ACTION_STATUS.FAILED;
  //     state.error = action.payload;
  //   });
  //   },
});

export const { setMessages } = chatSlice.actions;

export default chatSlice.reducer;
