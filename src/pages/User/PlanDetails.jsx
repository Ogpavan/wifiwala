import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Gauge,
  Calendar,
  Database,
  Tv,
  Wifi,
  Signal,
  Antenna,
  Network,
  Cable,
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

    const BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
          speed: planData.speed ? planData.speed.replace(/[^0-9]/g, "") : "-",
          speedDisplay: planData.speed || "-",
          price: planData.price || "-",
          validity: planData.duration_days
            ? `${planData.duration_days} days`
            : "-",
          data: planData.data_limit || "Unlimited",
          description:
            "High-speed internet connection with reliable performance.",
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

  // Helper function to get provider icon - Now returns Lucide component
  const getProviderIcon = (providerName) => {
    const icons = {
      Airtel: Wifi,
      Jio: Signal,
      BSNL: Antenna,
      ACT: Network,
      Hathway: Cable,
    };
    return icons[providerName] || Wifi;
  };

  // Helper function to get provider OTT platforms
  const getProviderOTT = (providerName) => {
    const ott = {
      Airtel: ["Netflix", "Prime Video", "Disney+ Hotstar", "Xstream"],
      Jio: ["JioCinema", "JioTV", "Voot", "SonyLIV"],
      BSNL: ["Eros Now", "ShemarooMe"],
      ACT: ["ZEE5", "SonyLIV", "Voot"],
      Hathway: ["Eros Now", "Hungama Play"],
    };
    return ott[providerName] || ["Netflix", "Prime Video", "Hotstar"];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex flex-col items-center justify-center">
        {/* Spinner */}
        <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mb-4"></div>
        {/* Loading text */}
        <div className="text-white text-xl font-semibold tracking-wide animate-pulse">
          Loading...
        </div>
      </div>
    );
  }

  if (error || !plan) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex flex-col items-center justify-center p-4">
        <div className="text-white text-xl mb-4">
          {error || "Plan not found"}
        </div>
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

  const IconComponent = plan.icon;

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Blue Header */}
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 px-4 pt-4 pb-6">
        <button
          onClick={() => navigate(-1)}
          className="mb-3 w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center text-white"
        >
          <ArrowLeft size={18} />
        </button>
        <h1 className="text-white text-xl font-bold mb-1">Plan Details</h1>
        <p className="text-white/70 text-xs">Everything about this plan</p>
      </div>

      {/* White Card */}
      <div className="bg-white rounded-t-3xl -mt-4 px-4 pt-5 pb-6">
        {/* Provider */}
        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
            <IconComponent className="text-blue-900" size={20} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">{plan.provider}</h2>
            <p className="text-xs text-gray-500">Premium Plan</p>
          </div>
        </div>

        {/* Price */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-3.5 mb-5">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-blue-900">
              ₹{plan.price}
            </span>
            <span className="text-gray-600 text-xs">/month</span>
          </div>
        </div>

        {/* Quick Info */}
        <div className="grid grid-cols-3 gap-2.5 mb-5">
          <div className="bg-gray-50 rounded-xl p-2.5 text-center">
            <Gauge className="w-4 h-4 text-blue-900 mx-auto mb-1" />
            <p className="text-[10px] text-gray-500 mb-0.5">Speed</p>
            <p className="text-xs font-bold text-gray-900">
              {plan.speedDisplay}
            </p>
          </div>
          <div className="bg-gray-50 rounded-xl p-2.5 text-center">
            <Database className="w-4 h-4 text-blue-900 mx-auto mb-1" />
            <p className="text-[10px] text-gray-500 mb-0.5">Data</p>
            <p className="text-xs font-bold text-gray-900">{plan.data}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-2.5 text-center">
            <Calendar className="w-4 h-4 text-blue-900 mx-auto mb-1" />
            <p className="text-[10px] text-gray-500 mb-0.5">Validity</p>
            <p className="text-xs font-bold text-gray-900">{plan.validity}</p>
          </div>
        </div>

        {/* OTT */}
        {plan.ott && plan.ott.length > 0 && (
          <div className="mb-5">
            <div className="flex items-center gap-2 mb-2.5">
              <Tv className="w-4 h-4 text-blue-900" />
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wide">
                OTT INCLUDED
              </h3>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {plan.ott.map((platform, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 bg-blue-50 text-blue-900 rounded-full text-[10px] font-medium"
                >
                  {platform}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Features */}
        <div className="mb-5">
          <h3 className="text-base font-bold text-gray-900 mb-3">
            What's Included
          </h3>
          <div className="space-y-3">
            {features.map((feature, index) => (
              <div key={index} className="flex gap-2.5">
                <div className="w-1.5 h-1.5 bg-blue-900 rounded-full mt-1.5 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-xs mb-0.5">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600 text-xs leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Note */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-2.5 mb-5">
          <p className="text-[10px] text-amber-800 leading-relaxed">
            Available in select areas. Installation charges may apply. OTT
            subscriptions subject to platform terms.
          </p>
        </div>

        {/* Buy Button - At bottom of content */}
        <div className="mt-6">
          <button
            onClick={() =>
              alert(`Purchasing ${plan.provider} plan for ₹${plan.price}/month`)
            }
            className="w-full text-white bg-blue-900 py-2.5 rounded-xl font-bold text-sm shadow-xl border-2 border-blue-900 hover:bg-blue-800 transition active:scale-95"
          >
            Buy Now – ₹{plan.price}/month
          </button>
        </div>
      </div>
    </div>
  );
}
