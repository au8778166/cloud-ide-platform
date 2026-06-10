import { createContext, useContext, useEffect, useState } from "react";

import { getProfile } from "../api/authApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  const login = (userData, jwt) => {
    localStorage.setItem("token", jwt);

    setUser(userData);
    setToken(jwt);
  };

  const logout = () => {
    localStorage.removeItem("token");

    setUser(null);
    setToken(null);
  };
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const savedToken = localStorage.getItem("token");

        if (!savedToken) {
          setLoading(false);
          return;
        }

        const data = await getProfile(savedToken);

        setUser(data.user);
        setToken(savedToken);
      } catch (error) {
        localStorage.removeItem("token");

        setUser(null);
        setToken(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
