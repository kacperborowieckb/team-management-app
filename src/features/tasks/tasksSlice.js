import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ACTION_STATUS } from '../../utils/reducer/reducer.utils';

const initialState = {
  tasks: [],
  status: ACTION_STATUS.IDLE,
  error: null,
};

export const fetchGroupTasks = createAsyncThunk(
  'tasks/fetchGroupTasks',
  async ({ groupId }, { rejectWithValue }) => {
    try {
    } catch (error) {
      return error.message;
    }
  }
);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchGroupTasks.pending, (state) => {
        state.status = ACTION_STATUS.PENDING;
        state.error = null;
      })
      .addCase(fetchGroupTasks.fulfilled, (state, action) => {
        state.status = ACTION_STATUS.IDLE;
        state.tasks = action.payload;
      })
      .addCase(fetchGroupTasks.rejected, (state, action) => {
        state.status = ACTION_STATUS.FAILED;
        state.error = action.payload;
      });
  },
});

export default tasksSlice.reducer;
