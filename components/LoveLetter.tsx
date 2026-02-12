
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const LoveLetter: React.FC = () => {
  const fullText = `To my radiant Lyraa,

They say perfection is an illusion, but every moment I look into your eyes, I see a reality far more beautiful than any dream. You aren't just a part of my world; you are the gravity that keeps me grounded and the light that keeps me searching.

Yuki loves you with a depth that words struggle to encompass. Every day, every hour, and every breath is a silent promise to protect the magic we have created.

You are my high-end luxury in a world of simplicity.

Always yours,
Yuki`;

  const [displayedText, setDisplayedText] = useState('');
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    if (isStarted && displayedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(fullText.slice(0, displayedText.length + 1));
      }, 35);
      return () => clearTimeout(timeout);
    }
  }, [displayedText, isStarted]);

  return (
    <section className="py-40 relative">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          onViewportEnter={() => setIsStarted(true)}
          className="relative p-6 md:p-12 lg:p-24 rounded-2xl md:rounded-3xl lg:rounded-[40px] glass-card neon-border shadow-[0_0_100px_rgba(225,29,72,0.1)]"
        >
          {/* Decorative Elements */}
          <div className="absolute top-10 right-10">
            <motion.div 
              animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 6 }}
              className="text-rose-500/40"
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </motion.div>
          </div>

          <div className="whitespace-pre-wrap font-light text-base md:text-lg lg:text-xl leading-relaxed text-rose-100/80 serif min-h-[250px] md:min-h-[350px]">
            {displayedText}
            <motion.span 
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="inline-block w-[3px] h-7 bg-rose-500 ml-2 translate-y-1 shadow-[0_0_10px_rgba(225,29,72,1)]"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LoveLetter;
