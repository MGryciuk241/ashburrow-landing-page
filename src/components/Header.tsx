import React, { useState, useEffect } from 'react';
import { GraduationCap } from 'lucide-react';

const Header: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate opacity based on scroll position (0.9 at top, decreasing to 0.6 as user scrolls)
  const opacity = Math.max(0.6, 0.9 - (scrollY / 500));
  
  return (
    <header 
      className="fixed top-0 left-0 right-0 shadow-lg border-b border-blue-700/30 z-50 transition-all duration-300 backdrop-blur-md"
      style={{
        background: `linear-gradient(to right, rgb(37 99 235 / ${opacity}), rgb(20 184 166 / ${opacity}))`,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <GraduationCap className="h-8 w-8 text-white" />
            <span className="text-xl font-bold text-white">Ashburrow</span>
          </div>
          <nav className="hidden md:flex space-x-8 items-center">
            <a href="#how-it-works" className="text-white hover:text-blue-100 transition-colors font-medium">How It Works</a>
            <a href="#programs" className="text-white hover:text-blue-100 transition-colors font-medium">Programs</a>
            <a href="#results" className="text-white hover:text-blue-100 transition-colors font-medium">Results</a>
            <button className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors font-medium">
              Get Started
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;