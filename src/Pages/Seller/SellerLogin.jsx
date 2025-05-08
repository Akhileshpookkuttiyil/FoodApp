import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuthContext } from "../../Context/AuthContext";

import { EyeIcon } from "@heroicons/react/24/solid"; // Heroicons
import { EyeOffIcon } from "lucide-react";

const SellerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { loginSeller, isSeller } = useAuthContext();
  const navigate = useNavigate();

  // If already logged in, redirect to seller dashboard
  useEffect(() => {
    if (isSeller) {
      navigate("/seller");
    }
  }, [isSeller, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter both email and password.");
      return;
    }

    const success = loginSeller({ email, password });

    if (success) {
      toast.success("Login successful!");
      navigate("/seller");
    } else {
      toast.error("Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-100">
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-4 p-6 py-8 w-80 sm:w-[320px] rounded-lg shadow-md border border-gray-200 bg-white"
      >
        <p className="text-xl font-semibold text-center mb-4">
          <span className="text-orange-500">Seller</span> Login
        </p>

        <div className="w-full">
          <label htmlFor="email" className="text-sm text-gray-600">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
            required
          />
        </div>

        <div className="w-full">
          <label htmlFor="password" className="text-sm text-gray-600">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 z-10 mt-1"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOffIcon className="h-4 w-4 text-gray-500" />
              ) : (
                <EyeIcon className="h-4 w-4 text-gray-500" />
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md transition-all duration-200 mt-4"
        >
          Login
        </button>

        <p className="text-sm text-center text-gray-600 mt-3">
          <a
            href="/seller/forgot-password"
            className="text-orange-500 hover:underline"
          >
            Forgot password?
          </a>
        </p>
      </form>
    </div>
  );
};

export default SellerLogin;
