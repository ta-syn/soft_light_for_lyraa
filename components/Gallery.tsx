
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Calendar, Quote } from 'lucide-react';
import { playGlobalSound } from '../App';

const galleryItems = [
  { 
    url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1000&auto=format&fit=crop", 
    title: "Soft Moments", 
    date: "The First Glimpse",
    message: "I remember the exact second the light hit your face. It wasn't just a moment; it was the start of my favorite forever. You looked like poetry in motion, and I was completely lost in your grace."
  },
  { 
    url: "https://images.unsplash.com/photo-1562690868-60bbe7293e94?q=80&w=1000&auto=format&fit=crop", 
    title: "Shared Dreams", 
    date: "Midnight Whispers",
    message: "When we talk about the future, the world outside just stops existing. Every dream I have now features you as the lead character. Building a life with you is the only ambition I truly cherish."
  },
  { 
    url: "https://images.unsplash.com/photo-1464851707681-f9d5fdaccea8?q=80&w=1000&auto=format&fit=crop", 
    title: "Infinite Love", 
    date: "A Quiet Resonance",
    message: "There is a peace I find only with you. It's in the way you hold my hand or how we can sit in silence for hours and still feel like we've said everything. You are my home, Lyraa."
  },
  { 
    url: "https://images.unsplash.com/photo-1502977249166-824b3a8a4d6d?q=80&w=1000&auto=format&fit=crop", 
    title: "Eternal Flame", 
    date: "Unbreakable Bond",
    message: "Our love isn't just a feeling; it's a force. It's the warmth that keeps me going on my hardest days. No matter what comes our way, I know we'll face it together, shining brighter than ever."
  }
];

const Gallery: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<typeof galleryItems[0] | null>(null);

  const handleOpen = (item: typeof galleryItems[0]) => {
    playGlobalSound('click');
    setSelectedItem(item);
  };

  const handleClose = () => {
    playGlobalSound('hover');
    setSelectedItem(null);
  };

  return (
    <section className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-24"
        >
            <h2 className="serif text-5xl md:text-6xl text-rose-100 mb-6 italic tracking-tight">Captured Whispers</h2>
            <p className="text-rose-400/40 uppercase tracking-[0.5em] text-[10px]">Moments frozen in the amber of eternity</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {galleryItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              whileHover={{ y: -15, scale: 1.02 }}
              onHoverStart={() => playGlobalSound('hover')}
              onClick={() => handleOpen(item)}
              className="group relative cursor-pointer overflow-hidden rounded-[32px] glass-card aspect-square shadow-2xl"
            >
              <img 
                src={item.url} 
                alt={item.title} 
                className="w-full h-full object-cover opacity-40 group-hover:opacity-80 transition-all duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0206] via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
              
              <div className="absolute bottom-8 left-8 right-8 text-rose-100 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-[9px] uppercase tracking-[0.4em] text-rose-500 font-bold mb-2">Visual Echo 0{i+1}</p>
                <h4 className="serif italic text-2xl group-hover:text-rose-400 transition-colors">{item.title}</h4>
              </div>
              
              <div className="absolute top-8 right-8 p-3 bg-rose-600/20 backdrop-blur-md rounded-full opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100">
                <Heart size={16} className="text-rose-400 fill-rose-400" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8 bg-black/98 backdrop-blur-3xl cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, y: 100, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 100, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative max-w-5xl w-full bg-[#0c0206] rounded-[48px] overflow-hidden border border-rose-500/10 shadow-[0_0_100px_rgba(225,29,72,0.1)] flex flex-col md:flex-row min-h-[500px] h-auto max-h-[90vh] cursor-default"
              onClick={e => e.stopPropagation()}
            >
              {/* Image Column */}
              <div className="w-full md:w-1/2 min-h-[400px] relative bg-[#0c0206] overflow-hidden">
                <img 
                  src={selectedItem.url} 
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000" 
                  alt={selectedItem.title}
                  loading="eager"
                  onLoad={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.opacity = '0.9';
                  }}
                  style={{ opacity: 0 }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0c0206]/40 md:block hidden" />
              </div>

              {/* Message Column */}
              <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center relative bg-gradient-to-br from-[#1a050d] to-[#0c0206]">
                <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
                  <Heart size={200} className="text-rose-500" />
                </div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="relative z-10 space-y-8"
                >
                  <div className="flex items-center gap-3 text-rose-500/60">
                    <Calendar size={14} />
                    <span className="text-[10px] uppercase tracking-[0.4em] font-semibold">{selectedItem.date}</span>
                  </div>

                  <h3 className="serif text-5xl md:text-6xl text-rose-50 italic drop-shadow-xl">
                    {selectedItem.title}
                  </h3>

                  <div className="relative">
                    <Quote className="absolute -top-10 -left-10 text-rose-500/10" size={80} />
                    <p className="text-rose-100/90 text-xl md:text-2xl leading-relaxed font-light serif italic relative z-10">
                      "{selectedItem.message}"
                    </p>
                  </div>

                  <div className="flex items-center gap-6 pt-6">
                    <div className="h-[1px] flex-1 bg-gradient-to-r from-rose-500/30 to-transparent" />
                    <span className="text-rose-400 text-sm italic font-medium tracking-widest">Forever, Yuki</span>
                  </div>
                </motion.div>

                <button 
                  onClick={handleClose}
                  onMouseEnter={() => playGlobalSound('hover')}
                  className="absolute top-10 right-10 p-4 glass-card rounded-full text-rose-300 hover:text-white hover:bg-rose-600 transition-all z-20 shadow-2xl border border-rose-500/10"
                  aria-label="Close"
                >
                  <X size={24} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
