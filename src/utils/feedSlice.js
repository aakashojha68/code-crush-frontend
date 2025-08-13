import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: {
    totalUsers: 0,
    feeds: [],
  },
  reducers: {
    addFeed: (state, action) => {
      state.feeds = [...state.feeds, ...action.payload.feeds];
      state.totalUsers = action.payload.totalUsers;
      return state;
    },
    removeFeed: (state, action) => {
      state.feeds = state.feeds.filter((user) => user._id !== action.payload);
      state.totalUsers = state.totalUsers - 1;
      return state;
    },
    clearFeed: () => {
      return {
        totalUsers: 0,
        feeds: [],
      };
    },
  },
});

export const { addFeed, removeFeed, clearFeed } = feedSlice.actions;
export default feedSlice.reducer;
