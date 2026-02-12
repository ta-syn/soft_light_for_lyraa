
import React, { useState, useRef, useEffect } from 'react';
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
let audioContext: AudioContext | null = null;
let userInteracted = false;

// Function to initialize audio after user interaction
export const initAudio = () => {
  if (!audioContext && userInteracted) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
};

export const playGlobalSound = (type: 'hover' | 'click' | 'heartbeat') => {
  // Don't play sounds until user has interacted with the page
  if (!userInteracted) {
    return;
  }
  try {
    // Create audio context on first use (after user interaction)
    if (!audioContext) {
      audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Immediately try to resume if suspended (required after user gesture)
      if (audioContext.state === 'suspended') {
        audioContext.resume().catch(() => {
          console.log("Audio context resume blocked by browser policy");
          return;
        });
      }
    } else if (audioContext.state === 'suspended') {
      // Resume existing audio context if suspended
      audioContext.resume().catch(() => {
        console.log("Audio context resume blocked by browser policy");
        return;
      });
    }
    
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    
    if (type === 'hover') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, audioContext.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.05);
      gain.gain.setValueAtTime(0.01, audioContext.currentTime);
      gain.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.05);
    } else if (type === 'click') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, audioContext.currentTime);
      osc.frequency.exponentialRampToValueAtTime(220, audioContext.currentTime + 0.1);
      gain.gain.setValueAtTime(0.04, audioContext.currentTime);
      gain.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.1);
    } else if (type === 'heartbeat') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(60, audioContext.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, audioContext.currentTime + 0.1);
      gain.gain.setValueAtTime(0.12, audioContext.currentTime);
      gain.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.1);
      
      const osc2 = audioContext.createOscillator();
      const gain2 = audioContext.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(55, audioContext.currentTime + 0.15);
      osc2.frequency.exponentialRampToValueAtTime(35, audioContext.currentTime + 0.3);
      gain2.gain.setValueAtTime(0, audioContext.currentTime);
      gain2.gain.linearRampToValueAtTime(0.08, audioContext.currentTime + 0.15);
      gain2.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.3);
      osc2.connect(gain2);
      gain2.connect(audioContext.destination);
      osc2.start(audioContext.currentTime + 0.15);
      osc2.stop(audioContext.currentTime + 0.35);
    }
    
    osc.connect(gain);
    gain.connect(audioContext.destination);
    osc.start();
    osc.stop(audioContext.currentTime + 0.2);
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

  // Handle user interaction for audio
  useEffect(() => {
    const handleUserInteraction = () => {
      userInteracted = true;
      initAudio();
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('touchstart', handleUserInteraction);
    };

    window.addEventListener('click', handleUserInteraction);
    window.addEventListener('touchstart', handleUserInteraction);

    return () => {
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('touchstart', handleUserInteraction);
    };
  }, []);

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

          <div className="fixed top-4 right-4 md:top-8 md:right-8 z-[80] flex items-center gap-4">
            <button 
              onClick={toggleMute}
              onMouseEnter={() => playGlobalSound('hover')}
              className="p-2 md:p-3 glass-card rounded-full text-rose-400 hover:text-rose-100 hover:bg-rose-600/20 transition-all border border-rose-500/10 text-sm md:text-base"
            >
              {isMuted ? <VolumeX size={16} className="md:size-[18px]" /> : <Music size={16} className="md:size-[18px]" />}
            </button>
          </div>

          <FloatingSparkles />

          <main className="relative z-10 overflow-hidden">
            <Hero />
            
            <section className="py-24 md:py-48 px-4 md:px-6 flex flex-col items-center justify-center text-center max-w-5xl mx-auto space-y-8 md:space-y-12">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                viewport={{ once: true }}
                className="space-y-6 md:space-y-8"
              >
                <div className="flex items-center justify-center gap-4 md:gap-6 mb-3 md:mb-4 opacity-40">
                    <div className="h-[1px] w-8 md:w-12 bg-rose-500" />
                    <Heart size={12} className="md:size-[14px] text-rose-500" />
                    <div className="h-[1px] w-8 md:w-12 bg-rose-500" />
                </div>
                <h2 className="serif italic text-2xl md:text-4xl lg:text-6xl text-rose-100/90 leading-tight">
                    "In every universe, in every timeline, <br className="hidden sm:block"/>
                    it has always been <span className="text-rose-500">You</span>."
                </h2>
                <p className="text-base md:text-lg lg:text-xl text-rose-400/60 leading-relaxed font-light max-w-2xl mx-auto italic px-4 md:px-0">
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

          <footer className="py-16 md:py-24 text-center border-t border-rose-900/10 bg-black/40">
            <div className="flex justify-center gap-6 md:gap-8 mb-6 md:mb-8 opacity-40">
                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 3 }}><Heart size={12} className="md:size-[14px] text-rose-600" /></motion.div>
                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 3, delay: 0.5 }}><Heart size={12} className="md:size-[14px] text-rose-500" /></motion.div>
                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 3, delay: 1 }}><Heart size={12} className="md:size-[14px] text-rose-400" /></motion.div>
            </div>
            <p className="text-rose-100/20 text-[8px] md:text-[9px] tracking-[0.8em] md:tracking-[1em] uppercase font-light px-4 md:px-0">Yuki ❤️ Lyraa | The Infinite Loop of Love</p>
          </footer>
        </>
      )}
    </div>
  );
};

export default App;
