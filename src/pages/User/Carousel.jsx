import React, { useState, useEffect } from 'react';
import { Percent, Wrench, Zap } from 'lucide-react';

export default function OfferCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const offers = [
    {
      id: 1,
      title: "20% Off",
      subtitle: "On First Recharge",
      description: "New users get instant discount",
      icon: Percent,
      accentColor: "from-cyan-400 to-blue-500"
    },
    {
      id: 2,
      title: "No Installation",
      subtitle: "Fees",
      description: "Free setup for all new connections",
      icon: Wrench,
      accentColor: "from-purple-400 to-pink-500"
    },
    {
      id: 3,
      title: "Unbeatable",
      subtitle: "Speed",
      description: "Up to 1 Gbps fiber connection",
      icon: Zap,
      accentColor: "from-orange-400 to-red-500"
    }
  ];

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % offers.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [offers.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative px-3 py-2">
      {/* Carousel Container with Glassmorphism */}
      <div className="relative overflow-hidden rounded-2xl">
        {/* Background */}
        <div className="absolute inset-0 bg-blue-900"></div>
        
        {/* Slides */}
        <div 
          className="flex transition-transform duration-700 ease-in-out relative"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {offers.map((offer) => {
            const Icon = offer.icon;
            return (
              <div
                key={offer.id}
                className="min-w-full"
              >
                <div className="relative p-4 overflow-hidden">
                  {/* Animated Gradient Orbs */}
                  <div className="absolute inset-0 overflow-hidden">
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${offer.accentColor} opacity-20 rounded-full blur-3xl -mr-16 -mt-16 animate-pulse`}></div>
                    <div className={`absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br ${offer.accentColor} opacity-15 rounded-full blur-3xl -ml-12 -mb-12`}></div>
                  </div>

                  {/* Glassmorphism Card */}
                  <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl p-4 shadow-2xl">
                    {/* Icon Badge */}
                    <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-2.5 py-1 mb-3">
                      <Icon className="w-3 h-3 text-white" />
                      <span className="text-white text-xs font-semibold tracking-wide">SPECIAL OFFER</span>
                    </div>

                    {/* Content */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h2 className="text-white text-2xl font-bold mb-0.5 leading-tight">
                          {offer.title}
                        </h2>
                        <h3 className="text-white/90 text-base font-semibold mb-2">
                          {offer.subtitle}
                        </h3>
                        <p className="text-white/80 text-xs leading-relaxed">
                          {offer.description}
                        </p>
                      </div>

                      {/* Icon Circle */}
                      <div className={`ml-3 bg-gradient-to-br ${offer.accentColor} w-11 h-11 rounded-xl flex items-center justify-center shadow-lg`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                    </div>

                    {/* CTA Button */}
                    <button className="bg-white/95 backdrop-blur-sm text-blue-900 px-5 py-2 rounded-full font-bold text-xs shadow-lg hover:bg-white hover:shadow-xl transition-all hover:scale-105">
                      Claim Now
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-1.5 mt-2">
        {offers.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              currentSlide === index 
                ? 'bg-blue-600 w-6 h-1.5 shadow-md' 
                : 'bg-gray-300 w-1.5 h-1.5 hover:bg-gray-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}