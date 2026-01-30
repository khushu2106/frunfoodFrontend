import { createContext, useState, useEffect, useRef } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const logoutTimer = useRef(null);

  const startLogoutTimer = (token) => {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const expiry = payload.exp * 1000;
    const now = Date.now();
    const timeLeft = expiry - now;

    console.log("Auto logout in (ms):", timeLeft);

    if (timeLeft <= 0) {
      logout();
      return;
    }

    logoutTimer.current = setTimeout(() => {
      logout();
      alert("Session expired. Please login again.");
    }, timeLeft);
  };

  useEffect(() => {
    const token = localStorage.getItem("userToken");

    if (token) {
      setIsLoggedIn(true);
      startLogoutTimer(token);
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("userToken", token);
    setIsLoggedIn(true);
    startLogoutTimer(token);
  };

  const logout = () => {
    if (logoutTimer.current) clearTimeout(logoutTimer.current);
    localStorage.removeItem("userToken");
    setIsLoggedIn(false);
    console.log("Auto logged out");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
