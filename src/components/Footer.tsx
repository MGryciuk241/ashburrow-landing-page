import React from 'react';
import { GraduationCap, Mail, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center mb-4">
              <GraduationCap className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-xl font-bold">Ashburrow</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Empowering professionals with research-based learning systems for certification success.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Programs</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">PSW Certification</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Healthcare Assistant</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Upcoming Programs</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-3" />
                <span>hello@ashburrow.ca</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-3" />
                <span>Serving students across Canada</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Ashburrow. All rights reserved. Built for better learning.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;