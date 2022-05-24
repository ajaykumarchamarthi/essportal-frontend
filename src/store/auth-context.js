import React, { useState } from "react";
import Cookies from "js-cookie";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
  user: undefined,
  isLeaveSubmitted: false,
  isUserAdded: false,
  toggleIsSubmitted: () => {},
  toggleIsUserAdded: () => {},
});

export const AuthContextProvider = (props) => {
  const cookies = Cookies.get("jwt");
  const userIsLoggedIn = !!cookies;

  const [token, setToken] = useState(cookies);

  const [isLeaveSubmitted, setIsLeaveSubmitted] = useState(false);
  const [isUserAdded, setIsUserAdded] = useState(false);

  const logoutHandler = () => {
    Cookies.remove("jwt");
    setToken(null);
    localStorage.removeItem("userId");
    localStorage.removeItem("user");
  };

  const loginHandler = (token, userId, user) => {
    Cookies.set("jwt", token, { expires: 7, path: "/" });
    localStorage.setItem("user", user);
    localStorage.setItem("userId", userId);
    setToken(token);
  };

  const toggleSubmitHandler = () => {
    setIsLeaveSubmitted(!isLeaveSubmitted);
  };

  const toggleUserAddedHandler = () => {
    setIsUserAdded(!isUserAdded);
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    isLeaveSubmitted: isLeaveSubmitted,
    isUserAdded: isUserAdded,
    toggleIsSubmitted: toggleSubmitHandler,
    toggleIsUserAdded: toggleUserAddedHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
