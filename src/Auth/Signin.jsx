import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MobileSignIn() {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState(false);

  const navigate = useNavigate();

  // Indian mobile number validation
  const validateIndianMobile = (number) => {
    const cleanNumber = number.replace(/\D/g, "");
    const indianMobileRegex = /^[6-9]\d{9}$/;
    return indianMobileRegex.test(cleanNumber);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    if (error) setError("");
  };

  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 10) value = value.slice(0, 10);
    setPhoneNumber(value);

    if (error) setError("");
    if (value.length === 0) {
      setIsValid(false);
      setError("");
    } else if (value.length < 10) {
      setIsValid(false);
      setError("");
    } else if (value.length === 10) {
      const valid = validateIndianMobile(value);
      setIsValid(valid);
      if (!valid) setError("Please enter a valid Indian mobile number");
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Name is required");
      return;
    }
    if (!phoneNumber) {
      setError("Phone number is required");
      return;
    }
    if (phoneNumber.length !== 10) {
      setError("Phone number must be 10 digits");
      return;
    }
    if (!validateIndianMobile(phoneNumber)) {
      setError(
        "Please enter a valid Indian mobile number (should start with 6, 7, 8, or 9)"
      );
      return;
    }
    setError("");
    console.log("Name:", name, "Phone number:", phoneNumber);
    navigate("/");
  };

  const formatDisplayNumber = (number) => {
    if (number.length <= 5) return number;
    return `${number.slice(0, 5)} ${number.slice(5)}`;
  };

  return (
    <div className="min-h-[100dvh] bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex flex-col">
      {/* Header */}

      <div className="text-center pt-8 pb-4">
        <h2 className="text-lg font-bold text-blue-600">WiFiWala</h2>
        <p className="text-xs text-gray-500 mt-1">Premium WiFi Solutions</p>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center px-6">
        {/* WiFi Illustration */}
        <div className="">
          <div className="relative">
            {/* Background circle */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full opacity-50 blur-xl"></div>

            {/* WiFi waves */}
            <img
              src="/main.png"
              alt="WiFi"
              className="relative mx-auto w-56 h-56"
            />
          </div>
        </div>

        {/* Welcome Text */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome back
          </h1>

          <p className="text-gray-400 text-xs max-w-xs mx-auto">
            Access your high-speed internet plans, monitor usage, and manage
            your account
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleLogin} className="w-full max-w-sm">
          {/* Name Input */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              placeholder="Enter your name"
              className="w-full px-4 py-3 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-400 shadow-sm transition-all"
              maxLength={40}
              required
            />
          </div>

          {/* Phone Number Input */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Phone Number
            </label>
            <div className="relative">
              {/* Country Code */}
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 text-sm font-medium">+91</span>
                <div className="ml-2 w-px h-4 bg-gray-300"></div>
              </div>

              {/* Phone Icon */}
              <div className="absolute inset-y-0 left-14 flex items-center pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>

              {/* Input Field */}
              <input
                type="tel"
                value={formatDisplayNumber(phoneNumber)}
                onChange={handlePhoneChange}
                placeholder="Enter 10-digit mobile number"
                maxLength="11" // Accounting for the space in formatting
                className={`w-full pl-20 pr-12 py-3 text-sm bg-white border ${
                  error
                    ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                    : isValid
                    ? "border-green-300 focus:ring-green-500 focus:border-green-500"
                    : "border-gray-200 focus:ring-blue-500 focus:border-blue-500"
                } rounded-lg focus:outline-none focus:ring-0.8 text-gray-900 placeholder-gray-400 shadow-sm transition-all`}
                required
              />

              {/* Validation Icon */}
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                {phoneNumber.length === 10 &&
                  (isValid ? (
                    <svg
                      className="w-5 h-5 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5 text-red-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  ))}
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && <div className="mb-4 text-xs text-red-600">{error}</div>}

          {/* Login Button */}
          <button
            type="submit"
            disabled={!isValid || !name.trim()}
            className={`w-full py-3 text-sm rounded-lg font-semibold transition-all shadow-md transform ${
              isValid && name.trim()
                ? "bg-gradient-to-r from-blue-600 to-blue-600 text-white hover:from-blue-700 hover:to-blue-700 shadow-blue-500/25 hover:shadow-lg hover:shadow-blue-500/30 hover:scale-[1.01] cursor-pointer"
                : "bg-gray-300 text-gray-500 cursor-not-allowed shadow-gray-300/25"
            }`}
          >
            {isValid && name.trim()
              ? "Access My WiFi Dashboard"
              : "Enter Your Details"}
          </button>
        </form>

        {/* Service Info */}
        <div className="w-full max-w-sm mt-6 text-center">
          <p className="text-xs text-gray-500 mb-2"></p>
        </div>

        {/* Divider */}
        <div className="text-center text-xs text-gray-400 pb-6 pt-4">
          <p>Secure WiFi Connection </p>
        </div>

        {/*Privacy Policy */}
        <div className="w-full max-w-sm mt-6 text-center">
          <p className="text-xs text-gray-500 mb-2">
            By signing in, you agree to our{" "}
            <a href="#" className="text-blue-600 underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-600 underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
