
import React, { useRef, RefObject } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface PortfolioProps {
  scrollContainer?: RefObject<HTMLElement>;
}

const projects = [
  { id: '01', title: 'ETERNAL VOWS', type: 'WEDDING FILM', img: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1600' },
  { id: '02', title: 'THE GOLDEN HOUR', type: 'EDITORIAL', img: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=1600' },
  { id: '03', title: 'NEON DRIFT', type: 'AUTOMOTIVE', img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1600' },
  { id: '04', title: 'SILENT WHISPERS', type: 'DOCUMENTARY', img: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&q=80&w=1600' },
  { id: '05', title: 'APEX ASCENT', type: 'SPORTS', img: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=1600' },
];

const Portfolio: React.FC<PortfolioProps> = ({ scrollContainer }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    container: scrollContainer,
    offset: ["start start", "end end"]
  });

  // Using -85% to ensure the "Start Journey" section is fully revealed at the end of the scroll
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-98%"]);

  return (
    <div ref={sectionRef} id="portfolio" className="relative h-[400vh] bg-neutral-900">
      <div className="sticky top-5 h-screen w-full flex items-center overflow-hidden">
        {/* Centered Portfolio Reel Title to avoid overlap with Logo */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10 flex items-center gap-6 whitespace-nowrap pb-8">
          <div className="w-12 md:w-20 h-[1px] bg-neutral-800 hidden sm:block" />
          <h2 className="text-[10px] md:text-[12px] font-mono tracking-[0.5em] text-neutral-500 uppercase">
            [ PORTFOLIO REELS ]
          </h2>
          <div className="w-12 md:w-20 h-[1px] bg-neutral-800 hidden sm:block" />
        </div>
        <motion.div style={{ x }} className="flex gap-20 px-20 items-center pl-72">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className="relative flex-shrink-0 group"
            >
              <div className="w-[85vw] md:w-[65vw] lg:w-[50vw] aspect-[16/9] overflow-hidden bg-neutral-950 border border-neutral-800 relative">
                <img
                  src={project.img}
                  className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105 transition-all duration-1000 ease-out"
                  alt={project.title}
                />

                {/* Hover Overlay: Meta-data focus, no overlapping title */}
                <div className="absolute inset-0 p-8 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none bg-black/40 backdrop-blur-[2px]">
                  <div className="flex justify-between items-start translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">PROJECT CODE</span>
                      <span className="text-white text-xs font-black font-mono">FF-2026-{project.id}</span>
                    </div>
                    <span className="text-white text-[10px] font-mono border border-white/20 px-2 py-1">RAW 4K // 24FPS</span>
                  </div>

                  <div className="flex justify-between items-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-150">
                    <div>
                      <p className="text-white/60 text-[10px] font-mono uppercase tracking-[0.3em] mb-2">CATEGORY / {project.type}</p>
                      <div className="flex gap-4">
                        <div className="h-1 w-12 bg-white/20 relative overflow-hidden">
                          <div className="absolute inset-0 bg-red-600 w-1/3 group-hover:translate-x-12 transition-transform duration-1000" />
                        </div>
                      </div>
                    </div>
                    <div className="pointer-events-auto flex items-center gap-4">
                      <span className="text-[10px] font-mono text-white opacity-0 group-hover:opacity-100 transition-opacity delay-300 uppercase tracking-widest">VIEW PROJECT</span>
                      <a href="#contact" className="bg-white text-black w-12 h-12 rounded-full flex items-center justify-center hover:bg-red-600 hover:text-white transition-all transform hover:rotate-45">
                        <span className="text-xl">↗</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Title below card */}
              <h3 className="mt-8 text-6xl md:text-8xl font-black tracking-tighter uppercase text-white/10 group-hover:text-white group-hover:tracking-normal transition-all duration-700 ease-in-out font-heading">
                {project.title}
              </h3>
            </motion.div>
          ))}

          {/* End section with Start Journey button */}
          <div className="flex-shrink-0 w-[60vw] flex items-center justify-center pr-40">
            <motion.a
              href="#contact"
              className="group relative flex flex-col items-center pointer-events-auto"
            >
              <span className="text-[10px] font-mono text-neutral-500 tracking-[0.5em] mb-4 uppercase">READY TO CREATE?</span>
              <span className="text-xl md:text-3xl font-black tracking-[0.2em] text-white group-hover:text-red-600 transition-all uppercase font-heading flex items-center gap-4">
                START JOURNEY <span className="text-sm group-hover:translate-x-2 transition-transform">→</span>
              </span>
              <div className="w-0 group-hover:w-full h-[1px] bg-red-600 mt-2 transition-all duration-500" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Portfolio;
