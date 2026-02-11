
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CameraHUD: React.FC = () => {
  const [time, setTime] = useState('');
  const [frame, setFrame] = useState(0);


  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 1000);

    const frameTimer = setInterval(() => {
      setFrame(prev => (prev + 1) % 24);
    }, 41.67);

    return () => {
      clearInterval(timer);
      clearInterval(frameTimer);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[150] pointer-events-none font-mono select-none blend-difference">
      {/* Viewfinder Outer Frame - BLENDED */}
      <div
        className="absolute inset-4 "
        style={{ mixBlendMode: 'difference' }}
      />

      {/* Content Container */}
      <div className="absolute inset-4 flex flex-col justify-end h-full">

        
        {/* RGB Meters - NO BLEND (Isolated to keep colors pure) */}
        <div
          className="fixed right-[14.7px] top-1/2 -translate-y-1/2 flex flex-col items-center gap-3 z-[160] pointer-events-none"
        >
          {[
            { color: '#ef4444', label: 'R' },
            { color: '#22c55e', label: 'G' },
            { color: '#3b82f6', label: 'B' }
          ].map((bar, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div className="w-[1.5px] h-[55px] md:h-[55px] relative">
                {/* Blending Track Background */}
                <div className="absolute inset-0 bg-white/50 blend-difference" />
              </div>
              <span className="text-[8px] text-white/80 font-bold mb-1 leading-none blend-difference">{bar.label}</span>
            </div>
          ))}
        </div>


        {/* Bottom Row */}
        <div className="flex justify-between items-end pb-12 pl-4 pr-3">
          {/* Timecode Section - BLENDED */}
          <div className="text-left" style={{ mixBlendMode: 'difference' }}>
            <div className="text-[14px] md:text-[16px] font-bold text-white tracking-[0.2em]">
              {time}:{frame.toString().padStart(2, '0')}
            </div>
            <div className="text-[8px] text-white/50 mt-1 uppercase tracking-[0.3em] font-medium">
              TIMECODE MASTER
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* RECORDING Text - BLENDED */}
            <span
              className="text-[11px] font-bold text-white tracking-[0.3em] uppercase"
              style={{ mixBlendMode: 'difference' }}
            >
              RECORDING
            </span>
          </div>
        </div>
      </div>

      {/* Viewfinder Corners - BLENDED */}
      <div
        className="absolute inset-4 pointer-events-none overflow-hidden"
        style={{ mixBlendMode: 'difference' }}
      >
        <div className="absolute top-0 left-0 border-t-2 border-l-2 border-white/80 w-12 h-12" />
        <div className="absolute top-0 right-0 border-t-2 border-r-2 border-white/80 w-12 h-12" />
        <div className="absolute bottom-0 left-0 border-b-2 border-l-2 border-white/80 w-12 h-12" />
        <div className="absolute bottom-0 right-0 border-b-2 border-r-2 border-white/80 w-12 h-12" />
      </div>
    </div>
  );
};

export default CameraHUD;
