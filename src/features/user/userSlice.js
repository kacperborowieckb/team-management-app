import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { signInWithGooglePopup } from '../../utils/firebase/firebase';

const initialState = {
  user: null,
};

export const logInUser = createAsyncThunk('user/logInUser', async () => {
  await signInWithGooglePopup();
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(logInUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export const getCurrentUser = (state) => state.user;

export default userSlice.reducer;
