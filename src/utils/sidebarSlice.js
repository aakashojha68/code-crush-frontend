import { createSlice } from "@reduxjs/toolkit";

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: true,
  reducers: {
    toggleSidebar: (state, action) => {
      return !state;
    },
    hideSidebar: (state, action) => {
      return false;
    },
  },
});
export const { toggleSidebar, hideSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;
