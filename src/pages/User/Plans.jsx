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
          // Map backend data to display format
          const formattedPlans = data.plans.map(plan => ({
            id: plan._id,
            provider: plan.providerName,
            speed: plan.speed,
            price: plan.price,
            validity: plan.validity,
            data: plan.data,
            color: plan.color || "from-blue-500 to-blue-600",
            icon: plan.icon || "fa-solid fa-wifi"
          }));
          
          setPlans(formattedPlans);
          
          // Extract unique providers
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

  // Filter and sort logic
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-2"></div>
          <p className="text-gray-600">Loading plans...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-500">
          <p className="font-semibold">Error loading plans</p>
          <p className="text-sm">{error}</p>
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
      
      <div className="min-h-screen pb-24">
        {/* Header */}
        <div className="pb-4">
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
              placeholder="Search by provider, speed, or price"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              className="px-3 py-2 rounded-xl border border-gray-200 bg-white text-sm"
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((plan) => (
            <div
              key={plan.id}
              className="relative bg-white rounded-2xl shadow-lg p-5 flex flex-col gap-2 border border-gray-100"
              style={{
                boxShadow: "var(--color-shadow-footer)",
              }}
            >
              {/* Provider Icon & Name */}
              <div className="flex items-center gap-3 mb-1">
                <div className={`w-10 h-10 bg-gradient-to-r ${plan.color} rounded-xl flex items-center justify-center text-white shadow-lg`}>
                  <i className={`${plan.icon} text-lg`}></i>
                </div>
                <span
                  className="font-semibold text-base"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  {plan.provider || "Unknown Provider"}
                </span>
              </div>

              {/* Plan Details */}
              <div className="space-y-2 mb-2">
                {plan.speed && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <i className="fa-solid fa-gauge text-xs" style={{ color: "var(--color-indigo)" }}></i>
                    <span className="text-xs">
                      Speed: <strong>{plan.speed}</strong>
                    </span>
                  </div>
                )}
                {plan.validity && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <i className="fa-solid fa-calendar text-xs" style={{ color: "var(--color-emerald)" }}></i>
                    <span className="text-xs">
                      Validity: <strong>{plan.validity}</strong>
                    </span>
                  </div>
                )}
                {plan.data && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <i className="fa-solid fa-database text-xs" style={{ color: "var(--color-pink)" }}></i>
                    <span className="text-xs">
                      Data: <strong>{plan.data}</strong>
                    </span>
                  </div>
                )}
              </div>

              {/* Price Section */}
              <div className="border-t border-gray-200 pt-3 mt-auto">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-xs text-gray-500">Price</span>
                    <div className="text-2xl font-bold" style={{ color: "var(--color-purple)" }}>
                      ₹{plan.price || "N/A"}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="px-4 py-2 rounded-xl font-semibold text-white text-xs"
                      style={{ background: "var(--color-purple)" }}
                      onClick={() => alert(`Interest shown for ${plan.provider} plan`)}
                    >
                      Show Interest
                    </button>
                  </div>
                </div>
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
    </>
  );
}