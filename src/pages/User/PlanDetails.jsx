import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Wifi,
  Gauge,
  Calendar,
  Database,
  CheckCircle,
  Shield,
  Clock,
  Zap,
} from "lucide-react";

export default function PlanDetail() {
  const { id } = useParams(); // <-- comes from /user/plans/:id
  const navigate = useNavigate();

  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("PLAN ID FROM URL:", id);

    if (!id) {
      setError("No plan ID found in URL");
      setLoading(false);
      return;
    }

    fetch(`https://wifiwala-backend.vercel.app/api/plans/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("API request failed");
        return res.json();
      })
      .then((data) => {
        console.log("API RESPONSE:", data);

        const planData = data.plan || data; // backend safe guard

        if (!planData) throw new Error("Plan not found");

        setPlan({
          id: planData._id,
          provider: planData.providerName || planData.provider || "Unknown",
          speed: planData.speed,
          price: planData.price,
          validity: planData.validity,
          data: planData.data,
          description:
            planData.description ||
            "High-speed internet connection with reliable performance.",
          color: planData.color || "from-blue-400 to-blue-600",
          icon: planData.icon || "fa-solid fa-wifi",
        });

        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading plan details...</p>
      </div>
    );
  }

  if (error || !plan) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error || "Plan not found"}</p>
      </div>
    );
  }

  const features = [
    { icon: Shield, text: "Secure & Reliable Connection", color: "text-green-600" },
    { icon: Clock, text: "24/7 Customer Support", color: "text-blue-600" },
    { icon: Zap, text: "Lightning Fast Speed", color: "text-yellow-600" },
    { icon: CheckCircle, text: "No Data Cap", color: "text-purple-600" },
  ];

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
      />

      <div className="min-h-screen bg-white pb-24">
        {/* Header */}
        <div className="bg-blue-600 px-4 pt-4 pb-32">
          <button
            onClick={() => navigate(-1)}
            className="mb-4 w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center text-white"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <h1 className="text-white text-2xl font-bold">Plan Details</h1>
          <p className="text-blue-100 text-sm">Everything you need to know</p>
        </div>

        {/* Card */}
        <div className="px-4 -mt-24">
          <div className="bg-white rounded-2xl shadow-xl border overflow-hidden">
            {/* Provider */}
            <div className="bg-blue-50 p-6 border-b">
              <div className="flex gap-4 items-center">
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${plan.color} rounded-2xl flex items-center justify-center`}
                >
                  <i className={`${plan.icon} text-white text-2xl`} />
                </div>
                <div>
                  <h2 className="text-xl font-bold">{plan.provider}</h2>
                  <p className="text-sm text-gray-600">Premium Internet Plan</p>
                </div>
              </div>

              <div className="bg-white mt-4 p-4 rounded-xl border">
                <p className="text-xs text-gray-500">Starting at</p>
                <p className="text-3xl font-bold text-blue-600">
                  ₹{plan.price}
                  <span className="text-sm text-gray-500"> / month</span>
                </p>
              </div>
            </div>

            {/* Specs */}
            <div className="p-6 grid grid-cols-2 gap-4">
              {plan.speed && (
                <Spec icon={Gauge} label="Speed" value={plan.speed} />
              )}
              {plan.data && (
                <Spec icon={Database} label="Data" value={plan.data} />
              )}
              {plan.validity && (
                <Spec icon={Calendar} label="Validity" value={plan.validity} />
              )}
              <Spec icon={Wifi} label="Type" value="Fiber" />
            </div>

            {/* Description */}
            <div className="px-6 pb-6">
              <h3 className="font-bold mb-2">About this plan</h3>
              <p className="text-sm text-gray-600">{plan.description}</p>
            </div>

            {/* Features */}
            <div className="px-6 pb-6">
              <h3 className="font-bold mb-3">What's included</h3>
              <div className="space-y-2">
                {features.map((f, i) => {
                  const Icon = f.icon;
                  return (
                    <div key={i} className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                      <Icon className={`w-5 h-5 ${f.color}`} />
                      <span className="text-sm">{f.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Buy Button */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
          <button
            onClick={() =>
              alert(`Buying ${plan.provider} plan for ₹${plan.price}/month`)
            }
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold"
          >
            Buy Now – ₹{plan.price}/month
          </button>
        </div>
      </div>
    </>
  );
}

/* Small reusable spec box */
function Spec({ icon: Icon, label, value }) {
  return (
    <div className="bg-gray-50 rounded-xl p-4 border">
      <div className="flex items-center gap-2 mb-1">
        <Icon className="w-4 h-4 text-blue-600" />
        <span className="text-xs text-gray-600">{label}</span>
      </div>
      <p className="font-bold">{value}</p>
    </div>
  );
}
