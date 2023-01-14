import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./storage/redux/store";
import App from "./App";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { LoadingOutlined } from "@ant-design/icons";

const container = document.getElementById("root")!;
const root = createRoot(container);

const persistor = persistStore(store);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<LoadingOutlined />} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
