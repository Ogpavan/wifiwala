import React from "react";
import { Paper } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faListAlt,
  faTags,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";

const navItems = [
  { label: "Home", icon: <FontAwesomeIcon icon={faHouse} />, path: "/" },
  {
    label: "Plans",
    icon: <FontAwesomeIcon icon={faListAlt} />,
    path: "/user/plans",
  },
  {
    label: "Offers",
    icon: <FontAwesomeIcon icon={faTags} />,
    path: "/user/offers",
  },
  {
    label: "Wallet",
    icon: <FontAwesomeIcon icon={faWallet} />,
    path: "/user/wallet",
  },
];

export default function BottomFooter() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentIndex = navItems.findIndex(
    (item) => item.path === location.pathname
  );

  const purple = "#7c3aed";
  const gray = "#bdbdbd";

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        borderRadius: "18px 18px 0 0",
        boxShadow: "0 0 24px 0 rgba(124,58,237,0.08)",
        background: "#fff",
        mx: "auto",
        maxWidth: 420,
        py: 2,
      }}
      elevation={4}
    >
      <div className="flex justify-around items-center">
        {navItems.map((item, idx) => {
          const isActive = currentIndex === idx;
          return (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`flex items-center justify-center transition-all duration-200 px-2 py-1 rounded-full ${
                isActive ? "bg-purple-50 shadow " : "bg-transparent"
              }`}
              style={{
                minWidth: isActive ? 80 : 48,
                color: isActive ? purple : gray,
                fontWeight: isActive ? 600 : 400,
                gap: isActive ? 8 : 0,
              }}
            >
              {React.cloneElement(item.icon, {
                size: "lg",
                style: {
                  color: isActive ? purple : gray,
                  transition: "color 0.2s",
                },
              })}
              {isActive && (
                <span className="ml-1 text-xs font-semibold">{item.label}</span>
              )}
            </button>
          );
        })}
      </div>
    </Paper>
  );
}
