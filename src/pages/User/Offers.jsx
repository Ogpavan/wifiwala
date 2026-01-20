import React, { useState } from "react";

const offers = [
  {
    id: 1,
    title: "20% Off First Recharge",
    description: "New users only. Instant discount applied.",
    code: "FIRST20",
    validTill: "30 Sept",
    color: "bg-gradient-to-br from-blue-500 to-blue-600",
  },
  {
    id: 2,
    title: "100Mbps @ ₹499/mo",
    description: "Unlimited data. Limited period offer.",
    code: "SPEED100",
    validTill: "15 Oct",
    color: "bg-gradient-to-br from-indigo-500 to-indigo-600",
  },
  {
    id: 3,
    title: "Refer & Earn ₹100",
    description: "Get ₹100 for each successful referral.",
    code: "REFER100",
    validTill: "31 Dec",
    color: "bg-gradient-to-br from-cyan-500 to-cyan-600",
  },
  {
    id: 4,
    title: "Free OTT Bundle",
    description: "Netflix & Hotstar with annual plans.",
    code: "OTT2025",
    validTill: "10 Nov",
    color: "bg-gradient-to-br from-purple-500 to-purple-600",
  },
];

export default function Offers() {
  const [copied, setCopied] = useState(null);

  const handleCopy = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopied(id);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 pt-6 pb-24">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Offers</h1>
        <p className="text-sm text-gray-500 mb-6">Exclusive deals for you</p>

        <div className="space-y-3">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className={`${offer.color} rounded-2xl p-4 text-white shadow-lg`}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-base leading-tight pr-2">
                  {offer.title}
                </h3>
                <span className="text-xs bg-white/20 px-2 py-1 rounded-full whitespace-nowrap">
                  {offer.validTill}
                </span>
              </div>

              <p className="text-xs text-white/90 mb-3">{offer.description}</p>

              <div className="flex items-center justify-between">
                <span className="text-xs text-white/80">
                  Valid till {offer.validTill}
                </span>
                <button
                  onClick={() => handleCopy(offer.code, offer.id)}
                  className="bg-white text-blue-600 px-5 py-2 rounded-lg text-xs font-bold shadow-md active:scale-95 transition-transform"
                >
                  {copied === offer.id ? "✓ Claimed" : "Claim"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}