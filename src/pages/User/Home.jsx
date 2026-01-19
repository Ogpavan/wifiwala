import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faSearch,
  faWallet,
  faGift,
  faTools,
  faHeadset,
  faArrowRight,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  // Dummy data
  const walletBalance = 1250;
  const userName = "Jatin";

  const offers = [
    {
      id: 1,
      title: "20% Off First Recharge",
      subtitle: "Valid till 30th Sept",
      bgColor:
        "linear-gradient(135deg, var(--color-purple), var(--color-indigo))",
    },
    {
      id: 2,
      title: "Unlimited 100Mbps for ₹499",
      subtitle: "Limited time offer",
      bgColor:
        "linear-gradient(135deg, var(--color-pink), var(--color-purple))",
    },
    {
      id: 3,
      title: "Refer & Earn ₹100",
      subtitle: "For each successful referral",
      bgColor:
        "linear-gradient(135deg, var(--color-emerald), var(--color-cyan))",
    },
  ];

  const quickActions = [
    { icon: faWifi, label: "Speed Test", color: "#6366F1" },
    { icon: faGift, label: "Offers", color: "#EC4899" },
    { icon: faWallet, label: "Wallet", color: "#10B981" },
  ];

  const recommendedPlans = [
    {
      name: "Basic",
      price: 199,
      speed: "10Mbps",
      description: "Perfect for browsing",
    },
    {
      name: "Standard",
      price: 499,
      speed: "50Mbps",
      description: "Great for streaming",
    },
    {
      name: "Premium",
      price: 999,
      speed: "200Mbps",
      description: "Ultimate speed",
    },
  ];

  const activePlan = {
    name: "Standard Plan",
    speed: "50Mbps",
    expiry: "30 Sep 2025",
    dataUsed: 120,
    totalData: 200,
    isActive: true,
  };

  const openComplaint = {
    id: "#C1234",
    issue: "No Internet Connection",
    status: "In Progress",
    date: "28 Sep 2025",
  };

  return (
    <div className="min-h-screen pb-24 bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="pb-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
              style={{
                background:
                  "linear-gradient(135deg, var(--color-purple), var(--color-indigo))",
              }}
            >
              {userName[0]}
            </div>
            <div>
              <p className="text-sm text-gray-500">Welcome back!</p>
              <h1 className="text-xl font-bold text-gray-900">
                Hi, {userName} 👋
              </h1>
            </div>
          </div>
          <button
            onClick={() => navigate("/user/notifications")}
            className="relative p-3 rounded-full bg-white shadow"
          >
            <FontAwesomeIcon icon={faBell} className="text-purple-600" />
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs text-white font-bold bg-red-500">
              3
            </span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="flex items-center p-4 rounded-xl mb-4 bg-white shadow">
          <FontAwesomeIcon icon={faSearch} className="mr-3 text-gray-400" />
          <input
            className="flex-1 outline-none bg-transparent text-sm"
            placeholder="Search for WiFi plans or vendors nearby"
          />
        </div>

        {/* Wallet Balance */}
        <div className="p-5 rounded-2xl mb-6 flex items-center justify-between bg-gradient-to-r from-purple-500 to-indigo-500">
          <div>
            <p className="text-white/80 text-sm mb-1">Wallet Balance</p>
            <h2 className="text-white text-2xl font-bold">
              ₹{walletBalance.toLocaleString()}
            </h2>
          </div>
          <div className="p-3 bg-white/20 rounded-full">
            <FontAwesomeIcon icon={faWallet} className="text-white text-xl" />
          </div>
        </div>
      </div>

      {/* Banner/Offers Slider */}
      <div className="mb-6">
        <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="min-w-[280px] p-5 rounded-2xl flex items-center justify-between"
              style={{ background: offer.bgColor }}
            >
              <div>
                <h3 className="text-white font-bold text-lg mb-1">
                  {offer.title}
                </h3>
                <p className="text-white/80 text-sm">{offer.subtitle}</p>
              </div>
              <button className="p-2 bg-white/20 rounded-full">
                <FontAwesomeIcon icon={faArrowRight} className="text-white" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-4 text-gray-900">Quick Actions</h3>
        <div className="grid grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <button
              key={action.label}
              className="flex flex-col items-center p-4 rounded-2xl transition-transform hover:scale-105 bg-white shadow"
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3"
                style={{ backgroundColor: `${action.color}33` }}
              >
                <FontAwesomeIcon icon={action.icon} style={{ color: action.color }} className="text-xl" />
              </div>
              <span className="text-sm font-medium text-gray-900">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Active Plan */}
      {activePlan.isActive && (
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-4 text-gray-900">Your Active Plan</h3>
          <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-400 shadow">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-white font-bold text-lg">{activePlan.name}</h4>
                <p className="text-white/80">{activePlan.speed}</p>
              </div>
              <div className="text-right">
                <p className="text-white/80 text-sm">Valid till</p>
                <p className="text-white font-semibold">{activePlan.expiry}</p>
              </div>
            </div>
            <div className="mb-4">
              <div className="flex justify-between text-white/80 text-sm mb-2">
                <span>Data Used</span>
                <span>
                  {activePlan.dataUsed}GB / {activePlan.totalData}GB
                </span>
              </div>
              <div className="w-full bg-white/30 rounded-full h-2">
                <div
                  className="bg-white h-2 rounded-full transition-all"
                  style={{
                    width: `${(activePlan.dataUsed / activePlan.totalData) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
            <button className="w-full bg-white text-emerald-600 font-bold py-3 rounded-xl">
              Renew / Upgrade
            </button>
          </div>
        </div>
      )}

      {/* Recommended Plans */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">Recommended Plans</h3>
          <button className="text-sm font-semibold text-purple-600">View All Plans</button>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {recommendedPlans.map((plan) => (
            <div
              key={plan.name}
              className="p-4 rounded-2xl flex items-center justify-between bg-white shadow"
            >
              <div>
                <h4 className="font-bold text-lg text-gray-900">{plan.name}</h4>
                <p className="text-sm mb-1 text-gray-500">
                  {plan.speed} • {plan.description}
                </p>
                <p className="text-xl font-bold text-purple-600">
                  ₹{plan.price}/month
                </p>
              </div>
              <button className="px-6 py-2 rounded-xl text-white font-semibold bg-purple-600">
                Choose
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Support / Complaints */}
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-4 text-gray-900">Support & Help</h3>

        {/* Open Complaint */}
        {openComplaint && (
          <div className="p-4 rounded-2xl mb-4 border-l-4 bg-white shadow" style={{ borderLeftColor: "#F59E0B" }}>
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <FontAwesomeIcon icon={faExclamationTriangle} className="text-yellow-500" />
                <div>
                  <h4 className="font-semibold text-gray-900">{openComplaint.issue}</h4>
                  <p className="text-xs text-gray-500">
                    Status: {openComplaint.status} • {openComplaint.date}
                  </p>
                </div>
              </div>
              <span className="text-xs text-gray-500">{openComplaint.id}</span>
            </div>
          </div>
        )}

        {/* Support Actions */}
        <div className="grid grid-cols-2 gap-4">
          <button className="p-4 rounded-2xl flex items-center space-x-3 bg-white shadow">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-red-100">
              <FontAwesomeIcon icon={faTools} className="text-red-500" />
            </div>
            <div className="text-left">
              <h4 className="font-semibold text-sm text-gray-900">Report Issue</h4>
              <p className="text-xs text-gray-500">No Internet?</p>
            </div>
          </button>

          <button className="p-4 rounded-2xl flex items-center space-x-3 bg-white shadow">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-green-100">
              <FontAwesomeIcon icon={faHeadset} className="text-green-500" />
            </div>
            <div className="text-left">
              <h4 className="font-semibold text-sm text-gray-900">Live Support</h4>
              <p className="text-xs text-gray-500">24/7 Available</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
