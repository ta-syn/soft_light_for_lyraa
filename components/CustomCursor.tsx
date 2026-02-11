
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [trail, setTrail] = useState<{ x: number, y: number, id: number }[]>([]);
  
  useEffect(() => {
    let idCounter = 0;
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      setIsPointer(window.getComputedStyle(target).cursor === 'pointer' || target.tagName === 'BUTTON' || target.tagName === 'A');

      // Create trail
      idCounter++;
      const newPoint = { x: e.clientX, y: e.clientY, id: idCounter };
      setTrail(prev => [...prev.slice(-12), newPoint]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="hidden lg:block">
      {/* Trail */}
      <AnimatePresence>
        {trail.map((point, i) => (
          <motion.div
            key={point.id}
            initial={{ opacity: 0.4, scale: 1 }}
            animate={{ opacity: 0, scale: 0 }}
            exit={{ opacity: 0 }}
            className="fixed top-0 left-0 w-2 h-2 rounded-full bg-rose-500 pointer-events-none z-[9997]"
            style={{ 
              x: point.x - 4, 
              y: point.y - 4,
            }}
          />
        ))}
      </AnimatePresence>

      {/* Main Cursor Glow */}
      <motion.div
        className="fixed top-0 left-0 w-24 h-24 bg-rose-600/10 rounded-full blur-3xl z-[9998] pointer-events-none"
        animate={{
          x: position.x - 48,
          y: position.y - 48,
          scale: isPointer ? 1.5 : 1
        }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      />

      {/* Main Heart Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 text-rose-500 z-[9999] pointer-events-none mix-blend-screen drop-shadow-[0_0_10px_rgba(225,29,72,0.8)]"
        animate={{
          x: position.x - 16,
          y: position.y - 16,
          scale: isPointer ? 1.4 : 1,
          rotate: isPointer ? 25 : 0
        }}
        transition={{ type: "spring", stiffness: 1000, damping: 40, mass: 0.1 }}
      >
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      </motion.div>
    </div>
  );
};

export default CustomCursor;
