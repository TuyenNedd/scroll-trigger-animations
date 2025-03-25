import { useRef } from 'react';
import { motion, useTransform, useScroll } from 'framer-motion';
import { useGesture } from '@use-gesture/react';

const ParallaxSection = ({ imageUrl, title, description, speed = 0.5 }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  // Create parallax effect based on scroll position
  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${speed * 100}%`]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  
  // Use gesture for interactive hover and drag effects
  const [dragProps, api] = useRef({ x: 0, y: 0, scale: 1, rotateZ: 0 }).current;
  
  const bind = useGesture({
    onHover: ({ hovering }) => {
      if (hovering) {
        api.scale = 1.05;
        api.rotateZ = 2;
      } else {
        api.scale = 1;
        api.rotateZ = 0;
      }
    },
    onDrag: ({ offset: [x, y] }) => {
      api.x = x / 10;
      api.y = y / 10;
    },
    onDragEnd: () => {
      api.x = 0;
      api.y = 0;
    }
  });

  return (
    <div 
      ref={ref} 
      className="relative w-full h-screen overflow-hidden flex items-center justify-center"
    >
      <motion.div 
        className="absolute inset-0 w-full h-full"
        style={{ 
          y,
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          scale
        }}
      />
      <motion.div 
        {...bind()}
        className="relative z-10 bg-white/80 backdrop-blur-md p-8 rounded-xl max-w-xl mx-auto text-center"
        style={{ 
          opacity,
          scale: dragProps.scale,
          rotateZ: dragProps.rotateZ,
          x: dragProps.x,
          y: dragProps.y
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        <p className="text-lg">{description}</p>
      </motion.div>
    </div>
  );
};

export default ParallaxSection;