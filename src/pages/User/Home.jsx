import React, { useState } from 'react';
import { Wifi, Zap, Headphones, TrendingUp } from 'lucide-react';
import Ring from "./DataUsage";
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
      iconColor: "text-blue-900"
    },
    {
      id: 2,
      title: "Data Speed",
      value: "98.5",
      subtitle: "Mbps Average",
      icon: Zap,
      gradient: "bg-blue-900",
      iconBg: "bg-blue-50",
      iconColor: "text-blue-900"
    },
    {
      id: 3,
      title: "Live Support",
      value: "24/7",
      subtitle: "Available Now",
      icon: Headphones,
      gradient: "bg-blue-900",
      iconBg: "bg-blue-50",
      iconColor: "text-blue-900"
    },
    {
      id: 4,
      title: "Usage Stats",
      value: "156 GB",
      subtitle: "This Month",
      icon: TrendingUp,
      gradient: "bg-blue-900",
      iconBg: "bg-blue-50",
      iconColor: "text-blue-900"
    }
  ]; 

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-blue-900 px-3 pt-3 pb-16 rounded-b-3xl shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-semibold text-base border-2 border-white/30">
              {userName[0]}
            </div>
            <div>
              <p className="text-blue-100 text-xs">Welcome back!</p>
              <h1 className="text-white text-base font-semibold">
                Hey, {userName}!
              </h1>
            </div>
          </div>
        </div>
        
        <p className="text-blue-50 text-xs mt-1">Saturday, Dec 09, 2023</p>
      </div>

      {/* Cards Grid */}
      <div className="px-3 -mt-10 pb-6">
        <div className="grid grid-cols-2 gap-2">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                onClick={() => setActiveCard(card.id)}
                className={`bg-white rounded-xl p-3 shadow-lg transition-all duration-300 cursor-pointer ${
                  activeCard === card.id ? 'scale-105 shadow-xl' : 'hover:scale-102'
                }`}
              >
                <div className="flex flex-col h-full">
                  <div className={`${card.iconBg} w-9 h-9 rounded-lg flex items-center justify-center mb-2`}>
                    <Icon className={`w-4 h-4 ${card.iconColor}`} />
                  </div>
                  
                  <div className="flex-1">
                    <p className="text-gray-500 text-xs font-medium mb-0.5">
                      {card.title}
                    </p>
                    <h3 className={`text-xl font-bold bg-gradient-to-r ${card.gradient} bg-clip-text text-transparent mb-0.5`}>
                      {card.value}
                    </h3>
                    <p className="text-gray-400 text-xs">
                      {card.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
     
      <Ring/>
      <Carousel/>
      <Table/>
    </div>
  );
}