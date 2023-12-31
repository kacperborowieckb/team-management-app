import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit';
import { addTask, getUserTasksFromFirestore, updateTasks } from '../../utils/firebase/firebase';
import { ACTION_STATUS } from '../../utils/reducer/reducer.utils';

const initialState = {
  tasks: {},
  status: ACTION_STATUS.IDLE,
  error: null,
};

export const addNewTask = createAsyncThunk(
  'tasks/addNewTask',
  async (
    { groupId, uid, title, content, taskColor, toogleAddTaskPopUp, clearInputs },
    { rejectWithValue, getState }
  ) => {
    const date = new Date();
    const createdAt = String(date).split(' ').slice(1, 4).join(' ');
    const {
      user: {
        user: { displayName },
      },
    } = getState();
    try {
      const task = {
        color: taskColor,
        title,
        content,
        taskId: nanoid(),
        createdAt,
        createdBy: displayName,
      };
      await addTask(groupId, uid, task);
      toogleAddTaskPopUp();
      clearInputs();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeExistingTask = createAsyncThunk(
  'tasks/removeTask',
  async ({ taskId, closePopup, uid, groupId }, { rejectWithValue, getState }) => {
    try {
      const tasks = getState().tasks.tasks;
      const newTasks = tasks[uid].filter((task) => task.taskId !== taskId);
      await updateTasks(groupId, uid, newTasks);
      closePopup();
      return { [uid]: newTasks };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getUserTasksThunk = createAsyncThunk(
  'tasks/getAllUserTasks',
  async ({ group, uid }, { rejectWithValue }) => {
    try {
      const tasks = await getUserTasksFromFirestore(group, uid);
      return tasks;
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
      .addCase(removeExistingTask.fulfilled, (state, action) => {
        state.status = ACTION_STATUS.IDLE;
        state.tasks = action.payload;
        console.log(action.payload);
      })
      .addCase(removeExistingTask.rejected, (state, action) => {
        state.status = ACTION_STATUS.FAILED;
        state.error = action.payload;
      })
      .addCase(getUserTasksThunk.pending, (state) => {
        state.status = ACTION_STATUS.PENDING;
        state.error = null;
      })
      .addCase(getUserTasksThunk.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.status = ACTION_STATUS.SUCCEEDED;
      })
      .addCase(getUserTasksThunk.rejected, (state, action) => {
        state.status = ACTION_STATUS.FAILED;
        state.error = action.payload;
      });
  },
});

export const getTasksStatus = (state) => state.tasks.status;
export const getTasks = (state) => state.tasks.tasks;

export const { setTasks } = tasksSlice.actions;

export default tasksSlice.reducer;
