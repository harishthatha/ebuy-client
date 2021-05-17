import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [token, setToken] = useState("");

  const login = ({ userDetails, token }) => {
    setUser(userDetails);
    setToken(token);
    setIsLoggedIn(true);
    setLocalStorageAuth({ user: userDetails, token });
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser({});
    setToken("");
    setLocalStorageAuth({ user: {}, token: "" });
  };

  const setLocalStorageAuth = (data) =>
    window.localStorage.setItem("authData", JSON.stringify(data));

  useEffect(() => {
    const authData = window.localStorage.getItem("authData");
    if (authData !== null) {
      const auth = JSON.parse(authData);
      const { user, token } = auth;
      setUser(user);
      if (token) setIsLoggedIn(true);
      setToken(token);
    }
  }, []);

  useEffect(() => {
    setLocalStorageAuth({ user, token });
  }, [user, token]);

  return (
    <AuthContext.Provider value={{ login, logout, isLoggedIn, user, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
