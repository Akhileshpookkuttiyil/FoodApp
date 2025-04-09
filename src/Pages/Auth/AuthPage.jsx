import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { X, Eye, EyeOff } from "lucide-react";
import { useGoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import loginImage from "../../assets/img/login.jpg";

const AuthPage = ({ setToken, url, setShowLogin }) => {
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
      const res = await axios.post(url + route, data);
      if (res.data.success) {
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
        toast.success(isSignup ? "Signed up!" : "Logged in!");
        setData({ name: "", email: "", password: "" });
        setShowLogin(false);
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

      const response = await axios.post(url + "/user/google-login", googleUser);
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        toast.success("Google login success");
        setShowLogin(false);
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
      email: "", // Keep email if you want: data.email
      password: "",
    });
    setErrors({ name: "", email: "", password: "" });
    setTouched({});
    setAgreed(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center px-2 pt-6 sm:pt-8">
      <div className="w-full max-w-4xl h-[92vh] rounded-2xl shadow-2xl bg-white flex flex-col lg:flex-row relative overflow-hidden">
        <button
          onClick={() => setShowLogin(false)}
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
            <svg width="20" height="20" viewBox="0 0 48 48">
              {/* Google logo paths */}
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
            </svg>
            Continue with Google
          </button>

          <p className="text-center text-xs mt-3 text-gray-600">
            {isSignup ? (
              <>
                Already a member?{" "}
                <button
                  onClick={() => switchMode(false)}
                  className="text-orange-500 font-semibold"
                >
                  Login
                </button>
              </>
            ) : (
              <>
                New to FoodieMania?{" "}
                <button
                  onClick={() => switchMode(true)}
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
