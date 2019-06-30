import React from "react";
import { Provider } from "react-redux";
import store from "./app/store/store";
import MainNavigator from "./app/routes/MainNavigator";

export default function App() {
  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
}
