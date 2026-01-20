import React from 'react';
import { TrendingUp, Download, Upload } from 'lucide-react';

export default function DataUsageRing() {
  const totalData = 200; // GB
  const usedData = 156; // GB
  const percentage = (usedData / totalData) * 100;
  
  // Calculate circle properties
  const radius = 55;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="px-3 py-3">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-gray-900 font-bold text-base">Data Usage</h3>
          <p className="text-gray-500 text-xs mt-0.5">Current billing cycle</p>
        </div>
        <div className="bg-blue-100 p-1.5 rounded-lg">
          <TrendingUp className="w-4 h-4 text-blue-600" />
        </div>
      </div>

      {/* Ring Chart */}
      <div className="flex items-center justify-center mb-4">
        <div className="relative">
          {/* SVG Ring */}
          <svg className="transform -rotate-90" width="140" height="140">
            {/* Background Circle */}
            <circle
              cx="70"
              cy="70"
              r={radius}
              stroke="#E5E7EB"
              strokeWidth="10"
              fill="none"
            />
            {/* Progress Circle */}
            <circle
              cx="70"
              cy="70"
              r={radius}
              stroke="url(#gradient)"
              strokeWidth="10"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
            {/* Gradient Definition */}
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#1D4ED8" />
              </linearGradient>
            </defs>
          </svg>

          {/* Center Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-0.5">
                {usedData}
                <span className="text-sm text-gray-500 ml-1">GB</span>
              </div>
              <div className="text-xs text-gray-500 font-medium">
                of {totalData} GB
              </div>
              <div className="mt-1.5 bg-blue-100 text-blue-700 text-xs font-bold px-2.5 py-0.5 rounded-full">
                {percentage.toFixed(0)}% Used
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-3">
        <div className="flex justify-between text-xs text-gray-600 mb-1.5">
          <span className="font-medium">Remaining</span>
          <span className="font-bold text-blue-600">{totalData - usedData} GB</span>
        </div>
        <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-blue-700 rounded-full transition-all duration-1000"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-3 flex items-center justify-between bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-2.5 border border-blue-200">
        <p className="text-xs text-blue-900 font-semibold">
          <span className="text-blue-600 font-bold">14 days</span> left
        </p>
        <button className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-700 transition-all shadow-md hover:shadow-lg">
          Renew
        </button>
      </div>
    </div>
  );
}