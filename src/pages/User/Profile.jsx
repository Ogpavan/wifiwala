import React from "react";

export default function Profile() {
  const handleLogout = async () => {
    console.log("Logout clicked");
    // Add your logout logic here
  };

  // Dummy user data
  const user = {
    name: "Pawan Pal",
    email: "pawan.pal@email.com",
    phone: "+91 98765 43210",
    avatar:
      "https://ui-avatars.com/api/?name=Pawan+Pal&background=7c3aed&color=fff&size=128",
    wallet: 1250,
    joined: "Jan 2024",
    address: "B-123, Wifi Street, Mumbai, India",
    activePlan: {
      name: "Standard Plan",
      speed: "50Mbps",
      expiry: "30 Sep 2025",
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="max-w-md mx-auto px-4 pt-6">
        {/* Profile Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 rounded-full border-4 border-blue-500 shadow-lg mb-3 bg-white">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            {user.name}
          </h2>
          <p className="text-sm text-gray-500 mb-2">{user.email}</p>
          <span className="px-4 py-1.5 rounded-full text-xs font-semibold bg-blue-600 text-white mb-2">
            Wallet: ₹{user.wallet}
          </span>
          <span className="text-xs text-gray-500">
            Member since {user.joined}
          </span>
        </div>

        {/* Profile Details */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
            <h3 className="text-lg font-bold text-blue-600 mb-4">
              Personal Details
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <span className="font-semibold w-20 text-gray-500">Name:</span>
                <span className="text-gray-900 flex-1">{user.name}</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-semibold w-20 text-gray-500">Email:</span>
                <span className="text-gray-900 flex-1 break-all">
                  {user.email}
                </span>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-semibold w-20 text-gray-500">Phone:</span>
                <span className="text-gray-900 flex-1">{user.phone}</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-semibold w-20 text-gray-500">
                  Address:
                </span>
                <span className="text-gray-900 flex-1">{user.address}</span>
              </div>
            </div>
          </div>

          {/* Active Plan */}
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white text-lg font-bold">Active Plan</h3>
              <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full font-semibold backdrop-blur-sm border border-white/30">
                {user.activePlan.speed}
              </span>
            </div>
            <div className="text-white font-semibold text-base mb-1">
              {user.activePlan.name}
            </div>
            <div className="text-white/90 text-sm mb-4">
              Valid till{" "}
              <span className="font-semibold">{user.activePlan.expiry}</span>
            </div>
            <button className="w-full bg-white text-blue-600 font-bold py-2.5 rounded-xl hover:bg-blue-50 transition active:scale-95">
              Renew / Upgrade
            </button>
          </div>

          {/* Settings & Actions */}
          <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
            <h3 className="text-lg font-bold text-blue-600 mb-4">
              Account Actions
            </h3>
            <div className="flex flex-col gap-3">
              <button className="w-full py-2.5 rounded-xl font-semibold text-blue-600 border-2 border-blue-600 hover:bg-blue-600 hover:text-white transition active:scale-95">
                Edit Profile
              </button>
              <button
                onClick={handleLogout}
                className="w-full py-2.5 rounded-xl font-semibold text-red-500 border-2 border-red-500 hover:bg-red-500 hover:text-white transition active:scale-95"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}