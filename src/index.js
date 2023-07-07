import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./context/auth-context";
import { FriendsContextProvider } from "./context/friends-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <FriendsContextProvider>
        <App />
      </FriendsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
