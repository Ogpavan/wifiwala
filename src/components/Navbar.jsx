import React from 'react';

function Navbar() {
  return (
    <div className="bg-white px-5 py-2 flex items-center justify-between shadow-sm">
      
      {/* Left: Logo */}
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-full bg-blue-900 text-white flex items-center justify-center font-bold text-xl">
          W
        </div>
        <span className="text-lg font-semibold text-gray-800">
          WifiWala
        </span>
      </div>

      {/* Right: Notification */}
      <div className="relative">
        <svg
          className="w-6 h-6 text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></div>
      </div>
    </div>
  );
}

export default Navbar;
