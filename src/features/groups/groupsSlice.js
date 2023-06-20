import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ACTION_STATUS } from '../../utils/reducer/reducer.utils';
import { nanoid } from '@reduxjs/toolkit';
import { addNotification, createNewGroup, getReceiver } from '../../utils/firebase/firebase';

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

export const addUserToGroup = createAsyncThunk(
  'groups/addUserToGroup',
  async ({ email, user, groupId }, { rejectWithValue }) => {
    try {
      const receiverId = await getReceiver(email);
      const response = await addNotification(receiverId, user, groupId);
      console.log(response);
    } catch (error) {
      return rejectWithValue();
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
    setGroupsError: (state, action) => {
      state.error = action.payload;
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
      })
      .addCase(addUserToGroup.pending, (state) => {
        state.status = ACTION_STATUS.PENDING;
        state.error = null;
      })
      .addCase(addUserToGroup.fulfilled, (state) => {
        state.status = ACTION_STATUS.IDLE;
      })
      .addCase(addUserToGroup.rejected, (state) => {
        state.status = ACTION_STATUS.FAILED;
        state.error = 'Cannot find a user.';
      });
  },
});

export const getUserGroups = (state) => state.groups.groups;
export const getGroupsError = (state) => state.groups.error;

export const { setUserGroups, setGroupsError } = groupsSlice.actions;

export default groupsSlice.reducer;
