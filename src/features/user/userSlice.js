import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createAuthUserWithEmailAndPassword,
  createUserDocDisplayName,
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
  signOutCurrentUser,
  updataDisplayName,
} from '../../utils/firebase/firebase';
import { ACTION_STATUS } from '../../utils/reducer/reducer.utils';

const initialState = {
  user: undefined,
  status: ACTION_STATUS.IDLE,
  error: null,
  isSignInPopupOpen: false,
};

export const signInUser = createAsyncThunk(
  'user/signInUser',
  async (navigateToHomePage, { rejectWithValue }) => {
    try {
      const {
        user: { displayName, email, uid },
      } = await signInWithGooglePopup();
      navigateToHomePage();
      return { displayName, email, uid };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const signUpUser = createAsyncThunk(
  'user/signUpUser',
  async ({ email, displayName, password, navigateToHomePage }, { rejectWithValue }) => {
    try {
      const { user } = await createAuthUserWithEmailAndPassword(email, password);
      await updataDisplayName(displayName);
      await createUserDocDisplayName(user, displayName);
      navigateToHomePage();
      return displayName;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const signInUserWithEmailAndPassword = createAsyncThunk(
  'user/signInWithEmailAndPassword',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      await signInAuthUserWithEmailAndPassword(email, password);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const signOutUser = createAsyncThunk('user/signOutUser', async (_, { rejectWithValue }) => {
  try {
    await signOutCurrentUser();
  } catch (error) {
    return rejectWithValue(error.message);
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
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(signInUser.pending, (state) => {
        state.status = ACTION_STATUS.PENDING;
        state.error = null;
      })
      .addCase(signInUser.fulfilled, (state) => {
        state.status = ACTION_STATUS.SUCCEEDED;
        state.isSignInPopupOpen = false;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.status = ACTION_STATUS.FAILED;
        state.error = action.payload;
      })
      .addCase(signInUserWithEmailAndPassword.pending, (state) => {
        state.status = ACTION_STATUS.PENDING;
        state.error = null;
      })
      .addCase(signInUserWithEmailAndPassword.fulfilled, (state) => {
        state.status = ACTION_STATUS.SUCCEEDED;
        state.isSignInPopupOpen = false;
      })
      .addCase(signInUserWithEmailAndPassword.rejected, (state, action) => {
        state.status = ACTION_STATUS.FAILED;
        state.error = action.payload;
      })
      .addCase(signUpUser.pending, (state) => {
        state.status = ACTION_STATUS.PENDING;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.status = ACTION_STATUS.SUCCEEDED;
        state.user.displayName = action.payload;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.status = ACTION_STATUS.FAILED;
        state.error = action.payload;
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
export const getUserUid = (state) => state.user.user.uid;

export const { toogleSignInPopup, setCurrentUser, setError } = userSlice.actions;

export default userSlice.reducer;
