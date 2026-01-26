import React, { useState, useRef } from "react";
import { Wifi, User, Phone, Lock, MapPin, Eye, EyeOff, Check } from "lucide-react";

export default function WiFiSignUp() {
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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);

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

  const handleStep1Next = (e) => {
    e.preventDefault();
    setError("");
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setTimeout(() => {
      setLoading(false);
      setStep(3);
    }, 1500);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setVerifyingOtp(true);
    setTimeout(() => {
      setVerifyingOtp(false);
      setStep(4);
    }, 1500);
  };

  const handleCreateAccount = (e) => {
    e.preventDefault();
    setError("");
    if (validateStep3()) {
      console.log("Account created:", form);
    }
  };

  const getStepTitle = () => {
    switch (step) {
      case 1: return "Basic Details";
      case 2: return "Verify Phone";
      case 3: return "Enter OTP";
      case 4: return "Set Password";
      default: return "Sign Up";
    }
  };

  const getStepDescription = () => {
    switch (step) {
      case 1: return "Tell us about yourself";
      case 2: return `Code sent to +91 ${form.mobile}`;
      case 3: return "Enter the verification code";
      case 4: return "Create a secure password";
      default: return "Join WiFi Connect";
    }
  };

  const getProgressPercentage = () => {
    return ((step - 1) / 3) * 100;
  };

  const handleOtpChange = (e, idx) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 1);
    let otpArr = form.otp.padEnd(6, " ").split("");
    otpArr[idx] = val;
    const newOtp = otpArr.join("").trim();
    setForm({ ...form, otp: newOtp });

    if (val && idx < 5) {
      otpRefs[idx + 1].current.focus();
    }
    if (!val && idx > 0) {
      otpRefs[idx - 1].current.focus();
    }
  };

  const handleOtpKeyDown = (e, idx) => {
    if (e.key === "Backspace" && !form.otp[idx] && idx > 0) {
      otpRefs[idx - 1].current.focus();
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="p-4 bg-blue-900 rounded-full">
            <Wifi className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-blue-900 mb-1">
            {getStepTitle()}
          </h1>
          <p className="text-sm text-gray-600">{getStepDescription()}</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-blue-900">
              Step {step}/4
            </span>
            <span className="text-xs text-gray-500">
              {Math.round(getProgressPercentage())}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div
              className="bg-blue-900 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${getProgressPercentage()}%` }}
            ></div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-xs font-medium">{error}</p>
            </div>
          )}

          {/* Step 1: Basic Details */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-blue-900 mb-1">
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
                    className="w-full pl-10 pr-3 py-2.5 bg-white border border-gray-300 rounded-lg focus:border-blue-900 focus:outline-none transition-all text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-blue-900 mb-1">
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
                    className="w-full pl-10 pr-3 py-2.5 bg-white border border-gray-300 rounded-lg focus:border-blue-900 focus:outline-none transition-all text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-blue-900 mb-1">
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
                    className="w-full pl-10 pr-3 py-2.5 bg-white border border-gray-300 rounded-lg focus:border-blue-900 focus:outline-none transition-all text-sm resize-none"
                  />
                </div>
              </div>

              <button
                onClick={handleStep1Next}
                className="w-full py-3 bg-blue-900 text-white font-semibold rounded-lg hover:bg-blue-800 transition-all mt-4"
              >
                Continue
              </button>
            </div>
          )}

          {/* Step 2: Send OTP */}
          {step === 2 && (
            <div className="space-y-4">
              <button
                onClick={() => setStep(1)}
                className="text-blue-900 hover:text-blue-700 font-medium text-sm mb-3"
              >
                ← Edit Details
              </button>

              <div className="text-center mb-4">
                <p className="text-sm text-gray-600 mb-2">
                  We'll send a verification code to
                </p>
                <p className="text-lg font-semibold text-blue-900">
                  +91 {form.mobile}
                </p>
              </div>

              <button
                onClick={handleSendOtp}
                disabled={loading}
                className="w-full py-3 bg-blue-900 text-white font-semibold rounded-lg hover:bg-blue-800 transition-all disabled:opacity-50"
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
            </div>
          )}

          {/* Step 3: OTP Input */}
          {step === 3 && (
            <div className="space-y-4">
              <button
                onClick={() => setStep(2)}
                className="text-blue-900 hover:text-blue-700 font-medium text-sm mb-3"
              >
                ← Change Number
              </button>

              <div>
                <label className="block text-xs font-semibold text-blue-900 mb-2">
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
                      className="w-10 h-12 text-center text-xl font-bold border border-gray-300 rounded-lg focus:outline-none focus:border-blue-900 bg-white"
                      autoFocus={idx === 0}
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Didn't receive the code?{" "}
                  <button
                    onClick={() => setStep(2)}
                    className="text-blue-900 hover:text-blue-700 font-medium"
                  >
                    Resend
                  </button>
                </p>
              </div>

              <button
                onClick={handleVerifyOtp}
                disabled={verifyingOtp}
                className="w-full py-3 bg-blue-900 text-white font-semibold rounded-lg hover:bg-blue-800 transition-all disabled:opacity-50"
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
            </div>
          )}

          {/* Step 4: Set Password */}
          {step === 4 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-blue-900 mb-1">
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
                    className="w-full pl-10 pr-10 py-2.5 bg-white border border-gray-300 rounded-lg focus:border-blue-900 focus:outline-none transition-all text-sm"
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-900"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-blue-900 mb-1">
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
                    className="w-full pl-10 pr-10 py-2.5 bg-white border border-gray-300 rounded-lg focus:border-blue-900 focus:outline-none transition-all text-sm"
                  />
                  <button
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-900"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                onClick={handleCreateAccount}
                className="w-full py-3 bg-blue-900 text-white font-semibold rounded-lg hover:bg-blue-800 transition-all mt-4"
              >
                Create Account
              </button>
            </div>
          )}

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-xs">
              Already have an account?{" "}
              <span className="text-blue-900 hover:text-blue-700 font-semibold cursor-pointer">
                Sign In
              </span>
            </p>
          </div>
        </div>

        {/* Terms */}
        <p className="text-center text-xs text-gray-500 mt-4 px-2">
          By continuing, you agree to our{" "}
          <span className="text-blue-900 cursor-pointer">Terms</span> and{" "}
          <span className="text-blue-900 cursor-pointer">Privacy Policy</span>
        </p>
      </div>
    </div>
  );
}