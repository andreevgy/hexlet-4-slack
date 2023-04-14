import { createSlice } from "@reduxjs/toolkit";

export const defaultChannelId = 1;

const slice = createSlice({
  name: "channelsState",
  initialState: { channels: [], currentChannelId: null },
  reducers: {
    setInitialState(state, { payload }) {
      const { channels, currentChannelId } = payload;
      state.channels = channels;
      state.currentChannelId = currentChannelId;
    },
    setCurrentChannel(state, { payload }) {
      const { channelId } = payload;
      state.currentChannelId = channelId;
    },
    addChannel(state, { payload }) {
      const { channel } = payload;
      state.channels.push(channel);
    },
    removeChannel(state, { payload }) {
      const { channelId } = payload;
      state.channels = state.channels.filter(({ id }) => id !== channelId);
      if (state.currentChannelId === channelId) {
        state.currentChannelId = defaultChannelId;
      }
    },

  },
});

export const { actions } = slice;
export default slice.reducer;
