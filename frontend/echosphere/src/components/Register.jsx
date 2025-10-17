import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const Register = ({ onSwitchToLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { register } = useAuth();
  //   const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Make sure fields aren't empty
    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      toast.error("Please fill in all fields");
      return;
    }

    // Make sure passwords match
    if (password !== confirmPassword) {
      setError("Passwords must match");
      toast.error("Passwords must match");
      return;
    }

    setLoading(true);
    try {
      const response = await register(email, password);

      if (response.success) {
        toast.success(response.message);
        onSwitchToLogin();
      } else {
        toast.error(response.message);
        setError(response.message);
      }
    } catch (e) {
      toast.error("Unexpected error. Please try again later");
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-500 via-black to-green-500 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center items-center mb-6">
            <div className="flex justify-center items-center mb-6">
              <img src="" alt="logo" className="w-16 h-16" />
              <h1 className="ml-3 text-3xl font-bold text-white">EchoSphere</h1>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Join EchoSphere
          </h2>
          <p className="text-gray-300">Start Listening Today</p>
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
                className="block w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
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
                className="block w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                placeholder="***********"
              />
            </div>

            {/* Confirm password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-200 mb-2"
              >
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="block w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                placeholder="***********"
              />
            </div>

            {/* Submit button */}
            <button
              className="w-full flex justify-center px-4 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 cursor-pointer"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Creating Account
                </div>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Switch to login */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Already have an account? {""}
              <button
                className="text-green-400 hover:text-green-300 font-medium transition-colors cursor-pointer"
                onClick={onSwitchToLogin}
              >
                Login
              </button>
            </p>
          </div>

          {/* Terms and conditions */}
          <div className="mt-4 text-center">
            <div className="text-xs text-gray-500">
              By creating an account, you agree to our Terms of Service and
              Privacy Policy.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
