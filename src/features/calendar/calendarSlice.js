import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ACTION_STATUS } from '../../utils/reducer/reducer.utils';

const initialState = {
  events: [],
  currentDate: null,
  status: ACTION_STATUS.IDLE,
  error: null,
};

export const fetchCalendarEvents = createAsyncThunk(
  'calendar/fetchCalendarEvents',
  async (_, { rejectWithValue }) => {
    try {
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setDate: (state, action) => {
      state.currentDate = action.payload;
    },
  },
  //   extraReducers(builder) {
  //     builder
  //       .addCase(fetchNotifications.pending, (state) => {
  //         state.status = ACTION_STATUS.PENDING;
  //         state.error = null;
  //       })
  //       .addCase(fetchNotifications.fulfilled, (state, action) => {
  //         state.notifications = action.payload;
  //         state.status = ACTION_STATUS.IDLE;
  //       })
  //       .addCase(fetchNotifications.rejected, (state, action) => {
  //         state.status = ACTION_STATUS.FAILED;
  //         state.error = action.payload;
  //       });
  //   },
});

export const getCurrentDate = (state) => state.calendar.currentDate;

export const { setDate } = calendarSlice.actions;

export default calendarSlice.reducer;
