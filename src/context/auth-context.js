import React, { useState } from "react";
import { getProfile } from "../api/api";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  currentUser: {},
  updateCurrentUser: () => {},
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

  const updateCurrentUser = async() => {
    const response = await getProfile(currentUserInfo.currentUser.id);
    const userData = {...currentUserInfo, currentUser: {...currentUserInfo.currentUser, ...response}};
    localStorage.setItem('currentUserInfo', JSON.stringify(userData));
    setCurrentUserInfo(userData);
  };

  return (
    <AuthContext.Provider
      value={{
        token: currentUserInfo.token,
        isLoggedIn: isLoggedIn,
        currentUser: currentUserInfo.currentUser,
        updateCurrentUser: updateCurrentUser,
        login: login,
        logout: logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
