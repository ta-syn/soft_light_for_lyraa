
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Heart, Moon, Sun } from 'lucide-react';
import { playGlobalSound } from '../App';

const promises = [
  { icon: ShieldCheck, title: "To Protect", desc: "Your happiness is my highest priority, a sanctuary built of trust and care." },
  { icon: Heart, title: "To Cherish", desc: "I will never stop finding new reasons to love you, day after golden day." },
  { icon: Moon, title: "To Guide", desc: "Even in the deepest shadow, I'll be your North Star, leading you home." },
  { icon: Sun, title: "To Brighten", desc: "I promise to be the warmth on your coldest days, the light that never fades." }
];

const PromiseSection: React.FC = () => {
  return (
    <section className="py-48 bg-black/40 relative overflow-hidden">
      {/* Decorative background blur */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[60vw] h-[60vw] bg-rose-900/5 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
            className="text-center mb-24"
        >
            <h2 className="serif text-3xl md:text-5xl lg:text-7xl text-rose-50 mb-4 md:mb-6 italic tracking-tight">My Vows to You</h2>
            <div className="flex items-center justify-center gap-2 md:gap-4 opacity-30">
                <div className="h-[1px] w-8 md:w-12 bg-rose-500" />
                <p className="text-rose-400 uppercase tracking-[0.4em] md:tracking-[0.6em] text-[8px] md:text-[10px] font-bold">Unbreakable and Eternal</p>
                <div className="h-[1px] w-8 md:w-12 bg-rose-500" />
            </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-12">
          {promises.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 1 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -15,
                borderColor: "rgba(225,29,72,0.4)",
                backgroundColor: "rgba(225,29,72,0.05)"
              }}
              onHoverStart={() => playGlobalSound('hover')}
              className="glass-card p-6 md:p-8 lg:p-12 rounded-2xl md:rounded-3xl lg:rounded-[40px] border border-rose-500/10 text-center transition-all duration-500 group relative"
            >
              <div className="mb-10 mx-auto w-20 h-20 rounded-[24px] bg-rose-950/20 border border-rose-500/10 flex items-center justify-center group-hover:scale-110 group-hover:border-rose-500/30 transition-all duration-500 group-hover:rotate-6">
                <p.icon size={32} className="text-rose-400 group-hover:text-rose-50 transition-colors" />
              </div>
              
              <h3 className="serif text-2xl text-rose-50 mb-4 tracking-tight group-hover:text-rose-400 transition-colors">{p.title}</h3>
              <p className="text-sm text-rose-100/40 leading-relaxed font-light italic">{p.desc}</p>
              
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Heart size={12} className="text-rose-600 fill-rose-600 animate-pulse" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromiseSection;
