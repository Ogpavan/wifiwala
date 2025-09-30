import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWifi,
  faArrowDown,
  faArrowUp,
  faRedo,
} from "@fortawesome/free-solid-svg-icons";

function getRandomSpeed(min, max) {
  return (Math.random() * (max - min) + min).toFixed(2);
}

export default function Speedtest() {
  const [testing, setTesting] = useState(false);
  const [result, setResult] = useState(null);

  const handleTest = () => {
    setTesting(true);
    setResult(null);
    setTimeout(() => {
      setResult({
        download: getRandomSpeed(30, 150),
        upload: getRandomSpeed(10, 80),
        ping: getRandomSpeed(5, 40),
      });
      setTesting(false);
    }, 2200);
  };

  return (
    <div
      className="   "
      //   style={{ background: "var(--color-bg-gradient)" }}
    >
      <div
        className="bg-white   p-8 flex flex-col items-center w-full max-w-md"
        // style={{ boxShadow: "var(--color-shadow-footer)" }}
      >
        <div className="mb-6 flex flex-col items-center">
          <FontAwesomeIcon
            icon={faWifi}
            size="2x"
            className="mb-2 text-[var(--color-purple)]"
          />
          <h1
            className="text-2xl font-bold mb-1"
            style={{ color: "var(--color-purple)" }}
          >
            Internet Speed Test
          </h1>
          <p className="text-sm text-[var(--color-text-secondary)] text-center">
            Check your current download and upload speeds.
          </p>
        </div>

        <div className="my-8 flex flex-col items-center">
          <button
            className={`w-32 h-32 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg transition-all duration-300
              ${testing ? "scale-110 animate-pulse" : ""}
            `}
            style={{
              background:
                "linear-gradient(135deg, var(--color-purple), var(--color-indigo))",
              boxShadow: "var(--color-shadow-center)",
            }}
            onClick={handleTest}
            disabled={testing}
          >
            {testing ? (
              <span className="animate-spin">
                <FontAwesomeIcon icon={faRedo} />
              </span>
            ) : (
              "Start"
            )}
          </button>
          <span className="mt-3 text-xs text-[var(--color-text-secondary)]">
            {testing ? "Testing..." : "Tap to begin"}
          </span>
        </div>

        {result && (
          <div className="w-full flex flex-col gap-4 mt-4">
            <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-[var(--color-bg-light)]">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon
                  icon={faArrowDown}
                  className="text-[var(--color-indigo)]"
                />
                <span className="font-semibold text-[var(--color-text-primary)]">
                  Download
                </span>
              </div>
              <span className="font-bold text-lg text-[var(--color-purple)]">
                {result.download} Mbps
              </span>
            </div>
            <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-[var(--color-bg-light)]">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon
                  icon={faArrowUp}
                  className="text-[var(--color-emerald)]"
                />
                <span className="font-semibold text-[var(--color-text-primary)]">
                  Upload
                </span>
              </div>
              <span className="font-bold text-lg text-[var(--color-purple)]">
                {result.upload} Mbps
              </span>
            </div>
            <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-[var(--color-bg-light)]">
              <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-[var(--color-orange)]"></span>
                <span className="font-semibold text-[var(--color-text-primary)]">
                  Ping
                </span>
              </div>
              <span className="font-bold text-lg text-[var(--color-purple)]">
                {result.ping} ms
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
