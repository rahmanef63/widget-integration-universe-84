
import React from 'react';
import Hero from '../components/Hero/Hero';
import WidgetShowcase from '../components/WidgetShowcase/WidgetShowcase';
import FeatureSection from '@/shared/components/FeatureSection/FeatureSection';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { HOME_FEATURE_SECTIONS, HOME_HERO_DATA } from '../constants';
import { ROUTES } from '@/core/constants/routes';

const Home: React.FC = () => {
  // Ensure we're using the routes from our constants
  const heroData = {
    ...HOME_HERO_DATA,
    ctaLink: ROUTES.ECOSYSTEM,
    secondaryCtaLink: ROUTES.DOCUMENTATION
  };

  return (
    <>
      <Header />
      
      <main>
        <Hero
          title={heroData.title}
          subtitle={heroData.subtitle}
          ctaText={heroData.ctaText}
          ctaLink={heroData.ctaLink}
          secondaryCtaText={heroData.secondaryCtaText}
          secondaryCtaLink={heroData.secondaryCtaLink}
        />
        
        <div id="features">
          {HOME_FEATURE_SECTIONS.map((section, index) => (
            <FeatureSection
              key={index}
              title={section.title}
              subtitle={section.subtitle}
              features={section.features}
              reversed={section.reversed}
              illustration={section.illustration}
            />
          ))}
        </div>
        
        <WidgetShowcase
          title="Explore Our Widget Ecosystem"
          subtitle="Discover a wide range of enterprise-ready widgets to enhance your dashboards and applications."
        />
      </main>
      
      <Footer />
    </>
  );
};

export default Home;
