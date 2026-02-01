import React, { useState } from "react";
import { Wifi, User, Phone, Mail, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function WiFiSignUp() {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    address: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "mobile") {
      const numbersOnly = value.replace(/\D/g, "").slice(0, 10);
      setForm({ ...form, [name]: numbersOnly });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const validateForm = () => {
    if (!form.name.trim()) {
      setError("Name is required");
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
    if (!form.email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!form.address.trim()) {
      setError("Address is required");
      return false;
    }
    if (!form.password.trim()) {
      setError("Password is required");
      return false;
    }
    return true;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    if (validateForm()) {
      setLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/auth/signup`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
          },
        );
        const data = await response.json();
        if (data.success) {
          setLoading(false);
          navigate("/signin");
        } else {
          setLoading(false);
          setError(data.message || "Signup failed");
        }
      } catch (err) {
        setLoading(false);
        setError("Server error. Please try again.");
      }
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
            Create Account
          </h1>
          <p className="text-sm text-gray-600">Sign up to get started</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-xs font-medium">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-xs font-semibold text-blue-900 mb-1">
                Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full pl-10 pr-3 py-2.5 bg-white border border-gray-300 rounded-lg focus:border-blue-900 focus:outline-none transition-all text-sm"
                />
              </div>
            </div>

            {/* Mobile Number */}
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

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-blue-900 mb-1">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-3 py-2.5 bg-white border border-gray-300 rounded-lg focus:border-blue-900 focus:outline-none transition-all text-sm"
                />
              </div>
            </div>

            {/* Address */}
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
                  placeholder="Enter your address"
                  rows="2"
                  className="w-full pl-10 pr-3 py-2.5 bg-white border border-gray-300 rounded-lg focus:border-blue-900 focus:outline-none transition-all text-sm resize-none"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-blue-900 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  name="password"
                  type="password"
                  value={form.password || ""}
                  onChange={handleChange}
                  placeholder="Enter password"
                  className="w-full pl-3 pr-3 py-2.5 bg-white border border-gray-300 rounded-lg focus:border-blue-900 focus:outline-none transition-all text-sm"
                />
              </div>
            </div>

            {/* Sign Up Button */}
            <button
              onClick={handleSignUp}
              disabled={loading}
              className="w-full py-3 bg-blue-900 text-white font-semibold rounded-lg hover:bg-blue-800 transition-all disabled:opacity-50 mt-4"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Signing Up...
                </div>
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500 mt-4 px-2">
          Already have an account?{" "}
          <span
            className="text-blue-900 hover:text-blue-700 font-semibold cursor-pointer"
            onClick={() => navigate("/signin")}
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
}
