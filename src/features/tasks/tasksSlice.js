import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit';
import { addTask, updateTasks } from '../../utils/firebase/firebase';
import { ACTION_STATUS } from '../../utils/reducer/reducer.utils';

const initialState = {
  tasks: [],
  status: ACTION_STATUS.IDLE,
  error: null,
};

export const addNewTask = createAsyncThunk(
  'tasks/addNewTask',
  async ({ groupId, uid, title, content, taskColor, toogleAddTaskPopUp }, { rejectWithValue }) => {
    try {
      const task = {
        color: taskColor,
        title,
        content,
        taskId: nanoid(),
      };
      await addTask(groupId, uid, task);
      toogleAddTaskPopUp();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeExistingTask = createAsyncThunk(
  'tasks/removeTask',
  async ({ taskId, closePopup, uid }, { rejectWithValue, getState }) => {
    try {
      const tasks = getState().tasks.tasks;
      console.log(tasks[uid]);
      tasks[uid].map((task) => console.log(task));

      await updateTasks();
      closePopup();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(addNewTask.pending, (state) => {
        state.status = ACTION_STATUS.PENDING;
        state.error = null;
      })
      .addCase(addNewTask.fulfilled, (state) => {
        state.status = ACTION_STATUS.IDLE;
      })
      .addCase(addNewTask.rejected, (state, action) => {
        state.status = ACTION_STATUS.FAILED;
        state.error = action.payload;
      })
      .addCase(removeExistingTask.pending, (state) => {
        state.status = ACTION_STATUS.PENDING;
        state.error = null;
      })
      .addCase(removeExistingTask.fulfilled, (state) => {
        state.status = ACTION_STATUS.IDLE;
      })
      .addCase(removeExistingTask.rejected, (state, action) => {
        state.status = ACTION_STATUS.FAILED;
        state.error = action.payload;
      });
  },
});

export const { setTasks } = tasksSlice.actions;

export default tasksSlice.reducer;
