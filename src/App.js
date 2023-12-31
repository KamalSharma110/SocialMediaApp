import { useEffect, useContext } from "react";
import {
  Navigate,
  RouterProvider,
  createHashRouter,
} from "react-router-dom";
import { io } from "socket.io-client";

import AuthPage from "./pages/AuthPage";
import AuthContext from "./context/auth-context";
import { getExpirationTime } from "./api/utils";
import HomePage from "./pages/HomePage";
import Root from "./pages/Root";
import ProfilePage from "./pages/ProfilePage";
import { BASE_URL } from "./api/api";


export let socket;
function App() {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const id = authCtx.currentUser?.id;

  useEffect(() => {
    if (isLoggedIn) {
      socket = io(BASE_URL, { autoConnect: false });
      socket.connect();
      socket.emit('store_user', { userId: id });
      const expirationTime = getExpirationTime();

      if (expirationTime <= 0) authCtx.logout();
      else setTimeout(() => authCtx.logout(), expirationTime);
    }
  }, [isLoggedIn, id, authCtx]);

  const router = createHashRouter([
    { 
      path: "/",
      children: [
        { index: true, element: <Navigate to="/auth" replace /> },
        { path: "auth", element: <AuthPage /> },
        {
          path: "home",
          element: isLoggedIn ? <Root /> : <Navigate to='/auth' replace/>,
          children: [
            { index: true, element: <HomePage /> },
            { path: "profile/:userId", element: <ProfilePage /> },
          ],
        },
      ],
    },
    { path: "*", element: <Navigate to="/auth" replace /> },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
