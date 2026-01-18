import React from "react";

export default function Popup({ open, title, message, onClose, actions }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-md shadow-lg max-w-xs w-full p-6 text-center">
        {title && <h2 className="text-lg font-bold mb-2">{title}</h2>}
        <p className="text-gray-700 mb-4">{message}</p>
        <div className="flex justify-center gap-2 flex-row-reverse">
          {actions ? (
            actions.map((action, i) => (
              <button
                key={i}
                onClick={action.onClick}
                className={`px-4 py-2 w-full rounded font-semibold ${
                  action.variant === "primary"
                    ? "bg-purple-600 text-white hover:bg-purple-700"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {action.label}
              </button>
            ))
          ) : (
            <button
              onClick={onClose}
              className="px-4 py-2 w-full rounded bg-purple-600 text-white font-semibold hover:bg-purple-700"
            >
              OK
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
