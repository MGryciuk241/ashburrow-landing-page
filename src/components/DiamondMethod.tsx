import React from 'react';
import { Brain, Eye, MessageCircle, BookOpen, Lightbulb, Zap } from 'lucide-react';
import InteractiveDiamond3D from './InteractiveDiamond3D';

const DiamondMethod: React.FC = () => {
  const pathways = [
    {
      icon: Brain,
      title: "Semantic Encoding",
      subtitle: "Compressed Clarity",
      description: "Transform complex concepts into memorable, meaningful understanding",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Zap,
      title: "Episodic Encoding",
      subtitle: "Spaced Recall",
      description: "Strategic retrieval practice that moves knowledge into long-term memory",
      color: "from-teal-500 to-teal-600"
    },
    {
      icon: Lightbulb,
      title: "Metacognitive Encoding",
      subtitle: "Confidence Awareness",
      description: "Build self-monitoring skills that prevent exam mistakes",
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: Eye,
      title: "Visual/Dual Coding",
      subtitle: "See & Say Integration",
      description: "Combine visual and verbal learning for maximum retention",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: MessageCircle,
      title: "Generative Encoding",
      subtitle: "Teach-Back Mastery",
      description: "Master concepts by explaining them in your own words",
      color: "from-green-500 to-green-600"
    },
    {
      icon: BookOpen,
      title: "Procedural Encoding",
      subtitle: "Learn by Doing",
      description: "Build muscle memory through hands-on practice",
      color: "from-red-500 to-red-600"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Master Complex Material with Multi-Modal Strategies
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The Diamond Extraction Method™ activates six learning systems to supercharge understanding and recall
          </p>
        </div>
        
        {/* Diamond Visual */}
        <div className="relative mb-20">
          <div className="flex justify-center mb-12">
            <div className="max-w-5xl w-full px-4">
              <InteractiveDiamond3D 
                pathways={pathways}
              />
              <div className="text-center mt-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Diamond Extraction Method™</h3>
                <p className="text-gray-600">Interactive Hexagonal Diamond - Each face represents one learning pathway</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Pathways Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {pathways.map((pathway, index) => {
            const IconComponent = pathway.icon;
            // Extract the main color from the gradient for the icon
            const iconColor = pathway.color.includes('blue') ? 'text-blue-500' :
                             pathway.color.includes('teal') ? 'text-teal-500' :
                             pathway.color.includes('orange') ? 'text-orange-500' :
                             pathway.color.includes('purple') ? 'text-purple-500' :
                             pathway.color.includes('green') ? 'text-green-500' :
                             'text-red-500';
            return (
              <div key={index} className="group bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className="mb-6 group-hover:scale-110 transition-transform">
                  <IconComponent className={`h-12 w-12 ${iconColor}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{pathway.title}</h3>
                <h4 className="text-lg font-semibold text-blue-600 mb-4">{pathway.subtitle}</h4>
                <p className="text-gray-600 leading-relaxed">{pathway.description}</p>
              </div>
            );
          })}
        </div>
        
        {/* Supporting Text */}
        <div className="bg-gradient-to-r from-blue-50 to-teal-50 p-8 rounded-2xl">
          <p className="text-lg text-gray-700 leading-relaxed text-center max-w-4xl mx-auto">
            Just like a diamond's brilliance comes from multiple facets, your learning power multiplies when all six 
            neuroscience-backed pathways work together. Each encoding system activates different neural circuits, 
            creating redundant memory traces that ensure lasting retention. This isn't just another study guide—it's 
            a complete cognitive transformation system.
          </p>
        </div>
      </div>
    </section>
  );
};

export default DiamondMethod;