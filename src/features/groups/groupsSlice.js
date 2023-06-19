import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  groups: [],
};

export const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    setUserGroups: (state, action) => {
      state.groups = action.payload;
    },
  },
});

export const getUserGroups = (state) => state.groups.groups;

export const { setUserGroups } = groupsSlice.actions;

export default groupsSlice.reducer;
