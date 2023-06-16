import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { signInWithGooglePopup } from '../../utils/firebase/firebase';

const initialState = {
  user: null,
  status: 'idle', // 'pending' / 'succeeded' / 'failed',
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
        state.status = 'pending';
      })
      .addCase(logInUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = 'succeeded';
      })
      .addCase(logInUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const getCurrentUser = (state) => state.user.user;
export const getUserStatus = (state) => state.user.status;
export const getUserError = (state) => state.user.error;

export default userSlice.reducer;
