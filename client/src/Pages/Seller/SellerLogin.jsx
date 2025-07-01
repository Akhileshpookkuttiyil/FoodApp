import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAppContext } from "../../Context/AppContext";
import { EyeIcon } from "@heroicons/react/24/solid";
import { EyeOffIcon } from "lucide-react";

const SellerLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const { seller, loginSeller, loading } = useAppContext();
  const navigate = useNavigate();

  // Redirect to dashboard after auth check
  useEffect(() => {
    if (!loading && seller) {
      navigate("/seller/dashboard");
    }
  }, [seller, loading, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    if (!email.trim() || !password.trim()) {
      toast.error("Please enter both email and password.");
      return;
    }

    const result = await loginSeller({ email, password });

    if (result.success) {
      toast.success("Login successful!");
      navigate("/seller");
      return null;
    } else {
      toast.error(result.message || "Invalid credentials.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-orange-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-100 px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md border border-gray-200"
      >
        <h1 className="text-2xl font-semibold text-center mb-6">
          <span className="text-orange-500">Seller</span> Login
        </h1>

        {/* Email Field */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm text-gray-600 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm text-gray-600 mb-1"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOffIcon className="w-5 h-5 text-gray-500" />
              ) : (
                <EyeIcon className="w-5 h-5 text-gray-500" />
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md transition duration-200"
        >
          Login
        </button>

        <p className="text-sm text-center text-gray-600 mt-4">
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
