
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Sparkle } from 'lucide-react';

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background with deep gradients and glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a050d] via-[#0c0206] to-[#0c0206]" />
      <div className="absolute top-0 left-0 w-full h-full opacity-30">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-rose-900 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-pink-900 rounded-full blur-[150px]" />
      </div>

      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 text-center px-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <div className="h-[1px] w-12 bg-rose-500/50" />
          <Sparkle className="text-rose-500" size={16} />
          <span className="serif italic text-xl md:text-2xl text-rose-200">For My Dearest</span>
          <Sparkle className="text-rose-500" size={16} />
          <div className="h-[1px] w-12 bg-rose-500/50" />
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="text-7xl md:text-9xl font-bold tracking-tighter serif leading-none"
        >
          <span className="block text-rose-50 text-transparent bg-clip-text bg-gradient-to-r from-rose-100 via-rose-500 to-rose-100 drop-shadow-[0_0_30px_rgba(225,29,72,0.3)]">
            Lyraa
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.2 }}
          className="mt-8 flex flex-col items-center gap-4"
        >
          <p className="text-rose-400 font-light tracking-[1em] text-[10px] md:text-xs uppercase">
            The Light In My Darkest Void
          </p>
          <div className="h-20 w-[1px] bg-gradient-to-b from-rose-500 to-transparent" />
        </motion.div>
      </motion.div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2.5 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-rose-500/40"
      >
        <ChevronDown size={24} strokeWidth={1.5} />
      </motion.div>
    </section>
  );
};

export default Hero;
