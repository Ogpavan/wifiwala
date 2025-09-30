import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faSearch,
  faWifi,
  faWallet,
  faGift,
  faTools,
  faHistory,
  faHeadset,
  faArrowRight,
  faExclamationTriangle,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function Home() {
  // Dummy data
  const walletBalance = 1250;
  const userName = "Pawan";

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
    { label: "Plans", icon: faWifi, color: "var(--color-purple)" },
    { label: "Wallet", icon: faWallet, color: "var(--color-indigo)" },
    { label: "Offers", icon: faGift, color: "var(--color-pink)" },
    { label: "Complaints", icon: faTools, color: "var(--color-emerald)" },
    { label: "History", icon: faHistory, color: "var(--color-orange)" },
    { label: "Support", icon: faHeadset, color: "var(--color-cyan)" },
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

  const navigate = useNavigate();

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="   pb-4">
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
              <p
                style={{ color: "var(--color-text-secondary)" }}
                className="text-sm"
              >
                Welcome back!
              </p>
              <h1
                style={{ color: "var(--color-text-primary)" }}
                className="text-xl font-bold"
              >
                Hi, {userName} 👋
              </h1>
            </div>
          </div>
          <button
            onClick={() => navigate("/user/notifications")}
            className="relative p-3 rounded-full"
            style={{
              backgroundColor: "var(--color-card-bg)",
              boxShadow: "var(--color-shadow-footer)",
            }}
          >
            <FontAwesomeIcon
              icon={faBell}
              style={{ color: "var(--color-purple)" }}
            />
            <span
              className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs text-white font-bold"
              style={{ backgroundColor: "var(--color-error)" }}
            >
              3
            </span>
          </button>
        </div>

        {/* Search Bar */}
        <div
          className="flex items-center p-4 rounded-xl mb-4"
          style={{
            backgroundColor: "var(--color-card-bg)",
            boxShadow: "var(--color-shadow-footer)",
          }}
        >
          <FontAwesomeIcon
            icon={faSearch}
            style={{ color: "var(--color-gray)" }}
            className="mr-3"
          />
          <input
            className="flex-1 outline-none bg-transparent text-sm"
            placeholder="Search for WiFi plans or vendors nearby"
            style={{ color: "var(--color-text-primary)" }}
          />
        </div>

        {/* Wallet Balance */}
        <div
          className="p-5 rounded-2xl mb-6 flex items-center justify-between"
          style={{
            background:
              "linear-gradient(135deg, var(--color-purple), var(--color-indigo))",
          }}
        >
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
      <div className="  mb-6">
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
      <div className="  mb-6">
        <h3
          style={{ color: "var(--color-text-primary)" }}
          className="text-lg font-bold mb-4"
        >
          Quick Actions
        </h3>
        <div className="grid grid-cols-3 gap-4">
          {quickActions.map((action, index) => (
            <button
              key={action.label}
              className="flex flex-col items-center p-4 rounded-2xl transition-transform hover:scale-105"
              style={{
                backgroundColor: "var(--color-card-bg)",
                boxShadow: "var(--color-shadow-footer)",
              }}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3"
                style={{ backgroundColor: `${action.color}15` }}
              >
                <FontAwesomeIcon
                  icon={action.icon}
                  style={{ color: action.color }}
                  className="text-xl"
                />
              </div>
              <span
                style={{ color: "var(--color-text-primary)" }}
                className="text-sm font-medium"
              >
                {action.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Active Plan */}
      {activePlan.isActive && (
        <div className="  mb-6">
          <h3
            style={{ color: "var(--color-text-primary)" }}
            className="text-lg font-bold mb-4"
          >
            Your Active Plan
          </h3>
          <div
            className="p-5 rounded-2xl"
            style={{
              backgroundColor: "var(--color-card-bg)",
              boxShadow: "var(--color-shadow-footer)",
              background:
                "linear-gradient(135deg, var(--color-emerald), var(--color-cyan))",
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-white font-bold text-lg">
                  {activePlan.name}
                </h4>
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
                    width: `${
                      (activePlan.dataUsed / activePlan.totalData) * 100
                    }%`,
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
      <div className="  mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3
            style={{ color: "var(--color-text-primary)" }}
            className="text-lg font-bold"
          >
            Recommended Plans
          </h3>
          <button
            style={{ color: "var(--color-purple)" }}
            className="text-sm font-semibold"
          >
            View All Plans
          </button>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {recommendedPlans.map((plan, index) => (
            <div
              key={plan.name}
              className="p-4 rounded-2xl flex items-center justify-between"
              style={{
                backgroundColor: "var(--color-card-bg)",
                boxShadow: "var(--color-shadow-footer)",
              }}
            >
              <div>
                <h4
                  style={{ color: "var(--color-text-primary)" }}
                  className="font-bold text-lg"
                >
                  {plan.name}
                </h4>
                <p
                  style={{ color: "var(--color-text-secondary)" }}
                  className="text-sm mb-1"
                >
                  {plan.speed} • {plan.description}
                </p>
                <p
                  style={{ color: "var(--color-purple)" }}
                  className="text-xl font-bold"
                >
                  ₹{plan.price}/month
                </p>
              </div>
              <button
                className="px-6 py-2 rounded-xl text-white font-semibold"
                style={{ backgroundColor: "var(--color-purple)" }}
              >
                Choose
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Support/Complaints */}
      <div className="  mb-6">
        <h3
          style={{ color: "var(--color-text-primary)" }}
          className="text-lg font-bold mb-4"
        >
          Support & Help
        </h3>

        {/* Open Complaint Alert */}
        {openComplaint && (
          <div
            className="p-4 rounded-2xl mb-4 border-l-4"
            style={{
              backgroundColor: "var(--color-card-bg)",
              borderLeftColor: "var(--color-warning)",
              boxShadow: "var(--color-shadow-footer)",
            }}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <FontAwesomeIcon
                  icon={faExclamationTriangle}
                  style={{ color: "var(--color-warning)" }}
                />
                <div>
                  <h4
                    style={{ color: "var(--color-text-primary)" }}
                    className="font-semibold"
                  >
                    {openComplaint.issue}
                  </h4>
                  <p
                    style={{ color: "var(--color-text-secondary)" }}
                    className="text-sm"
                  >
                    Status: {openComplaint.status} • {openComplaint.date}
                  </p>
                </div>
              </div>
              <span
                style={{ color: "var(--color-text-secondary)" }}
                className="text-xs"
              >
                {openComplaint.id}
              </span>
            </div>
          </div>
        )}

        {/* Support Actions */}
        <div className="grid grid-cols-2 gap-4">
          <button
            className="p-4 rounded-2xl flex items-center space-x-3"
            style={{
              backgroundColor: "var(--color-card-bg)",
              boxShadow: "var(--color-shadow-footer)",
            }}
          >
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{
                backgroundColor: `${getComputedStyle(
                  document.documentElement
                ).getPropertyValue("--color-error")}15`,
              }}
            >
              <FontAwesomeIcon
                icon={faTools}
                style={{ color: "var(--color-error)" }}
              />
            </div>
            <div className="text-left">
              <h4
                style={{ color: "var(--color-text-primary)" }}
                className="font-semibold text-sm"
              >
                Report Issue
              </h4>
              <p
                style={{ color: "var(--color-text-secondary)" }}
                className="text-xs"
              >
                No Internet?
              </p>
            </div>
          </button>

          <button
            className="p-4 rounded-2xl flex items-center space-x-3"
            style={{
              backgroundColor: "var(--color-card-bg)",
              boxShadow: "var(--color-shadow-footer)",
            }}
          >
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{
                backgroundColor: `${getComputedStyle(
                  document.documentElement
                ).getPropertyValue("--color-success")}15`,
              }}
            >
              <FontAwesomeIcon
                icon={faHeadset}
                style={{ color: "var(--color-success)" }}
              />
            </div>
            <div className="text-left">
              <h4
                style={{ color: "var(--color-text-primary)" }}
                className="font-semibold text-sm"
              >
                Live Support
              </h4>
              <p
                style={{ color: "var(--color-text-secondary)" }}
                className="text-xs"
              >
                24/7 Available
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
