
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Layers, Database, Layout, Shield, Server, Zap, Code, GitBranch, Users, PieChart, Workflow, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimatedIcon from '@/components/AnimatedIcon';

interface PlatformEntity {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  details: string;
}

const Ecosystem: React.FC = () => {
  const [activeEntity, setActiveEntity] = useState<string>('widget-provider');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  // Platform entities data
  const entities: PlatformEntity[] = [
    {
      id: 'widget-provider',
      name: 'Widget Provider',
      description: 'Develop and publish standardized widgets for the ecosystem',
      icon: <AnimatedIcon icon={Code} animation="pulse" size={28} />,
      features: [
        'Standardized component framework',
        'TypeScript integration with strict typing',
        'Automated testing and validation',
        'Versioning and release management',
        'Documentation generation'
      ],
      details: 'The Widget Provider platform enables teams to develop high-quality, standardized widgets using a component-based architecture. With built-in TypeScript integration, developers can ensure type safety across all aspects of widget development. The platform includes tools for automated testing, validation against platform standards, and seamless publishing to the Widget Store.'
    },
    {
      id: 'widget-store',
      name: 'Widget Store',
      description: 'Central repository for widget distribution and discovery',
      icon: <AnimatedIcon icon={Database} animation="pulse" size={28} />,
      features: [
        'Comprehensive widget registry',
        'Metadata management',
        'Version control and compatibility checking',
        'CDN distribution for global availability',
        'Usage analytics and telemetry'
      ],
      details: 'The Widget Store serves as the central hub for widget distribution and discovery across the enterprise. It manages widget metadata, ensures version compatibility, and provides a robust API for widget discovery and retrieval. The store leverages a global CDN network for high-performance widget distribution and includes sophisticated analytics for tracking widget usage and performance metrics.'
    },
    {
      id: 'dashboard-integration',
      name: 'Dashboard Integration',
      description: 'Seamlessly integrate widgets into host applications',
      icon: <AnimatedIcon icon={Layout} animation="pulse" size={28} />,
      features: [
        'Dynamic widget loading system',
        'Sandboxed execution environment',
        'Error boundary implementation',
        'Performance monitoring',
        'Cross-widget communication'
      ],
      details: 'The Dashboard Integration platform enables applications to seamlessly integrate widgets from the Widget Store. It provides a robust widget loading system with support for code splitting, lazy loading, and error isolation. The platform includes a sophisticated sandboxing system to ensure widget security and performance isolation, along with comprehensive monitoring and analytics capabilities.'
    },
    {
      id: 'security-services',
      name: 'Security Services',
      description: 'Enterprise-grade security for the widget ecosystem',
      icon: <AnimatedIcon icon={Shield} animation="pulse" size={28} />,
      features: [
        'OAuth 2.0 and OpenID Connect integration',
        'Role-based access control',
        'Content Security Policy enforcement',
        'Resource limitation and monitoring',
        'Security audit logging'
      ],
      details: 'Security Services provide comprehensive protection across the widget ecosystem. From authentication and authorization to sandboxed execution environments, these services ensure that widgets operate securely within their intended boundaries. Advanced features include fine-grained permission controls, resource monitoring to prevent abuse, and detailed security audit logs for compliance and forensic analysis.'
    },
    {
      id: 'analytics-platform',
      name: 'Analytics Platform',
      description: 'Comprehensive telemetry and performance insights',
      icon: <AnimatedIcon icon={PieChart} animation="pulse" size={28} />,
      features: [
        'Real-time performance monitoring',
        'Usage pattern analysis',
        'Error tracking and reporting',
        'Custom metrics collection',
        'Interactive dashboards and reports'
      ],
      details: 'The Analytics Platform collects comprehensive telemetry data across the widget ecosystem, providing real-time insights into widget performance, usage patterns, and error conditions. With support for custom metrics and dimensions, organizations can track business-specific KPIs and correlate them with technical performance data. The platform includes powerful visualization tools for exploring data and identifying trends or anomalies.'
    },
    {
      id: 'integration-platform',
      name: 'Integration Platform',
      description: 'Connect widgets with enterprise systems and services',
      icon: <AnimatedIcon icon={Workflow} animation="pulse" size={28} />,
      features: [
        'API gateway for centralized access',
        'Service mesh for inter-service communication',
        'Event bus for asynchronous messaging',
        'Caching layer for performance optimization',
        'Circuit breakers for resilience'
      ],
      details: 'The Integration Platform provides the infrastructure for connecting widgets with enterprise systems and services. It includes an API gateway for centralized access control, a service mesh for reliable service-to-service communication, and an event bus for asynchronous messaging. Advanced features include intelligent caching, circuit breakers for preventing cascading failures, and comprehensive request tracing for debugging and performance optimization.'
    }
  ];

  // Select an entity
  const handleEntitySelect = (id: string) => {
    setActiveEntity(id);
  };

  // Get active entity details
  const getActiveEntity = () => {
    return entities.find(entity => entity.id === activeEntity) || entities[0];
  };

  const activeEntityData = getActiveEntity();

  return (
    <>
      <Header />
      
      <div className="pt-20 min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-16 md:py-24 hero-gradient">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-sm font-medium px-3 py-1 rounded-full bg-primary/10 text-primary inline-block mb-4"
              >
                Enterprise Ecosystem
              </motion.span>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-3xl md:text-5xl font-display font-semibold leading-tight mb-6"
              >
                Widget Integration Ecosystem
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg text-muted-foreground"
              >
                A comprehensive platform connecting widget providers, stores, and applications for seamless enterprise integration
              </motion.p>
            </div>
          </div>
        </section>

        {/* Ecosystem Overview */}
        <section className="py-16 md:py-24" ref={ref}>
          <div className="container max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Sidebar Entity Selection */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                  className="sticky top-24 glassmorphism rounded-2xl p-6 border border-white/10"
                >
                  <h2 className="text-xl font-display font-medium mb-6">
                    Platform Components
                  </h2>
                  
                  <div className="space-y-2">
                    {entities.map((entity) => (
                      <button
                        key={entity.id}
                        onClick={() => handleEntitySelect(entity.id)}
                        className={cn(
                          "w-full flex items-center p-3 rounded-xl transition-all text-left",
                          activeEntity === entity.id
                            ? "bg-primary/10 text-primary"
                            : "hover:bg-foreground/5 text-foreground/80"
                        )}
                      >
                        <div className="mr-3">
                          {entity.icon}
                        </div>
                        <div>
                          <h3 className="font-medium text-sm">
                            {entity.name}
                          </h3>
                          <p className="text-xs text-muted-foreground line-clamp-1">
                            {entity.description}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              </div>
              
              {/* Entity Details */}
              <div className="lg:col-span-2">
                <motion.div
                  key={activeEntityData.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="glassmorphism rounded-2xl p-8 border border-white/10"
                >
                  <div className="flex items-center mb-6">
                    <div className="mr-4 p-3 rounded-xl bg-primary/10">
                      {activeEntityData.icon}
                    </div>
                    <div>
                      <h2 className="text-2xl font-display font-medium">
                        {activeEntityData.name}
                      </h2>
                      <p className="text-muted-foreground">
                        {activeEntityData.description}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-8">
                    {activeEntityData.details}
                  </p>
                  
                  <h3 className="text-lg font-medium mb-4">Key Features</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                    {activeEntityData.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center p-3 bg-foreground/5 rounded-lg"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mr-3"></span>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="flex justify-end">
                    <a
                      href={`/documentation#${activeEntityData.id}`}
                      className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors"
                    >
                      View Documentation
                    </a>
                  </div>
                </motion.div>
                
                {/* Integration Diagram */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="mt-8 glassmorphism rounded-2xl p-8 border border-white/10"
                >
                  <h3 className="text-xl font-display font-medium mb-6">
                    Platform Integration
                  </h3>
                  
                  <div className="relative h-80 sm:h-96 md:h-[400px] overflow-hidden rounded-xl bg-foreground/5 p-6">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="w-full h-full max-w-3xl" viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
                        {/* Center Platform Circle */}
                        <motion.circle
                          initial={{ r: 0 }}
                          animate={{ r: 60 }}
                          transition={{ duration: 1, delay: 0.2 }}
                          cx="400" cy="200" fill="hsl(var(--primary)/0.2)" stroke="hsl(var(--primary))" strokeWidth="2"
                        />
                        <motion.text
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5, delay: 1.2 }}
                          x="400" y="205" textAnchor="middle" fill="currentColor" fontSize="14" fontWeight="500"
                        >
                          Integration Platform
                        </motion.text>
                        
                        {/* Connecting Lines */}
                        {/* Widget Provider */}
                        <motion.path
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1, delay: 0.5 }}
                          d="M245,120 L340,170"
                          stroke="hsl(var(--primary))"
                          strokeWidth="2"
                          fill="none"
                          strokeDasharray="6 4"
                        />
                        
                        {/* Widget Store */}
                        <motion.path
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1, delay: 0.6 }}
                          d="M245,200 L340,200"
                          stroke="hsl(var(--primary))"
                          strokeWidth="2"
                          fill="none"
                          strokeDasharray="6 4"
                        />
                        
                        {/* Dashboard */}
                        <motion.path
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1, delay: 0.7 }}
                          d="M245,280 L340,230"
                          stroke="hsl(var(--primary))"
                          strokeWidth="2"
                          fill="none"
                          strokeDasharray="6 4"
                        />
                        
                        {/* Security */}
                        <motion.path
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1, delay: 0.8 }}
                          d="M555,120 L460,170"
                          stroke="hsl(var(--primary))"
                          strokeWidth="2"
                          fill="none"
                          strokeDasharray="6 4"
                        />
                        
                        {/* Analytics */}
                        <motion.path
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1, delay: 0.9 }}
                          d="M555,200 L460,200"
                          stroke="hsl(var(--primary))"
                          strokeWidth="2"
                          fill="none"
                          strokeDasharray="6 4"
                        />
                        
                        {/* Enterprise Systems */}
                        <motion.path
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1, delay: 1 }}
                          d="M555,280 L460,230"
                          stroke="hsl(var(--primary))"
                          strokeWidth="2"
                          fill="none"
                          strokeDasharray="6 4"
                        />
                        
                        {/* Entity Circles */}
                        {/* Left Side */}
                        <motion.circle
                          initial={{ r: 0 }}
                          animate={{ r: 40 }}
                          transition={{ duration: 0.8, delay: 0.3 }}
                          cx="180" cy="120" fill={activeEntity === 'widget-provider' ? "hsl(var(--primary)/0.3)" : "hsl(var(--primary)/0.1)"} 
                          stroke={activeEntity === 'widget-provider' ? "hsl(var(--primary))" : "hsl(var(--primary)/0.5)"} 
                          strokeWidth="1.5"
                          className="cursor-pointer"
                          onClick={() => handleEntitySelect('widget-provider')}
                        />
                        <motion.text
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5, delay: 1.1 }}
                          x="180" y="125" textAnchor="middle" fill="currentColor" fontSize="12" fontWeight="500"
                          className="pointer-events-none"
                        >
                          Widget Provider
                        </motion.text>
                        
                        <motion.circle
                          initial={{ r: 0 }}
                          animate={{ r: 40 }}
                          transition={{ duration: 0.8, delay: 0.4 }}
                          cx="180" cy="200" fill={activeEntity === 'widget-store' ? "hsl(var(--primary)/0.3)" : "hsl(var(--primary)/0.1)"}
                          stroke={activeEntity === 'widget-store' ? "hsl(var(--primary))" : "hsl(var(--primary)/0.5)"}
                          strokeWidth="1.5"
                          className="cursor-pointer"
                          onClick={() => handleEntitySelect('widget-store')}
                        />
                        <motion.text
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5, delay: 1.1 }}
                          x="180" y="205" textAnchor="middle" fill="currentColor" fontSize="12" fontWeight="500"
                          className="pointer-events-none"
                        >
                          Widget Store
                        </motion.text>
                        
                        <motion.circle
                          initial={{ r: 0 }}
                          animate={{ r: 40 }}
                          transition={{ duration: 0.8, delay: 0.5 }}
                          cx="180" cy="280" fill={activeEntity === 'dashboard-integration' ? "hsl(var(--primary)/0.3)" : "hsl(var(--primary)/0.1)"}
                          stroke={activeEntity === 'dashboard-integration' ? "hsl(var(--primary))" : "hsl(var(--primary)/0.5)"}
                          strokeWidth="1.5"
                          className="cursor-pointer"
                          onClick={() => handleEntitySelect('dashboard-integration')}
                        />
                        <motion.text
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5, delay: 1.1 }}
                          x="180" y="285" textAnchor="middle" fill="currentColor" fontSize="12" fontWeight="500"
                          className="pointer-events-none"
                        >
                          Dashboard
                        </motion.text>
                        
                        {/* Right Side */}
                        <motion.circle
                          initial={{ r: 0 }}
                          animate={{ r: 40 }}
                          transition={{ duration: 0.8, delay: 0.6 }}
                          cx="620" cy="120" fill={activeEntity === 'security-services' ? "hsl(var(--primary)/0.3)" : "hsl(var(--primary)/0.1)"}
                          stroke={activeEntity === 'security-services' ? "hsl(var(--primary))" : "hsl(var(--primary)/0.5)"}
                          strokeWidth="1.5"
                          className="cursor-pointer"
                          onClick={() => handleEntitySelect('security-services')}
                        />
                        <motion.text
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5, delay: 1.1 }}
                          x="620" y="125" textAnchor="middle" fill="currentColor" fontSize="12" fontWeight="500"
                          className="pointer-events-none"
                        >
                          Security Services
                        </motion.text>
                        
                        <motion.circle
                          initial={{ r: 0 }}
                          animate={{ r: 40 }}
                          transition={{ duration: 0.8, delay: 0.7 }}
                          cx="620" cy="200" fill={activeEntity === 'analytics-platform' ? "hsl(var(--primary)/0.3)" : "hsl(var(--primary)/0.1)"}
                          stroke={activeEntity === 'analytics-platform' ? "hsl(var(--primary))" : "hsl(var(--primary)/0.5)"}
                          strokeWidth="1.5"
                          className="cursor-pointer"
                          onClick={() => handleEntitySelect('analytics-platform')}
                        />
                        <motion.text
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5, delay: 1.1 }}
                          x="620" y="205" textAnchor="middle" fill="currentColor" fontSize="12" fontWeight="500"
                          className="pointer-events-none"
                        >
                          Analytics
                        </motion.text>
                        
                        <motion.circle
                          initial={{ r: 0 }}
                          animate={{ r: 40 }}
                          transition={{ duration: 0.8, delay: 0.8 }}
                          cx="620" cy="280" fill={activeEntity === 'integration-platform' ? "hsl(var(--primary)/0.3)" : "hsl(var(--primary)/0.1)"}
                          stroke={activeEntity === 'integration-platform' ? "hsl(var(--primary))" : "hsl(var(--primary)/0.5)"}
                          strokeWidth="1.5"
                          className="cursor-pointer"
                          onClick={() => handleEntitySelect('integration-platform')}
                        />
                        <motion.text
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5, delay: 1.1 }}
                          x="620" y="285" textAnchor="middle" fill="currentColor" fontSize="12" fontWeight="500"
                          className="pointer-events-none"
                        >
                          Enterprise Systems
                        </motion.text>
                      </svg>
                    </div>
                  </div>
                  
                  <p className="mt-4 text-sm text-muted-foreground text-center">
                    Click on any entity in the diagram to view its details
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Use Cases */}
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-3xl md:text-4xl font-display font-medium mb-4"
              >
                Enterprise Use Cases
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-lg text-muted-foreground"
              >
                Real-world applications of the Widget Integration Platform across industries
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Use Case 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="glassmorphism rounded-2xl p-6 border border-white/10"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <Globe className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-display font-medium mb-3">
                  Global Financial Dashboard
                </h3>
                <p className="text-muted-foreground mb-4">
                  A multinational bank uses the platform to integrate financial widgets from various departments and regions into a unified executive dashboard.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></span>
                    <span>Real-time data integration</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></span>
                    <span>Secure multi-region access</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></span>
                    <span>Compliance with financial regulations</span>
                  </li>
                </ul>
              </motion.div>
              
              {/* Use Case 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="glassmorphism rounded-2xl p-6 border border-white/10"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <Users className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-display font-medium mb-3">
                  Healthcare Provider Portal
                </h3>
                <p className="text-muted-foreground mb-4">
                  A healthcare network uses the platform to create a unified provider portal integrating widgets from different medical systems and services.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></span>
                    <span>HIPAA-compliant data handling</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></span>
                    <span>EMR/EHR system integration</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></span>
                    <span>Customizable provider interfaces</span>
                  </li>
                </ul>
              </motion.div>
              
              {/* Use Case 3 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="glassmorphism rounded-2xl p-6 border border-white/10"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <GitBranch className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-display font-medium mb-3">
                  Manufacturing Operations Center
                </h3>
                <p className="text-muted-foreground mb-4">
                  A global manufacturer uses the platform to create a centralized operations dashboard integrating widgets from various production facilities.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></span>
                    <span>IoT sensor data integration</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></span>
                    <span>Real-time production monitoring</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></span>
                    <span>Predictive maintenance analytics</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 md:py-24 hero-gradient">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-display font-medium mb-6">
                Ready to Explore the Ecosystem?
              </h2>
              <p className="text-lg text-muted-foreground mb-10">
                Discover how the Widget Integration Platform can transform your enterprise application strategy.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/"
                  className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:scale-105 transition-all duration-300"
                >
                  Start Integration
                </a>
                <a
                  href="/documentation"
                  className="px-6 py-3 rounded-full border border-foreground/20 text-foreground font-medium hover:bg-foreground/5 transition-all duration-300"
                >
                  View Documentation
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
      
      <Footer />
    </>
  );
};

export default Ecosystem;
