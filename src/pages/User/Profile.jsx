import React from "react";

export default function Profile() {
  const handleLogout = () => {
    // Clear user session (this is just a placeholder, implement actual logic)
    localStorage.removeItem("userToken");
    window.location.href = "/signin"; // Redirect to signin page
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
    <div className="min-h-screen pb-24">
      {/* Profile Header */}
      <div className="     pb-6 flex flex-col items-center">
        <div
          className="w-24 h-24 rounded-full border-4 border-[var(--color-purple)] shadow-lg mb-3"
          style={{ background: "white" }}
        >
          <img
            src={user.avatar}
            alt={user.name}
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        <h2
          className="text-2xl font-bold mb-1"
          style={{ color: "var(--color-text-primary)" }}
        >
          {user.name}
        </h2>
        <p
          className="text-sm mb-2"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {user.email}
        </p>
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[var(--color-purple)] text-white mb-2">
          Wallet: ₹{user.wallet}
        </span>
        <span className="text-xs text-[var(--color-text-secondary)]">
          Member since {user.joined}
        </span>
      </div>

      {/* Profile Details */}
      <div className="  ">
        <div
          className="bg-white rounded-2xl shadow-lg p-5 mb-6"
          style={{ boxShadow: "var(--color-shadow-footer)" }}
        >
          <h3
            className="text-lg font-bold mb-4"
            style={{ color: "var(--color-purple)" }}
          >
            Personal Details
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2">
              <span className="font-semibold w-24 text-[var(--color-text-secondary)]">
                Name:
              </span>
              <span className="text-[var(--color-text-primary)]">
                {user.name}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold w-24 text-[var(--color-text-secondary)]">
                Email:
              </span>
              <span className="text-[var(--color-text-primary)]">
                {user.email}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold w-24 text-[var(--color-text-secondary)]">
                Phone:
              </span>
              <span className="text-[var(--color-text-primary)]">
                {user.phone}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold w-24 text-[var(--color-text-secondary)]">
                Address:
              </span>
              <span className="text-[var(--color-text-primary)]">
                {user.address}
              </span>
            </div>
          </div>
        </div>

        {/* Active Plan */}
        <div
          className="bg-gradient-to-r from-[var(--color-purple)] to-[var(--color-indigo)] rounded-2xl p-5 mb-6 shadow-lg"
          style={{ boxShadow: "var(--color-shadow-footer)" }}
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-white text-lg font-bold">Active Plan</h3>
            <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full font-semibold">
              {user.activePlan.speed}
            </span>
          </div>
          <div className="text-white font-semibold text-base mb-1">
            {user.activePlan.name}
          </div>
          <div className="text-white/80 text-sm mb-3">
            Valid till{" "}
            <span className="font-semibold">{user.activePlan.expiry}</span>
          </div>
          <button className="w-full bg-white text-[var(--color-purple)] font-bold py-2 rounded-xl hover:bg-[var(--color-indigo)] hover:text-white transition">
            Renew / Upgrade
          </button>
        </div>

        {/* Settings & Actions */}
        <div
          className="bg-white rounded-2xl shadow-lg p-5"
          style={{ boxShadow: "var(--color-shadow-footer)" }}
        >
          <h3
            className="text-lg font-bold mb-4"
            style={{ color: "var(--color-purple)" }}
          >
            Account Actions
          </h3>
          <div className="flex flex-col gap-3">
            <button className="w-full py-2 rounded-xl font-semibold text-[var(--color-purple)] border border-[var(--color-purple)] hover:bg-[var(--color-purple)] hover:text-white transition">
              Edit Profile
            </button>
            <button
              onClick={handleLogout}
              className="w-full py-2 rounded-xl font-semibold text-[var(--color-error)] border border-[var(--color-error)] hover:bg-[var(--color-error)] hover:text-white transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
