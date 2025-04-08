import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { X, Eye, EyeOff } from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const AuthPage = ({ setToken, url, setShowLogin }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.email.includes("@")) return toast.error("Invalid email");
    if (isSignup && data.name.trim().length < 2)
      return toast.error("Name too short");
    if (data.password.length < 6)
      return toast.error("Password must be 6+ characters");

    const route = isSignup ? "/user/register" : "/user/login";

    try {
      const res = await axios.post(url + route, data);
      if (res.data.success) {
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
        toast.success(isSignup ? "Signed up!" : "Logged in!");
        setData({ name: "", email: "", password: "" });
        setShowLogin(false);
      } else {
        toast.error(res.data.message || "Login failed");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Server error");
    }
  };

  const handleGoogleLogin = async (res) => {
    try {
      const decoded = jwtDecode(res.credential);
      const googleUser = {
        name: decoded.name,
        email: decoded.email,
        avatar: decoded.picture,
      };

      const response = await axios.post(url + "/user/google-login", googleUser);
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        toast.success("Google login success");
        setShowLogin(false);
      } else {
        toast.error("Google login failed");
      }
    } catch (err) {
      toast.error("Google login error");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
      <div className="w-full max-w-4xl h-[540px] bg-white rounded-2xl shadow-2xl overflow-hidden flex relative">
        {/* Close Button - Top Right of Modal */}
        <button
          onClick={() => setShowLogin(false)}
          className="absolute top-4 right-4 bg-white text-orange-500 rounded-full p-2 shadow-md z-50 hover:bg-orange-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Panel */}
        <div className="w-1/2 bg-orange-500 text-white flex flex-col items-center justify-center p-8">
          <h2 className="text-4xl font-bold mb-4">Welcome to FoodieMania</h2>
          <p className="text-center text-lg">
            Discover the best food & deals around you. Sign up now or login to
            start ordering!
          </p>
          <img src="/logo.svg" alt="logo" className="mt-8 w-24 h-24" />
        </div>

        {/* Right Panel - Form */}
        <div className="w-1/2 bg-white p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-orange-500 mb-1">
            {isSignup ? "Create Account" : "Login"}
          </h2>
          <p className="text-gray-500 mb-6">
            {isSignup ? "Join FoodieMania today!" : "Welcome back, foodie!"}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignup && (
              <input
                type="text"
                name="name"
                value={data.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full px-4 py-2 border rounded focus:outline-orange-400"
                required
              />
            )}

            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full px-4 py-2 border rounded focus:outline-orange-400"
              required
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={data.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full px-4 py-2 border rounded focus:outline-orange-400"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {isSignup && (
              <label className="text-sm text-gray-600 flex gap-2">
                <input type="checkbox" required />I agree to the{" "}
                <span className="text-orange-500 underline cursor-pointer">
                  terms & privacy
                </span>
              </label>
            )}

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded font-semibold"
            >
              {isSignup ? "Sign Up" : "Login"}
            </button>
          </form>

          {/* Google Login */}
          <div className="my-4 text-center">
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => toast.error("Google login failed")}
              theme="outline"
              size="large"
            />
          </div>

          {/* Toggle Mode */}
          <p className="text-center text-sm mt-2 text-gray-600">
            {isSignup ? (
              <>
                Already a member?{" "}
                <button
                  onClick={() => setIsSignup(false)}
                  className="text-orange-500 font-semibold"
                >
                  Login
                </button>
              </>
            ) : (
              <>
                New to FoodieMania?{" "}
                <button
                  onClick={() => setIsSignup(true)}
                  className="text-orange-500 font-semibold"
                >
                  Sign up
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
