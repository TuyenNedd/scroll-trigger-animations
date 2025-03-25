import { useRef } from 'react';
import { motion, useTransform, useScroll } from 'framer-motion';
import { useSpring } from '@use-gesture/react';

const ScrollAnimatedCard = ({ children, className, index = 0 }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  
  // Scale and opacity animations based on scroll position
  const scale = useTransform(
    scrollYProgress, 
    [0, 0.5, 1], 
    [0.8, 1, 0.8]
  );
  
  const opacity = useTransform(
    scrollYProgress, 
    [0, 0.2, 0.8, 1], 
    [0.3, 1, 1, 0.3]
  );

  // Incorporate use-gesture spring effect for enhanced interactivity
  const [{ y }, api] = useSpring(() => ({ y: 0 }));
  
  const bindGesture = useSpring(({ down, movement: [mx, my] }) => {
    api.start({ y: down ? my / 5 : 0 });
  });

  return (
    <div ref={ref} className={`w-full mb-16 ${className}`}>
      <motion.div
        {...bindGesture()}
        style={{ 
          scale,
          opacity,
          y, // Apply the spring effect here
          translateY: useTransform(
            scrollYProgress,
            [0, 1],
            [100 * (index + 1), -100 * (index + 1)]
          ),
        }}
        className="bg-white rounded-lg shadow-xl p-8 transform transition-all"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default ScrollAnimatedCard;