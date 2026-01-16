import React, { useState } from 'react';
import { Wifi, Grid, X, Zap, Shield, Headphones, Clock } from 'lucide-react';

export default function WiFiWalaHomepage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const plans = [
    { provider: 'Airtel', speed: '100 Mbps', price: '₹699', data: 'Unlimited', router: 'Free' },
    { provider: 'Jio Fiber', speed: '150 Mbps', price: '₹999', data: 'Unlimited', router: 'Free', highlight: true },
    { provider: 'BSNL', speed: '50 Mbps', price: '₹499', data: 'Unlimited', router: 'Free' },
    { provider: 'Vi Fiber', speed: '200 Mbps', price: '₹1,299', data: 'Unlimited', router: 'Free' },
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-900/90 backdrop-blur-sm border-b border-slate-800 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center">
                <Wifi className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-white">WiFiWala</span>
            </div>
            
            <div className="hidden md:flex items-center gap-6">
              <a href="#home" className="text-sm text-white hover:text-emerald-400 transition">Home</a>
              <a href="#plans" className="text-sm text-slate-400 hover:text-white transition">Plans</a>
              <a href="#contact" className="text-sm text-slate-400 hover:text-white transition">Contact</a>
            </div>

            <button 
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Grid className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-900 border-t border-slate-800">
            <div className="px-4 py-4 space-y-2">
              <a href="#home" className="block text-sm text-white py-2" onClick={() => setMobileMenuOpen(false)}>Home</a>
              <a href="#plans" className="block text-sm text-slate-400 py-2" onClick={() => setMobileMenuOpen(false)}>Plans</a>
              <a href="#contact" className="block text-sm text-slate-400 py-2" onClick={() => setMobileMenuOpen(false)}>Contact</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section id="home" className="pt-36 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
               Wi-Fi providers serving your neighbourhood
              </h1>
              
              <p className="text-base text-slate-400 mb-6">
               See available internet plans and choose what fits you
              </p>
              
              <div className="flex gap-3">
                <button className="px-5 py-2.5 bg-emerald-500 text-white text-sm rounded-lg hover:bg-emerald-600 transition">
                  View Plans
                </button>
                <button className="px-5 py-2.5 bg-slate-800 text-white text-sm rounded-lg hover:bg-slate-700 transition">
                  Contact
                </button>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-slate-800">
                <div>
                  <div className="text-2xl font-bold text-emerald-400">10K+</div>
                  <div className="text-xs text-slate-500">Users</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-emerald-400">99.9%</div>
                  <div className="text-xs text-slate-500">Uptime</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-emerald-400">24/7</div>
                  <div className="text-xs text-slate-500">Support</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 border border-slate-800 rounded-2xl p-6 lg:p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                    <span className="text-xs text-slate-400 uppercase tracking-wide">Live Status</span>
                  </div>
                  <div className="text-3xl lg:text-4xl font-bold text-white">Active</div>
                </div>
                <div className="w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center">
                  <Wifi className="w-7 h-7 lg:w-8 lg:h-8 text-white" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 lg:gap-4 mb-6">
                <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-3 lg:p-4">
                  <div className="text-xl lg:text-2xl font-bold text-emerald-400">1Gbps</div>
                  <div className="text-xs text-slate-500 mt-0.5">Speed</div>
                </div>
                <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-3 lg:p-4">
                  <div className="text-xl lg:text-2xl font-bold text-emerald-400">8ms</div>
                  <div className="text-xs text-slate-500 mt-0.5">Latency</div>
                </div>
                <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-3 lg:p-4">
                  <div className="text-xl lg:text-2xl font-bold text-emerald-400">12</div>
                  <div className="text-xs text-slate-500 mt-0.5">Devices</div>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-800">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">Data Usage</span>
                  <span className="text-sm font-medium text-white">8.5 GB <span className="text-slate-500">/ Today</span></span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">Connection</span>
                  <span className="text-sm font-medium text-emerald-400">Fiber Optic</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">Uptime</span>
                  <span className="text-sm font-medium text-white">99.9%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-slate-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-2">Why choose us</h2>
            <p className="text-sm text-slate-400">Everything you need for great internet</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="group bg-gradient-to-br from-emerald-400/30 via-emerald-500/20 to-teal-500/20 hover:from-emerald-400/40 hover:via-emerald-500/30 hover:to-teal-500/30 border border-emerald-400/40 rounded-3xl p-6 relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/20">
              <div className="absolute -top-8 -right-8 w-24 h-24 bg-emerald-400/10 rounded-full blur-2xl"></div>
              <div className="absolute top-3 right-3">
                <Wifi className="w-5 h-5 text-emerald-300/50" />
              </div>
              <div className="relative">
                <div className="w-14 h-14 bg-emerald-400/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Zap className="w-7 h-7 text-emerald-300" />
                </div>
                <h3 className="text-base font-semibold text-white mb-1.5">Fast Speed</h3>
                <p className="text-xs text-emerald-200/70">Up to 1 Gbps</p>
              </div>
            </div>

            <div className="group bg-slate-800/60 hover:bg-slate-800/80 border border-slate-700/60 rounded-3xl p-6 relative overflow-hidden transition-all duration-300 hover:scale-105 hover:border-slate-600">
              <div className="absolute top-3 right-3">
                <Wifi className="w-5 h-5 text-slate-500/50" />
              </div>
              <div className="relative">
                <div className="w-14 h-14 bg-slate-700/50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Shield className="w-7 h-7 text-slate-300" />
                </div>
                <h3 className="text-base font-semibold text-white mb-1.5">Secure</h3>
                <p className="text-xs text-slate-400">Protected network</p>
              </div>
            </div>

            <div className="group bg-slate-800/60 hover:bg-slate-800/80 border border-slate-700/60 rounded-3xl p-6 relative overflow-hidden transition-all duration-300 hover:scale-105 hover:border-slate-600">
              <div className="absolute top-3 right-3">
                <Wifi className="w-5 h-5 text-slate-500/50" />
              </div>
              <div className="relative">
                <div className="w-14 h-14 bg-slate-700/50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Headphones className="w-7 h-7 text-slate-300" />
                </div>
                <h3 className="text-base font-semibold text-white mb-1.5">Support</h3>
                <p className="text-xs text-slate-400">24/7 help available</p>
              </div>
            </div>

            <div className="group bg-slate-800/60 hover:bg-slate-800/80 border border-slate-700/60 rounded-3xl p-6 relative overflow-hidden transition-all duration-300 hover:scale-105 hover:border-slate-600">
              <div className="absolute top-3 right-3">
                <Wifi className="w-5 h-5 text-slate-500/50" />
              </div>
              <div className="relative">
                <div className="w-14 h-14 bg-slate-700/50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Clock className="w-7 h-7 text-slate-300" />
                </div>
                <h3 className="text-base font-semibold text-white mb-1.5">Reliable</h3>
                <p className="text-xs text-slate-400">99.9% uptime</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Plans Table */}
      <section id="plans" className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-2">Available Plans</h2>
            <p className="text-sm text-slate-400">Compare all providers in one place</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="text-left py-3 px-4 text-xs font-medium text-slate-400 uppercase">Provider</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-slate-400 uppercase">Speed</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-slate-400 uppercase">Price/Month</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-slate-400 uppercase">Data</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-slate-400 uppercase">Router</th>
                  <th className="py-3 px-4"></th>
                </tr>
              </thead>
              <tbody>
                {plans.map((plan, i) => (
                  <tr key={i} className={`border-b border-slate-800/50 ${plan.highlight ? 'bg-emerald-500/5' : ''} hover:bg-slate-900/50 transition`}>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center">
                          <Wifi className="w-4 h-4 text-slate-400" />
                        </div>
                        <span className="text-sm font-medium text-white">{plan.provider}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-slate-300">{plan.speed}</td>
                    <td className="py-4 px-4 text-sm font-semibold text-white">{plan.price}</td>
                    <td className="py-4 px-4 text-sm text-slate-300">{plan.data}</td>
                    <td className="py-4 px-4 text-sm text-slate-300">{plan.router}</td>
                    <td className="py-4 px-4">
                      <button className="px-4 py-1.5 bg-slate-800 text-white text-xs rounded-lg hover:bg-emerald-500 transition">
                        Select
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 px-4 bg-slate-900/30">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-3">Get started today</h2>
          <p className="text-sm text-slate-400 mb-6">Contact us to find the best plan for you</p>
          <button className="px-8 py-3 bg-emerald-500 text-white text-sm rounded-lg hover:bg-emerald-600 transition">
            Contact Us
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-6 px-4">
        <div className="max-w-6xl mx-auto text-center text-xs text-slate-600">
          © 2024 WiFiWala. All rights reserved.
        </div>
      </footer>
    </div>
  );
}