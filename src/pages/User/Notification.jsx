import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faCheckCircle,
  faExclamationTriangle,
  faGift,
  faWifi,
} from "@fortawesome/free-solid-svg-icons";

const notifications = [
  {
    id: 1,
    type: "offer",
    icon: faGift,
    title: "20% Off First Recharge",
    message:
      "Get 20% instant discount on your first recharge. Use code FIRST20.",
    time: "2 hours ago",
    color: "var(--color-purple)",
  },
  {
    id: 2,
    type: "plan",
    icon: faWifi,
    title: "Plan Expiry Reminder",
    message:
      "Your Standard Plan will expire on 30 Sep 2025. Renew now to continue uninterrupted service.",
    time: "1 day ago",
    color: "var(--color-indigo)",
  },
  {
    id: 3,
    type: "success",
    icon: faCheckCircle,
    title: "Recharge Successful",
    message: "Your wallet has been recharged with ₹500. Thank you!",
    time: "3 days ago",
    color: "var(--color-emerald)",
  },
  {
    id: 4,
    type: "alert",
    icon: faExclamationTriangle,
    title: "Service Alert",
    message:
      "Scheduled maintenance on 5th Oct, 2AM-4AM. Internet may be unavailable.",
    time: "5 days ago",
    color: "var(--color-warning)",
  },
];

export default function Notification() {
  return (
    <div
      className="min-h-screen pb-24"
      //   style={{ background: "var(--color-bg-gradient)" }}
    >
      <div className="    pb-4">
        <div className="flex items-center gap-3 mb-6">
          <FontAwesomeIcon
            icon={faBell}
            className="text-2xl"
            style={{ color: "var(--color-purple)" }}
          />
          <h1
            className="text-2xl font-bold"
            style={{ color: "var(--color-purple)" }}
          >
            Notifications
          </h1>
        </div>
        <div className="flex flex-col gap-4">
          {notifications.length === 0 && (
            <div className="text-center text-gray-400 py-10">
              No notifications yet.
            </div>
          )}
          {notifications.map((n) => (
            <div
              key={n.id}
              className="flex items-start gap-4 bg-white rounded-2xl shadow p-4"
              style={{ boxShadow: "var(--color-shadow-footer)" }}
            >
              <div
                className="w-12 h-12 flex items-center justify-center rounded-xl"
                style={{ backgroundColor: `${n.color}15` }}
              >
                <FontAwesomeIcon
                  icon={n.icon}
                  className="text-xl"
                  style={{ color: n.color }}
                />
              </div>
              <div className="flex-1">
                <h3
                  className="font-semibold mb-1"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  {n.title}
                </h3>
                <p
                  className="text-sm mb-1"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {n.message}
                </p>
                <span
                  className="text-xs"
                  style={{ color: "var(--color-gray)" }}
                >
                  {n.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
