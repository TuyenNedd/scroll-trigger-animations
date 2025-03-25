import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useDrag } from '@use-gesture/react';

const DraggableGallery = ({ images }) => {
  const galleryRef = useRef(null);
  const constraintsRef = useRef(null);

  // Using useDrag from @use-gesture/react for a smooth dragging experience
  const bindDrag = useDrag(({ offset: [x], active, memo = 0 }) => {
    if (galleryRef.current) {
      const gallery = galleryRef.current;
      const maxScroll = gallery.scrollWidth - gallery.clientWidth;
      
      // Calculate new scroll position based on drag
      const newScrollX = memo - x;
      
      // Apply constraints to prevent overscrolling
      const constrainedScroll = Math.max(0, Math.min(maxScroll, newScrollX));
      
      gallery.scrollLeft = constrainedScroll;
      
      return newScrollX;
    }
    return memo;
  });

  return (
    <div className="w-full py-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Drag to Explore</h2>
      <div 
        ref={constraintsRef} 
        className="relative overflow-hidden w-full"
      >
        <motion.div
          ref={galleryRef}
          {...bindDrag()}
          className="flex space-x-4 overflow-x-scroll scrollbar-hide pb-4"
          style={{ cursor: 'grab', touchAction: 'none' }}
          whileTap={{ cursor: 'grabbing' }}
        >
          {images.map((image, i) => (
            <motion.div
              key={i}
              className="flex-shrink-0"
              initial={{ scale: 0.9, opacity: 0.8 }}
              whileHover={{ 
                scale: 1.05, 
                opacity: 1,
                transition: { duration: 0.3 } 
              }}
              whileTap={{ scale: 0.95 }}
            >
              <div 
                className="w-60 h-80 rounded-lg overflow-hidden relative"
                style={{
                  backgroundImage: `url(${image.src})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm p-4">
                  <h3 className="text-white font-medium">{image.title}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none" />
      </div>
      <p className="text-center text-gray-500 mt-4">← Drag to scroll →</p>
    </div>
  );
};

export default DraggableGallery;