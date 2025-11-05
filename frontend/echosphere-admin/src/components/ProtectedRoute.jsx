import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const ProtectedRoute = ({ children, requiredAdmin = false }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 via-black to-pink-500 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (requiredAdmin && !isAdmin()) {
    return (
      <div className="min-h-screen bg-gradient-to-br  from-blue-500 via-black to-pink-500 flex justify-center items-center">
        <div className="text-center">
          <p className="text-white text-2xl font-bold">Access Denied</p>
          <p className="text-white text-lg">Admin's only.</p>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
