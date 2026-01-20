import React, { useState, useEffect } from "react";

const sortOptions = [
  { label: "Price (Low → High)", value: "price" },
  { label: "Speed (High → Low)", value: "speed" },
  { label: "Validity (Long → Short)", value: "validity" },
];

function getSpeedValue(speed) {
  return parseInt(speed) || 0;
}

function getValidityValue(validity) {
  return parseInt(validity) || 0;
}

export default function Plans() {
  const [plans, setPlans] = useState([]);
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [provider, setProvider] = useState("All");
  const [sort, setSort] = useState("price");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://wifiwala-backend.vercel.app/api/plans")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch plans");
        return res.json();
      })
      .then((data) => {
        if (data.success && data.plans) {
          const formattedPlans = data.plans.map(plan => ({
            id: plan._id,
            provider: plan.providerName,
            speed: plan.speed,
            price: plan.price,
            validity: plan.validity,
            data: plan.data,
            color: plan.color || "from-blue-400 to-blue-600",
            icon: plan.icon || "fa-solid fa-wifi"
          }));
          
          setPlans(formattedPlans);
          
          const uniqueProviders = [...new Set(formattedPlans.map(p => p.provider))];
          setProviders(uniqueProviders);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const allProviders = ["All", ...providers];

  let filtered = plans.filter(
    (p) =>
      (provider === "All" || p.provider === provider) &&
      ((p.provider?.toLowerCase() || "").includes(search.toLowerCase()) ||
        (p.speed?.toLowerCase() || "").includes(search.toLowerCase()) ||
        (p.price?.toString() || "").includes(search.toLowerCase()))
  );

  if (sort === "price") {
    filtered = filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
  }
  if (sort === "speed") {
    filtered = filtered.sort(
      (a, b) => getSpeedValue(b.speed) - getSpeedValue(a.speed)
    );
  }
  if (sort === "validity") {
    filtered = filtered.sort(
      (a, b) => getValidityValue(b.validity) - getValidityValue(a.validity)
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full animate-spin mb-2"></div>
          <p className="text-gray-600 text-sm">Loading plans...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center">
          <p className="font-semibold text-red-500 text-sm">Error loading plans</p>
          <p className="text-xs text-gray-500 mt-1">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
      />
      
      <div className="min-h-screen bg-white pb-20">
        {/* Header */}
        <div className="px-4 pt-4 pb-3">
          <h1 className="text-xl font-bold text-gray-900 mb-1">
            Internet Plans
          </h1>
          <p className="text-xs text-gray-500">Find the best plan for you</p>
        </div>

        {/* Filters */}
        <div className="px-4 pb-3">
          <div className="flex flex-col gap-2">
            <input
              className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-blue-500 focus:bg-white"
              placeholder="Search plans..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            
            <div className="flex gap-2">
              <select
                className="flex-1 px-3 py-2 rounded-2xl border border-gray-200 bg-gray-50 text-sm text-gray-900 outline-none focus:border-blue-500"
                value={provider}
                onChange={(e) => setProvider(e.target.value)}
              >
                {allProviders.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>

              <select
                className="flex-1 px-3 py-2 rounded-2xl border border-gray-200 bg-gray-50 text-sm text-gray-900 outline-none focus:border-blue-500"
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
        </div>

        {/* Plans Grid */}
        <div className="px-4 space-y-3">
          {filtered.map((plan) => (
            <div
              key={plan.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-4"
            >
              {/* Provider */}
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 bg-gradient-to-br ${plan.color} rounded-lg flex items-center justify-center`}>
                  <i className={`${plan.icon} text-white text-base`}></i>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-sm text-gray-900">
                    {plan.provider || "Unknown Provider"}
                  </h3>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-blue-600">₹{plan.price}</div>
                  <div className="text-xs text-gray-500">per month</div>
                </div>
              </div>

              {/* Details */}
              <div className="flex gap-4 mb-3 text-xs">
                {plan.speed && (
                  <div className="flex items-center gap-1 text-gray-600">
                    <i className="fa-solid fa-gauge text-blue-500"></i>
                    <span>Speed: {plan.speed}</span>
                  </div>
                )}
                {plan.data && (
                  <div className="flex items-center gap-1 text-gray-600">
                    <i className="fa-solid fa-database text-blue-500"></i>
                    <span>Data: {plan.data}</span>
                  </div>
                )}
                {plan.validity && (
                  <div className="flex items-center gap-1 text-gray-600">
                    <i className="fa-solid fa-calendar text-blue-500"></i>
                    <span>Days: {plan.validity}</span>
                  </div>
                )}
              </div>

              {/* Buttons */}
              <div className="flex gap-2">
                <button
                  className="flex-1 px-4 py-2 bg-blue-600 text-white text-xs font-medium rounded-xl active:bg-blue-700"
                  onClick={() => alert(`Interest shown for ${plan.provider} plan`)}
                >
                  <i className="fa-solid fa-shopping-cart mr-1"></i>
                  Buy Now
                </button>
                <button
                  className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 text-xs font-medium rounded-xl active:bg-gray-200"
                  onClick={() => alert(`View details for ${plan.provider} plan`)}
                >
                  View More
                </button>
              </div>
            </div>
          ))}
          
          {filtered.length === 0 && (
            <div className="text-center py-12">
              <i className="fa-solid fa-inbox text-4xl text-gray-300 mb-2"></i>
              <p className="text-gray-400 text-sm">No plans found</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}