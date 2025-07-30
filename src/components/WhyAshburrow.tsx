import React from 'react';
import { Award, Users, BookOpen, Heart } from 'lucide-react';

const WhyAshburrow: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Built by Educators, Backed by Science
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We believe exam prep should work with your brain, not against it.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          <div>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Most study guides are passive, forgettable, and designed around rote memorization. 
              Ashburrow was created by instructional designers, learning scientists, and real-world 
              educators to give you something better: a research-based, professionally structured 
              path to exam mastery.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-6 bg-blue-50 rounded-xl">
                <Award className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <h4 className="font-semibold text-gray-900">Expert Built</h4>
                <p className="text-sm text-gray-600">By instructional designers</p>
              </div>
              <div className="text-center p-6 bg-teal-50 rounded-xl">
                <BookOpen className="h-8 w-8 text-teal-600 mx-auto mb-3" />
                <h4 className="font-semibold text-gray-900">Science Backed</h4>
                <p className="text-sm text-gray-600">Learning research proven</p>
              </div>
              <div className="text-center p-6 bg-orange-50 rounded-xl">
                <Users className="h-8 w-8 text-orange-600 mx-auto mb-3" />
                <h4 className="font-semibold text-gray-900">Real Educators</h4>
                <p className="text-sm text-gray-600">Field experience driven</p>
              </div>
              <div className="text-center p-6 bg-purple-50 rounded-xl">
                <Heart className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                <h4 className="font-semibold text-gray-900">Student Focused</h4>
                <p className="text-sm text-gray-600">Your success first</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-600 to-teal-600 p-8 rounded-2xl text-white">
            <h3 className="text-2xl font-bold mb-6">Why We Exist:</h3>
            <p className="text-lg leading-relaxed opacity-95">
              Too many learners fail—not because they aren't smart, but because traditional study 
              systems don't teach how to learn. We built Ashburrow to empower you with the tools, 
              strategies, and confidence to succeed in your profession from day one.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyAshburrow;