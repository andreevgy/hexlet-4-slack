import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import { io } from "socket.io-client";
import App from "./App.jsx";
import reducer, { actions } from "./state";
import ApiContext from "./contexts/apiContext";

const init = () => {
  const socket = io();

  const withCheck = (socketFunc) => (...args) => new Promise((resolve, reject) => {
    // eslint-disable-next-line functional/no-let
    let state = "pending";
    const timer = setTimeout(() => {
      state = "rejected";
      reject();
    }, 3000);

    socketFunc(...args, (response) => {
      if (state !== "pending") return;

      clearTimeout(timer);

      if (response.status === "ok") {
        state = "resolved";
        resolve(response.data);
      }

      reject();
    });
  });

  const api = {
    sendMessage: withCheck((...args) => socket.volatile.emit("newMessage", ...args)),
    createChannel: withCheck((...args) => socket.volatile.emit("newChannel", ...args)),
    removeChannel: withCheck((...args) => socket.volatile.emit("removeChannel", ...args)),
    renameChannel: withCheck((...args) => socket.volatile.emit("renameChannel", ...args)),
  };

  const store = configureStore({
    reducer,
  });

  socket.on("newMessage", (payload) => {
    store.dispatch(actions.addMessage({ message: payload }));
  });
  socket.on("newChannel", (payload) => {
    store.dispatch(actions.addChannel({ channel: payload }));
  });
  socket.on("removeChannel", (payload) => {
    store.dispatch(actions.removeChannel({ channelId: payload.id }));
  });
  socket.on("renameChannel", (payload) => {
    store.dispatch(actions.renameChannel({
      channelId: payload.id,
      channelName: payload.name,
    }));
  });

  return (
    <Provider store={store}>
      <ApiContext.Provider value={api}>
        <App />
      </ApiContext.Provider>
    </Provider>
  );
};

export default init;
