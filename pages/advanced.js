import { useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useGesture } from '@use-gesture/react';

export default function Advanced() {
  const containerRef = useRef(null);
  const targetRef = useRef(null);
  
  // Use framer-motion's scroll hooks
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });
  
  // Transform values based on scroll position
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]);
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [0, 180, 360]);
  
  // Use @use-gesture/react to add drag and hover interactions
  const bind = useGesture({
    onDrag: ({ movement: [mx, my], down }) => {
      if (down) {
        // You can implement custom drag behavior here
        console.log('Dragging:', mx, my);
      }
    },
    onHover: ({ hovering }) => {
      if (hovering) {
        // Custom hover behavior
        console.log('Hovering!');
      }
    },
    onScroll: ({ event, scrolling, direction: [dirX, dirY] }) => {
      // Prevent default to implement custom scroll behaviors if needed
      if (scrolling) {
        console.log('Custom scroll handler, direction:', dirY > 0 ? 'down' : 'up');
      }
    }
  });

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-b from-blue-900 to-indigo-900 text-white">
      <Head>
        <title>Advanced Scroll Animations | Scroll Trigger Demo</title>
        <meta name="description" content="Advanced scroll-triggered animations with @use-gesture/react and framer-motion" />
      </Head>

      <header className="fixed top-0 left-0 right-0 z-50 p-4 backdrop-blur-md bg-black/30">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Scroll Animations</h1>
          <Link href="/" className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors">
            Back to Main Demo
          </Link>
        </div>
      </header>

      <main>
        {/* Intro Section */}
        <section className="h-screen flex flex-col items-center justify-center p-8">
          <h2 className="text-5xl font-bold text-center mb-8">Advanced Scroll Animations</h2>
          <p className="text-xl text-center max-w-2xl mx-auto mb-12">
            Scroll down to see complex animations triggered by scrolling.
            Combined with gesture interactions for a rich user experience.
          </p>
          <motion.div 
            className="animate-bounce text-white/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <p className="mb-2">Scroll to begin</p>
            <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </section>

        {/* Interactive Animation Section */}
        <section ref={targetRef} className="min-h-[200vh] relative">
          {/* Container that will be used for scroll-based animations */}
          <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
            {/* Main animated element */}
            <motion.div
              {...bind()}
              style={{
                y,
                opacity,
                scale,
                rotate,
              }}
              className="w-64 h-64 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-3xl shadow-2xl flex items-center justify-center cursor-pointer"
              whileHover={{ boxShadow: "0 0 30px rgba(168, 85, 247, 0.7)" }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                style={{
                  rotate: useTransform(scrollYProgress, [0, 1], [0, -360]),
                }}
                className="w-32 h-32 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white font-bold"
              >
                SCROLL
              </motion.div>
            </motion.div>

            {/* Floating elements that react to scroll */}
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-8 h-8 rounded-full bg-white/30"
                style={{
                  left: `${Math.random() * 80 + 10}%`,
                  top: `${Math.random() * 80 + 10}%`,
                  opacity: useTransform(
                    scrollYProgress,
                    [0, 0.5, 1],
                    [0, 0.8 * Math.random(), 0]
                  ),
                  scale: useTransform(
                    scrollYProgress,
                    [0, 0.5, 1],
                    [0, 1 + Math.random(), 0]
                  ),
                  x: useTransform(
                    scrollYProgress,
                    [0, 1],
                    [0, (Math.random() - 0.5) * 200]
                  ),
                  y: useTransform(
                    scrollYProgress,
                    [0, 1],
                    [0, (Math.random() - 0.5) * 200]
                  ),
                }}
              />
            ))}
          </div>
        </section>

        {/* Final Section */}
        <section className="h-screen flex flex-col items-center justify-center p-8 text-center">
          <h2 className="text-4xl font-bold mb-8">That's It!</h2>
          <p className="text-xl max-w-2xl mx-auto mb-12">
            This example demonstrates how to create complex scroll-triggered
            animations using framer-motion and @use-gesture/react.
          </p>
          <Link 
            href="/"
            className="bg-white text-indigo-900 hover:bg-white/90 font-bold px-8 py-3 rounded-lg transition-colors"
          >
            Back to Main Demo
          </Link>
        </section>
      </main>
    </div>
  );
}