import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useInView } from 'react-intersection-observer';
import AnimatedIcon from './AnimatedIcon';
import { LucideIcon } from 'lucide-react';

interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
}

interface FeatureSectionProps {
  title: string;
  subtitle: string;
  features: Feature[];
  className?: string;
  reversed?: boolean;
  illustration?: React.ReactNode;
}

const FeatureSection: React.FC<FeatureSectionProps> = ({
  title,
  subtitle,
  features,
  className,
  reversed = false,
  illustration,
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const featureVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.645, 0.045, 0.355, 1.000]
      }
    },
  };

  return (
    <section ref={ref} className={cn("py-16 md:py-24", className)}>
      <div className="container px-4 mx-auto">
        <div className={cn(
          "flex flex-col gap-12 items-start lg:items-center",
          reversed ? "lg:flex-row-reverse" : "lg:flex-row"
        )}>
          {/* Text Content */}
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="max-w-lg mx-auto lg:mx-0"
            >
              <span className="text-sm font-medium px-3 py-1 rounded-full bg-primary/10 text-primary inline-block mb-4">
                {subtitle}
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-medium leading-tight mb-6">
                {title}
              </h2>
              
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="space-y-8 mt-10"
              >
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    variants={featureVariants}
                    className="flex items-start"
                  >
                    <div className="flex-shrink-0 mr-4">
                      <div className="p-2 rounded-xl bg-primary/10 text-primary">
                        <AnimatedIcon 
                          icon={feature.icon} 
                          animation="pulse" 
                          delay={index * 200} 
                        />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
          
          {/* Illustration */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="w-full max-w-md"
            >
              {illustration}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
