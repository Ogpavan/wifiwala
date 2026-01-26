import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Gauge,
  Calendar,
  Database,
  Tv,
} from "lucide-react";

export default function PlanDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) {
      setError("No plan ID found in URL");
      setLoading(false);
      return;
    }

    const BASE_URL =
      window.location.hostname === "localhost"
        ? "http://localhost:3000"
        : "https://wifiwalabackend.onrender.com";

    const fetchPlan = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/plans/${id}`);

        if (!res.ok) throw new Error("Plan not found or API request failed");

        const data = await res.json();
        const planData = data.plan || data;

        if (!planData) throw new Error("Plan data is empty");

        // Map database fields to component state
        setPlan({
          id: planData.plan_id || planData._id,
          provider: planData.name || "Unknown Provider",
          speed: planData.speed ? planData.speed.replace(/[^0-9]/g, '') : "-",
          speedDisplay: planData.speed || "-",
          price: planData.price || "-",
          validity: planData.duration_days ? `${planData.duration_days} days` : "-",
          data: planData.data_limit || "Unlimited",
          description: "High-speed internet connection with reliable performance.",
          icon: getProviderIcon(planData.name),
          ott: getProviderOTT(planData.name),
        });

        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPlan();
  }, [id]);

  // Helper function to get provider icon
  const getProviderIcon = (providerName) => {
    const icons = {
      'Airtel': 'fa-solid fa-wifi',
      'Jio': 'fa-solid fa-signal',
      'BSNL': 'fa-solid fa-tower-broadcast',
      'ACT': 'fa-solid fa-network-wired',
      'Hathway': 'fa-solid fa-ethernet'
    };
    return icons[providerName] || 'fa-solid fa-wifi';
  };

  // Helper function to get provider OTT platforms
  const getProviderOTT = (providerName) => {
    const ott = {
      'Airtel': ['Netflix', 'Prime Video', 'Disney+ Hotstar', 'Xstream'],
      'Jio': ['JioCinema', 'JioTV', 'Voot', 'SonyLIV'],
      'BSNL': ['Eros Now', 'ShemarooMe'],
      'ACT': ['ZEE5', 'SonyLIV', 'Voot'],
      'Hathway': ['Eros Now', 'Hungama Play']
    };
    return ott[providerName] || ['Netflix', 'Prime Video', 'Hotstar'];
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-3 border-blue-900 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <p className="text-gray-600 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  if (error || !plan) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <p className="text-red-500 text-sm mb-3">{error || "Plan not found"}</p>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-blue-900 text-white rounded-lg text-sm"
        >
          Go Back
        </button>
      </div>
    );
  }

  const features = [
    {
      title: "Lightning Fast Speed",
      description: `${plan.speedDisplay} speed for seamless streaming, gaming, and browsing.`,
    },
    {
      title: "Unlimited Data",
      description: `${plan.data} with no restrictions. Stream and download freely.`,
    },
    {
      title: "OTT Subscriptions",
      description: `Free access to ${plan.ott?.slice(0, 2).join(", ")} and more.`,
    },
    {
      title: "24/7 Support",
      description: "Always available to help with any issues or questions.",
    },
    {
      title: "Secure Connection",
      description: "99.9% uptime with advanced security protocols.",
    },
    {
      title: "Quick Installation",
      description: "Professional setup within 24-48 hours, no hidden fees.",
    },
  ];

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
      />

      <div className="min-h-screen bg-white">
        {/* Blue Header */}
        <div className="bg-blue-900 px-4 pt-4 pb-24">
          <button
            onClick={() => navigate(-1)}
            className="mb-4 w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center text-white"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <h1 className="text-white text-xl font-bold mb-1">Plan Details</h1>
          <p className="text-blue-100 text-xs">Everything about this plan</p>
        </div>

        {/* White Card */}
        <div className="px-4 -mt-20">
          <div className="bg-white rounded-2xl shadow-lg p-4 mb-6">
            {/* Provider */}
            <div className="flex items-start gap-3 mb-4">
              <div
                className="w-12 h-12 bg-blue-900 rounded-xl flex items-center justify-center flex-shrink-0"
              >
                <i className={`${plan.icon} text-white text-lg`} />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-bold text-gray-900">
                  {plan.provider}
                </h2>
                <p className="text-gray-500 text-xs">Premium Plan</p>
              </div>
            </div>

            {/* Price */}
            <div className="mb-3">
              <span className="text-3xl font-bold text-gray-900">
                ₹{plan.price}
              </span>
              <span className="text-gray-500 text-sm">/month</span>
            </div>

            {/* Quick Info */}
            <div className="flex gap-3 text-xs mb-3">
              <div className="flex items-center gap-1">
                <Gauge className="w-3 h-3 text-gray-400" />
                <span className="text-gray-700">{plan.speedDisplay}</span>
              </div>
              <div className="flex items-center gap-1">
                <Database className="w-3 h-3 text-gray-400" />
                <span className="text-gray-700">{plan.data}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3 text-gray-400" />
                <span className="text-gray-700">{plan.validity}</span>
              </div>
            </div>

            {/* OTT */}
            {plan.ott && plan.ott.length > 0 && (
              <div>
                <div className="flex items-center gap-1 mb-2">
                  <Tv className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-500 font-medium">OTT INCLUDED</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {plan.ott.map((platform, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                    >
                      {platform}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Features */}
          <div className="mb-6">
            <h3 className="text-base font-bold text-gray-900 mb-4 px-1">
              What's Included
            </h3>
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="px-1">
                  <div className="flex items-start gap-2 mb-1">
                    <ArrowRight className="w-4 h-4 text-black flex-shrink-0 mt-0.5" />
                    <h4 className="text-sm font-bold text-gray-900">
                      {feature.title}
                    </h4>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed pl-6">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Note */}
          <div className="px-1">
            <p className="text-xs text-gray-400 leading-relaxed">
              Available in select areas. Installation charges may apply. OTT subscriptions subject to platform terms.
            </p>
          </div>
        </div>

        {/* Buy Button */}
        <div className="px-4 mt-8 mb-30">
          <button
            onClick={() =>
              alert(`Purchasing ${plan.provider} plan for ₹${plan.price}/month`)
            }
            className="w-full bg-blue-900 text-white py-3 rounded-xl font-bold text-base shadow-lg hover:bg-blue-800 transition active:scale-95"
          >
            Buy Now – ₹{plan.price}/month
          </button>
        </div>
      </div>
    </>
  );
}