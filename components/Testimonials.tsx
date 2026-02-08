
import React from 'react';
import { motion } from 'framer-motion';

interface TestimonialsProps {
  onInquire: () => void;
}

const testimonials = [
  {
    quote: "Faith in Frames didn't just capture our wedding — they captured how it felt.",
    author: "Sarah & Michael",
    event: "Wedding, 2024"
  },
  {
    quote: "Every frame felt personal, honest, and timeless. They understood our story without us having to explain.",
    author: "Priya & Arjun",
    event: "Pre-wedding Film, 2024"
  },
  {
    quote: "We've never seen ourselves look so genuinely in love. These aren't just photos — they're emotions frozen in time.",
    author: "Emma & James",
    event: "Engagement Shoot, 2023"
  }
];

const Testimonials: React.FC<TestimonialsProps> = ({ onInquire }) => {
  return (
    <section className="py-24 md:py-40 bg-neutral-900/10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-20">
          <span className="text-xs uppercase tracking-[0.4em] text-neutral-500 mb-4 block">Kind Words</span>
          <h2 className="text-4xl md:text-6xl font-serif">What Our Clients Believe</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative p-8 border-l border-neutral-800 hover:border-neutral-500 transition-colors duration-500"
            >
              <span className="text-6xl font-serif text-neutral-800 absolute -top-4 -left-4 pointer-events-none opacity-50">“</span>
              <p className="text-lg md:text-xl text-neutral-300 font-light italic leading-relaxed mb-8 relative z-10">
                {t.quote}
              </p>
              <div className="border-t border-neutral-800 pt-6">
                <h4 className="text-sm uppercase tracking-widest font-medium text-white">{t.author}</h4>
                <p className="text-xs text-neutral-500 mt-1 uppercase tracking-tighter">{t.event}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center"
        >
          <button 
            onClick={onInquire}
            className="px-10 py-4 border border-neutral-800 text-xs uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all"
          >
            Join Our Stories
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
