
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-20 border-t border-neutral-900">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-16">
          <div className="flex-1">
            <h3 className="text-[12vw] font-black tracking-tighter leading-none opacity-5 pointer-events-none absolute -top-10 left-0 overflow-hidden select-none">
              FAITHINFRAMES
            </h3>
            <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-12 pt-10">
              <div>
                <p className="font-mono text-[9px] text-neutral-600 mb-6 tracking-widest uppercase">[ NAVIGATION ]</p>
                <ul className="font-mono text-[10px] space-y-3 uppercase tracking-widest">
                  <li><a href="#" className="hover:text-red-500 transition-colors">HOME</a></li>
                  <li><a href="#portfolio" className="hover:text-red-500 transition-colors">WORK</a></li>
                  <li><a href="#about" className="hover:text-red-500 transition-colors">ABOUT</a></li>
                  <li><a href="#services" className="hover:text-red-500 transition-colors">SERVICES</a></li>
                </ul>
              </div>
              <div>
                <p className="font-mono text-[9px] text-neutral-600 mb-6 tracking-widest uppercase">[ CONNECT ]</p>
                <ul className="font-mono text-[10px] space-y-3 uppercase tracking-widest">
                  <li><a href="#" className="hover:text-red-500 transition-colors">INSTAGRAM</a></li>
                  <li><a href="#" className="hover:text-red-500 transition-colors">VIMEO</a></li>
                  <li><a href="#" className="hover:text-red-500 transition-colors">TIKTOK</a></li>
                </ul>
              </div>
              <div className="col-span-2">
                <p className="font-mono text-[9px] text-neutral-600 mb-6 tracking-widest uppercase">[ STUDIO_ADDRESS ]</p>
                <p className="font-mono text-[11px] text-neutral-400 uppercase leading-relaxed">
                  PUNE, INDIA // GLOBAL REMOTE OPS<br />
                  SUITE 402, PRODUCTION DISTRICT<br />
                  TERMINAL_01_A
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-right flex flex-col items-end shrink-0">
            <div className="font-mono text-[9px] text-neutral-700 mb-2 uppercase tracking-[0.2em]">
              © ALL RIGHTS RESERVED / FIF_MH_2025
            </div>
            <div className="flex gap-4 font-mono text-[9px] text-neutral-500 uppercase tracking-widest mb-6">
              <a href="#" className="hover:text-white">Privacy</a>
              <span>/</span>
              <a href="#" className="hover:text-white">Terms</a>
            </div>
            <div className="px-3 py-1 border border-neutral-800 text-[10px] font-mono text-neutral-500 uppercase">
              BUILT BY FIF_AGENCY
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
