import { useState } from "react";
import { useAuth } from "../context/authContext";
import Register from "./Register";
import Login from "./Login";

const AuthWrapper = ({ children }) => {
  const [showRegister, setShowRegister] = useState(false);
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated()) {
    return showRegister ? (
      <Register onSwitchToLogin={() => setShowRegister(false)} />
    ) : (
      <Login onSwitchToRegister={() => setShowRegister(true)} />
    );
  }

  return children;
};

export default AuthWrapper;
