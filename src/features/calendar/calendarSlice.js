import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getDaysInMonth } from '../../utils/calendar/calendar.utils';
import { getEvents, updateTaskCollection } from '../../utils/firebase/firebase';
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
      return events;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addNewEvent = createAsyncThunk(
  'calendar/addNewEvent',
  async (
    { eventName, eventDescription, eventColor, date, day, groupId, closePopup },
    { rejectWithValue, getState }
  ) => {
    try {
      const {
        calendar: { events: events },
      } = getState();

      const {
        user: {
          user: { displayName },
        },
      } = getState();

      const currentTime = new Date();
      const createdAt = String(currentTime).split(' ').slice(1, 4).join(' ');

      const newEvents = {
        ...events[date],
        [day]: [
          ...(events[date] !== undefined && events[date][day] !== undefined
            ? events[date][day]
            : []),
          {
            color: eventColor,
            description: eventDescription,
            name: eventName,
            createdBy: displayName,
            createdAt,
          },
        ],
      };
      await updateTaskCollection(newEvents, groupId, date);
      closePopup();
      return { date, newEvents };
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
      })
      .addCase(addNewEvent.pending, (state) => {
        state.status = ACTION_STATUS.PENDING;
        state.error = null;
      })
      .addCase(addNewEvent.fulfilled, (state, { payload: { date, newEvents } }) => {
        state.status = ACTION_STATUS.IDLE;
        state.events[date] = newEvents;
      })
      .addCase(addNewEvent.rejected, (state, action) => {
        state.status = ACTION_STATUS.FAILED;
        state.error = action.payload;
      });
  },
});

export const getCurrentDate = (state) => state.calendar.currentDate;
export const getCurrentEvents = (state) => state.calendar.events;
export const getCalendarStatus = (state) => state.calendar.status;

export const { setDate, increaseMonth, decreaseMonth } = calendarSlice.actions;

export default calendarSlice.reducer;
