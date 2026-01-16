import React, { useState } from 'react';
import { Wifi, Menu, X, Grid } from 'lucide-react';

export default function WiFiWalaNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div>
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-900/95 backdrop-blur-lg border-b border-slate-700/50 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center">
                <Wifi className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">WiFiWala</span>
            </div>
            
            {/* Desktop Navigation */}
            
            {/* Mobile Menu Button - 4 Blocks Grid Icon */}
            <button 
              className="md:hidden text-white p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Grid className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-800/95 backdrop-blur-lg border-t border-slate-700">
            <div className="px-4 py-6 space-y-4">
              <a 
                href="#home" 
                className="block text-white font-semibold hover:text-emerald-400 transition py-3 px-4 rounded-lg hover:bg-slate-700/50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </a>
              <a 
                href="#plans" 
                className="block text-slate-300 hover:text-white transition py-3 px-4 rounded-lg hover:bg-slate-700/50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Plans
              </a>
              <a 
                href="#contact" 
                className="block text-slate-300 hover:text-white transition py-3 px-4 rounded-lg hover:bg-slate-700/50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </a>
            </div>
          </div>
        )}
      </nav>

     
      
    </div>
  );
}