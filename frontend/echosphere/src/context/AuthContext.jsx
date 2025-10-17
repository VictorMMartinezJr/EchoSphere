import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};

export const AuthProvider = ({ children }) => {
  const API_BASE_URL = "http://localhost:8080";

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("userToken"));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const storedToken = localStorage.getItem("userToken");
    const storedUser = localStorage.getItem("userData");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  const register = async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/register`, {
        email,
        password,
      });

      if (response.status === 200) {
        return {
          success: true,
          message: "Registration successful.",
        };
      } else {
        return {
          success: false,
          message: response.data.message || "Registration failed.",
        };
      }
    } catch (error) {
      return {
        success: false,
        message:
          response.data.message || "Network error. Please try again later.",
      };
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        email,
        password,
      });

      if (response.status === 200) {
        setToken(response.data.token);
        setUser({
          email: response.data.email,
          role: response.data.role,
        });
        localStorage.setItem("userToken", response.data.token);
        localStorage.setItem(
          "userData",
          JSON.stringify({
            email: response.data.email,
            role: response.data.role,
          })
        );

        return { success: true };
      } else {
        return {
          success: false,
          message: response.data.maessage || "Login failed.",
        };
      }
    } catch (error) {
      return {
        success: false,
        message:
          error.response.data || "Network Error. Please try again later.",
      };
    }
  };

  const isAuthenticated = () => {
    return !!token && !!user;
  };

  const contextValue = { register, login, isAuthenticated };
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
