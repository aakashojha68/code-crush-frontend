import { createSlice } from "@reduxjs/toolkit";

const invitationSlice = createSlice({
  name: "invitations",
  initialState: [],
  reducers: {
    addInvitation: (state, action) => {
      return action.payload;
    },
    removeInvitation: (state, action) => {
      return state.filter(
        (invitation) => invitation._id.toString() !== action.payload
      );
    },
  },
});

export const { addInvitation, removeInvitation } = invitationSlice.actions;
export default invitationSlice.reducer;
