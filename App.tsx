
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Music, VolumeX, Heart } from 'lucide-react';

import Hero from './components/Hero';
import Timeline from './components/Timeline';
import Gallery from './components/Gallery';
import LoveLetter from './components/LoveLetter';
import PromiseSection from './components/PromiseSection';
import FinalReveal from './components/FinalReveal';
import FloatingSparkles from './components/FloatingSparkles';
import CustomCursor from './components/CustomCursor';

// Global sound utility for components to use if needed
export const playGlobalSound = (type: 'hover' | 'click' | 'heartbeat') => {
  try {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    if (type === 'hover') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.01, audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.05);
    } else if (type === 'click') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(220, audioCtx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.1);
    } else if (type === 'heartbeat') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(60, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, audioCtx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.1);
      
      const osc2 = audioCtx.createOscillator();
      const gain2 = audioCtx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(55, audioCtx.currentTime + 0.15);
      osc2.frequency.exponentialRampToValueAtTime(35, audioCtx.currentTime + 0.3);
      gain2.gain.setValueAtTime(0, audioCtx.currentTime);
      gain2.gain.linearRampToValueAtTime(0.08, audioCtx.currentTime + 0.15);
      gain2.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.3);
      osc2.connect(gain2);
      gain2.connect(audioCtx.destination);
      osc2.start(audioCtx.currentTime + 0.15);
      osc2.stop(audioCtx.currentTime + 0.35);
    }
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.2);
  } catch (e) {
    console.warn("Sound blocked by browser policy");
  }
};

const App: React.FC = () => {
  const [hasStarted, setHasStarted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const startExperience = () => {
    setHasStarted(true);
    playGlobalSound('click');
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log("Audio play blocked", e));
    }
  };

  const toggleMute = () => {
    playGlobalSound('hover');
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0c0206] selection:bg-rose-500/30">
      <CustomCursor />
      
      <audio 
        ref={audioRef} 
        loop 
        src="/song/season_of_love.mp3" 
      />

      <AnimatePresence>
        {!hasStarted && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0c0206]"
          >
            {/* Elegant Loading Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(225,29,72,0.15)_0%,rgba(0,0,0,0)_70%)]" />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 2 }}
              className="text-center space-y-12 relative z-10"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Heart className="mx-auto text-rose-500 w-20 h-20 drop-shadow-[0_0_20px_rgba(225,29,72,0.6)]" />
              </motion.div>

              <div className="space-y-4">
                <h1 className="text-6xl md:text-8xl text-rose-50 font-extralight tracking-[0.2em] serif uppercase">
                  Yuki <span className="text-rose-600 italic">&</span> Lyraa
                </h1>
                <p className="text-rose-400/40 uppercase tracking-[0.6em] text-[10px] font-medium">A Cinematic Love Story</p>
              </div>
              
              <motion.button
                whileHover={{ 
                    scale: 1.05, 
                    backgroundColor: "rgba(225,29,72,0.15)",
                    borderColor: "rgba(225,29,72,0.6)"
                }}
                onHoverStart={() => playGlobalSound('hover')}
                whileTap={{ scale: 0.95 }}
                onClick={startExperience}
                className="mt-12 px-16 py-5 bg-transparent border border-rose-500/20 rounded-full text-rose-100 uppercase tracking-[0.4em] text-xs font-light transition-all backdrop-blur-md shadow-[0_0_30px_rgba(225,29,72,0.05)]"
              >
                Begin Journey
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {hasStarted && (
        <>
          <motion.div 
            className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-900 via-rose-500 to-rose-900 z-[90] origin-left"
            style={{ scaleX }}
          />

          <div className="fixed top-8 right-8 z-[80] flex items-center gap-4">
            <button 
              onClick={toggleMute}
              onMouseEnter={() => playGlobalSound('hover')}
              className="p-3 glass-card rounded-full text-rose-400 hover:text-rose-100 hover:bg-rose-600/20 transition-all border border-rose-500/10"
            >
              {isMuted ? <VolumeX size={18} /> : <Music size={18} />}
            </button>
          </div>

          <FloatingSparkles />

          <main className="relative z-10 overflow-hidden">
            <Hero />
            
            <section className="py-48 px-6 flex flex-col items-center justify-center text-center max-w-5xl mx-auto space-y-12">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div className="flex items-center justify-center gap-6 mb-4 opacity-40">
                    <div className="h-[1px] w-12 bg-rose-500" />
                    <Heart size={14} className="text-rose-500" />
                    <div className="h-[1px] w-12 bg-rose-500" />
                </div>
                <h2 className="serif italic text-4xl md:text-6xl text-rose-100/90 leading-tight">
                    "In every universe, in every timeline, <br/>
                    it has always been <span className="text-rose-500">You</span>."
                </h2>
                <p className="text-lg md:text-xl text-rose-400/60 leading-relaxed font-light max-w-2xl mx-auto italic">
                  An eternal resonance that transcends the limits of the physical world.
                </p>
              </motion.div>
            </section>

            <Timeline />
            <Gallery />
            <LoveLetter />
            <PromiseSection />
            <FinalReveal />
          </main>

          <footer className="py-24 text-center border-t border-rose-900/10 bg-black/40">
            <div className="flex justify-center gap-8 mb-8 opacity-40">
                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 3 }}><Heart size={14} className="text-rose-600" /></motion.div>
                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 3, delay: 0.5 }}><Heart size={14} className="text-rose-500" /></motion.div>
                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 3, delay: 1 }}><Heart size={14} className="text-rose-400" /></motion.div>
            </div>
            <p className="text-rose-100/20 text-[9px] tracking-[1em] uppercase font-light">Yuki ❤️ Lyraa | The Infinite Loop of Love</p>
          </footer>
        </>
      )}
    </div>
  );
};

export default App;
