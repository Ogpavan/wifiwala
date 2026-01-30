import React, { useState } from "react";
import { Wifi, RefreshCw, CheckCircle, Clock } from "lucide-react";

export default function PortManagement() {
  const [currentPort] = useState({
    provider: "Airtel",
    status: "active",
  });

  const [availablePorts] = useState([
    { provider: "Jio", status: "available" },
    { provider: "BSNL", status: "available" },
    { provider: "Vi", status: "available" },
  ]);

  const [selectedPort, setSelectedPort] = useState(null);
  const [showRequestForm, setShowRequestForm] = useState(false);

  const getProviderIcon = (provider) => {
    const icons = {
      Airtel: "fa-solid fa-wifi",
      Jio: "fa-solid fa-signal",
      BSNL: "fa-solid fa-tower-broadcast",
      Vi: "fa-solid fa-wifi",
    };
    return icons[provider] || "fa-solid fa-wifi";
  };

  const handlePortChangeRequest = () => {
    if (!selectedPort) {
      alert("Please select a port");
      return;
    }

    alert(`Port change request to ${selectedPort} submitted successfully!`);
    setShowRequestForm(false);
    setSelectedPort(null);
  };

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
      />

      <div className=" bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4 pt-4 mb-12">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-800">
            Port Management
          </h1>
          <p className="text-sm text-gray-500">
            View and manage your connection port
          </p>
        </div>

        {/* Current Port */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-2 mb-3">
            <Wifi className="w-5 h-5 text-blue-900" />
            <h2 className="font-semibold text-gray-800">
              Your Current Port
            </h2>
          </div>

          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center">
                <i
                  className={`${getProviderIcon(
                    currentPort.provider
                  )} text-white text-lg`}
                ></i>
              </div>
              <div>
                <h3 className="font-bold text-gray-800">
                  {currentPort.provider}
                </h3>
                <p className="text-xs text-gray-500">
                  Primary Connection
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-green-100 px-3 py-1.5 rounded-full">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-xs font-medium text-green-700">
                Active
              </span>
            </div>
          </div>
        </div>

        {/* Button */}
        {!showRequestForm && (
          <button
            onClick={() => setShowRequestForm(true)}
            className="w-full bg-blue-900 text-white py-3 rounded-xl font-bold text-sm shadow-lg hover:bg-blue-800 transition active:scale-95 flex items-center justify-center gap-2 mt-4"
          >
            <RefreshCw className="w-4 h-4" />
            Request Port Change
          </button>
        )}

        {/* Available Ports */}
        {showRequestForm && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mt-4">
            <h2 className="font-semibold text-gray-800 mb-1">
              Available Ports
            </h2>
            <p className="text-xs text-gray-500 mb-3">
              Select a port to request a change
            </p>

            <div className="space-y-3">
              {availablePorts.map((port) => (
                <div
                  key={port.provider}
                  onClick={() => setSelectedPort(port.provider)}
                  className={`border rounded-xl p-3 cursor-pointer transition ${
                    selectedPort === port.provider
                      ? "border-blue-900 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          selectedPort === port.provider
                            ? "bg-blue-900"
                            : "bg-gray-100"
                        }`}
                      >
                        <i
                          className={`${getProviderIcon(
                            port.provider
                          )} ${
                            selectedPort === port.provider
                              ? "text-white"
                              : "text-gray-600"
                          }`}
                        ></i>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {port.provider}
                        </h3>
                        <p className="text-xs text-green-600">
                          Available
                        </p>
                      </div>
                    </div>

                    {selectedPort === port.provider && (
                      <CheckCircle className="w-5 h-5 text-blue-900" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => {
                  setShowRequestForm(false);
                  setSelectedPort(null);
                }}
                className="flex-1 bg-gray-100 text-gray-700 py-2.5 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handlePortChangeRequest}
                className="flex-1 bg-blue-900 text-white py-2.5 rounded-xl font-bold"
              >
                Submit Request
              </button>
            </div>
          </div>
        )}

        {/* Info */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3 mt-4">
          <Clock className="w-5 h-5 text-blue-900 mt-0.5" />
          <p className="text-xs text-gray-600">
            Port change requests are reviewed within 24–48 hours.
          </p>
        </div>
      </div>
    </>
  );
}
