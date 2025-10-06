import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Smartphone, Lock, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import {
  db,
  auth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "../firebase";
import Popup from "../components/Popup";

export default function Signin() {
  const [form, setForm] = useState({ mobile: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState({
    open: false,
    title: "",
    message: "",
    actions: null,
  });

  // Forgot password states
  const [forgotStep, setForgotStep] = useState(0); // 0: hidden, 1: enter mobile, 2: enter OTP, 3: set new password
  const [forgotMobile, setForgotMobile] = useState("");
  const [forgotOtp, setForgotOtp] = useState("");
  const [forgotPassword, setForgotPassword] = useState("");
  const [forgotConfirmPassword, setForgotConfirmPassword] = useState("");
  const [forgotError, setForgotError] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);
  const [confirmation, setConfirmation] = useState(null);
  const otpRefs = Array.from({ length: 6 }, () => useRef(null));

  const navigate = useNavigate();
  const { signin } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "mobile") {
      const numbersOnly = value.replace(/\D/g, "").slice(0, 10);
      setForm({ ...form, [name]: numbersOnly });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const validate = () => {
    if (!form.mobile) {
      setError("Mobile number is required");
      return false;
    }
    if (form.mobile.length !== 10) {
      setError("Mobile number must be 10 digits");
      return false;
    }
    if (!form.password) {
      setError("Password is required");
      return false;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    return true;
  };

  const handleSignin = async (e) => {
    e.preventDefault();
    setError("");
    if (!validate()) return;
    setLoading(true);

    try {
      const userDoc = await getDoc(doc(db, "users", form.mobile));
      if (!userDoc.exists()) {
        setPopup({
          open: true,
          title: "Account Not Found",
          message: "No account found with this mobile number. Please sign up.",
          actions: [
            {
              label: "Sign Up",
              variant: "primary",
              onClick: () => {
                setPopup((prev) => ({ ...prev, open: false }));
                navigate("/signup");
              },
            },
            {
              label: "Close",
              variant: "secondary",
              onClick: () => setPopup((prev) => ({ ...prev, open: false })),
            },
          ],
        });
        setLoading(false);
        return;
      }
      const userData = userDoc.data();
      if (userData.password && userData.password === form.password) {
        signin(userData);
        navigate("/");
      } else {
        setError("Incorrect password. Please try again.");
      }
    } catch (err) {
      setError("Failed to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // --- Forgot Password Logic ---

  // Step 1: Send OTP
  const handleForgotSendOtp = async (e) => {
    e.preventDefault();
    setForgotError("");
    if (!forgotMobile || forgotMobile.length !== 10) {
      setForgotError("Enter a valid 10-digit mobile number.");
      return;
    }
    setForgotLoading(true);
    try {
      const userDoc = await getDoc(doc(db, "users", forgotMobile));
      if (!userDoc.exists()) {
        setForgotError("No account found with this mobile number.");
        setForgotLoading(false);
        return;
      }
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(
          auth,
          "recaptcha-container",
          { size: "invisible" }
        );
      }
      const appVerifier = window.recaptchaVerifier;
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        "+91" + forgotMobile,
        appVerifier
      );
      setConfirmation(confirmationResult);
      setForgotStep(2);
    } catch (err) {
      setForgotError("Failed to send OTP. Try again.");
    } finally {
      setForgotLoading(false);
    }
  };

  // Step 2: OTP Input
  const handleForgotOtpChange = (e, idx) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 1);
    let otpArr = forgotOtp.padEnd(6, " ").split("");
    otpArr[idx] = val;
    const newOtp = otpArr.join("").trim();
    setForgotOtp(newOtp);

    if (val && idx < 5) otpRefs[idx + 1].current.focus();
    if (!val && idx > 0) otpRefs[idx - 1].current.focus();
  };
  const handleForgotOtpKeyDown = (e, idx) => {
    if (e.key === "Backspace" && !forgotOtp[idx] && idx > 0) {
      otpRefs[idx - 1].current.focus();
    }
  };

  // Step 2: Verify OTP
  const handleForgotVerifyOtp = async (e) => {
    e.preventDefault();
    setForgotError("");
    if (!confirmation) {
      setForgotError("Please request OTP again.");
      return;
    }
    setForgotLoading(true);
    try {
      await confirmation.confirm(forgotOtp);
      setForgotStep(3);
    } catch (err) {
      setForgotError("Invalid OTP. Please try again.");
    } finally {
      setForgotLoading(false);
    }
  };

  // Step 3: Set New Password
  const handleForgotSetPassword = async (e) => {
    e.preventDefault();
    console.log(forgotPassword, forgotConfirmPassword);
    setForgotError("");
    if (!forgotPassword || forgotPassword.length < 6) {
      setForgotError("Password must be at least 6 characters long.");
      console.log("here1");
      return;
    }
    if (forgotPassword !== forgotConfirmPassword) {
      setForgotError("Passwords do not match.");
      return;
    }
    setForgotLoading(true);
    try {
      await updateDoc(doc(db, "users", forgotMobile), {
        password: forgotPassword,
      });
      console.log("Password updated in Firestore");
      setPopup({
        open: true,
        title: "Password Reset",
        message: "Your password has been reset. Please sign in.",
        actions: [
          {
            label: "Sign In",
            variant: "primary",
            onClick: () => {
              setPopup((prev) => ({ ...prev, open: false }));
              setForgotStep(0);
              setForm({ mobile: forgotMobile, password: "" }); // Pre-fill mobile
              setForgotMobile("");
              setForgotOtp("");
              setForgotPassword("");
              setForgotConfirmPassword("");
              setTimeout(() => {
                document.querySelector('input[name="password"]')?.focus();
              }, 100);
            },
          },
        ],
      });
    } catch (err) {
      setForgotError("Failed to reset password. Try again.");
    } finally {
      setForgotLoading(false);
    }
  };

  return (
    <div className="min-h-[100dvh] bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      <Popup
        open={popup.open}
        title={popup.title}
        message={popup.message}
        actions={popup.actions}
        onClose={() => setPopup((prev) => ({ ...prev, open: false }))}
      />
      <div className="w-full max-w-sm">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Sign In</h1>
          <p className="text-sm text-gray-600">
            Welcome back! Please sign in to continue.
          </p>
        </div>
        <div className="bg-white rounded-md p-6 border border-gray-100">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600 text-xs font-medium">{error}</p>
            </div>
          )}
          <form onSubmit={handleSignin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Mobile Number
              </label>
              <div className="relative">
                <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
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
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-md focus:bg-white focus:border-purple-400 focus:outline-none transition-all duration-200 text-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-md hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all duration-200 disabled:opacity-50 mt-4"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>
          <div className="mt-4 flex justify-between items-center">
            <button
              type="button"
              className="text-xs text-purple-600 hover:underline"
              onClick={() => setForgotStep(1)}
            >
              Forgot Password?
            </button>
            <span className="text-xs text-gray-400">|</span>
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="text-xs text-purple-600 hover:underline"
            >
              Sign Up
            </button>
          </div>
        </div>
        <p className="text-center text-xs text-gray-500 mt-4 px-2">
          By continuing, you agree to our{" "}
          <span className="text-purple-600">Terms</span> and{" "}
          <span className="text-purple-600">Privacy Policy</span>
        </p>
      </div>
      {/* Forgot Password Modal */}
      {forgotStep > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-md shadow-lg max-w-xs w-full p-6 text-center">
            {forgotStep === 1 && (
              <>
                <h2 className="text-lg font-bold mb-2">Forgot Password</h2>
                <p className="text-gray-700 mb-4">
                  Enter your registered mobile number to receive an OTP.
                </p>
                <form onSubmit={handleForgotSendOtp} className="space-y-4">
                  <input
                    type="tel"
                    value={forgotMobile}
                    onChange={(e) =>
                      setForgotMobile(
                        e.target.value.replace(/\D/g, "").slice(0, 10)
                      )
                    }
                    placeholder="Enter 10-digit mobile number"
                    maxLength={10}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md focus:bg-white focus:border-purple-400 focus:outline-none transition-all duration-200 text-sm"
                    required
                  />
                  {forgotError && (
                    <div className="mb-2 p-2 bg-red-50 border border-red-200 rounded text-xs text-red-600">
                      {forgotError}
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={forgotLoading}
                    className="w-full py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-md hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all duration-200 disabled:opacity-50"
                  >
                    {forgotLoading ? "Sending OTP..." : "Send OTP"}
                  </button>
                  <button
                    type="button"
                    className="w-full mt-2 py-2 rounded bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200"
                    onClick={() => {
                      setForgotStep(0);
                      setForgotMobile("");
                      setForgotOtp("");
                      setForgotPassword("");
                      setForgotConfirmPassword("");
                      setForgotError("");
                    }}
                  >
                    Cancel
                  </button>
                </form>
              </>
            )}
            {forgotStep === 2 && (
              <>
                <h2 className="text-lg font-bold mb-2">Verify OTP</h2>
                <p className="text-gray-700 mb-4">
                  Enter the 6-digit OTP sent to +91 {forgotMobile}
                </p>
                <form onSubmit={handleForgotVerifyOtp} className="space-y-4">
                  <div className="flex justify-between gap-2">
                    {Array.from({ length: 6 }).map((_, idx) => (
                      <input
                        key={idx}
                        ref={otpRefs[idx]}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={forgotOtp[idx] || ""}
                        onChange={(e) => handleForgotOtpChange(e, idx)}
                        onKeyDown={(e) => handleForgotOtpKeyDown(e, idx)}
                        className="w-10 h-12 text-center text-xl font-bold border border-gray-300 rounded focus:outline-none focus:border-purple-500 bg-gray-50"
                        autoFocus={idx === 0}
                      />
                    ))}
                  </div>
                  {forgotError && (
                    <div className="mb-2 p-2 bg-red-50 border border-red-200 rounded text-xs text-red-600">
                      {forgotError}
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={forgotLoading}
                    className="w-full py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-md hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all duration-200 disabled:opacity-50"
                  >
                    {forgotLoading ? "Verifying..." : "Verify OTP"}
                  </button>
                  <button
                    type="button"
                    className="w-full mt-2 py-2 rounded bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200"
                    onClick={() => {
                      setForgotStep(1);
                      setForgotOtp("");
                      setForgotError("");
                    }}
                  >
                    Back
                  </button>
                </form>
              </>
            )}
            {forgotStep === 3 && (
              <>
                <h2 className="text-lg font-bold mb-2">Set New Password</h2>
                <form onSubmit={handleForgotSetPassword} className="space-y-4">
                  <input
                    type="password"
                    value={forgotPassword}
                    onChange={(e) => setForgotPassword(e.target.value)}
                    placeholder="New password (min 6 chars)"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md focus:bg-white focus:border-purple-400 focus:outline-none transition-all duration-200 text-sm"
                    required
                  />
                  <input
                    type="password"
                    value={forgotConfirmPassword}
                    onChange={(e) => setForgotConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md focus:bg-white focus:border-purple-400 focus:outline-none transition-all duration-200 text-sm"
                    required
                  />
                  {forgotError && (
                    <div className="mb-2 p-2 bg-red-50 border border-red-200 rounded text-xs text-red-600">
                      {forgotError}
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={forgotLoading}
                    className="w-full py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-md hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all duration-200 disabled:opacity-50"
                  >
                    {forgotLoading ? "Saving..." : "Set Password"}
                  </button>
                </form>
              </>
            )}
          </div>
          {/* Recaptcha container for forgot password */}
          <div id="recaptcha-container"></div>
        </div>
      )}
    </div>
  );
}
