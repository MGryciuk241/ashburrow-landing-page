import React from 'react';
import { BookOpen, FileText, Target, Brain } from 'lucide-react';

const PSWOffering: React.FC = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Comprehensive Study Guide",
      points: [
        "400+ pages covering complete PSW curriculum",
        "Diamond Extraction Method™ integrated throughout every chapter",
        "High-yield content prioritization"
      ]
    },
    {
      icon: FileText,
      title: "Practice Question Bank",
      points: [
        "500+ NACC-style questions with detailed explanations",
        "Scenario-based questions testing real-world application",
        "Answer keys with Diamond Extraction Method™ learning integration"
      ]
    },
    {
      icon: Target,
      title: "Exam Trap Warnings",
      points: [
        '"Almost right" answer identification throughout',
        "Common misconception alerts in every chapter",
        "Exam pattern recognition guide"
      ]
    },
    {
      icon: Brain,
      title: "CARE Technique Integration",
      points: [
        "Teach-back exercises at end of each section",
        "Self-assessment reflection prompts",
        "Feynman-style simplification practice"
      ]
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Master the PSW Exam with Comprehensive Multi-Modal Study Guide
          </h2>
          <p className="text-xl text-gray-600">
            Designed for NACC, HCA, and CCA Exam Success
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                    <IconComponent className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
                </div>
                <ul className="space-y-3">
                  {feature.points.map((point, pointIndex) => (
                    <li key={pointIndex} className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-3 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700 leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PSWOffering;