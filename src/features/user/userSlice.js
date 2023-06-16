import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { signInWithGooglePopup, signOutCurrentUser } from '../../utils/firebase/firebase';
import { ACTION_STATUS } from '../../utils/reducer/reducer.utils';

const initialState = {
  user: null,
  status: ACTION_STATUS.IDLE,
  error: null,
  isSignInPopupOpen: false,
};

export const signInUser = createAsyncThunk('user/signInUser', async () => {
  try {
    const {
      user: { uid, displayName, email },
    } = await signInWithGooglePopup();

    return { uid, displayName, email };
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const signOutUser = createAsyncThunk('user/signOutUser', async () => {
  try {
    await signOutCurrentUser();
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    toogleSignInPopup: (state, action) => {
      state.isSignInPopupOpen = action.payload;
    },
    setCurrentUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(signInUser.pending, (state) => {
        state.status = ACTION_STATUS.PENDING;
        state.error = null;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = ACTION_STATUS.SUCCEEDED;
        state.isSignInPopupOpen = false;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.status = ACTION_STATUS.FAILED;
        state.error = action.error.name;
      })
      .addCase(signOutUser.pending, (state) => {
        state.status = ACTION_STATUS.PENDING;
        state.error = null;
      })
      .addCase(signOutUser.fulfilled, (state) => {
        state.user = null;
        state.status = ACTION_STATUS.SUCCEEDED;
      })
      .addCase(signOutUser.rejected, (state, action) => {
        state.status = ACTION_STATUS.FAILED;
        state.error = action.payload;
      });
  },
});

export const getCurrentUser = (state) => state.user.user;
export const getUserStatus = (state) => state.user.status;
export const getUserError = (state) => state.user.error;
export const getIsSignInPopupOpen = (state) => state.user.isSignInPopupOpen;

export const { toogleSignInPopup, setCurrentUser } = userSlice.actions;

export default userSlice.reducer;
