
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ChevronDown, Menu, X, Globe, Layers, FileText } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Header: React.FC = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMobileMenuOpen(false);

  const navItems = [
    { path: '/', label: 'Home', icon: <Globe className="mr-2 h-4 w-4" /> },
    { path: '/ecosystem', label: 'Ecosystem', icon: <Layers className="mr-2 h-4 w-4" /> },
    { path: '/documentation', label: 'Documentation', icon: <FileText className="mr-2 h-4 w-4" /> },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out',
        isScrolled 
          ? 'py-2 glassmorphism shadow-sm' 
          : 'py-4 bg-transparent'
      )}
    >
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <NavLink to="/" className="flex items-center">
            <span className="text-xl font-display font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
              WidgetUniverse
            </span>
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => cn(
                  'px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center',
                  isActive 
                    ? 'text-primary bg-primary/10' 
                    : 'text-foreground/80 hover:text-foreground hover:bg-foreground/5'
                )}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <a
              href="#integration"
              className="px-5 py-2 rounded-full bg-primary text-primary-foreground font-medium text-sm shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:scale-105 transition-all duration-300"
            >
              Try Integration
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-foreground p-2"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobile && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: mobileMenuOpen ? 1 : 0, 
            height: mobileMenuOpen ? 'auto' : 0 
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="md:hidden overflow-hidden glassmorphism"
        >
          <div className="px-4 py-2 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={closeMenu}
                className={({ isActive }) => cn(
                  'block px-4 py-3 rounded-lg text-sm font-medium transition-all flex items-center',
                  isActive 
                    ? 'text-primary bg-primary/10' 
                    : 'text-foreground/80 hover:text-foreground hover:bg-foreground/5'
                )}
              >
                {item.icon}
                {item.label}
              </NavLink>
            ))}
            <a
              href="#integration"
              onClick={closeMenu}
              className="block w-full mt-4 px-4 py-3 rounded-lg bg-primary text-primary-foreground font-medium text-sm text-center"
            >
              Try Integration
            </a>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;
