import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ACTION_STATUS } from '../../utils/reducer/reducer.utils';
import { nanoid } from '@reduxjs/toolkit';
import {
  addNotification,
  createNewGroup,
  deleteGroup,
  getGroupUsers,
  getReceiver,
  getUserGroupsFromFirestore,
  removeUser,
  updateAdminPermissions,
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

export const removeUserFromGroup = createAsyncThunk(
  'groups/removeUserFromGroup',
  async ({ groupId, uid, admin }, { rejectWithValue, getState }) => {
    try {
      if (admin) {
        const groupUsers = await getGroupUsers(groupId);
        const filteredGroupUsers = groupUsers.filter((user) => user.uid !== uid && !admin);

        if (filteredGroupUsers.length === 0)
          return rejectWithValue('Before quitting your group give someone Admin permissions.');
      }

      const groups = await getUserGroupsFromFirestore(uid);
      const newGroups = groups.filter(({ id }) => id !== groupId);
      const groupUsers = getState().groups.currentGroupUsers;
      const newGroupUsers = groupUsers.filter((user) => user.uid !== uid);

      await removeUser(groupId, uid, newGroupUsers, newGroups);

      return newGroupUsers;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteUserGroup = createAsyncThunk(
  'groups/deleteUserGroup',
  async ({ groupId, navigateToHome }, { rejectWithValue, getState }) => {
    try {
      const groupUsers = getState().groups.currentGroupUsers;
      let filteredUserGroups = [];
      for (const user of groupUsers) {
        const userGroups = await getUserGroupsFromFirestore(user.uid);
        filteredUserGroups.push({
          uid: user.uid,
          groups: userGroups.filter(({ id }) => id !== groupId),
        });
      }
      await deleteGroup(groupId, filteredUserGroups);
      navigateToHome();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const setAdminPermissions = createAsyncThunk(
  'groups/setAdminPermissions',
  async ({ groupId, uid, currentGroupUsers, permission }, { rejectWithValue }) => {
    try {
      const newGroupUsers = currentGroupUsers.map((user) =>
        user.uid === uid ? { ...user, admin: permission } : user
      );
      const userGroups = await getUserGroupsFromFirestore(uid);
      const newUserGroups = userGroups.map((group) =>
        group.id === groupId ? { ...group, admin: permission } : group
      );
      await updateAdminPermissions(groupId, uid, newGroupUsers, newUserGroups, permission);
      return newGroupUsers;
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
      })
      .addCase(removeUserFromGroup.pending, (state) => {
        state.status = ACTION_STATUS.PENDING;
        state.error = null;
      })
      .addCase(removeUserFromGroup.fulfilled, (state, action) => {
        state.status = ACTION_STATUS.IDLE;
        state.currentGroupUsers = action.payload;
      })
      .addCase(removeUserFromGroup.rejected, (state, action) => {
        state.status = ACTION_STATUS.FAILED;
        state.error = action.payload;
      })
      .addCase(deleteUserGroup.pending, (state) => {
        state.status = ACTION_STATUS.PENDING;
        state.error = null;
      })
      .addCase(deleteUserGroup.fulfilled, (state) => {
        state.status = ACTION_STATUS.IDLE;
      })
      .addCase(deleteUserGroup.rejected, (state, action) => {
        state.status = ACTION_STATUS.FAILED;
        state.error = action.payload;
      })
      .addCase(setAdminPermissions.pending, (state) => {
        state.status = ACTION_STATUS.PENDING;
        state.error = null;
      })
      .addCase(setAdminPermissions.fulfilled, (state, action) => {
        state.status = ACTION_STATUS.IDLE;
        state.currentGroupUsers = action.payload;
      })
      .addCase(setAdminPermissions.rejected, (state, action) => {
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
