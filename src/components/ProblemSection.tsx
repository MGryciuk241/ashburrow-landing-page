import React from 'react';
import { X, Quote, Star } from 'lucide-react';

const ProblemSection: React.FC = () => {
  const problems = [
    {
      highlight: "Single-pathway learning",
      text: "leads to shallow retention and exam anxiety"
    },
    {
      highlight: "Generic content",
      text: "doesn't target specific certification requirements or exam patterns"
    },
    {
      highlight: "Passive studying",
      text: "creates false confidence that crumbles under pressure"
    },
    {
      highlight: "Information overload",
      text: "without strategic prioritization or high-yield focus"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Why Traditional Professional Exam Prep Falls Short
          </h2>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            {problems.map((problem, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <X className="h-6 w-6 text-red-500 mt-1" />
                </div>
                <p className="text-gray-700 text-lg leading-relaxed">
                  <span className="font-semibold text-red-600">{problem.highlight}</span> {problem.text}
                </p>
              </div>
            ))}
          </div>
          
          <div className="bg-yellow-50 p-8 rounded-2xl shadow-lg border border-yellow-200">
            <div className="flex mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <Quote className="h-12 w-12 text-blue-500 mb-6" />
            <blockquote className="text-lg text-gray-700 leading-relaxed mb-6">
              "I failed my first certification exam using traditional study guides. Ashburrow's Diamond Extraction Method™ 
              helped me understand not just what to memorize, but how to really think like a professional in my field. 
              I passed with 94%."
            </blockquote>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-teal-400 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-lg">SM</span>
              </div>
              <div className="ml-4">
                <p className="font-semibold text-gray-900">Sarah M.</p>
                <p className="text-gray-600">Certified PSW</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;