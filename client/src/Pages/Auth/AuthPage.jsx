import { useState } from "react";
import toast from "react-hot-toast";
import { X, Eye, EyeOff } from "lucide-react";
import { useGoogleLogin } from "@react-oauth/google";
import loginImage from "../../assets/img/login.jpg";
import { useAppContext } from "../../Context/AppContext";
import OtpModal from "./OtpModal";

const AuthPage = () => {
  const { setShowLogin, setUser, axios, loadCartItems } = useAppContext();

  const [isSignup, setIsSignup] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validate = () => {
    const errs = {};

    if (isSignup && data.firstName.trim().length < 2) {
      errs.firstName = "First name must be at least 2 characters";
    }
    if (isSignup && data.lastName.trim().length < 2) {
      errs.lastName = "Last name must be at least 2 characters";
    }
    if (!data.email.includes("@")) {
      errs.email = "Please enter a valid email address";
    }
    if (data.password.length < 6) {
      errs.password = "Password must be at least 6 characters";
    }

    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors(validate());
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors(validate());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = validate();
    const hasError = Object.values(validation).some((v) => v);
    setErrors(validation);
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      password: true,
    });

    if (hasError || (isSignup && !agreed)) {
      toast.error("Please fix the errors above");
      return;
    }

    setLoading(true);
    try {
      const url = isSignup ? "/api/user/request-otp" : "/api/user/login";

      const payload = isSignup
        ? {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password,
          }
        : {
            email: data.email,
            password: data.password,
          };

      const res = await axios.post(url, payload);

      if (!res.data.success) {
        throw new Error(res.data.message || "Invalid response from server");
      }

      toast.success(res.data.message);

      if (isSignup) {
        setOtpSent(true); // open OTP modal
        return;
      }

      const user = res.data.user;
      if (!user) throw new Error("User not found");

      setUser(user);
      if (Array.isArray(user.cartItems)) {
        loadCartItems(user.cartItems);
      }

      setShowLogin(false);
      // window.location.reload();
    } catch (err) {
      toast.error(
        err.response?.data?.message || err.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async ({ target }) => {
    const otp = target.value;

    if (!otp || otp.length !== 6) {
      toast.error("Enter a valid 6-digit OTP");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("/api/user/verify-otp", {
        email: data.email,
        otp,
      });

      if (!res.data.success || !res.data.user) {
        throw new Error(res.data.message || "OTP verification failed");
      }

      toast.success("Verification successful");

      const user = res.data.user;
      setUser(user);

      if (Array.isArray(user.cartItems)) {
        loadCartItems(user.cartItems);
      }

      // Cleanup after success
      setOtpSent(false);
      setShowLogin(false);
      setData({ firstName: "", lastName: "", email: "", password: "" });
      setErrors({});
      setTouched({});
      setAgreed(false);

      // window.location.reload();
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async (res) => {
    try {
      const response = await axios.post(
        "/api/user/google-login",
        { token: res.credential },
        { withCredentials: true }
      );
      setUser(response.data.user);
      toast.success("Google login success");
      setShowLogin(false);
    } catch (error) {
      console.log(error.message);

      toast.error("Google login failed");
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
    (!isSignup ||
      (data.firstName.trim().length >= 2 &&
        data.lastName.trim().length >= 2 &&
        agreed));

  const switchMode = (toSignup) => {
    setIsSignup(toSignup);
    setData({ firstName: "", lastName: "", email: "", password: "" });
    setErrors({});
    setTouched({});
    setAgreed(false);
  };

  return (
    <>
      {/* OTP MODAL */}
      <OtpModal
        isOpen={otpSent}
        onClose={() => setOtpSent(false)}
        onSubmit={handleOtpSubmit}
        loading={loading}
      />

      {/* AUTH OVERLAY */}
      <div className="fixed inset-0 z-30 flex items-start justify-center px-2 pt-6 sm:pt-8 bg-black/50 mt-12">
        <div className="w-full max-w-4xl h-[85vh] rounded-2xl shadow-2xl bg-white flex flex-col lg:flex-row relative overflow-hidden">
          <button
            onClick={() => setShowLogin(false)}
            className="absolute top-3 right-3 text-orange-500 bg-gray-100 rounded-full p-1.5 hover:bg-orange-100 transition z-50"
          >
            <X className="w-5 h-5" />
          </button>

          {/* LEFT SIDE */}
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

          {/* RIGHT SIDE */}
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
                    name="firstName"
                    value={data.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="First Name"
                    className="w-full px-3 py-2 border rounded text-sm focus:outline-orange-400"
                    required
                  />
                  {touched.firstName && errors.firstName && (
                    <p className="text-xs text-red-500">{errors.firstName}</p>
                  )}

                  <input
                    type="text"
                    name="lastName"
                    value={data.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Last Name"
                    className="w-full px-3 py-2 border rounded text-sm focus:outline-orange-400"
                    required
                  />
                  {touched.lastName && errors.lastName && (
                    <p className="text-xs text-red-500">{errors.lastName}</p>
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
                  onClick={() => setShowPassword((prev) => !prev)}
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
                } text-white py-2 rounded-full text-lg transition duration-300`}
              >
                {loading ? "Processing..." : isSignup ? "Sign Up" : "Log In"}
              </button>
            </form>

            <div className="mt-4">
              <button
                onClick={loginWithGoogle}
                className="w-full py-2 border rounded-full text-sm text-gray-800 bg-white shadow-md hover:bg-gray-100"
              >
                <img
                  src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
                  alt="Google"
                  className="w-5 h-4 inline mr-2 mb-0.5"
                />
                Sign in with Google
              </button>
            </div>

            <div className="text-sm text-center text-gray-500 mt-4">
              {isSignup ? (
                <>
                  Already have an account?{" "}
                  <span
                    onClick={() => switchMode(false)}
                    className="text-orange-500 cursor-pointer"
                  >
                    Login
                  </span>
                </>
              ) : (
                <>
                  Don’t have an account?{" "}
                  <span
                    onClick={() => switchMode(true)}
                    className="text-orange-500 cursor-pointer"
                  >
                    Sign up
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthPage;
