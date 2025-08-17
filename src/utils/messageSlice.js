import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "messages",
  initialState: [], //chatId: [messages],
  reducers: {
    addMessages: (state, action) => {
      //   const chatId = action.payload?.[0]?.chatId;
      //   state[chatId] = action.payload;
      return action.payload;
    },
    addMessage: (state, action) => {
      return [...state, action.payload];
    },
  },
});

export const { addMessages, addMessage } = messageSlice.actions;
export default messageSlice.reducer;
