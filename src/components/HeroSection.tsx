import React from 'react';
import { ArrowRight, Play } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      {/* Marble Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/Marble.jpeg)',
        }}
      />
      {/* Overlay for text readability */}
      <div className="absolute inset-0 bg-white bg-opacity-75" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Science-backed methodology bubble */}
          <div className="inline-block bg-blue-100 text-blue-800 hover:bg-blue-100 px-3 py-1.5 rounded-full text-sm font-medium mb-6">
            🧠 Science-Backed Learning System
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
            Master Your Professional{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">
              Certification Exams
            </span>{' '}
            with The Diamond Extraction Method™
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mt-8 leading-relaxed">
            A <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700">science-driven approach</span> using{' '}
            <span className="text-gray-800 font-medium">six key learning pathways</span> to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">accelerate retention and mastery</span>.{' '}
            <strong className="text-gray-900 font-bold">Learn faster. Remember longer. Pass with confidence.</strong>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <button className="group bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition-all duration-200 hover:scale-105 flex items-center justify-center">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="group bg-white text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-50 transition-all duration-200 hover:scale-105 flex items-center justify-center">
              <Play className="mr-2 h-5 w-5" />
              See How It Works
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;