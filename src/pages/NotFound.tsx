
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <Header />
      
      <div className="min-h-screen flex items-center justify-center bg-background pt-16 pb-16">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-md mx-auto"
          >
            <h1 className="text-7xl font-display font-bold text-primary mb-4">404</h1>
            <h2 className="text-2xl font-display font-medium mb-4">Page Not Found</h2>
            <p className="text-muted-foreground mb-8">
              Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
            </p>
            
            <Link
              to="/"
              className="inline-flex items-center px-5 py-3 rounded-full bg-primary text-primary-foreground font-medium shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:scale-105 transition-all duration-300"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Home
            </Link>
          </motion.div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default NotFound;
