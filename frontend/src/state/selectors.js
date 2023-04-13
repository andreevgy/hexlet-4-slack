export const getCurrentChannel = (state) => {
  const { channels, currentChannelId } = state.channelsState;
  return channels.find((c) => c.id === currentChannelId);
};

export const getMessagesForCurrentChannel = (state) => {
  const { currentChannelId } = state.channelsState;
  const { messages } = state.messagesState;
  return messages.filter((m) => m.channelId === currentChannelId);
};
