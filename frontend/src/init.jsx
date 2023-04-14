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
    let state = 'pending'; // eslint-disable-line
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
  };

  const store = configureStore({
    reducer,
  });

  socket.on("newMessage", (payload) => {
    store.dispatch(actions.addMessage({ message: payload }));
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
