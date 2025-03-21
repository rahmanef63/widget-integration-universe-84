
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useInView } from 'react-intersection-observer';

interface WidgetCardProps {
  title: string;
  description: string;
  icon: React.ReactNode | string;
  index?: number;
  className?: string;
  onClick?: () => void;
  delay?: number;
  layout?: 'vertical' | 'horizontal';
  metadata?: Array<{ label: string; value: string }>;
}

const WidgetCard: React.FC<WidgetCardProps> = ({
  title,
  description,
  icon,
  index = 0,
  className,
  onClick,
  delay = 0,
  layout = 'vertical',
  metadata = [],
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ 
        duration: 0.5, 
        delay: delay || index * 0.1,
        ease: [0.645, 0.045, 0.355, 1.000]
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className={cn(
        'relative overflow-hidden rounded-2xl p-6 glassmorphism border border-white/10',
        'transition-all duration-300 ease-out cursor-pointer group',
        isHovered ? 'shadow-xl scale-[1.02]' : 'shadow-md',
        layout === 'horizontal' ? 'flex items-center gap-4' : '',
        className
      )}
    >
      {/* Background gradient */}
      <div 
        className={cn(
          "absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out bg-gradient-to-br from-primary/10 to-blue-500/5",
          isHovered ? "opacity-100" : "opacity-0"
        )}
      />

      {/* Icon */}
      <div className={cn(
        "relative flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary",
        layout === 'horizontal' ? 'flex-shrink-0' : 'mb-4'
      )}>
        {typeof icon === 'string' ? icon : icon}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isHovered ? { scale: 1.2, opacity: 0.3 } : { scale: 0, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 rounded-xl bg-primary"
        />
      </div>

      {/* Content */}
      <div className="relative">
        <h3 className="text-xl font-display font-medium mb-2 transition-colors duration-300 group-hover:text-primary">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm">
          {description}
        </p>
        
        {/* Metadata section */}
        {metadata.length > 0 && (
          <div className={cn(
            "grid gap-2 mt-4",
            layout === 'horizontal' ? 'grid-cols-3' : 'grid-cols-2',
            "text-xs text-muted-foreground"
          )}>
            {metadata.map((item, i) => (
              <div key={i} className="flex flex-col">
                <span className="font-medium">{item.label}</span>
                <span>{item.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Hover effect border */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 border border-primary/20 rounded-2xl pointer-events-none"
      />
    </motion.div>
  );
};

export default WidgetCard;
