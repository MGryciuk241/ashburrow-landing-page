import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import BenefitsStrip from './components/BenefitsStrip';
import ProblemSection from './components/ProblemSection';
import DiamondMethod from './components/DiamondMethod';
import PSWOffering from './components/PSWOffering';
import WhyAshburrow from './components/WhyAshburrow';
import SocialProof from './components/SocialProof';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="pt-16">
        <HeroSection />
        <BenefitsStrip />
        <ProblemSection />
        <DiamondMethod />
        <PSWOffering />
        <WhyAshburrow />
        <SocialProof />
        <FinalCTA />
        <Footer />
      </div>
    </div>
  );
}

export default App;