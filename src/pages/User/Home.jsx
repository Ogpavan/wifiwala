import React, { useState } from "react";
import { Wifi, Zap, Headphones, Wallet,Phone } from "lucide-react";

import Ring from "./Portchange";
import Carousel from "./Carousel";
import Table from "./Table";

export default function Home() {
  const [activeCard, setActiveCard] = useState(null);
  const userName = "Ektiar";

  const cards = [
    {
      id: 1,
      title: "Current Plan",
      value: "Premium",
      subtitle: "100 Mbps",
      icon: Wifi,
      gradient: "bg-blue-900",
      iconBg: "bg-blue-50",
      iconColor: "text-blue-900",
    },
    {
      id: 2,
      title: "Data Speed",
      value: "98.5",
      subtitle: "Mbps Average",
      icon: Zap,
      gradient: "bg-blue-900",
      iconBg: "bg-blue-50",
      iconColor: "text-blue-900",
    },
    {
      id: 3,
      title: "Live Support",
      value: "24/7",
      subtitle: "Available Now",
      icon: Headphones,
      gradient: "bg-blue-900",
      iconBg: "bg-blue-50",
      iconColor: "text-blue-900",
    },
    {
      id: 4,
      title: "Wallet",
      value: "₹1,560",
      subtitle: "Available Balance",
      icon: Wallet,
      gradient: "bg-blue-900",
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-blue-900 px-3 pt-3 pb-16 rounded-b-3xl shadow-lg">
        <div className="flex items-start justify-between mb-2">
          {/* User */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => (window.location.href = "/user/profile")}
              className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-semibold border-2 border-white/30"
            >
              {userName[0]}
            </button>
            <div>
              <p className="text-blue-100 text-xs">Welcome back!</p>
              <h1 className="text-white text-base font-semibold">
                Hey, {userName}!
              </h1>
            </div>
          </div>

          {/* Phone Numbers */}
          <div className="flex flex-col items-end gap-1">
           <a
  href="tel:+917668129807"
  className="flex items-center gap-2 text-white text-xs font-medium bg-white/20 px-3 py-1 rounded-full hover:bg-white/30 transition"
>
  <Phone className="w-3 h-3 text-white" />
  +91 76681 29807
</a>

<a
  href="tel:+919876543210"
  className="flex items-center gap-2 text-white text-xs font-medium bg-white/20 px-3 py-1 rounded-full hover:bg-white/30 transition"
>
  <Phone className="w-3 h-3 text-white" />
  +91 98765 43210
</a>
          </div>
        </div>

        {/* Date */}
        <p className="text-blue-50 text-xs mt-1">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            month: "short",
            day: "2-digit",
            year: "numeric",
          })}
        </p>
      </div>

      {/* Cards */}
      <div className="px-3 -mt-10 pb-6">
        <div className="grid grid-cols-2 gap-2">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                onClick={() => setActiveCard(card.id)}
                className={`bg-white rounded-xl p-3 shadow-lg transition-all cursor-pointer ${
                  activeCard === card.id
                    ? "scale-105 shadow-xl"
                    : "hover:scale-102"
                }`}
              >
                <div className="flex flex-col h-full">
                  <div
                    className={`${card.iconBg} w-9 h-9 rounded-lg flex items-center justify-center mb-2`}
                  >
                    <Icon className={`w-4 h-4 ${card.iconColor}`} />
                  </div>

                  <p className="text-gray-500 text-xs font-medium">
                    {card.title}
                  </p>
                  <h3
                    className={`text-xl font-bold bg-gradient-to-r ${card.gradient} bg-clip-text text-transparent`}
                  >
                    {card.value}
                  </h3>
                  <p className="text-gray-400 text-xs">
                    {card.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Ring />
      <Carousel />
      <Table />
    </div>
  );
}
