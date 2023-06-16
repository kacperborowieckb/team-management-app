import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { signInWithGooglePopup } from '../../utils/firebase/firebase';
import { ACTION_STATUS } from '../../utils/reducer/reducer.utils';

const initialState = {
  user: null,
  status: ACTION_STATUS.IDLE,
  error: null,
};

export const logInUser = createAsyncThunk('user/logInUser', async () => {
  try {
    const {
      user: { uid, displayName, email },
    } = await signInWithGooglePopup();

    return { uid, displayName, email };
  } catch (err) {
    return err.message;
  }
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(logInUser.pending, (state) => {
        console.log(state.user);
        state.status = ACTION_STATUS.PENDING;
      })
      .addCase(logInUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = ACTION_STATUS.SUCCEEDED;
      })
      .addCase(logInUser.rejected, (state, action) => {
        state.status = ACTION_STATUS.FAILED;
        state.error = action.payload;
      });
  },
});

export const getCurrentUser = (state) => state.user.user;
export const getUserStatus = (state) => state.user.status;
export const getUserError = (state) => state.user.error;

export default userSlice.reducer;
