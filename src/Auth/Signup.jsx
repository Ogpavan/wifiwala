import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { User, Phone, Lock, MapPin, Eye, EyeOff, Check } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import {
  auth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  db,
} from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import Popup from "../components/Popup"; // <-- Import Popup

const getDeviceInfo = async () => {
  let ip = "";
  try {
    const res = await fetch("https://api.ipify.org?format=json");
    const data = await res.json();
    ip = data.ip;
  } catch {
    ip = "Unavailable";
  }
  return {
    ip,
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language,
    screen: `${window.screen.width}x${window.screen.height}`,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  };
};

export default function Signup() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    fullName: "",
    address: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    otp: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmation, setConfirmation] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [popup, setPopup] = useState({
    open: false,
    title: "",
    message: "",
    actions: null,
  }); // <-- Popup state
  const navigate = useNavigate();
  const { signin } = useAuth();

  // Add refs for OTP inputs
  const otpRefs = Array.from({ length: 6 }, () => useRef(null));

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "mobile") {
      const numbersOnly = value.replace(/\D/g, "").slice(0, 10);
      setForm({ ...form, [name]: numbersOnly });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const validateStep1 = () => {
    if (!form.fullName.trim()) {
      setError("Full name is required");
      return false;
    }
    if (!form.mobile.trim()) {
      setError("Mobile number is required");
      return false;
    }
    if (form.mobile.length !== 10) {
      setError("Mobile number must be 10 digits");
      return false;
    }
    if (!form.address.trim()) {
      setError("Address is required");
      return false;
    }
    return true;
  };

  const validateStep3 = () => {
    if (!form.password) {
      setError("Password is required");
      return false;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    return true;
  };

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: () => {},
        }
      );
    }
  };

  // Modified: Check if user exists before moving to step 2
  const handleStep1Next = async (e) => {
    e.preventDefault();
    setError("");
    if (validateStep1()) {
      try {
        const userDoc = await getDoc(doc(db, "users", form.mobile));
        if (userDoc.exists()) {
          setPopup({
            open: true,
            title: "Account Exists",
            message:
              "A user account with this mobile number already exists. Please sign in to continue.",
            actions: [
              {
                label: "Sign In",
                variant: "primary",
                onClick: () => {
                  setPopup((prev) => ({ ...prev, open: false }));
                  navigate("/signin");
                },
              },
              {
                label: "Close",
                variant: "secondary",
                onClick: () => setPopup((prev) => ({ ...prev, open: false })),
              },
            ],
          });
          return;
        }
        setStep(2);
      } catch (err) {
        setError("Failed to check user. Please try again.");
      }
    }
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setupRecaptcha();

    const appVerifier = window.recaptchaVerifier;
    const phoneNumber = "+91" + form.mobile;

    try {
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        appVerifier
      );
      setConfirmation(confirmationResult);
      setStep(3);
    } catch (err) {
      setError(err.message || "Failed to send OTP. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!confirmation) {
      setError("Please request OTP again.");
      return;
    }
    setVerifyingOtp(true);
    try {
      await confirmation.confirm(form.otp);
      setStep(4);
    } catch (err) {
      setError("Invalid OTP. Please try again.");
    } finally {
      setVerifyingOtp(false);
    }
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    setError("");
    if (validateStep3()) {
      const deviceInfo = await getDeviceInfo();
      const userData = {
        name: form.fullName,
        mobile: form.mobile,
        address: form.address,
        password: form.password,
        mobileVerified: true,
        deviceInfo,
      };
      try {
        await setDoc(doc(db, "users", form.mobile), userData);
        signin(userData);
        navigate("/");
      } catch (err) {
        setError("Failed to save user details. Please try again.");
      }
    }
  };

  const getStepTitle = () => {
    switch (step) {
      case 1:
        return "Basic Details";
      case 2:
        return "Verify Phone";
      case 3:
        return "Set Password";
      default:
        return "Create Account";
    }
  };

  const getStepDescription = () => {
    switch (step) {
      case 1:
        return "Tell us about yourself";
      case 2:
        return `Code sent to +91 ${form.mobile}`;
      case 3:
        return "Create a secure password";
      default:
        return "Join WifiWala";
    }
  };

  const getStepIcon = () => {
    switch (step) {
      case 1:
        return <User className="w-8 h-8 text-white" />;
      case 2:
        return <Phone className="w-8 h-8 text-white" />;
      case 3:
        return <Lock className="w-8 h-8 text-white" />;
      default:
        return <Check className="w-8 h-8 text-white" />;
    }
  };

  const getProgressPercentage = () => {
    return ((step - 1) / 3) * 100;
  };

  // Helper to handle OTP input change
  const handleOtpChange = (e, idx) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 1);
    let otpArr = form.otp.padEnd(6, " ").split("");
    otpArr[idx] = val;
    const newOtp = otpArr.join("").trim();
    setForm({ ...form, otp: newOtp });

    // Move focus to next input if value entered
    if (val && idx < 5) {
      otpRefs[idx + 1].current.focus();
    }
    // Move focus to previous input if deleted
    if (!val && idx > 0) {
      otpRefs[idx - 1].current.focus();
    }
  };

  // Helper to handle backspace navigation
  const handleOtpKeyDown = (e, idx) => {
    if (e.key === "Backspace" && !form.otp[idx] && idx > 0) {
      otpRefs[idx - 1].current.focus();
    }
  };

  return (
    <div className=" min-h-[100dvh] bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      {/* Popup usage */}
      <Popup
        open={popup.open}
        title={popup.title}
        message={popup.message}
        actions={popup.actions}
        onClose={() => setPopup((prev) => ({ ...prev, open: false }))}
      />
      <div className="w-full max-w-sm">
        {/* Compact Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            {getStepTitle()}
          </h1>
          <p className="text-sm text-gray-600">{getStepDescription()}</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-purple-600">
              Step {step}/3
            </span>
            <span className="text-xs text-gray-500">
              {Math.round(getProgressPercentage())}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div
              className="bg-gradient-to-r from-purple-600 to-indigo-600 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${getProgressPercentage()}%` }}
            ></div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl   p-6 border border-gray-100">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-600 text-xs font-medium">{error}</p>
            </div>
          )}

          {/* Step 1: Basic Details */}
          {step === 1 && (
            <form onSubmit={handleStep1Next} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    name="fullName"
                    type="text"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-md focus:bg-white focus:border-purple-400 focus:outline-none transition-all duration-200 text-sm"
                    required
                  />
                </div>
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Mobile Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />

                  <input
                    name="mobile"
                    type="tel"
                    value={form.mobile}
                    onChange={handleChange}
                    placeholder="Enter 10-digit number"
                    maxLength="10"
                    className="w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-md focus:bg-white focus:border-purple-400 focus:outline-none transition-all duration-200 text-sm"
                    required
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Address
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                  <textarea
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Enter your full address"
                    rows="2"
                    className="w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-md focus:bg-white focus:border-purple-400 focus:outline-none transition-all duration-200 text-sm resize-none"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-md hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all duration-200 mt-6"
              >
                Continue
              </button>
            </form>
          )}

          {/* Step 2: OTP Verification */}
          {step === 2 && (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex items-center text-purple-600 hover:text-purple-700 font-medium text-sm mb-3"
              >
                ← Edit Details
              </button>

              <div className="text-center mb-4">
                <p className="text-sm text-gray-600 mb-2">
                  We'll send a verification code to
                </p>
                <p className="text-lg font-semibold text-gray-900">
                  +91 {form.mobile}
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-md hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all duration-200 disabled:opacity-50"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Sending OTP...
                  </div>
                ) : (
                  "Send Verification Code"
                )}
              </button>
            </form>
          )}

          {/* Step 3: OTP Input */}
          {step === 3 && (
            <div className="space-y-4">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="flex items-center text-purple-600 hover:text-purple-700 font-medium text-sm mb-3"
              >
                ← Change Number
              </button>

              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Verification Code
                  </label>
                  <div className="flex justify-between gap-2">
                    {Array.from({ length: 6 }).map((_, idx) => (
                      <input
                        key={idx}
                        ref={otpRefs[idx]}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={form.otp[idx] || ""}
                        onChange={(e) => handleOtpChange(e, idx)}
                        onKeyDown={(e) => handleOtpKeyDown(e, idx)}
                        className="w-10 h-12 text-center text-xl font-bold border border-gray-300 rounded focus:outline-none focus:border-purple-500 bg-gray-50"
                        autoFocus={idx === 0}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    Didn't receive the code?{" "}
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="text-purple-600 hover:text-purple-700 font-medium"
                    >
                      Resend
                    </button>
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={verifyingOtp}
                  className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-md hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all duration-200 disabled:opacity-50"
                >
                  {verifyingOtp ? (
                    <div className="flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Verifying...
                    </div>
                  ) : (
                    "Verify Code"
                  )}
                </button>
              </form>
            </div>
          )}

          {/* Step 4: Set Password */}
          {step === 4 && (
            <form onSubmit={handleCreateAccount} className="space-y-4">
              {/* Password */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Create password (min 6 chars)"
                    className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-md
                     focus:bg-white focus:border-purple-400 focus:outline-none transition-all duration-200 text-sm"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-md focus:bg-white focus:border-purple-400 focus:outline-none transition-all duration-200 text-sm"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-md hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all duration-200 mt-6"
              >
                Create Account
              </button>
            </form>
          )}

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-xs">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/signin")}
                className="text-purple-600 hover:text-purple-700 font-semibold"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>

        {/* Terms */}
        <p className="text-center text-xs text-gray-500 mt-4 px-2">
          By continuing, you agree to our{" "}
          <span className="text-purple-600">Terms</span> and{" "}
          <span className="text-purple-600">Privacy Policy</span>
        </p>
      </div>

      {/* Firebase reCAPTCHA container */}
      <div id="recaptcha-container"></div>
    </div>
  );
}
