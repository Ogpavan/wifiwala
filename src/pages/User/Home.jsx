import React from "react";
import {
  FiMenu,
  FiSearch,
  FiWifi,
  FiGift,
  FiCreditCard,
  FiSettings,
  FiPhone,
  FiArrowRight,
} from "react-icons/fi";
import { MdLocalOffer, MdHistory, MdSupportAgent } from "react-icons/md";
import { BsWallet2 } from "react-icons/bs";

export default function Home() {
  // Dummy data
  const walletBalance = 320;
  const offers = [
    {
      id: 1,
      text: "20% Off First Recharge",
      color: "from-indigo-400 to-purple-500",
    },
    {
      id: 2,
      text: "Unlimited 100Mbps for ₹499",
      color: "from-pink-300 to-pink-500",
    },
    { id: 3, text: "Refer & Earn ₹100", color: "from-emerald-400 to-cyan-400" },
  ];
  const quickActions = [
    {
      label: "Plans",
      icon: <FiWifi className="text-xl" />,
      color: "bg-indigo-100 text-indigo-600",
    },
    {
      label: "Wallet",
      icon: <BsWallet2 className="text-xl" />,
      color: "bg-purple-100 text-purple-600",
    },
    {
      label: "Offers",
      icon: <MdLocalOffer className="text-xl" />,
      color: "bg-pink-100 text-pink-600",
    },
    {
      label: "Complaints",
      icon: <FiSettings className="text-xl" />,
      color: "bg-emerald-100 text-emerald-600",
    },
    {
      label: "History",
      icon: <MdHistory className="text-xl" />,
      color: "bg-orange-100 text-orange-600",
    },
    {
      label: "Support",
      icon: <MdSupportAgent className="text-xl" />,
      color: "bg-blue-100 text-blue-600",
    },
  ];
  const recommendedPlans = [
    { name: "Basic", price: 199, speed: "10Mbps" },
    { name: "Standard", price: 499, speed: "50Mbps" },
    { name: "Premium", price: 999, speed: "200Mbps" },
  ];
  const activePlan = {
    name: "Standard",
    speed: "50Mbps",
    expiry: "30 Sep",
    usage: "120GB / 200GB",
  };
  const hasActivePlan = true;
  const openComplaint = { status: "Open", issue: "No Internet", id: "#C1234" };

  return (
    <div className="  bg-white  ">
      {/* Top Bar */}
      <div className="   flex items-center justify-between">
        <button className="p-2 rounded-full bg-purple-100 hover:bg-purple-200 transition">
          <FiMenu className="text-purple-600 text-xl" />
        </button>
        <span className="text-xs text-slate-400 font-medium">WifiWala</span>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold text-base">
          J
        </div>
      </div>

      {/* Welcome & Search */}
      <div className=" px-2 mt-4">
        <h1 className="text-xl font-bold text-slate-800 mb-1">Hi, Pawan 👋</h1>
        <p className="text-slate-500 mb-4 text-sm">Welcome back!</p>
        <div className="flex items-center bg-white rounded-md shadow-sm px-3 py-2 mb-4">
          <FiSearch className="text-slate-400 text-lg mr-2" />
          <input
            className="bg-transparent outline-none flex-1 text-xs text-slate-700"
            placeholder="Search for WiFi plans or vendors nearby"
          />
        </div>
        {/* Wallet */}
        {/* <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-400 rounded-2xl px-5 py-3 flex items-center shadow-md">
            <BsWallet2 className="text-white text-2xl mr-3" />
            <div>
              <div className="text-xs text-white/80">Wallet Balance</div>
              <div className="text-lg font-bold text-white">
                ₹{walletBalance}
              </div>
            </div>
          </div>
        </div> */}
      </div>

      {/* Offers/Banner Carousel */}
      <div className="px-2 mb-6">
        <div className="flex gap-4 overflow-x-auto hide-scrollbar">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className={`min-w-[220px] rounded-lg p-4 flex items-center justify-between shadow-md bg-gradient-to-br ${offer.color} text-white`}
            >
              <div className="font-semibold text-base">{offer.text}</div>
              <button className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition">
                <FiArrowRight className="text-white text-lg" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className=" mb-6">
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
          {quickActions.map((action) => (
            <button
              key={action.label}
              className={`flex flex-col items-center justify-center rounded-md py-3 shadow-sm hover:scale-105 transition bg-white`}
            >
              <span className={`mb-2 p-2 rounded-full ${action.color}`}>
                {action.icon}
              </span>
              <span className="text-xs font-medium text-slate-700">
                {action.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Recommended Plans */}
      <div className="px-2 mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="text-base font-semibold text-slate-800">
            Recommended Plans
          </div>
          <button className="text-xs text-purple-600 font-semibold hover:underline">
            View All Plans
          </button>
        </div>
        <div className="flex gap-4 overflow-x-auto hide-scrollbar">
          {recommendedPlans.map((plan) => (
            <div
              key={plan.name}
              className="min-w-[140px] bg-white rounded-xl p-4 shadow flex flex-col items-start"
            >
              <div className="text-sm font-bold text-slate-800 mb-1">
                {plan.name}
              </div>
              <div className="text-xs text-slate-400 mb-2">{plan.speed}</div>
              <div className="text-lg font-bold text-purple-600 mb-2">
                ₹{plan.price}
              </div>
              <button className="text-xs px-3 py-1 rounded-full bg-purple-100 text-purple-600 font-semibold hover:bg-purple-200 transition">
                Choose
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Active Plan */}
      {hasActivePlan && (
        <div className="px-2 mb-6">
          <div className="bg-gradient-to-r from-indigo-400 to-purple-500 rounded-md p-5 shadow-md flex items-center justify-between">
            <div>
              <div className="text-xs text-white/80 mb-1">Active Plan</div>
              <div className="text-lg font-bold text-white mb-1">
                {activePlan.name} ({activePlan.speed})
              </div>
              <div className="text-xs text-white/80 mb-1">
                Valid till{" "}
                <span className="font-semibold">{activePlan.expiry}</span>
              </div>
              <div className="text-xs text-white/80">
                Usage: <span className="font-semibold">{activePlan.usage}</span>
              </div>
            </div>
            <button className="px-4 py-2 rounded-full bg-white text-purple-600 font-bold text-xs shadow hover:bg-purple-50 transition">
              Renew / Upgrade
            </button>
          </div>
        </div>
      )}

      {/* Support / Complaints */}
      <div className="  mb-10">
        <div className="flex items-center gap-3">
          <button className="flex-1 flex items-center gap-2 bg-white rounded-xl px-4 py-3 shadow hover:bg-purple-50 transition">
            <FiSettings className="text-purple-600 text-lg" />
            <span className="text-sm font-semibold text-slate-700">
              Raise Complaint
            </span>
          </button>
          <button className="flex-1 flex items-center gap-2 bg-white rounded-xl px-4 py-3 shadow hover:bg-purple-50 transition">
            <MdSupportAgent className="text-blue-600 text-lg" />
            <span className="text-sm font-semibold text-slate-700">
              Support
            </span>
          </button>
        </div>
        {openComplaint && (
          <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-xl px-4 py-3 flex items-center gap-3">
            <span className="text-yellow-600 font-bold text-xs">
              {openComplaint.status}
            </span>
            <span className="text-slate-700 text-xs">
              {openComplaint.issue}
            </span>
            <span className="ml-auto text-slate-400 text-xs">
              {openComplaint.id}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
