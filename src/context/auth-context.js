import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  currentUser: {},
  login: () => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const [currentUserInfo, setCurrentUserInfo] = useState(
    JSON.parse(localStorage.getItem("currentUserInfo")) || {}
  );

  const isLoggedIn = !!currentUserInfo.token;

  const login = (token, currentUser) => {
    const expirationTime = new Date();
    expirationTime.setHours(expirationTime.getHours() + 1);

    const userData = {
      token,
      currentUser,
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
        currentUser: currentUserInfo.currentUser,
        login: login,
        logout: logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
