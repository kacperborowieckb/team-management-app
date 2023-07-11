import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getDaysInMonth } from '../../utils/calendar/calendar.utils';
import { getEvents } from '../../utils/firebase/firebase';
import { ACTION_STATUS } from '../../utils/reducer/reducer.utils';

const initialState = {
  events: {},
  currentDate: {},
  status: ACTION_STATUS.IDLE,
  error: null,
};

export const fetchCalendarEvents = createAsyncThunk(
  'calendar/fetchCalendarEvents',
  async ({ groupId }, { rejectWithValue }) => {
    try {
      const events = await getEvents(groupId);
      console.log(events);
      return events;
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
  extraReducers(builder) {
    builder
      .addCase(fetchCalendarEvents.pending, (state) => {
        state.status = ACTION_STATUS.PENDING;
        state.error = null;
      })
      .addCase(fetchCalendarEvents.fulfilled, (state, action) => {
        state.events = action.payload;
        state.status = ACTION_STATUS.IDLE;
      })
      .addCase(fetchCalendarEvents.rejected, (state, action) => {
        state.status = ACTION_STATUS.FAILED;
        state.error = action.payload;
      });
  },
});

export const getCurrentDate = (state) => state.calendar.currentDate;
export const getCurrentEvents = (state, date = '') => state.calendar.events || [];

export const { setDate, increaseMonth, decreaseMonth } = calendarSlice.actions;

export default calendarSlice.reducer;
