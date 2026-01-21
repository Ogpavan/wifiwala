import React from 'react';
import { CreditCard, Wallet, Headphones, Bell } from 'lucide-react';

export default function ServiceCards() {
  const cards = [
    {
      icon: CreditCard,
      title: 'Your Plan',
      description: 'Manage subscription',
      color: 'from-pink-400 to-pink-500',
      bg: 'bg-pink-50'
    },
    {
      icon: Wallet,
      title: 'Wallet',
      description: 'Manage finances',
      color: 'from-green-400 to-green-500',
      bg: 'bg-green-50'
    },
    {
      icon: Headphones,
      title: 'Help',
      description: '24/7 support',
      color: 'from-blue-400 to-blue-500',
      bg: 'bg-blue-50'
    },
    {
      icon: Bell,
      title: 'Notifications',
      description: 'Stay updated',
      color: 'from-yellow-400 to-yellow-500',
      bg: 'bg-yellow-50'
    }
  ];

  return (
    <div className="bg-white p-4">
      <div className="max-w-sm mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Services</h1>
          <p className="text-gray-600 text-sm">Quick access to everything</p>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={index}
                className={`${card.bg} rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer`}
              >
                <div className={`inline-flex p-2.5 rounded-lg bg-gradient-to-br ${card.color} mb-2`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                
                <h3 className="text-base font-bold text-gray-900 mb-1">
                  {card.title}
                </h3>
                
                <p className="text-xs text-gray-600">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}