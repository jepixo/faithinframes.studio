import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Camera, Play, Settings, Waves, Aperture, Info } from 'lucide-react';

interface HeaderProps {
  onInquire: () => void;
  isIdle: boolean;
}

const BouncingLogo: React.FC = () => {
    const [pos, setPos] = useState({ x: 38, y: 30 });
    const vel = useRef({ x: 1.5, y: 1.5 });
    const frameId = useRef<number | null>(null);
    const logoRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const update = () => {
            setPos(prev => {
                let nextX = prev.x + vel.current.x;
                let nextY = prev.y + vel.current.y;
                
                const width = logoRef.current?.offsetWidth || 200;
                const height = logoRef.current?.offsetHeight || 40;

                if (nextX <= 0 || nextX + width >= window.innerWidth) {
                    vel.current.x *= -1;
                    nextX = prev.x + vel.current.x;
                }
                if (nextY <= 0 || nextY + height >= window.innerHeight) {
                    vel.current.y *= -1;
                    nextY = prev.y + vel.current.y;
                }
                return { x: nextX, y: nextY };
            });
            frameId.current = requestAnimationFrame(update);
        };
        frameId.current = requestAnimationFrame(update);
        return () => { if (frameId.current) cancelAnimationFrame(frameId.current); };
    }, []);

    return (
        <div 
            ref={logoRef}
            className="fixed z-[500] pointer-events-none select-none blend-difference"
            style={{ left: pos.x, top: pos.y }}
        >
            <span className="text-2xl  font-black tracking-tighter text-white whitespace-nowrap drop-shadow-[0_0_30px_rgba(255,255,255,0.6)] font-heading uppercase">
                FAITH IN FRAMES
            </span>
        </div>
    );
};



const Header: React.FC<HeaderProps> = ({ onInquire, isIdle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [activePage, setActivePage] = useState(1);

  const navLinks = [
    { name: 'WORK', href: '#portfolio' },
    { name: 'ABOUT', href: '#about' },
    { name: 'SERVICES', href: '#services' },
    { name: 'CONTACT', href: '#contact' },
  ];

  const menuSections = [
    {
      icon: <Camera size={20} strokeWidth={2.5} />,
      label: 'SHOOT',
      pages: [
        [
          { name: 'WORK_SAMPLES', href: '#portfolio', status: '4K_RAW' },
          { name: 'CINEMATIC_REEL', href: '#portfolio', status: '24FPS' },
          { name: 'ISO_SETTINGS', href: '#portfolio', status: 'AUTO' },
          { name: 'HDR_SHOOTING', href: '#portfolio', status: 'HDR_PQ' },
          { name: 'HDR_MODE', href: '#portfolio', status: 'OFF' },
        ],
        [
          { name: 'WHITE_BALANCE', href: '#', status: 'DAYLIGHT' },
          { name: 'COLOR_SPACE', href: '#', status: 'sRGB' },
          { name: 'PICTURE_STYLE', href: '#', status: 'STANDARD' },
        ]
      ]
    },
    {
      icon: <span className="font-bold text-sm sm:text-lg">AF</span>,
      label: 'AF',
      pages: [
        [
          { name: 'ABOUT_STUDIO', href: '#about', status: 'LENS_READY' },
          { name: 'VISION_TRACKING', href: '#about', status: 'ON' },
          { name: 'TEAM_ORIENTATION', href: '#about', status: 'SERVO' },
        ]
      ]
    },
    {
      icon: <Play size={20} strokeWidth={2.5} />,
      label: 'PLAY',
      pages: [
        [
          { name: 'SERVICES_LIST', href: '#services', status: 'VIEW' },
          { name: 'PRODUCTION_RATE', href: '#services', status: 'INFO' },
          { name: 'POST_WORKFLOW', href: '#services', status: 'SYNC' },
        ]
      ]
    },
    {
      icon: <Waves size={20} strokeWidth={2.5} />,
      label: 'NET',
      pages: [
        [
          { name: 'WIFI_CONNECT', href: '#', status: 'ENABLED' },
          { name: 'REMOTE_OPS', href: '#', status: 'LOCAL' },
        ]
      ]
    },
    {
      icon: <Settings size={20} strokeWidth={2.5} />,
      label: 'SETUP',
      pages: [
        [
          { name: 'INQUIRY_PORTAL', href: '#contact', status: '04' },
          { name: 'LOCATION_DATA', href: '#contact', status: 'PUNE_IN' },
          { name: 'FIRMWARE', href: '#contact', status: 'V1.2.0' },
        ]
      ]
    }
  ];

  const handleLinkClick = (e: React.MouseEvent, href: string) => {
    if (href === '#') return;
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const currentItems = menuSections[activeTab].pages[activePage - 1] || [];

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-[190] p-[30px] pointer-events-none transition-opacity duration-1700 blend-difference ${isIdle ? 'opacity-0' : 'opacity-100'}`}>
        <div className="flex justify-between items-start w-full">
          <div className="pointer-events-auto blend-difference">
            <motion.a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="text-2xl font-black tracking-tighter block font-heading text-white pl-[8px]"
            >
              FAITH  IN  FRAMES
            </motion.a>
          </div>
          <div className='flex items-center space-x-3 pointer-events-auto font-mono'>
            <nav
              className="hidden md:flex items-center space-x-12 pointer-events-auto font-mono "
              style={{ mixBlendMode: 'difference' }}
            >
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="text-[11px] tracking-[0.4em] text-white hover:text-white/70 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>
            {/* Top Row - Battery */}
            {/* <div className="flex justify-start items-start pr-2">

              <div
                className="md:flex items-center gap-4 text-[10px] text-white md:mt-0"
                style={{ mixBlendMode: 'difference' }}>
                <div className="w-8 h-4 border border-white/40 relative p-0.5">
                  <div className="h-full bg-white/80 w-[98%]" />
                  <div className="absolute -right-1.5 top-1 w-1 h-2 bg-white/40 rounded-r-sm" />
                </div>
              </div>
            </div> */}
            <motion.button
              layoutId="menu-os"
              onClick={() => setIsOpen(true)}
              className="bg-black/90 border border-white/0 text-white flex items-center gap-3 rounded-md hover:bg-neutral-900 transition-colors shadow-xl"
            >
              <Menu size={20} />
            </motion.button>
          </div>
        </div>
      </header>
      <AnimatePresence>
        {isIdle && <BouncingLogo />}
      </AnimatePresence>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            layoutId="menu-os"
            initial={{ borderRadius: '12px' }}
            animate={{ borderRadius: '0px' }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="fixed inset-0 bg-black z-[300] flex flex-col font-sans overflow-hidden pointer-events-auto"
          >
            {/* Sony Alpha Style Top Global Navigation */}
            <div className="bg-black flex items-end h-[18vw] sm:h-20 border-b border-white/-600/50 px-2 sm:px-4 pt-4">
              {menuSections.map((section, idx) => (
                <button
                  key={idx}
                  onClick={() => { setActiveTab(idx); setActivePage(1); }}
                  className={`flex-1 flex flex-col items-center justify-center h-full relative group`}
                >
                  <div className={`
                    relative flex items-center justify-center w-full h-full pb-2
                    ${activeTab === idx
                      ? 'text-white border-t border-l border-r border-white rounded-t-md bg-black z-10 -mb-[1px]'
                      : 'text-gray-500 hover:text-gray-300'}
                  `}>
                    {React.cloneElement(section.icon as React.ReactElement, {
                      size: 24,
                      strokeWidth: activeTab === idx ? 2.5 : 2
                    })}
                  </div>
                </button>
              ))}
              <div className="w-px h-12 bg-gray-800 mb-3 mx-2" />
              <button
                className="flex flex-col items-center justify-center h-full pb-2 text-gray-500 hover:text-white transition-colors w-12 sm:w-16"
                onClick={() => setIsOpen(false)}
              >
                <X size={24} />
              </button>
            </div>

            {/* Sony Style Sub-Page Navigation (Numbers) */}
            <div className="bg-black flex items-center justify-center py-2 relative z-0">
              {/* Orange line indicator is part of the number in Sony UI, exactly under the number */}
              <div className="flex gap-4 sm:gap-6 items-center">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => {
                  const hasPage = num <= menuSections[activeTab].pages.length;
                  const isActive = num === activePage;
                  return (
                    <button
                      key={num}
                      onClick={() => hasPage && setActivePage(num)}
                      className={`
                        relative flex flex-col items-center justify-center w-6 
                        font-bold text-lg sm:text-xl font-mono
                        ${isActive ? 'text-white' : hasPage ? 'text-gray-500' : 'text-gray-800'}
                      `}
                    >
                      {num}
                      {isActive && (
                        <motion.div
                          layoutId="activePageLine"
                          className="absolute -bottom-1 w-full h-[3px] bg-[#EA5408]"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Main Content Area - Sony Style List */}
            <div className="flex-1 bg-black flex flex-col overflow-hidden relative">
              <div className="flex-1 overflow-y-auto px-0 py-2">
                <div className="flex flex-col gap-[1px]">
                  {currentItems.map((item, idx) => (
                    <motion.a
                      key={`${activeTab}-${activePage}-${idx}`}
                      href={item.href}
                      onClick={(e) => handleLinkClick(e, item.href)}
                      className="group flex items-center justify-between px-4 py-3 sm:py-4 relative overflow-hidden"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {/* Sony Orange Selection Bar - Full Width Background */}
                      <div className="absolute inset-0 bg-[#EA5408] opacity-0 group-hover:opacity-100 transition-opacity duration-0 pointer-events-none mix-blend-normal" />

                      <div className="flex items-center gap-3 sm:gap-4 relative z-10 w-full">
                        {/* Icon placeholder - Sony menus have icons on the left of text often */}
                        <div className="w-8 flex justify-center text-gray-400 group-hover:text-white">
                          {idx === 0 ? <Camera size={18} /> :
                            idx === 1 ? <Aperture size={18} /> :
                              <div className="w-4 h-4 border border-current rounded-sm" />}
                        </div>

                        <span className="text-base sm:text-lg font-semibold text-white tracking-tight flex-1">
                          {item.name.replace(/_/g, ' ')}
                        </span>

                        <span className="text-sm sm:text-base font-mono text-white group-hover:text-white">
                          {item.status}
                        </span>
                      </div>
                    </motion.a>
                  ))}

                  {/* Empty rows to fill space */}
                  {[...Array(Math.max(0, 7 - currentItems.length))].map((_, i) => (
                    <div key={i} className="flex items-center justify-between px-4 py-3 opacity-20 pointer-events-none">
                      <div className="flex items-center gap-3 w-full">
                        <div className="w-8" />
                        <span className="text-gray-500 text-lg">---</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer / Bezel Branding */}
            <div className="bg-[#1a1a1a] border-t border-gray-800 p-4 pb-8 flex flex-col items-center justify-center relative shadow-[0_-10px_20px_rgba(0,0,0,0.5)]">


              <span className="text-gray-400 font-black tracking-[0.2em] text-xl select-none font-sans drop-shadow-md">
                FAITH IN FRAMES
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
