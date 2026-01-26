import React, { useState, useEffect } from 'react';
import { Wifi, RefreshCw, CheckCircle, Clock } from 'lucide-react';

export default function PortManagement() {
  const [currentPort, setCurrentPort] = useState(null);
  const [availablePorts, setAvailablePorts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPort, setSelectedPort] = useState(null);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [requestStatus, setRequestStatus] = useState(null);

  useEffect(() => {
    fetchPortData();
  }, []);

  const fetchPortData = async () => {
    setLoading(true);
    try {
      const BASE_URL =
        window.location.hostname === "localhost"
          ? "http://localhost:3000"
          : "https://wifiwalabackend.onrender.com";

      const response = await fetch(`${BASE_URL}/api/user/ports`);
      const data = await response.json();
      
      setCurrentPort(data.currentPort);
      setAvailablePorts(data.availablePorts);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching port data:", error);
      setLoading(false);
    }
  };

  const getProviderIcon = (provider) => {
    const icons = {
      'Airtel': 'fa-solid fa-wifi',
      'Jio': 'fa-solid fa-signal',
      'BSNL': 'fa-solid fa-tower-broadcast',
    };
    return icons[provider] || 'fa-solid fa-wifi';
  };

  const handlePortChangeRequest = async () => {
    if (!selectedPort) {
      alert("Please select a port");
      return;
    }

    try {
      const BASE_URL =
        window.location.hostname === "localhost"
          ? "http://localhost:3000"
          : "https://wifiwalabackend.onrender.com";

      const response = await fetch(`${BASE_URL}/api/user/port-change-request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requestedPort: selectedPort,
          currentPort: currentPort?.provider,
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setRequestStatus("success");
        setShowRequestForm(false);
        alert("Port change request submitted successfully!");
      } else {
        setRequestStatus("error");
        alert(data.message || "Failed to submit request");
      }
    } catch (error) {
      console.error("Error submitting request:", error);
      setRequestStatus("error");
      alert("Failed to submit port change request");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-3 border-blue-900 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <p className="text-gray-600 text-sm">Loading...</p>
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
      
      <div className="bg-white">
        {/* Header */}
        <div className="px-4 pt-4 pb-3">
          <h1 className="text-xl font-bold text-gray-900 mb-1">
            Port Management
          </h1>
          <p className="text-xs text-gray-500">View and manage your connection port</p>
        </div>

        <div className="px-4">
          {/* Current Port Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <h2 className="text-sm font-bold text-gray-900 mb-3">Your Current Port</h2>

            {currentPort ? (
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-900 rounded-xl flex items-center justify-center flex-shrink-0">
                  <i className={`${getProviderIcon(currentPort.provider)} text-white text-lg`}></i>
                </div>
                <div className="flex-1">
                  <div className="text-lg font-bold text-gray-900 mb-1">
                    {currentPort.provider}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-green-600">
                    <CheckCircle className="w-3 h-3" />
                    <span className="font-medium">Active</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <p className="text-sm text-gray-500">No active port assigned</p>
              </div>
            )}
          </div>

          {/* Change Port Button */}
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
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mt-4">
              <h3 className="text-sm font-bold text-gray-900 mb-1">
                Available Ports
              </h3>
              <p className="text-xs text-gray-500 mb-4">
                Select a port to request a change
              </p>

              <div className="space-y-2 mb-4">
                {availablePorts.length > 0 ? (
                  availablePorts.map((port) => (
                    <div
                      key={port.provider}
                      onClick={() => setSelectedPort(port.provider)}
                      className={`border rounded-xl p-3 cursor-pointer transition ${
                        selectedPort === port.provider
                          ? "border-blue-900 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-900 rounded-lg flex items-center justify-center flex-shrink-0">
                          <i className={`${getProviderIcon(port.provider)} text-white text-base`}></i>
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-bold text-gray-900 mb-0.5">
                            {port.provider}
                          </div>
                          <div className="text-xs text-green-600 font-medium">
                            Available
                          </div>
                        </div>
                        {selectedPort === port.provider && (
                          <CheckCircle className="w-5 h-5 text-blue-900 flex-shrink-0" />
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="bg-gray-50 rounded-xl p-4 text-center">
                    <p className="text-sm text-gray-500">No available ports at the moment</p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setShowRequestForm(false);
                    setSelectedPort(null);
                  }}
                  className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-xl active:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePortChangeRequest}
                  disabled={!selectedPort}
                  className={`flex-1 px-4 py-2.5 text-white text-sm font-medium rounded-xl ${
                    selectedPort
                      ? "bg-blue-900 hover:bg-blue-800 active:scale-95"
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
                >
                  Submit Request
                </button>
              </div>
            </div>
          )}

          {/* Info Note */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-4">
            <div className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-700 leading-relaxed">
                  Port change requests are reviewed within 24-48 hours. You will be notified once your request is processed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
