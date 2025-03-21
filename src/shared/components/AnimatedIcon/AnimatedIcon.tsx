
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { renderIcon } from '@/shared/icon-picker/utils';

type AnimationType = 'pulse' | 'spin' | 'bounce' | 'wave' | 'none';

interface AnimatedIconProps {
  icon: LucideIcon | string;
  size?: number;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  color?: string;
  className?: string;
}

const AnimatedIcon: React.FC<AnimatedIconProps> = ({
  icon,
  size = 24,
  animation = 'none',
  delay = 0,
  duration = 2,
  color,
  className,
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Only render animations on client side to avoid hydration issues
  if (!isClient) {
    if (typeof icon === 'string') {
      return renderIcon(icon, { size, className });
    } else {
      const IconComponent = icon as LucideIcon;
      return <IconComponent size={size} className={className} />;
    }
  }

  // Animation variants
  const getAnimationVariants = () => {
    switch (animation) {
      case 'pulse':
        return {
          animate: {
            scale: [1, 1.1, 1],
            transition: {
              delay,
              duration,
              repeat: Infinity,
              repeatDelay: 1,
            },
          },
        };
      case 'spin':
        return {
          animate: {
            rotate: 360,
            transition: {
              delay,
              duration,
              repeat: Infinity,
              ease: 'linear',
            },
          },
        };
      case 'bounce':
        return {
          animate: {
            y: [0, -8, 0],
            transition: {
              delay,
              duration: duration * 0.75,
              repeat: Infinity,
              repeatDelay: 0.5,
            },
          },
        };
      case 'wave':
        return {
          animate: {
            rotate: [0, 15, 0, -15, 0],
            transition: {
              delay,
              duration: duration * 0.8,
              repeat: Infinity,
              repeatDelay: 1,
            },
          },
        };
      default:
        return {};
    }
  };

  const { animate, ...animationVariants } = getAnimationVariants();

  const renderAnimatedIcon = () => {
    if (typeof icon === 'string') {
      return renderIcon(icon, { size });
    } else {
      const IconComponent = icon as LucideIcon;
      return <IconComponent size={size} />;
    }
  };

  return (
    <motion.div
      animate={animate}
      {...animationVariants}
      style={{ display: 'inline-flex', color }}
      className={className}
    >
      {renderAnimatedIcon()}
    </motion.div>
  );
};

export default AnimatedIcon;
