
import React from 'react';
import { motion } from 'framer-motion';

const reasons = [
  { front: "Your Soul", back: "Because it glows with a kindness that lights up even my darkest days." },
  { front: "Your Smile", back: "The way it reaches your eyes makes my whole world stop." },
  { front: "Your Presence", back: "Just being near you feels like home, safe and magical." },
  { front: "Your Heart", back: "It's the most beautiful garden I've ever been allowed to wander in." }
];

const Reasons: React.FC = () => {
  return (
    <section className="py-32 bg-gradient-to-b from-[#fffaf0] to-white px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="serif text-4xl text-center text-purple-400 mb-4">Reasons I Love You</h2>
        <p className="text-center text-pink-300 mb-16 italic">(Tap or hover to reveal my secrets)</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, i) => (
            <FlipCard key={i} reason={reason} />
          ))}
        </div>
      </div>
    </section>
  );
};

const FlipCard: React.FC<{ reason: any }> = ({ reason }) => {
  return (
    <div className="group h-64 perspective-1000">
      <motion.div 
        className="relative w-full h-full transition-transform duration-700 transform-style-3d group-hover:rotate-y-180 cursor-pointer"
      >
        {/* Front */}
        <div className="absolute inset-0 backface-hidden flex items-center justify-center p-6 rounded-3xl bg-white border border-pink-100 shadow-sm">
          <span className="magical-font text-3xl text-pink-400 text-center">{reason.front}</span>
        </div>
        
        {/* Back */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 flex items-center justify-center p-6 rounded-3xl bg-gradient-to-br from-pink-50 to-purple-50 border border-purple-100 shadow-inner">
          <p className="text-purple-900/70 text-sm text-center font-light leading-relaxed">
            {reason.back}
          </p>
        </div>
      </motion.div>
      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
};

export default Reasons;
