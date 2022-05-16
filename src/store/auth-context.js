import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
  user: undefined,
});

export const AuthContextProvider = (props) => {
  const history = useHistory();
  const cookies = Cookies.get("jwt");
  const userIsLoggedIn = !!cookies;

  const [token, setToken] = useState(cookies);

  const logoutHandler = () => {
    Cookies.remove("jwt");
    setToken(null);
    localStorage.removeItem("userId");
    localStorage.removeItem("user");
    history.replace("/");
  };

  const loginHandler = (token, userId, user) => {
    Cookies.set("jwt", token, { expires: 7, path: "/" });
    localStorage.setItem("user", user);
    localStorage.setItem("userId", userId);
    setToken(token);
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
