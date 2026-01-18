import React from "react";

const offers = [
  {
    id: 1,
    title: "20% Off First Recharge",
    description:
      "Get 20% instant discount on your first recharge. Valid for new users only.",
    code: "FIRST20",
    validTill: "30th Sept 2025",
    color: "linear-gradient(135deg, var(--color-purple), var(--color-indigo))",
  },
  {
    id: 2,
    title: "Unlimited 100Mbps for ₹499",
    description:
      "Enjoy unlimited data at 100Mbps for just ₹499/month. Limited time offer.",
    code: "SPEED100",
    validTill: "15th Oct 2025",
    color: "linear-gradient(135deg, var(--color-pink), var(--color-purple))",
  },
  {
    id: 3,
    title: "Refer & Earn ₹100",
    description:
      "Refer a friend and earn ₹100 wallet credit for each successful referral.",
    code: "REFER100",
    validTill: "31st Dec 2025",
    color: "linear-gradient(135deg, var(--color-emerald), var(--color-cyan))",
  },
  {
    id: 4,
    title: "OTT Bundle Offer",
    description: "Get free Netflix & Hotstar with select annual plans.",
    code: "OTT2025",
    validTill: "10th Nov 2025",
    color: "linear-gradient(135deg, var(--color-orange), var(--color-pink))",
  },
];

export default function Offers() {
  return (
    <div
      className="min-h-screen pb-24"
      // style={{ background: "var(--color-bg-gradient)" }}
    >
      <div className="     pb-4">
        <h1
          className="text-2xl font-bold mb-4"
          style={{ color: "var(--color-purple)" }}
        >
          Latest Offers & Discounts
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="rounded-2xl p-5 shadow-lg flex flex-col gap-2 relative"
              style={{
                background: offer.color,
                boxShadow: "var(--color-shadow-footer)",
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-white font-bold text-lg">{offer.title}</h2>
                <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full font-semibold">
                  {offer.validTill}
                </span>
              </div>
              <p className="text-white/90 text-sm mb-2">{offer.description}</p>
              <div className="flex items-center gap-2 mt-auto">
                <span className="bg-white/20 text-white text-xs px-3 py-1 rounded font-semibold">
                  Code: {offer.code}
                </span>
                <button
                  className="ml-auto px-4 py-2 rounded-xl bg-white text-[var(--color-purple)] font-bold text-xs shadow hover:bg-[var(--color-indigo)] hover:text-white transition"
                  onClick={() => navigator.clipboard.writeText(offer.code)}
                >
                  Copy Code
                </button>
              </div>
            </div>
          ))}
        </div>
        {offers.length === 0 && (
          <div className="text-center text-gray-400 py-10">
            No offers available.
          </div>
        )}
      </div>
    </div>
  );
}
