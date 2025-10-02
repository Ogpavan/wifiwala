import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    address: "",
    mobile: "",
    email: "",
    password: "",
    otp: "",
  });
  const [error, setError] = useState("");
  const [sentOtp, setSentOtp] = useState("");
  const navigate = useNavigate();
  const { signin } = useAuth();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (
      !form.name ||
      !form.address ||
      !form.mobile ||
      !form.email ||
      !form.password
    ) {
      setError("Please fill all fields.");
      return;
    }
    // Simulate OTP send
    const otp = "123456";
    setSentOtp(otp);
    setStep(2);
    setError("");
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (form.otp === sentOtp) {
      signin({ ...form, mobileVerified: true });
      navigate("/");
    } else {
      setError("Invalid OTP. Try 123456.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: "var(--color-bg-gradient)" }}
    >
      <form
        className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm"
        style={{ boxShadow: "var(--color-shadow-footer)" }}
      >
        <h2
          className="text-2xl font-bold mb-6 text-center"
          style={{ color: "var(--color-purple)" }}
        >
          Sign Up
        </h2>
        {error && (
          <div className="mb-4 text-[var(--color-error)] text-sm text-center">
            {error}
          </div>
        )}
        {step === 1 && (
          <>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Name"
              className="mb-3 w-full px-4 py-2 rounded-xl border"
            />
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Address"
              className="mb-3 w-full px-4 py-2 rounded-xl border"
            />
            <input
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              placeholder="Mobile"
              className="mb-3 w-full px-4 py-2 rounded-xl border"
            />
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="mb-3 w-full px-4 py-2 rounded-xl border"
            />
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              className="mb-6 w-full px-4 py-2 rounded-xl border"
            />
            <button
              type="button"
              className="w-full py-3 rounded-xl font-bold text-white"
              style={{ background: "var(--color-purple)" }}
              onClick={handleSendOtp}
            >
              Send OTP
            </button>
          </>
        )}
        {step === 2 && (
          <>
            <input
              name="otp"
              value={form.otp}
              onChange={handleChange}
              placeholder="Enter OTP (123456)"
              className="mb-6 w-full px-4 py-2 rounded-xl border"
            />
            <button
              type="button"
              className="w-full py-3 rounded-xl font-bold text-white"
              style={{ background: "var(--color-purple)" }}
              onClick={handleVerifyOtp}
            >
              Verify & Sign Up
            </button>
          </>
        )}
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <span
            className="text-[var(--color-purple)] font-semibold cursor-pointer"
            onClick={() => navigate("/signin")}
          >
            Sign In
          </span>
        </div>
      </form>
    </div>
  );
}
