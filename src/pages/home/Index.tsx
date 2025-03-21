
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from './components/HeroSection';
import WidgetSystemsGrid from './components/WidgetSystemsGrid';
import ArchitectureSection from './components/ArchitectureSection';
import IntegrationSection from './components/IntegrationSection';
import CtaSection from './components/CtaSection';

const Index: React.FC = () => {
  return (
    <>
      <Header />
      <HeroSection />
      <WidgetSystemsGrid />
      <ArchitectureSection />
      <IntegrationSection />
      <CtaSection />
      <Footer />
    </>
  );
};

export default Index;
