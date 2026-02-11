
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const FloatingSparkles: React.FC = () => {
  const particles = useMemo(() => {
    return Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      size: Math.random() * 4 + 1,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 10,
      color: i % 2 === 0 ? '#e11d48' : '#fb7185',
      isSparkle: Math.random() > 0.8
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0 }}
          animate={{
            y: [0, -400, 0],
            x: [0, Math.random() * 200 - 100, 0],
            opacity: [0, 0.6, 0],
            scale: [1, 2, 1],
            rotate: p.isSparkle ? [0, 360] : 0,
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute"
          style={{ 
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            backgroundColor: p.isSparkle ? 'transparent' : p.color,
            borderRadius: '50%',
            boxShadow: p.isSparkle ? 'none' : `0 0 15px ${p.color}`,
          }}
        >
          {p.isSparkle && (
            <svg viewBox="0 0 24 24" fill={p.color} className="w-full h-full opacity-80 drop-shadow-[0_0_5px_rgba(225,29,72,0.8)]">
              <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" />
            </svg>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingSparkles;
