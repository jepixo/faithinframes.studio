
import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <section id="about" className="min-h-screen py-20 md:py-40 md:pl-20 md:pr-10 md:pt-25 pt-24 pl-4 pr-4 bg-white text-black overflow-hidden flex items-start md:items-center">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          <div className="lg:col-span-6">
            <motion.h2
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="text-[12vw] lg:text-[10vw] font-black leading-[0.8] tracking-tighter uppercase font-heading"
            >
              FAITH<br />
              <span className="italic font-light">IN THE</span><br />
              FRAME.
            </motion.h2>
          </div>
          <div className="lg:col-span-6 pt-0 md:pt-12 flex flex-col justify-between">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.5em] text-neutral-400 mb-8">[ INTRO SEQUENCE ]</div>
              <p className="text-2xl md:text-3xl font-bold tracking-tighter leading-none mb-10 font-heading">
                WE DO NOT JUST CAPTURE VIDEO. WE ARCHITECT EMOTIONAL EXPERIENCES THROUGH THE LENS OF BELIEF.
              </p>
              <p className="font-mono text-xs uppercase tracking-widest text-neutral-600 leading-relaxed mb-10">
                Faith In Frames is a boutique production studio specializing in high end cinematography. Our mission is to bridge technical perfection with raw human emotion.
              </p>
            </div>

            <div className="flex gap-4">
              <a href="#portfolio" className="bg-black text-white px-8 py-4 text-[11px] font-black uppercase tracking-widest hover:bg-red-600 transition-colors font-heading">
                SEE GALLERY ↗
              </a>
              <a href="#contact" className="border border-black px-8 py-4 text-[11px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all font-heading">
                CONTACT US
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
