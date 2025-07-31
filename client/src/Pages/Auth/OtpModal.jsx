import { useState } from "react";
import PropTypes from "prop-types";

const OtpModal = ({ isOpen, onClose, onSubmit, loading }) => {
  const [otpInput, setOtpInput] = useState(Array(6).fill(""));

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otpInput];
    newOtp[index] = value;
    setOtpInput(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleSubmit = () => {
    const otp = otpInput.join("");
    if (otp.length < 6) return;

    // Create a synthetic event that matches your handler expectation
    onSubmit({ preventDefault: () => {}, target: { value: otp } });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="flex flex-col items-center md:max-w-[423px] w-[380px] bg-white rounded-2xl shadow-lg p-6 sm:p-10 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-400 hover:text-gray-700 text-xl"
        >
          &times;
        </button>

        <p className="text-2xl font-semibold text-gray-900">Email Verify OTP</p>
        <p className="mt-2 text-sm text-gray-900/90 text-center">
          Enter the 6-digit code sent to your email ID.
        </p>

        <div className="grid grid-cols-6 gap-2 sm:gap-3 w-11/12 mt-8">
          {otpInput.map((digit, i) => (
            <input
              key={i}
              id={`otp-${i}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e.target.value, i)}
              className="w-full h-12 bg-indigo-50 text-gray-900 text-xl rounded-md outline-none text-center"
            />
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="mt-8 w-full max-w-80 h-11 rounded-full text-white text-sm bg-indigo-500 hover:opacity-90 transition-opacity disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Verifying..." : "Verify Email"}
        </button>
      </div>
    </div>
  );
};

OtpModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

export default OtpModal;
