
import React from 'react';
import { motion } from 'framer-motion';
import { WAVE_ANIMATION_CONFIG } from '../../constants/features';

interface WaveAnimationProps {
  className?: string;
}

const WaveAnimation: React.FC<WaveAnimationProps> = ({ className }) => {
  const { pathTransition, secondPathTransition } = WAVE_ANIMATION_CONFIG;
  
  return (
    <div className={`absolute inset-x-0 bottom-0 h-20 md:h-32 z-0 overflow-hidden ${className || ''}`}>
      <svg
        className="absolute bottom-0 w-full h-full"
        viewBox="0 0 1440 320"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.1 }}
          transition={pathTransition}
          fill="currentColor"
          fillOpacity="0.1"
          d="M0,192L48,176C96,160,192,128,288,122.7C384,117,480,139,576,165.3C672,192,768,224,864,213.3C960,203,1056,149,1152,122.7C1248,96,1344,96,1392,96L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        />
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.07 }}
          transition={secondPathTransition}
          fill="currentColor"
          fillOpacity="0.07"
          d="M0,288L48,272C96,256,192,224,288,208C384,192,480,192,576,186.7C672,181,768,171,864,186.7C960,203,1056,245,1152,234.7C1248,224,1344,160,1392,128L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        />
      </svg>
    </div>
  );
};

export default WaveAnimation;
