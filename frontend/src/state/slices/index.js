import { combineReducers } from "@reduxjs/toolkit";
import channelsState, { actions as channelsActions } from "./channels.js";
import messagesState, { actions as messagesActions } from "./messages.js";

const actions = {
  ...channelsActions,
  ...messagesActions,
};

export {
  actions,
};

export default combineReducers({
  channelsState,
  messagesState,
});
