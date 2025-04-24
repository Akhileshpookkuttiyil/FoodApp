import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { X, Eye, EyeOff } from "lucide-react";
import { useGoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import loginImage from "../../assets/img/login.jpg";
import { useAuthContext } from "../../Context/AuthContext"; // Import useAuth hook

const AuthPage = () => {
  const { setShowLogin } = useAuthContext(); // Get setShowLogin from context
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({ name: "", email: "", password: "" });
  const [touched, setTouched] = useState({}); // Track touched fields

  const validate = () => {
    const errs = { name: "", email: "", password: "" };

    if (isSignup && data.name.trim().length < 2)
      errs.name = "Name must be at least 2 characters";

    if (!data.email.includes("@"))
      errs.email = "Please enter a valid email address";

    if (data.password.length < 6)
      errs.password = "Password must be at least 6 characters";

    return errs;
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });

    if (touched[e.target.name]) {
      const newErrors = validate();
      setErrors(newErrors);
    }
  };

  const handleBlur = (e) => {
    setTouched({ ...touched, [e.target.name]: true });
    const newErrors = validate();
    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = validate();
    const hasError = Object.values(validation).some((v) => v);
    setErrors(validation);
    setTouched({ name: true, email: true, password: true });

    if (hasError || (isSignup && !agreed)) {
      toast.error("Please fix the errors above");
      return;
    }

    const route = isSignup ? "/user/register" : "/user/login";
    setLoading(true);

    try {
      const res = await axios.post(route, data);
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        toast.success(isSignup ? "Signed up!" : "Logged in!");
        setData({ name: "", email: "", password: "" });
        setShowLogin(false); // Close the modal by calling context method
      } else {
        toast.error(res.data.message || "Authentication failed");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Server error");
    } finally {
      setLoading(false);
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

      const response = await axios.post("/user/google-login", googleUser);
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        toast.success("Google login success");
        setShowLogin(false); // Close the modal by calling context method
      } else {
        toast.error("Google login failed");
      }
    } catch (error) {
      toast.error("Google login error", error);
    }
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: handleGoogleLogin,
    onError: () => toast.error("Google login failed"),
  });

  const isSignupValid =
    !loading &&
    data.email.includes("@") &&
    data.password.length >= 6 &&
    (!isSignup || (data.name.trim().length >= 2 && agreed));

  const switchMode = (toSignup) => {
    setIsSignup(toSignup);
    setData({
      name: "",
      email: "",
      password: "",
    });
    setErrors({ name: "", email: "", password: "" });
    setTouched({});
    setAgreed(false);
  };

  return (
    <div className="fixed inset-0 z-30 flex items-start justify-center px-2 pt-6 sm:pt-8 bg-black/50 mt-12">
      <div className="w-full max-w-4xl h-[85vh] rounded-2xl shadow-2xl bg-white flex flex-col lg:flex-row relative overflow-hidden">
        <button
          onClick={() => setShowLogin(false)} // Close modal with context method
          className="absolute top-3 right-3 text-orange-500 bg-gray-100 rounded-full p-1.5 hover:bg-orange-100 transition z-50"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Image */}
        <div
          className="w-full h-48 sm:h-64 lg:h-auto lg:w-1/2 bg-cover bg-center flex items-center justify-center relative"
          style={{ backgroundImage: `url(${loginImage})` }}
        >
          <div className="text-white text-center p-6 space-y-3 animate-float z-10">
            <h2 className="text-4xl font-extrabold drop-shadow-lg">
              Welcome to <span className="text-yellow-400">FoodieMania</span>
            </h2>
            <p className="text-lg font-medium drop-shadow-sm">
              Discover the best food & deals around you.
            </p>
          </div>
          <div className="absolute inset-0 bg-black bg-opacity-5 z-0" />
        </div>

        {/* Form Section */}
        <div className="w-full lg:w-1/2 px-5 py-6 flex flex-col justify-center relative z-10">
          <h2 className="text-xl font-bold text-orange-500 mb-1">
            {isSignup ? "Create Account" : "Login"}
          </h2>
          <p className="text-gray-500 mb-4 text-sm">
            {isSignup ? "Join FoodieMania today!" : "Welcome back, foodie!"}
          </p>

          <form onSubmit={handleSubmit} className="space-y-3">
            {isSignup && (
              <>
                <input
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Full Name"
                  className="w-full px-3 py-2 border rounded text-sm focus:outline-orange-400"
                  required
                />
                {touched.name && errors.name && (
                  <p className="text-xs text-red-500">{errors.name}</p>
                )}
              </>
            )}

            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Email"
              className="w-full px-3 py-2 border rounded text-sm focus:outline-orange-400"
              required
            />
            {touched.email && errors.email && (
              <p className="text-xs text-red-500">{errors.email}</p>
            )}

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={data.password}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Password"
                className="w-full px-3 py-2 border rounded text-sm focus:outline-orange-400"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2 text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {touched.password && errors.password && (
              <p className="text-xs text-red-500">{errors.password}</p>
            )}

            {isSignup && (
              <label className="text-xs text-gray-600 flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  required
                />
                I agree to the{" "}
                <span className="text-orange-500 underline cursor-pointer">
                  terms & privacy
                </span>
              </label>
            )}

            <button
              type="submit"
              disabled={!isSignupValid}
              className={`w-full ${
                isSignupValid
                  ? "bg-orange-500 hover:bg-orange-600"
                  : "bg-orange-300 cursor-not-allowed"
              } text-white py-2 rounded font-semibold text-sm transition`}
            >
              {loading ? "Please wait..." : isSignup ? "Sign Up" : "Login"}
            </button>
          </form>

          <button
            onClick={loginWithGoogle}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 mt-3 bg-white hover:bg-gray-100 text-gray-800 py-2 rounded border border-gray-300 text-sm transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <svg width="20" height="20" viewBox="0 0 533.5 544.3">
              <path
                fill="#4285F4"
                d="M533.5 278.4c0-17.4-1.6-34.2-4.6-50.4H272v95.4h147.4c-6.4 34.4-25.6 63.6-54.8 83.2v68h88.4c51.6-47.6 80.5-117.8 80.5-196.2z"
              />
              <path
                fill="#34A853"
                d="M272 544.3c73.6 0 135.2-24.4 180.2-66.4l-88.4-68c-24.4 16.4-55.4 25.6-91.8 25.6-70.6 0-130.4-47.6-151.8-111.2H30.8v69.6C75.8 481.1 167.2 544.3 272 544.3z"
              />
              <path
                fill="#FBBC05"
                d="M120.2 324.3c-10.2-30.2-10.2-62.4 0-92.6V162H30.8c-36.4 72.8-36.4 158.6 0 231.4l89.4-69.1z"
              />
              <path
                fill="#EA4335"
                d="M272 107.6c39.6 0 75.4 13.6 103.6 40.2l77.4-77.4C407.2 24.8 345.6 0 272 0 167.2 0 75.8 63.2 30.8 162l89.4 69.6C141.6 155.2 201.4 107.6 272 107.6z"
              />
            </svg>
            Login with Google
          </button>

          <div className="mt-5 text-sm text-center">
            <button
              type="button"
              onClick={() => switchMode(!isSignup)}
              className="text-orange-500 font-semibold"
            >
              {isSignup ? "Already have an account?" : "Don't have an account?"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
