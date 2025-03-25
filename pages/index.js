import { useState, useEffect } from 'react';
import Head from 'next/head';
import ScrollAnimatedCard from '../components/ScrollAnimatedCard';
import ParallaxSection from '../components/ParallaxSection';
import DraggableGallery from '../components/DraggableGallery';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useWheel } from '@use-gesture/react';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // Sample data for our components
  const cards = [
    {
      title: 'Scroll Animation',
      description: 'This card animates as you scroll down the page. Try scrolling to see the effect.',
    },
    {
      title: 'Gesture Integration',
      description: 'Using @use-gesture/react with framer-motion allows for rich interactive experiences triggered by scroll and other gestures.',
    },
    {
      title: 'Parallax Effects',
      description: 'Parallax scrolling creates depth by moving elements at different speeds.',
    },
  ];

  const parallaxSections = [
    {
      imageUrl: 'https://images.unsplash.com/photo-1579547945413-497e1b99f0c9',
      title: 'Mountain View',
      description: 'Scroll to see the parallax effect. This section moves at a different speed than the rest of the page.',
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e',
      title: 'Ocean Wave',
      description: 'The background image moves slower than the text, creating a sense of depth.',
      speed: 0.3,
    },
  ];

  const galleryImages = [
    { src: 'https://images.unsplash.com/photo-1593642633279-1796119d5482', title: 'Tech Workspace' },
    { src: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f', title: 'Digital Art' },
    { src: 'https://images.unsplash.com/photo-1563986768817-257bf91c5e9a', title: 'Mobile Interface' },
    { src: 'https://images.unsplash.com/photo-1517292987719-0369a794ec0f', title: 'Coding Setup' },
    { src: 'https://images.unsplash.com/photo-1542744094-24638eff58bb', title: 'UI Design' },
    { src: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1', title: 'Desk Setup' },
  ];

  // Hero section with scroll-triggered animations
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 400], [1, 0.8]);
  const heroY = useTransform(scrollY, [0, 400], [0, 100]);

  // Add wheel gesture handler for enhanced scroll interaction
  const bind = useWheel(({ delta: [, y] }) => {
    // This can be used to implement custom scroll behaviors
    // For demo purposes, we'll just log the wheel movement
    console.log('Wheel delta Y:', y);
  });

  if (!mounted) return <div className="h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="bg-gray-50 min-h-screen" {...bind()}>
      <Head>
        <title>Scroll Trigger Animations</title>
        <meta name="description" content="Showcase of scroll-triggered animations using @use-gesture/react and framer-motion" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {/* Hero Section */}
        <motion.section 
          className="h-screen flex flex-col items-center justify-center relative overflow-hidden"
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
        >
          <motion.h1 
            className="text-6xl font-bold text-center mb-6"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Scroll Animations
          </motion.h1>
          <motion.p 
            className="text-xl max-w-lg text-center mb-8"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            A showcase of interactive animations triggered by scrolling and gestures
          </motion.p>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            className="animate-bounce absolute bottom-10"
          >
            <p className="text-sm text-gray-600 mb-2">Scroll down</p>
            <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.section>

        {/* Animated Cards Section */}
        <section className="py-20 px-8 max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Scroll-Activated Cards</h2>
          {cards.map((card, index) => (
            <ScrollAnimatedCard key={index} index={index}>
              <h3 className="text-2xl font-bold mb-4">{card.title}</h3>
              <p className="text-gray-700">{card.description}</p>
            </ScrollAnimatedCard>
          ))}
        </section>

        {/* Parallax Sections */}
        {parallaxSections.map((section, index) => (
          <ParallaxSection
            key={index}
            imageUrl={section.imageUrl}
            title={section.title}
            description={section.description}
            speed={section.speed}
          />
        ))}

        {/* Draggable Gallery Section */}
        <section className="py-20 px-8 max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-8">Gesture-Based Gallery</h2>
          <p className="text-center mb-12 max-w-2xl mx-auto">
            This gallery uses gesture controls from @use-gesture/react for smooth drag interaction.
            Try dragging the gallery horizontally.
          </p>
          <DraggableGallery images={galleryImages} />
        </section>

        {/* Final Call to Action */}
        <section className="py-32 px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-4xl font-bold mb-8">Ready to Create Your Own?</h2>
            <p className="max-w-2xl mx-auto mb-12 text-lg">
              This demo showcases how to combine @use-gesture/react with framer-motion
              to create engaging scroll-triggered animations.
            </p>
            <a
              href="https://github.com/TuyenNedd/scroll-trigger-animations"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-8 py-3 rounded-lg transition-colors"
            >
              View Source Code
            </a>
          </motion.div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-8 px-8 text-center">
        <p>
          Created with Next.js, @use-gesture/react, and framer-motion
        </p>
      </footer>
    </div>
  );
}