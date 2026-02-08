
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 300]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 600], [1, 1.15]);

  return (
    <section className="relative h-[110vh] w-full flex items-center justify-center overflow-hidden">
      {/* Background Media */}
      <motion.div style={{ y, scale }} className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover grayscale brightness-110 relative z-0 transform-gpu"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-waves-coming-to-the-shore-4100-large.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Main Content */}
      <motion.div style={{ opacity }} className="relative z-30 container mx-auto px-12">
        <div className="max-w-[1200px]">
          <h1 className="text-[12vw] font-[900] leading-[0.85] tracking-tighter uppercase mb-12 font-heading">
            WE CAPTURE<br />
            <span className="outline-text">MOMENTS</span><br />
            THAT LAST
          </h1>

          <div className="flex flex-col md:flex-row justify-between items-end gap-10">
            <div className="max-w-md">
              <p className="font-mono text-[10px] md:text-xs text-neutral-400 uppercase tracking-widest leading-relaxed">
                Faith In Frames is a full service production house providing high end content strategy and cinematic delivery for bold brands and timeless stories.
              </p>
            </div>
            <motion.a
              href="#portfolio"
              whileHover={{ scale: 1.05 }}
              className="bg-white text-black px-12 py-5 font-black text-sm uppercase tracking-tighter hover:bg-red-600 hover:text-white transition-colors flex items-center gap-4 font-heading"
            >
              EXPLORE WORKS <span className="text-xl">↗</span>
            </motion.a>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
