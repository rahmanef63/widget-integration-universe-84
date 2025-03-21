
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/core/constants/routes';
import { motion } from 'framer-motion';

const NotFound: React.FC = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-background pt-20 pb-16 flex items-center">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-6xl md:text-8xl font-display font-bold text-primary">404</h1>
            <h2 className="text-2xl md:text-3xl font-medium mt-4 mb-6">Page Not Found</h2>
            <p className="text-lg text-muted-foreground max-w-md mx-auto mb-8">
              The page you are looking for doesn't exist or has been moved.
            </p>
            <Link 
              to={ROUTES.HOME}
              className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-medium transition-all"
            >
              Return Home
            </Link>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
