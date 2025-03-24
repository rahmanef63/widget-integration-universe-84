
import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

interface WidgetSystemCardProps {
  title: string;
  description: string;
  icon: string;
  link: string;
  index: number;
}

const WidgetSystemCard: React.FC<WidgetSystemCardProps> = ({
  title,
  description,
  icon,
  link,
  index
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-card border rounded-lg p-6 hover:shadow-lg transition-all duration-300"
    >
      <div className="flex items-start gap-4">
        <div className="p-3 bg-primary/10 rounded-lg">
          <img src={icon} alt={title} className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-medium mb-2">{title}</h3>
          <p className="text-muted-foreground text-sm mb-4">{description}</p>
          <Link 
            to={link}
            className="text-primary hover:text-primary/80 text-sm font-medium inline-flex items-center"
          >
            Learn more <ExternalLink className="ml-1 h-3 w-3" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const WidgetSystemsGrid: React.FC = () => {
  const systems = [
    {
      title: 'Analytics Widgets',
      description: 'Real-time data visualization and analytics dashboards',
      icon: '/placeholder.svg',
      link: '/documentation#analytics'
    },
    {
      title: 'Process Automation',
      description: 'Automate workflows and business processes with interactive widgets',
      icon: '/placeholder.svg',
      link: '/documentation#automation'
    },
    {
      title: 'Integration Connectors',
      description: 'Connect to external systems and third-party services',
      icon: '/placeholder.svg',
      link: '/documentation#integration'
    },
    {
      title: 'Form Builders',
      description: 'Create custom forms and surveys with validation and logic',
      icon: '/placeholder.svg',
      link: '/documentation#forms'
    },
    {
      title: 'Data Management',
      description: 'Advanced data tables, filters, and management tools',
      icon: '/placeholder.svg',
      link: '/documentation#data'
    },
    {
      title: 'Notification System',
      description: 'Real-time alerts, notifications and messaging widgets',
      icon: '/placeholder.svg',
      link: '/documentation#notifications'
    }
  ];

  return (
    <section id="widget-systems" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-display font-semibold">Widget Ecosystems</h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            Discover the different widget systems available for various use cases and industries
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {systems.map((system, index) => (
            <WidgetSystemCard key={index} {...system} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WidgetSystemsGrid;
