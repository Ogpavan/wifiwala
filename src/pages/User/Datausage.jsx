import React from 'react';
import { TrendingUp, Download, Upload } from 'lucide-react';

export default function DataUsageRing() {
  const totalData = 200; // GB
  const usedData = 156; // GB
  const percentage = (usedData / totalData) * 100;
  
  // Calculate circle properties
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="px-3 py-4">
      {/* <div className="bg-gradient-to-br from-blue-50 to-white rounded-3xl shadow-lg border border-gray-100 p-6"> */}
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-gray-900 font-bold text-lg">Data Usage</h3>
            <p className="text-gray-500 text-xs mt-0.5">Current billing cycle</p>
          </div>
          <div className="bg-blue-100 p-2 rounded-xl">
            <TrendingUp className="w-5 h-5 text-blue-600" />
          </div>
        </div>

        {/* Ring Chart */}
        <div className="flex items-center justify-center mb-6">
          <div className="relative">
            {/* SVG Ring */}
            <svg className="transform -rotate-90" width="180" height="180">
              {/* Background Circle */}
              <circle
                cx="90"
                cy="90"
                r={radius}
                stroke="#E5E7EB"
                strokeWidth="12"
                fill="none"
              />
              {/* Progress Circle */}
              <circle
                cx="90"
                cy="90"
                r={radius}
                stroke="url(#gradient)"
                strokeWidth="12"
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
                <div className="text-4xl font-bold text-gray-900 mb-1">
                  {usedData}
                  <span className="text-lg text-gray-500 ml-1">GB</span>
                </div>
                <div className="text-xs text-gray-500 font-medium">
                  of {totalData} GB
                </div>
                <div className="mt-2 bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">
                  {percentage.toFixed(0)}% Used
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
       

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-xs text-gray-600 mb-2">
            <span className="font-medium">Remaining</span>
            <span className="font-bold text-blue-600">{totalData - usedData} GB</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-blue-700 rounded-full transition-all duration-1000"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 flex items-center justify-between bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-3 border border-blue-200">
          <p className="text-sm text-blue-900 font-semibold">
            <span className="text-blue-600 font-bold">14 days</span> left
          </p>
          <button className="bg-blue-600 text-white px-5 py-2 rounded-lg text-xs font-bold hover:bg-blue-700 transition-all shadow-md hover:shadow-lg">
            Renew
          </button>
        </div>
      </div>
    // </div>
  );
}