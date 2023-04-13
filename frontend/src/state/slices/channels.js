import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "channelsState",
  initialState: { channels: [], currentChannelId: null },
  reducers: {
    setInitialState(state, { payload }) {
      const { channels, currentChannelId } = payload;
      state.channels = channels;
      state.currentChannelId = currentChannelId;
    },
  },
});

export const { actions } = slice;
export default slice.reducer;
