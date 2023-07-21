import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./context/auth-context";
import { FriendsContextProvider } from "./context/friends-context";
import { PostsContextProvider } from "./context/posts-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <PostsContextProvider>
        <FriendsContextProvider>
          <App />
        </FriendsContextProvider>
      </PostsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
