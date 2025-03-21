
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Documentation: React.FC = () => {
  // This is a placeholder that will be expanded with the existing Documentation component code
  return (
    <>
      <Header />
      <div className="min-h-screen bg-background pt-20 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Documentation</h1>
          <p className="text-lg text-muted-foreground mt-4">
            Widget Integration Platform documentation will be refactored here.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Documentation;
