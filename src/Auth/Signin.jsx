import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Smartphone, Lock } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Signin() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ mobile: "", otp: "" });
  const [error, setError] = useState("");
  const [sentOtp, setSentOtp] = useState("");
  const navigate = useNavigate();
  const { signin } = useAuth();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!form.mobile) {
      setError("Enter your mobile number.");
      return;
    }
    setSentOtp("123456");
    setStep(2);
    setError("");
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (form.otp === sentOtp) {
      signin({ mobile: form.mobile, mobileVerified: true });
      navigate("/");
    } else {
      setError("Invalid OTP. Try 123456.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--color-bg-gradient)] relative">
      {/* Header: full width */}
      <div
        className="relative h-56 flex items-center justify-center w-full"
        style={{
          background:
            "linear-gradient(135deg, var(--color-purple) 0%, #6366f1 100%)",
        }}
      >
        <div className="absolute inset-0 opacity-10">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path d="M0,0 L100,0 L100,100 Q50,80 0,100 Z" fill="white" />
          </svg>
        </div>
        <div className="relative z-10 text-center">
          <div className="w-16 h-16 mx-auto mb-3 bg-white rounded-full flex items-center justify-center">
            {step === 1 ? (
              <Smartphone
                className="w-8 h-8"
                style={{ color: "var(--color-purple)" }}
              />
            ) : (
              <Lock
                className="w-8 h-8"
                style={{ color: "var(--color-purple)" }}
              />
            )}
          </div>
          <h1 className="text-xl font-bold text-white">Welcome Back</h1>
          <p className="text-white text-opacity-90 text-xs mt-1">
            {step === 1 ? "Enter your mobile number" : "Verify your identity"}
          </p>
        </div>
      </div>

      {/* Form: centered and max width */}
      <div className="w-full max-w-md mx-auto  flex-1 flex flex-col  ">
        <form className="bg-white rounded-none" style={{ boxShadow: "none" }}>
          {/* Form Content */}
          <div className="px-4 py-6">
            {error && (
              <div
                className="mb-4 p-3 rounded-xl text-sm text-center bg-red-50"
                style={{ color: "var(--color-error)" }}
              >
                {error}
              </div>
            )}

            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">
                    Mobile Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Smartphone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      name="mobile"
                      type="tel"
                      value={form.mobile}
                      onChange={handleChange}
                      placeholder="Enter your mobile number"
                      className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors text-base"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  className="w-full py-3 rounded-xl font-semibold text-white transition-all active:scale-98 mt-6"
                  style={{ background: "var(--color-purple)" }}
                  onClick={handleSendOtp}
                >
                  Send OTP
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div className="text-center mb-4">
                  <p className="text-xs text-gray-600">
                    OTP sent to{" "}
                    <span className="font-semibold text-gray-900">
                      {form.mobile}
                    </span>
                  </p>
                  <button
                    type="button"
                    className="text-xs mt-2 font-medium"
                    style={{ color: "var(--color-purple)" }}
                    onClick={() => setStep(1)}
                  >
                    Change Number
                  </button>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">
                    Enter OTP
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      name="otp"
                      type="text"
                      value={form.otp}
                      onChange={handleChange}
                      placeholder="Enter 6-digit OTP"
                      maxLength="6"
                      className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors text-base tracking-widest"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Test OTP: 123456</p>
                </div>
                <button
                  type="button"
                  className="w-full py-3 rounded-xl font-semibold text-white transition-all active:scale-98 mt-6"
                  style={{ background: "var(--color-purple)" }}
                  onClick={handleVerifyOtp}
                >
                  Verify & Sign In
                </button>
              </div>
            )}

            <div className="mt-6 text-center">
              <p className="text-xs text-gray-600">
                Don't have an account?{" "}
                <button
                  type="button"
                  className="font-semibold"
                  style={{ color: "var(--color-purple)" }}
                  onClick={() => navigate("/signup")}
                >
                  Sign Up
                </button>
              </p>
            </div>
          </div>
        </form>
      </div>
      {/* By continuing line at the bottom */}
      <p className="text-center text-xs text-gray-500 mt-4 px-4 absolute bottom-4 w-full">
        By continuing, you agree to our Terms of Service and Privacy Policy
      </p>
    </div>
  );
}
