import { createSlice } from "@reduxjs/toolkit";

import { actions as channelsActions } from "./channels.js";

const slice = createSlice({
  name: "messagesState",
  initialState: { messages: [] },
  reducers: {
    addMessage(state, { payload }) {
      const { message } = payload;
      state.messages.push(message);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(channelsActions.setInitialState, (state, { payload }) => {
        const { messages } = payload;
        state.messages = messages;
      })
      .addCase(channelsActions.removeChannel, (state, { payload }) => {
        const { channelId } = payload;
        state.messages = state.messages.filter((message) => message.channelId !== channelId);
      });
  },
});

export const { actions } = slice;
export default slice.reducer;
