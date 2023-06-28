import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  currentUserId: "",
  login: () => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const [currentUserInfo, setCurrentUserInfo] = useState(
    JSON.parse(localStorage.getItem("currentUserInfo")) || {}
  );

  const isLoggedIn = !!currentUserInfo.token;

  const login = (token, currentUserId) => {
    const expirationTime = new Date();
    expirationTime.setMinutes(expirationTime.getMinutes() + 30);

    const userData = {
        token,
        currentUserId,
        expirationTime: expirationTime.toISOString(),
    };

    localStorage.setItem(
      "currentUserInfo",
      JSON.stringify(userData)
    );

    setCurrentUserInfo(userData);
  };

  const logout = () => {
    localStorage.removeItem("currentUserInfo");
    setCurrentUserInfo(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token: currentUserInfo.token,
        isLoggedIn: isLoggedIn,
        currentUserId: currentUserInfo.currentUserId,
        login: login,
        logout: logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
