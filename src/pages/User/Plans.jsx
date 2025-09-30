import React, { useState } from "react";

// Dummy data for demonstration
const companies = [
  {
    name: "Jio Fiber",
    logo: "https://images.freekaamaal.com/post_images/1640688961.webp",
  },
  {
    name: "Airtel Xstream",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmQY9g-xxMipBPTMSWdc9W3KSpfILqfslKzA&s",
  },
  {
    name: "BSNL",
    logo: "https://play-lh.googleusercontent.com/Ei6n4t7xyc4mDmfqsiLweNUpwlNOK0L9mfZqjV-MUNQc3Z03sDKxGI2JAnV1uh4Khns",
  },
  {
    name: "ACT Fibernet",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzZ7SklTMbCGZ3d8ZVnQKbmCCEJ8l5Msl2nQ&s",
  },
];

const plans = [
  {
    id: 1,
    company: companies[0],
    name: "Super 499 Plan",
    speed: "100 Mbps",
    duration: "84 days",
    price: 1499,
    ott: ["Netflix", "Disney+"],
    description: "Best for streaming and gaming",
    popular: true,
    offer: "20% Off for new users",
  },
  {
    id: 2,
    company: companies[1],
    name: "Xstream Value",
    speed: "200 Mbps",
    duration: "90 days",
    price: 2099,
    ott: ["Amazon Prime", "Hotstar"],
    description: "Great for families and work from home",
    popular: false,
    offer: "",
  },
  {
    id: 3,
    company: companies[2],
    name: "BSNL Unlimited",
    speed: "60 Mbps",
    duration: "30 days",
    price: 599,
    ott: [],
    description: "Affordable unlimited plan",
    popular: false,
    offer: "₹50 Cashback",
  },
  {
    id: 4,
    company: companies[3],
    name: "ACT Blast Promo",
    speed: "150 Mbps",
    duration: "60 days",
    price: 1299,
    ott: ["SonyLiv"],
    description: "Fast speeds for all your devices",
    popular: true,
    offer: "",
  },
];

const allCompanies = ["All", ...companies.map((c) => c.name)];
const sortOptions = [
  { label: "Price (Low → High)", value: "price" },
  { label: "Speed (High → Low)", value: "speed" },
  { label: "Duration (Long → Short)", value: "duration" },
];

function getSpeedValue(speed) {
  // Extract number for sorting
  return parseInt(speed);
}

export default function Plans() {
  const [company, setCompany] = useState("All");
  const [sort, setSort] = useState("price");
  const [search, setSearch] = useState("");

  // Filter and sort logic
  let filtered = plans.filter(
    (p) =>
      (company === "All" || p.company.name === company) &&
      (p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.company.name.toLowerCase().includes(search.toLowerCase()) ||
        p.speed.toLowerCase().includes(search.toLowerCase()))
  );
  if (sort === "price") filtered = filtered.sort((a, b) => a.price - b.price);
  if (sort === "speed")
    filtered = filtered.sort(
      (a, b) => getSpeedValue(b.speed) - getSpeedValue(a.speed)
    );
  if (sort === "duration")
    filtered = filtered.sort(
      (a, b) => parseInt(b.duration) - parseInt(a.duration)
    );

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="     pb-4">
        <h1
          className="text-2xl font-bold mb-2"
          style={{ color: "var(--color-purple)" }}
        >
          Available Internet Plans
        </h1>
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <input
            className="flex-1 px-4 py-2 rounded-xl border border-gray-200 outline-none bg-white text-sm"
            style={{ color: "var(--color-text-primary)" }}
            placeholder="Search by speed, company, or price"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="px-3 py-2 rounded-xl border border-gray-200 bg-white text-sm"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          >
            {allCompanies.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <select
            className="px-3 py-2 rounded-xl border border-gray-200 bg-white text-sm"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            {sortOptions.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="   grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((plan) => (
          <div
            key={plan.id}
            className="relative bg-white rounded-2xl shadow-lg p-5 flex flex-col gap-2 border border-gray-100"
            style={{
              boxShadow: "var(--color-shadow-footer)",
              borderColor: plan.popular ? "var(--color-purple)" : "#f1f5f9",
            }}
          >
            {/* Popular badge */}
            {plan.popular && (
              <span
                className="absolute top-3 right-3 bg-[var(--color-purple)] text-white text-xs px-3 py-1 rounded-full font-semibold shadow"
                style={{ background: "var(--color-purple)" }}
              >
                Popular
              </span>
            )}

            {/* Offer badge */}
            {plan.offer && (
              <span
                className="absolute top-3 left-3 bg-[var(--color-pink)] text-white text-xs px-2 py-1 rounded font-semibold shadow"
                style={{ background: "var(--color-pink)" }}
              >
                {plan.offer}
              </span>
            )}

            {/* Company Logo & Name */}
            <div className="flex items-center gap-3 mb-1">
              <img
                src={plan.company.logo}
                alt={plan.company.name}
                className="w-10 h-10 rounded bg-white border border-gray-200 object-contain"
              />
              <span
                className="font-semibold text-base"
                style={{ color: "var(--color-text-primary)" }}
              >
                {plan.company.name}
              </span>
            </div>
            {/* Plan Name */}
            <div
              className="font-bold text-lg"
              style={{ color: "var(--color-purple)" }}
            >
              {plan.name}
            </div>
            {/* Speed, Duration, Price */}
            <div className="flex flex-wrap gap-2 text-sm mb-1">
              <span className="px-2 py-1 rounded bg-[var(--color-indigo)]/10 text-[var(--color-indigo)] font-semibold">
                {plan.speed}
              </span>
              <span className="px-2 py-1 rounded bg-[var(--color-emerald)]/10 text-[var(--color-emerald)] font-semibold">
                {plan.duration}
              </span>
              <span className="px-2 py-1 rounded bg-[var(--color-purple)]/10 text-[var(--color-purple)] font-semibold">
                ₹{plan.price}
              </span>
            </div>
            {/* OTT */}
            {plan.ott.length > 0 && (
              <div className="flex flex-wrap gap-2 text-xs mb-1">
                <span className="font-semibold text-[var(--color-pink)]">
                  OTT:
                </span>
                {plan.ott.map((o) => (
                  <span
                    key={o}
                    className="px-2 py-1 rounded bg-[var(--color-pink)]/10 text-[var(--color-pink)] font-medium"
                  >
                    {o}
                  </span>
                ))}
              </div>
            )}
            {/* Description */}
            <div
              className="text-xs rounded bg-gray-50 px-3 py-2 mb-2"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {plan.description}
            </div>
            {/* Actions */}
            <div className="flex gap-2 mt-auto">
              <button
                className="flex-1 py-2 rounded-xl font-semibold text-white"
                style={{ background: "var(--color-purple)" }}
                onClick={() => alert(`Interest shown for plan ID: ${plan.id}`)}
              >
                Show Interest
              </button>
              <button
                className="flex-1 py-2 rounded-xl font-semibold border"
                style={{
                  color: "var(--color-purple)",
                  borderColor: "var(--color-purple)",
                  background: "white",
                }}
                onClick={() => alert(`More details for plan ID: ${plan.id}`)}
              >
                More Details
              </button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full text-center text-gray-400 py-10">
            No plans found.
          </div>
        )}
      </div>
    </div>
  );
}
