import { combineReducers } from '@reduxjs/toolkit';
import channelsState, { actions as channelsActions } from './channels.js';
import messagesState, { actions as messagesActions } from './messages.js';
import modalState, { actions as modalActions } from './modal.js';

const actions = {
  ...channelsActions,
  ...messagesActions,
  ...modalActions,
};

export {
  actions,
};

export default combineReducers({
  channelsState,
  messagesState,
  modalState,
});
