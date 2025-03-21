
import React from 'react';
import Hero from '../components/Hero/Hero';
import WidgetShowcase from '../components/WidgetShowcase/WidgetShowcase';
import FeatureSection from '@/shared/components/FeatureSection/FeatureSection';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { HOME_FEATURE_SECTIONS, HOME_HERO_DATA } from '../constants';

const Home: React.FC = () => {
  return (
    <>
      <Header />
      
      <main>
        <Hero
          title={HOME_HERO_DATA.title}
          subtitle={HOME_HERO_DATA.subtitle}
          ctaText={HOME_HERO_DATA.ctaText}
          ctaLink={HOME_HERO_DATA.ctaLink}
          secondaryCtaText={HOME_HERO_DATA.secondaryCtaText}
          secondaryCtaLink={HOME_HERO_DATA.secondaryCtaLink}
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
