import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getTimeWhenMessageIsCreated } from '../../utils/chat/chat.utils';
import { addNewMessageToCollection } from '../../utils/firebase/firebase';
import { ACTION_STATUS } from '../../utils/reducer/reducer.utils';

const initialState = {
  messages: [],
  status: ACTION_STATUS.IDLE,
  error: null,
};

export const addNewMessage = createAsyncThunk(
  'chat/addNewMessage',
  async ({ displayName, uid, content, groupId, clearInput }, { rejectWithValue }) => {
    try {
      const createdAt = getTimeWhenMessageIsCreated();
      await addNewMessageToCollection(groupId, { content, createdAt, displayName, uid });
      clearInput();
      return;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(addNewMessage.pending, (state) => {
        state.status = ACTION_STATUS.PENDING;
        state.error = null;
      })
      .addCase(addNewMessage.fulfilled, (state) => {
        state.status = ACTION_STATUS.IDLE;
      })
      .addCase(addNewMessage.rejected, (state, action) => {
        state.status = ACTION_STATUS.FAILED;
        state.error = action.payload;
      });
  },
});

export const { setMessages } = chatSlice.actions;

export default chatSlice.reducer;
