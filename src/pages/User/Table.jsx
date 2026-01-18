import React, { useState } from 'react';
import { Wifi, Zap, ChevronDown } from 'lucide-react';

export default function PlansTable() {
  const [activeTab, setActiveTab] = useState('company');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const companyFilters = ['All', 'Airtel', 'Jio', 'BSNL'];
  const speedFilters = ['All', '50 Mbps', '100 Mbps', '200 Mbps', '300 Mbps'];

  const plans = [
    { id: 1, company: 'Airtel', speed: '50', price: 499, validity: '28 days' },
   
    { id: 4, company: 'Airtel', speed: '300', price: 1499, validity: '28 days' },
    { id: 5, company: 'Jio', speed: '50', price: 399, validity: '30 days' },
    { id: 6, company: 'Jio', speed: '100', price: 699, validity: '30 days' },
   
    { id: 9, company: 'BSNL', speed: '50', price: 449, validity: '30 days' },
    { id: 10, company: 'BSNL', speed: '100', price: 749, validity: '30 days' },
   
  ];

  const getFilteredPlans = () => {
    if (selectedFilter === 'all') return plans;
    
    if (activeTab === 'company') {
      return plans.filter(plan => plan.company.toLowerCase() === selectedFilter.toLowerCase());
    } else {
      return plans.filter(plan => plan.speed === selectedFilter.replace(' Mbps', ''));
    }
  };

  const filteredPlans = getFilteredPlans();
  const filters = activeTab === 'company' ? companyFilters : speedFilters;

  const getCompanyColor = (company) => {
    const colors = {
      'Airtel': 'text-red-600 bg-red-50',
      'Jio': 'text-blue-600 bg-blue-50',
      'BSNL': 'text-green-600 bg-green-50'
    };
    return colors[company] || 'text-gray-600 bg-gray-50';
  };

  return (
    <div className="px-3 py-3 pb-20">
      {/* Header */}
      <div className="mb-3">
        <h2 className="text-gray-900 text-xl font-bold">Available Plans</h2>
        <p className="text-gray-500 text-xs mt-0.5">Find your perfect plan</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-3">
        <button
          onClick={() => {
            setActiveTab('company');
            setSelectedFilter('all');
          }}
          className={`flex-1 py-2.5 px-3 rounded-xl font-semibold text-xs transition-all ${
            activeTab === 'company'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-white text-gray-600 border border-gray-200'
          }`}
        >
          <div className="flex items-center justify-center gap-1.5">
            <Wifi className="w-3.5 h-3.5" />
            Company
          </div>
        </button>
        <button
          onClick={() => {
            setActiveTab('speed');
            setSelectedFilter('all');
          }}
          className={`flex-1 py-2.5 px-3 rounded-xl font-semibold text-xs transition-all ${
            activeTab === 'speed'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-white text-gray-600 border border-gray-200'
          }`}
        >
          <div className="flex items-center justify-center gap-1.5">
            <Zap className="w-3.5 h-3.5" />
            Speed
          </div>
        </button>
      </div>

      {/* Dropdown */}
      <div className="mb-3">
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2.5 flex items-center justify-between hover:border-blue-300 transition-all text-sm"
          >
            <span className="text-gray-700 font-medium capitalize text-sm">
              {selectedFilter === 'all' ? 'All Plans' : selectedFilter}
            </span>
            <ChevronDown 
              className={`w-4 h-4 text-gray-400 transition-transform ${
                isDropdownOpen ? 'rotate-180' : ''
              }`} 
            />
          </button>
          
          {isDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-20 overflow-hidden">
              {filters.map((filter, index) => (
                <button
                  key={filter}
                  onClick={() => {
                    setSelectedFilter(filter.toLowerCase());
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full px-3 py-2 text-left text-sm hover:bg-blue-50 transition-all ${
                    selectedFilter === filter.toLowerCase() 
                      ? 'bg-blue-50 text-blue-600 font-semibold' 
                      : 'text-gray-700'
                  } ${index !== filters.length - 1 ? 'border-b border-gray-100' : ''}`}
                >
                  {filter}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modern Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-3 py-2.5 text-left text-xs font-bold text-gray-700 uppercase">
                  Provider
                </th>
                <th className="px-3 py-2.5 text-left text-xs font-bold text-gray-700 uppercase">
                  Speed
                </th>
                <th className="px-3 py-2.5 text-left text-xs font-bold text-gray-700 uppercase">
                  Price
                </th>
                <th className="px-3 py-2.5 text-left text-xs font-bold text-gray-700 uppercase">
                  Validity
                </th>
                <th className="px-3 py-2.5 text-right text-xs font-bold text-gray-700 uppercase">
                  
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredPlans.length > 0 ? (
                filteredPlans.map((plan) => (
                  <tr 
                    key={plan.id} 
                    className="hover:bg-gray-50 transition-all"
                  >
                    <td className="px-3 py-3">
                      <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-bold ${getCompanyColor(plan.company)}`}>
                        {plan.company}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-1">
                        <Zap className="w-3.5 h-3.5 text-blue-500" />
                        <span className="font-bold text-gray-900 text-sm">{plan.speed}</span>
                        <span className="text-xs text-gray-500">Mbps</span>
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <span className="font-bold text-blue-600 text-sm">₹{plan.price}</span>
                    </td>
                    <td className="px-3 py-3">
                      <span className="text-xs text-gray-600">{plan.validity}</span>
                    </td>
                    <td className="px-3 py-3 text-right">
                      <button className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-xs font-semibold hover:bg-blue-700 transition-all">
                        Select
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-3 py-6 text-center text-gray-500 text-sm">
                    No plans available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}