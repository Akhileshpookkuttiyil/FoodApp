import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { X, Eye, EyeOff } from "lucide-react";
import { useGoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import loginImage from "../../assets/img/login.jpg";
import { useAuthContext } from "../../Context/AuthContext"; // Import useAuthContext

const AuthPage = () => {
  const { setShowLogin, setUser } = useAuthContext(); // Get setShowLogin and setUser from context
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [data, setData] = useState({
    name: "John Doe", // Dummy user name
    email: "john.doe@example.com", // Dummy email
    password: "password123", // Dummy password
  });
  const [errors, setErrors] = useState({ name: "", email: "", password: "" });
  const [touched, setTouched] = useState({}); // Track touched fields

  // Effect to set the dummy data when the page loads (you can remove this for a real use case)
  useEffect(() => {
    if (!data.name || !data.email || !data.password) {
      setData({
        name: "John Doe",
        email: "john.doe@example.com",
        password: "password123",
      });
    }
  }, []);

  // Validate function for form fields
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

  // Handle input changes
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });

    if (touched[e.target.name]) {
      const newErrors = validate();
      setErrors(newErrors);
    }
  };

  // Handle input blur event
  const handleBlur = (e) => {
    setTouched({ ...touched, [e.target.name]: true });
    const newErrors = validate();
    setErrors(newErrors);
  };

  // Handle form submission (login or signup)
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

    // Using dummy user for both login and signup
    setLoading(true);

    // Simulate a dummy response for login/signup
    setTimeout(() => {
      setUser({
        name: data.name,
        email: data.email,
        avatar: "https://randomuser.me/api/portraits/men/1.jpg", // Dummy avatar
      }); // Set the dummy user in context
      localStorage.setItem("token", "dummy-token"); // Set dummy token in localStorage
      toast.success(isSignup ? "Signed up!" : "Logged in!");
      setData({ name: "", email: "", password: "" });
      setShowLogin(false); // Close the modal by calling context method
      setLoading(false);
    }, 1000); // Simulate server delay
  };

  // Handle Google login (dummy in this case)
  const handleGoogleLogin = async (res) => {
    try {
      const decoded = jwtDecode(res.credential);
      const googleUser = {
        name: decoded.name,
        email: decoded.email,
        avatar: decoded.picture,
      };

      // Simulate a successful Google login with dummy data
      setUser(googleUser); // Set the dummy Google user in context
      localStorage.setItem("token", "dummy-google-token"); // Set dummy token in localStorage
      toast.success("Google login success");
      setShowLogin(false); // Close the modal by calling context method
    } catch (error) {
      toast.error("Google login error", error);
    }
  };

  // Google login hook
  const loginWithGoogle = useGoogleLogin({
    onSuccess: handleGoogleLogin,
    onError: () => toast.error("Google login failed"),
  });

  // Determine if the form is valid for signup
  const isSignupValid =
    !loading &&
    data.email.includes("@") &&
    data.password.length >= 6 &&
    (!isSignup || (data.name.trim().length >= 2 && agreed));

  // Switch between login and signup modes
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
              } text-white py-2 rounded-full text-lg transition duration-300`}
            >
              {loading ? "Processing..." : isSignup ? "Sign Up" : "Log In"}
            </button>
          </form>

          {/* Google Login */}
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
          {/* Switch between Login and Signup */}
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
                Dont have an account?{" "}
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
  );
};

export default AuthPage;
