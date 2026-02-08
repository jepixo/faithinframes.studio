
import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Film, Palette, ChevronRight } from 'lucide-react';

interface ServicesProps {
  onInquire: (serviceName: string) => void;
}

const services = [
  {
    icon: <Camera className="w-8 h-8" />,
    title: "Photography",
    category: "Weddings • Portraits • Lifestyle • Editorial",
    description: "Still frames that breathe emotion, silence, and soul. We capture the whispers between the shouts.",
    img: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&q=80&w=1000"
  },
  {
    icon: <Film className="w-8 h-8" />,
    title: "Cinematic Videography",
    category: "Wedding Films • Pre-wedding • Short Films",
    description: "Crafted with movement, music, and meaning. Every second is treated like a piece of cinema.",
    img: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=1000"
  },
  {
    icon: <Palette className="w-8 h-8" />,
    title: "Creative Direction",
    category: "Storyboarding • Mood Design • Visual Aesthetics",
    description: "Because great visuals begin before the camera rolls. We design the look, the feel, and the soul of your session.",
    img: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=1000"
  }
];

const Services: React.FC<ServicesProps> = ({ onInquire }) => {
  return (
    <section id="services" className=" bg-neutral-900/30 min-h-screen flex items-start md:items-center py-12 md:py-24">
      <div className="container mx-auto px-6 ">
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-xs uppercase tracking-[0.5em] text-neutral-500 mb-4 block"
          >
            What We Offer
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-6xl font-serif mb-6"
          >
            Light. Emotion. Belief.
          </motion.h2>
          <div className="w-16 h-[1px] bg-neutral-700 mx-auto mb-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 md:pl-0 md:pr-0 pl-4 pr-4">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group relative overflow-hidden bg-neutral-950 p-8 border border-neutral-800 hover:border-neutral-600 transition-all duration-500"
            >
              {/* Background Reveal on Hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700">
                <img src={service.img} alt={service.title} className="w-full h-full object-cover scale-150 group-hover:scale-100 transition-transform duration-1000" />
              </div>

              <div className="relative z-10 flex flex-col h-full">
                <div className="mb-6 text-neutral-500 group-hover:text-white transition-colors duration-500">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-serif mb-2 group-hover:italic transition-all">{service.title}</h3>
                <p className="text-[10px] uppercase tracking-widest text-neutral-500 mb-6">{service.category}</p>
                <p className="text-neutral-400 font-light leading-relaxed mb-6">
                  {service.description}
                </p>

                <div className="mt-auto">
                  <button
                    onClick={() => onInquire(service.title)}
                    className="flex items-center space-x-2 text-[10px] uppercase tracking-[0.2em] text-white hover:text-neutral-400 transition-colors group/btn"
                  >
                    <span>Inquire for {service.title.split(' ')[0]}</span>
                    <ChevronRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                  <motion.div
                    className="w-8 h-[1px] bg-neutral-700 group-hover:w-full mt-4 transition-all duration-700"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-10 text-center"
        >
          <p className="text-neutral-500 italic font-serif text-lg">
            "We don't shoot moments — we honor them."
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
