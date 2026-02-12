
import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const events = [
  {
    date: "A Crimson Spark",
    title: "The Meeting",
    desc: "In a world of greyscale, your presence was the first drop of deep crimson that colored my life."
  },
  {
    date: "Whispers in the Night",
    title: "Our Connection",
    desc: "Hours of conversation turned into a symphony of understanding that neither of us wanted to end."
  },
  {
    date: "Eternal Resonance",
    title: "The Present",
    desc: "Now, every day is a testament to a love that grows deeper, stronger, and more resilient than ever."
  },
  {
    date: "Forever After",
    title: "Our Future",
    desc: "A journey of endless love, growing together through every season of life yet to come."
  }
];

const Timeline: React.FC = () => {
  return (
    <section className="py-40 relative">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16 md:mb-24">
            <h2 className="serif text-3xl md:text-4xl lg:text-5xl text-rose-100 mb-4 md:mb-6">Our Narrative</h2>
            <div className="h-1 w-12 md:w-20 bg-rose-600 mx-auto rounded-full neon-border" />
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-rose-500/50 to-transparent" />

          <div className="space-y-32">
            {events.map((ev, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`relative flex flex-col md:flex-row items-center gap-12 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                <div className={`flex-1 w-full text-center ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <div className="glass-card p-6 md:p-8 rounded-2xl md:rounded-3xl neon-border hover:shadow-[0_0_30px_rgba(225,29,72,0.2)] transition-shadow group">
                    <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em] text-rose-400 font-bold mb-2 block">{ev.date}</span>
                    <h3 className="serif italic text-xl md:text-2xl lg:text-3xl text-rose-100 mb-3 md:mb-4 group-hover:text-rose-400 transition-colors">{ev.title}</h3>
                    <p className="text-rose-100/60 font-light text-xs md:text-sm leading-relaxed">{ev.desc}</p>
                  </div>
                </div>
                
                <div className="absolute left-[16px] md:left-1/2 md:-translate-x-1/2 z-10 w-8 h-8 md:w-10 md:h-10 rounded-full glass-card flex items-center justify-center neon-border bg-[#0c0206]">
                  <Heart size={12} className="md:size-[14px] text-rose-500 fill-rose-500/20" />
                </div>
                
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
