import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  messages: [], // store chat messages here
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    openChat: (state) => {
      state.isOpen = true;
    },
    closeChat: (state) => {
      state.isOpen = false;
    },
    // toggleChat: (state) => {
    //   state.isOpen = !state.isOpen;
    // },
    // addMessage: (state, action) => {
    //   state.messages.push(action.payload); // add a new message
    // },
    // setMessages: (state, action) => {
    //   state.messages = action.payload; // set messages array (for initial load)
    // },
  },
});

export const { openChat, closeChat } = chatSlice.actions;
export default chatSlice.reducer;
