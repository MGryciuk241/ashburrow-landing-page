import React from 'react';
import { ArrowRight, Mail } from 'lucide-react';

const FinalCTA: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 to-teal-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to Master Your Certification the Smart Way?
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto">
            Try the learning system built for better understanding—not just more studying.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="group bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-50 transition-all duration-200 hover:scale-105 flex items-center justify-center">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="group bg-blue-500 text-white border-2 border-blue-400 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-400 transition-all duration-200 hover:scale-105 flex items-center justify-center">
              <Mail className="mr-2 h-5 w-5" />
              Join the Waitlist for Upcoming Programs
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;