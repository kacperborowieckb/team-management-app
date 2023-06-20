import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ACTION_STATUS } from '../../utils/reducer/reducer.utils';
import { nanoid } from '@reduxjs/toolkit';
import { createNewGroup } from '../../utils/firebase/firebase';

const initialState = {
  groups: [],
  status: ACTION_STATUS.IDLE,
  error: null,
};

export const createNewGroupDoc = createAsyncThunk(
  'groups/CreateNewGroupDoc',
  async ({ groupName, user, handleTooglePopup }, { rejectWithValue }) => {
    try {
      const id = nanoid();
      await createNewGroup(
        {
          name: groupName,
          users: [{ ...user, admin: true }],
          groupId: id,
        },
        id
      );
      handleTooglePopup();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    setUserGroups: (state, action) => {
      state.groups = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createNewGroupDoc.pending, (state) => {
        state.status = ACTION_STATUS.PENDING;
        state.error = null;
      })
      .addCase(createNewGroupDoc.fulfilled, (state) => {
        state.status = ACTION_STATUS.IDLE;
      })
      .addCase(createNewGroupDoc.rejected, (state, action) => {
        state.status = ACTION_STATUS.FAILED;
        state.error = action.payload;
      });
  },
});

export const getUserGroups = (state) => state.groups.groups;

export const { setUserGroups } = groupsSlice.actions;

export default groupsSlice.reducer;
