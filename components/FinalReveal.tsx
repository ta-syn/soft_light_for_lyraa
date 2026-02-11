
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { playGlobalSound } from '../App';

const FinalReveal: React.FC = () => {
  const [isFinalized, setIsFinalized] = useState(false);

  useEffect(() => {
    let interval: any;
    if (isFinalized) {
      // Periodic heartbeat sound effect
      interval = setInterval(() => {
        playGlobalSound('heartbeat');
      }, 1600);
    }
    return () => clearInterval(interval);
  }, [isFinalized]);

  const triggerFinale = () => {
    if (isFinalized) return;
    setIsFinalized(true);
    playGlobalSound('heartbeat');

    const duration = 20 * 1000;
    const animationEnd = Date.now() + duration;

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 60 * (timeLeft / duration);
      
      confetti({
        particleCount,
        startVelocity: 30,
        spread: 360,
        origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 },
        colors: ['#e11d48', '#fb7185', '#be123c', '#ffffff'],
        shapes: ['circle', 'heart'],
        scalar: randomInRange(0.5, 1.2),
      } as any);
    }, 1000);
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-black relative py-48 px-6 overflow-hidden">
      <motion.div
        onViewportEnter={triggerFinale}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 3, ease: "easeOut" }}
        className="text-center space-y-24 relative z-10"
      >
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="mx-auto w-40 h-40 text-rose-600 mb-12 cursor-pointer"
          onClick={() => playGlobalSound('heartbeat')}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="drop-shadow-[0_0_50px_rgba(225,29,72,1)] opacity-90">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </motion.div>

        <div className="space-y-6">
            <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 2, delay: 0.5 }}
                className="text-7xl md:text-[140px] serif leading-none tracking-tighter"
            >
                <span className="text-rose-50 block mb-4">Lyraa,</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-400 to-rose-600 drop-shadow-[0_0_30px_rgba(225,29,72,0.4)] italic">
                    My Forever.
                </span>
            </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 2 }}
          className="flex flex-col items-center gap-10"
        >
          <p className="text-rose-400/30 uppercase tracking-[1.5em] text-[10px] font-light">The End of the Beginning</p>
          <div className="h-[1px] w-64 bg-gradient-to-r from-transparent via-rose-500/20 to-transparent" />
          <motion.div
            animate={{ opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="magical-font text-2xl text-rose-200/40 italic"
          >
            Signed with an unbreakable promise.
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Atmospheric Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(225,29,72,0.08)_0%,rgba(0,0,0,0)_75%)] pointer-events-none" />
      <div className="absolute top-0 w-full h-full opacity-[0.05] pointer-events-none">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] mix-blend-overlay" />
      </div>
      
      {/* Dynamic Glow Orbs */}
      <motion.div 
        animate={{ 
            x: [0, 100, -100, 0], 
            y: [0, -100, 100, 0],
            opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ duration: 20, repeat: Infinity }}
        className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-rose-900/10 rounded-full blur-[120px] pointer-events-none"
      />
    </section>
  );
};

export default FinalReveal;
