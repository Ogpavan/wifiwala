import React, { useState } from "react";
import { Settings, X, Package, User, HelpCircle, LogOut } from "lucide-react";

export default function SettingsSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { icon: Package, label: "My Plan", path: "/user/plan" },
    { icon: User, label: "Edit Profile", path: "/user/edit-profile" },
    { icon: HelpCircle, label: "Help", path: "/user/help" },
    { icon: LogOut, label: "Logout", path: "/logout", danger: true },
  ];

  const handleMenuClick = (path) => {
    console.log("Navigating to:", path);
    setIsOpen(false);
  };

  return (
    <div>
      {/* Settings button */}
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 hover:bg-blue-800 rounded-lg transition-colors"
      >
        <Settings className="w-6 h-6 text-white" />
      </button>

      {/* Sidebar */}
      {isOpen && (
        <div>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Sidebar panel */}
          <div className="fixed top-0 right-0 h-full w-3/4 sm:w-96 bg-blue-900/40 backdrop-blur-3xl shadow-2xl border-l border-white/30 z-50">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/20 bg-white/5">
              <h2 className="text-2xl font-bold text-white bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">Settings</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-xl transition-all backdrop-blur-sm"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Menu */}
            <div className="p-4">
              {menuItems.slice(0, -1).map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleMenuClick(item.path)}
                  className="w-full flex items-center gap-3 p-3 mb-1 transition-all hover:bg-white/20 text-white group"
                >
                  <div className="p-2 rounded-lg bg-white/20 group-hover:bg-white/30 transition-all">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <span className="text-base font-medium">{item.label}</span>
                </button>
              ))}
              
              {/* Horizontal divider */}
              <div className="py-2">
                <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
              </div>
              
              {/* Logout button */}
              <button
                onClick={() => handleMenuClick(menuItems[menuItems.length - 1].path)}
                className="w-full flex items-center gap-3 p-3 transition-all hover:bg-red-500/30 text-red-200 hover:text-white group"
              >
                <div className="p-2 rounded-lg bg-red-500/30 group-hover:bg-red-500/40 transition-all">
                  <LogOut className="w-5 h-5" />
                </div>
                <span className="text-base font-medium">Logout</span>
              </button>
            </div>

            {/* Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/20 backdrop-blur-sm bg-white/5">
              <p className="text-white/70 text-sm text-center font-medium">
                Version 1.0.0
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}