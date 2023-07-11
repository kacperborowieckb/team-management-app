import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getDaysInMonth } from '../../utils/calendar/calendar.utils';
import { ACTION_STATUS } from '../../utils/reducer/reducer.utils';

const initialState = {
  events: [],
  currentDate: {},
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
    setDate: {
      reducer: (state, action) => {
        state.currentDate = action.payload;
      },
      prepare: (day, month, year, daysInMonth) => {
        return { payload: { day, month, year, daysInMonth } };
      },
    },
    increaseMonth: (state) => {
      if (state.currentDate.month === 12) {
        state.currentDate.month = 1;
        state.currentDate.year++;
      } else {
        state.currentDate.month++;
      }
      state.currentDate.daysInMonth = getDaysInMonth(
        state.currentDate.month,
        state.currentDate.year
      );
    },
    decreaseMonth: (state) => {
      if (state.currentDate.month === 1) {
        state.currentDate.month = 12;
        state.currentDate.year--;
      } else {
        state.currentDate.month--;
      }
      state.currentDate.daysInMonth = getDaysInMonth(
        state.currentDate.month,
        state.currentDate.year
      );
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

export const { setDate, increaseMonth, decreaseMonth } = calendarSlice.actions;

export default calendarSlice.reducer;
