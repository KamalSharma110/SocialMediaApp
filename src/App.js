import { useContext, useEffect } from "react";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import "./App.css";
import AuthPage from "./pages/AuthPage";
import AuthContext from "./context/auth-context";
import { getExpirationTime } from "./api/utils";
import HomePage from "./pages/HomePage";
import Root from "./pages/Root";
import ProfilePage from "./pages/ProfilePage";

function App() {
  const authCtx = useContext(AuthContext);

  // useEffect(() => {
  //   if (authCtx.isLoggedIn) {
  //     const expirationTime = getExpirationTime();

  //     if (expirationTime <= 0) authCtx.logout();
  //     else setTimeout(() => authCtx.logout(), expirationTime);
  //   }
  // }, [authCtx]);

  const router = createBrowserRouter([
    {
      path: "/",
      children: [
        { index: true, element: <Navigate to="/auth" replace /> },
        { path: "auth", element: <AuthPage /> },
        {
          path: "home",
          element: <Root />,
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
