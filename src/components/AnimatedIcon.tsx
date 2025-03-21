
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface AnimatedIconProps {
  icon: LucideIcon;
  size?: number;
  color?: string;
  strokeWidth?: number;
  className?: string;
  animation?: 'pulse' | 'float' | 'spin' | 'bounce' | 'none';
  delay?: number;
}

const AnimatedIcon: React.FC<AnimatedIconProps> = ({
  icon: Icon,
  size = 24,
  color,
  strokeWidth = 2,
  className,
  animation = 'none',
  delay = 0,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const getAnimationVariants = () => {
    switch (animation) {
      case 'pulse':
        return {
          initial: { scale: 0.95, opacity: 0.8 },
          animate: { 
            scale: [0.95, 1, 0.95], 
            opacity: [0.8, 1, 0.8],
            transition: { 
              repeat: Infinity, 
              duration: 2,
              ease: "easeInOut"
            } 
          }
        };
      case 'float':
        return {
          initial: { y: 0 },
          animate: { 
            y: [0, -8, 0],
            transition: { 
              repeat: Infinity, 
              duration: 3,
              ease: "easeInOut"
            } 
          }
        };
      case 'spin':
        return {
          initial: { rotate: 0 },
          animate: { 
            rotate: 360,
            transition: { 
              repeat: Infinity, 
              duration: 8,
              ease: "linear"
            } 
          }
        };
      case 'bounce':
        return {
          initial: { y: 0 },
          animate: { 
            y: [0, -10, 0],
            transition: { 
              repeat: Infinity, 
              duration: 1.2,
              type: "spring",
              stiffness: 300
            } 
          }
        };
      default:
        return {
          initial: { opacity: 0, scale: 0.9 },
          animate: { 
            opacity: 1, 
            scale: 1,
            transition: { 
              duration: 0.5,
              ease: "easeOut" 
            } 
          }
        };
    }
  };

  const variants = getAnimationVariants();

  return (
    <motion.div
      initial={variants.initial}
      animate={isVisible ? variants.animate : variants.initial}
      className={cn("inline-flex items-center justify-center", className)}
    >
      <Icon size={size} color={color} strokeWidth={strokeWidth} />
    </motion.div>
  );
};

export default AnimatedIcon;
