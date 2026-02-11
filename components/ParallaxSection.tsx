
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const images = [
  {
    url: "https://picsum.photos/id/10/800/1000",
    title: "Endless Horizons",
    caption: "The first day I met you, the world seemed to expand."
  },
  {
    url: "https://picsum.photos/id/43/800/1000",
    title: "Golden Glow",
    caption: "In your laughter, I found the sun I had been seeking."
  },
  {
    url: "https://picsum.photos/id/103/800/1000",
    title: "Quiet Echoes",
    caption: "Even in silence, our souls speak a language of their own."
  }
];

const ParallaxSection: React.FC = () => {
  return (
    <section className="py-20 overflow-hidden bg-black">
      <div className="max-w-7xl mx-auto px-6 space-y-40">
        {images.map((img, idx) => (
          <ParallaxCard key={idx} image={img} index={idx} />
        ))}
      </div>
    </section>
  );
};

const ParallaxCard: React.FC<{ image: any, index: number }> = ({ image, index }) => {
  const isEven = index % 2 === 0;
  
  return (
    <div className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-24`}>
      <motion.div 
        initial={{ opacity: 0, x: isEven ? -100 : 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, margin: "-100px" }}
        className="relative w-full md:w-1/2 aspect-[4/5] rounded-3xl overflow-hidden group"
      >
        <div className="absolute inset-0 bg-rose-950/20 mix-blend-overlay z-10" />
        <img 
          src={image.url} 
          alt={image.title} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
        />
        {/* Decorative elements */}
        <div className="absolute top-8 left-8 z-20">
          <span className="text-white/20 text-6xl font-bold serif">0{index + 1}</span>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        viewport={{ once: true }}
        className="w-full md:w-1/3 p-8 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 shadow-2xl"
      >
        <h3 className="text-3xl font-light mb-4 text-rose-100 serif">{image.title}</h3>
        <p className="text-rose-200/60 leading-relaxed font-light mb-6 italic">
          "{image.caption}"
        </p>
        <div className="h-[1px] w-20 bg-rose-500/40" />
      </motion.div>
    </div>
  );
};

export default ParallaxSection;
