import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import { io } from "socket.io-client";
import i18next from "i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";
import leoProfanity from "leo-profanity";
import App from "./App.jsx";
import reducer, { actions } from "./state";
import ApiContext from "./contexts/apiContext";
import resources from "./locales";

const init = async () => {
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

  const i18n = i18next.createInstance();

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: "ru",
    });

  const ruDict = leoProfanity.getDictionary("ru");
  leoProfanity.add(ruDict);

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <ApiContext.Provider value={api}>
          <App />
        </ApiContext.Provider>
      </I18nextProvider>
    </Provider>
  );
};

export default init;
