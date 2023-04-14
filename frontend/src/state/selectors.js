export const getCurrentChannel = (state) => {
  const { channels, currentChannelId } = state.channelsState;
  return channels.find((c) => c.id === currentChannelId);
};

export const getMessagesForCurrentChannel = (state) => {
  const { currentChannelId } = state.channelsState;
  const { messages } = state.messagesState;
  return messages.filter((m) => m.channelId === currentChannelId);
};

export const getChannelsNames = (state) => {
  const { channels } = state.channelsState;
  return channels.map(({ name }) => name);
};

export const getChannelById = (channelId) => (state) => {
  const { channels } = state.channelsState;
  return channels.find(({ id }) => channelId === id);
};
