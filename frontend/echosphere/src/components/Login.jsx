import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../context/authContext";
import { assets } from "../assets/assets";

const Login = ({ onSwitchToRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Make sure fields aren't empty
    if (!email || !password) {
      setError("Please fill in all fields");
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const response = await login(email, password);
      if (!response.success) {
        toast.error(response.message);
        setError(response.message);
      }
    } catch (error) {
      toast.error("Unexpected error. Please try again later");
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-black to-blue-500 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center items-center mb-6">
            <div className="flex justify-center items-center mb-6">
              <img src={assets.logo} alt="logo" className="w-16 h-16" />
              <h1 className="ml-3 text-3xl font-bold text-white">EchoSphere</h1>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
          <p className="text-gray-300">Sign in</p>
        </div>

        {/* Register form */}
        <div className="bg-gray-900/80 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-gray-700">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error */}
            {error && (
              <div className="bg-red-500/20 border border-red-500 rounded-lg p-3 text-red-300 text-sm">
                {error}
              </div>
            )}

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-200 mb-2"
              >
                Email
              </label>
              <input
                type="text"
                name="email"
                id="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
                placeholder="janedoe@email.com"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-200 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
                placeholder="***********"
              />
            </div>

            {/* Submit button */}
            <button
              className="w-full flex justify-center px-4 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 cursor-pointer"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Logging in
                </div>
              ) : (
                "Login"
              )}
            </button>
          </form>

          {/* Switch to register */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Don't have an account? {""}
              <button
                className="text-pink-500 hover:text-pink-700 font-medium transition-colors cursor-pointer"
                onClick={onSwitchToRegister}
              >
                Register
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
