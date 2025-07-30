import React from 'react';
import { Star, TrendingUp, Users, Award } from 'lucide-react';

const SocialProof: React.FC = () => {
  const stats = [
    {
      icon: Users,
      number: "2,500+",
      label: "students supported across Canada",
      color: "text-blue-600"
    },
    {
      icon: TrendingUp,
      number: "94%",
      label: "average reported score improvement",
      color: "text-teal-600"
    },
    {
      icon: Star,
      number: "4.9/5",
      label: "learner satisfaction rating",
      color: "text-orange-600"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Early Results That Speak for Themselves
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="text-center bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-50 rounded-2xl mb-6">
                  <IconComponent className={`h-8 w-8 ${stat.color}`} />
                </div>
                <div className={`text-4xl font-bold ${stat.color} mb-2`}>{stat.number}</div>
                <p className="text-gray-600 text-lg">{stat.label}</p>
              </div>
            );
          })}
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <div className="flex mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
              ))}
            </div>
            <blockquote className="text-xl text-gray-700 leading-relaxed mb-6">
              "This isn't just about passing exams. It completely changed how I think and learn. 
              I wish I had this years ago."
            </blockquote>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-blue-400 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-lg">AL</span>
              </div>
              <div className="ml-4">
                <p className="font-semibold text-gray-900">Andre L.</p>
                <p className="text-gray-600">Healthcare Assistant, BC</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;