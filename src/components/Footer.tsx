
import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Platform',
      links: [
        { name: 'Home', href: '/' },
        { name: 'Ecosystem', href: '/ecosystem' },
        { name: 'Documentation', href: '/documentation' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Integration Guide', href: '/documentation#integration' },
        { name: 'Best Practices', href: '/documentation#best-practices' },
        { name: 'API Reference', href: '/documentation#api' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About', href: '#' },
        { name: 'Contact', href: '#' },
        { name: 'Privacy Policy', href: '#' }
      ]
    }
  ];

  const socialLinks = [
    { name: 'GitHub', icon: <Github size={18} />, href: '#' },
    { name: 'Twitter', icon: <Twitter size={18} />, href: '#' },
    { name: 'LinkedIn', icon: <Linkedin size={18} />, href: '#' },
    { name: 'Email', icon: <Mail size={18} />, href: '#' }
  ];

  return (
    <footer className="bg-background border-t border-border">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <NavLink to="/" className="inline-block">
              <span className="text-xl font-display font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
                WidgetUniverse
              </span>
            </NavLink>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              Comprehensive enterprise-grade widget integration platform for seamless cross-application experiences.
            </p>
            
            <div className="mt-6 flex space-x-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  aria-label={link.name}
                  className="h-9 w-9 flex items-center justify-center rounded-full bg-foreground/5 text-foreground/70 hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
          
          {/* Links */}
          {footerLinks.map((group, groupIdx) => (
            <div key={groupIdx} className="col-span-1">
              <h3 className="text-sm font-medium mb-4">{group.title}</h3>
              <ul className="space-y-3">
                {group.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <a 
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} WidgetUniverse. All rights reserved.
          </p>
          
          <div className="mt-4 md:mt-0 flex space-x-6">
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
