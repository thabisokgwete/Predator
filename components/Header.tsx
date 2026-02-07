import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import PredatorLogo from './PredatorLogo';

interface HeaderProps {
  currentView: string;
  setView: (view: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, setView }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'models', label: 'Models' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    setView(id);
    setIsMenuOpen(false);
    // Smooth scroll to top on every view change to simulate page load
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 border-b border-white/10 glass">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 group cursor-pointer"
          onClick={() => handleNavClick('home')}
        >
          {/* Custom Predator Logo */}
          <PredatorLogo className="text-2xl md:text-3xl text-white" />
        </div>
        
        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`text-sm font-medium transition-colors ${
                currentView === item.id ? 'text-red-500' : 'text-zinc-400 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button className="bg-red-800 hover:bg-red-700 text-white px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-lg shadow-red-900/20">
            Secure Access
          </button>
        </nav>
        
        {/* Mobile Controls */}
        <div className="flex items-center gap-4 lg:hidden">
          <button 
            className="text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-20 bg-zinc-950/95 backdrop-blur-xl z-50 flex flex-col p-6">
          <div className="flex flex-col gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-2xl font-display font-bold text-left py-2 border-b border-white/5 ${
                  currentView === item.id ? 'text-red-500' : 'text-zinc-300'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button className="w-full bg-red-800 text-white py-4 rounded-xl font-bold mt-4 shadow-lg shadow-red-900/20">
              Secure Access
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;