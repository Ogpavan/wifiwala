import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faUser,
  faWifi,
  faTags, // For Offers
  faListAlt,
} from "@fortawesome/free-solid-svg-icons";

const navItems = [
  { label: "Home", icon: faHouse, path: "/" },
  { label: "Plans", icon: faListAlt, path: "/user/plans" },
  { label: "wifi", icon: faWifi, path: "/user/speedtest", center: true },
  { label: "Offers", icon: faTags, path: "/user/offers" },
  { label: "Profile", icon: faUser, path: "/user/profile" },
];

export default function BottomFooter() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentIndex = navItems.findIndex(
    (item) => item.path === location.pathname
  );
  const [animating, setAnimating] = useState(false);

  // Animation handler for speedtest
  const handleSpeedtestClick = () => {
    setAnimating(true);
    setTimeout(() => {
      setAnimating(false);
      navigate(navItems[2].path);
    }, 350); // Animation duration
  };

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 z-50 w-full max-w-lg">
      <div
        className="relative flex justify-between items-end bg-white rounded-3xl shadow-lg py-2"
        style={{
          minHeight: 70,
          background: "var(--color-bg-footer)",
          boxShadow: "var(--color-shadow-footer)",
        }}
      >
        {/* Home */}
        <button
          onClick={() => navigate(navItems[0].path)}
          className={`flex flex-col items-center flex-1 py-2 transition-all duration-200`}
          style={{
            color:
              currentIndex === 0 ? "var(--color-purple)" : "var(--color-gray)",
            fontWeight: currentIndex === 0 ? 600 : 400,
          }}
        >
          <FontAwesomeIcon
            icon={navItems[0].icon}
            size="lg"
            className="mb-1"
            style={{
              color:
                currentIndex === 0
                  ? "var(--color-purple)"
                  : "var(--color-gray)",
            }}
          />
          <span className="text-xs">{navItems[0].label}</span>
        </button>

        {/* Plans */}
        <button
          onClick={() => navigate(navItems[1].path)}
          className={`flex flex-col items-center flex-1 py-2 transition-all duration-200 mr-6`}
          style={{
            color:
              currentIndex === 1 ? "var(--color-purple)" : "var(--color-gray)",
            fontWeight: currentIndex === 1 ? 600 : 400,
          }}
        >
          <FontAwesomeIcon
            icon={navItems[1].icon}
            size="lg"
            className="mb-1"
            style={{
              color:
                currentIndex === 1
                  ? "var(--color-purple)"
                  : "var(--color-gray)",
            }}
          />
          <span className="text-xs">{navItems[1].label}</span>
        </button>

        {/* Center (wifi/speedtest) */}
        <button
          onClick={handleSpeedtestClick}
          className={`absolute left-1/2 -translate-x-1/2 -top-7 z-10 w-14 h-14 rounded-full flex items-center justify-center shadow-lg border-4 border-white transition-transform duration-300 ${
            animating ? "scale-110 rotate-12" : ""
          }`}
          style={{
            background:
              "linear-gradient(135deg, var(--color-purple), var(--color-indigo))",
            boxShadow: "var(--color-shadow-center)",
          }}
        >
          <FontAwesomeIcon
            icon={navItems[2].icon}
            size="lg"
            className="text-white text-2xl"
          />
        </button>

        {/* Offers */}
        <button
          onClick={() => navigate(navItems[3].path)}
          className={`flex flex-col items-center flex-1 py-2 transition-all duration-200 ml-6`}
          style={{
            color:
              currentIndex === 3 ? "var(--color-purple)" : "var(--color-gray)",
            fontWeight: currentIndex === 3 ? 600 : 400,
          }}
        >
          <FontAwesomeIcon
            icon={navItems[3].icon}
            size="lg"
            className="mb-1"
            style={{
              color:
                currentIndex === 3
                  ? "var(--color-purple)"
                  : "var(--color-gray)",
            }}
          />
          <span className="text-xs">{navItems[3].label}</span>
        </button>

        {/* Profile */}
        <button
          onClick={() => navigate(navItems[4].path)}
          className={`flex flex-col items-center flex-1 py-2 transition-all duration-200`}
          style={{
            color:
              currentIndex === 4 ? "var(--color-purple)" : "var(--color-gray)",
            fontWeight: currentIndex === 4 ? 600 : 400,
          }}
        >
          <FontAwesomeIcon
            icon={navItems[4].icon}
            size="lg"
            className="mb-1"
            style={{
              color:
                currentIndex === 4
                  ? "var(--color-purple)"
                  : "var(--color-gray)",
            }}
          />
          <span className="text-xs">{navItems[4].label}</span>
        </button>
      </div>
    </div>
  );
}
