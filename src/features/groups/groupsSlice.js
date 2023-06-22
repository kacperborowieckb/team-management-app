import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ACTION_STATUS } from '../../utils/reducer/reducer.utils';
import { nanoid } from '@reduxjs/toolkit';
import {
  addNotification,
  createNewGroup,
  getGroupUsers,
  getReceiver,
} from '../../utils/firebase/firebase';

const initialState = {
  groups: [],
  currentGroupUsers: [],
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
  async ({ email, user, groupId, groupName, closePopup }, { rejectWithValue }) => {
    try {
      const receiverId = await getReceiver(email);
      await addNotification(receiverId, user, groupId, groupName);
      closePopup();
    } catch (error) {
      return rejectWithValue();
    }
  }
);

export const fetchCurrentGroupUsers = createAsyncThunk(
  'groups/fetchCurrentGroupUsers',
  async ({ groupId }, { rejectWithValue }) => {
    try {
      const groupUsers = await getGroupUsers(groupId);
      return groupUsers;
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
      })
      .addCase(fetchCurrentGroupUsers.pending, (state) => {
        state.status = ACTION_STATUS.PENDING;
        state.error = null;
      })
      .addCase(fetchCurrentGroupUsers.fulfilled, (state, action) => {
        state.status = ACTION_STATUS.IDLE;
        state.currentGroupUsers = action.payload;
      })
      .addCase(fetchCurrentGroupUsers.rejected, (state, action) => {
        state.status = ACTION_STATUS.FAILED;
        state.error = action.payload;
      });
  },
});

export const getUserGroups = (state) => state.groups.groups;
export const getGroupsError = (state) => state.groups.error;
export const getCurrentGroupUsers = (state) => state.groups.currentGroupUsers;
export const getGroupsStatus = (state) => state.groups.status;

export const { setUserGroups, setGroupsError } = groupsSlice.actions;

export default groupsSlice.reducer;
