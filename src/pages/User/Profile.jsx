import React from "react";
import { Mail, Phone, MapPin, Wifi, User } from "lucide-react";
import SettingsSidebar from "./Settings.jsx";

export default function Profile() {
  const user = {
    name: "Pawan Pal",
    email: "pawan.pal@email.com",
    phone: "+91 98765 43210",
    avatar: "https://ui-avatars.com/api/?name=Pawan+Pal&background=1e3a8a&color=fff&size=200",
    joined: "Jan 2024",
    address: "B-123, Wifi Street, Mumbai, India",
    activePlan: {
      name: "Standard Plan",
      speed: "50Mbps",
      expiry: "30 Sep 2025",
    },
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-blue-900 px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-white">Profile</h1>
        <SettingsSidebar />
      </div>

      <div className="max-w-md mx-auto px-4 py-6 pb-20">
        {/* Profile Header */}
        <div className="text-center mb-8">
          <div className="relative inline-block mb-4">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-28 h-28 rounded-full shadow-lg"
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">{user.name}</h2>
          <p className="text-gray-600 text-sm mb-1">{user.email}</p>
          <p className="text-gray-500 text-xs">Member since {user.joined}</p>
        </div>

        {/* Active Plan Card */}
        <div className="bg-blue-900 rounded-2xl p-6 mb-6 shadow-lg">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <p className="text-blue-300 text-xs uppercase tracking-wide mb-2">Active Plan</p>
              <h3 className="text-white text-xl font-bold mb-1">{user.activePlan.name}</h3>
              <div className="flex items-center gap-2 text-blue-200">
                <Wifi className="w-4 h-4" />
                <span className="text-lg font-semibold">{user.activePlan.speed}</span>
              </div>
            </div>
            <div className="bg-blue-800 p-3 rounded-xl">
              <Wifi className="w-6 h-6 text-white" />
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t border-blue-800">
            <div>
              <p className="text-blue-300 text-xs mb-1">Valid till</p>
              <p className="text-white font-medium text-sm">{user.activePlan.expiry}</p>
            </div>
            <button className="px-4 py-2 bg-white text-blue-900 text-sm font-semibold rounded-lg hover:bg-blue-50 transition-colors">
              Renew / Upgrade
            </button>
          </div>
        </div>

        {/* Personal Details */}
        <div className="bg-gray-50 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Personal Details</h3>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <User className="w-5 h-5 text-blue-900" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 mb-1">Full Name</p>
                <p className="text-gray-900 font-medium">{user.name}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Mail className="w-5 h-5 text-blue-900" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 mb-1">Email Address</p>
                <p className="text-gray-900 font-medium">{user.email}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Phone className="w-5 h-5 text-blue-900" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 mb-1">Phone Number</p>
                <p className="text-gray-900 font-medium">{user.phone}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <MapPin className="w-5 h-5 text-blue-900" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 mb-1">Address</p>
                <p className="text-gray-900 font-medium">{user.address}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}