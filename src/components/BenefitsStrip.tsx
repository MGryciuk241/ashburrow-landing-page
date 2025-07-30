import React, { useState, useEffect, useRef } from 'react';
import { Brain, BookOpen, Rocket, CheckCircle } from 'lucide-react';

const BenefitsStrip: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedValues, setAnimatedValues] = useState([0, 0, 0, 0]);
  const [completedAnimations, setCompletedAnimations] = useState([false, false, false, false]);
  const sectionRef = useRef<HTMLElement>(null);

  const benefits = [
    {
      icon: Brain,
      statistic: 94,
      suffix: "%",
      text: "Faster Knowledge Retention",
      description: "Cognitive science-based approach",
      hasResearchBadge: true,
      badgeText: "Evidence-Based",
      accentColor: "bg-gradient-to-r from-blue-500 to-indigo-500"
    },
    {
      icon: BookOpen,
      statistic: 15,
      suffix: " min/day",
      text: "Average Study Time",
      description: "Designed for busy professionals",
      hasResearchBadge: false,
      accentColor: "bg-gradient-to-r from-teal-500 to-blue-500"
    },
    {
      icon: Rocket,
      statistic: 3,
      suffix: "x",
      prefix: "",
      text: "Better Recall Performance",
      description: "Accelerated learning results",
      hasResearchBadge: true,
      badgeText: "Clinically Validated",
      accentColor: "bg-gradient-to-r from-purple-500 to-indigo-500"
    },
    {
      icon: CheckCircle,
      statistic: 6,
      suffix: "",
      text: "Learning Pathways Engaged",
      description: "Multi-modal cognitive approach",
      hasResearchBadge: true,
      badgeText: "Evidence-Based",
      accentColor: "bg-gradient-to-r from-indigo-500 to-blue-500"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          
          // Start counter animations
          benefits.forEach((benefit, index) => {
            let counterStart = 0;
            const counterEnd = benefit.statistic;
            const counterDuration = 2000; // 2 seconds
            const counterIncrement = counterEnd / (counterDuration / 16); // 60fps

            const counterTimer = setInterval(() => {
              counterStart += counterIncrement;
              if (counterStart >= counterEnd) {
                counterStart = counterEnd;
                clearInterval(counterTimer);
                
                // Trigger glow effect when animation completes
                setTimeout(() => {
                  setCompletedAnimations(prev => {
                    const newCompleted = [...prev];
                    newCompleted[index] = true;
                    return newCompleted;
                  });
                  
                  // Remove glow after 1 second
                  setTimeout(() => {
                    setCompletedAnimations(prev => {
                      const newCompleted = [...prev];
                      newCompleted[index] = false;
                      return newCompleted;
                    });
                  }, 1000);
                }, 100);
              }
              setAnimatedValues(prev => {
                const newValues = [...prev];
                newValues[index] = Math.floor(counterStart);
                return newValues;
              });
            }, 16);
          });
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isVisible]);

  return (
    <section 
      ref={sectionRef}
      className="py-16 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden"
    >
      {/* Glassmorphism background elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            const displayValue = isVisible ? animatedValues[index] : 0;
            const isCompleted = completedAnimations[index];
            
            return (
              <div 
                key={index} 
                className="group relative"
                style={{
                  animationDelay: `${index * 150}ms`
                }}
              >
                {/* Glassmorphism Card */}
                <div className="relative backdrop-blur-md bg-white/80 border border-white/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/90">
                  
                  {/* Research Badge */}
                  {benefit.hasResearchBadge && (
                    <div className="absolute top-3 right-3">
                      <div className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full border border-green-200">
                        {benefit.badgeText}
                      </div>
                    </div>
                  )}
                  
                  {/* Icon */}
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  
                  {/* Statistic with Glow Effect */}
                  <div className="text-center mb-4">
                    <div className={`text-3xl lg:text-4xl font-bold text-gray-900 leading-none transition-all duration-500 ${
                      isCompleted ? 'drop-shadow-[0_0_8px_rgba(59,130,246,0.6)] text-blue-700' : ''
                    }`}>
                      {benefit.prefix || ""}{displayValue.toLocaleString()}{benefit.suffix}
                    </div>
                    
                    {/* Subtle Accent Line */}
                    <div className="flex justify-center mt-3">
                      <div className={`h-0.5 w-12 rounded-full ${benefit.accentColor} opacity-60`}></div>
                    </div>
                  </div>
                  
                  {/* Text */}
                  <div className="text-center">
                    <h3 className="text-sm font-semibold text-gray-800 leading-tight mb-1">
                      {benefit.text}
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                  
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BenefitsStrip; 