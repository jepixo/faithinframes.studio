
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  onInquire: () => void;
}

const Header: React.FC<HeaderProps> = ({ onInquire }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'WORK', href: '#portfolio' },
    { name: 'ABOUT', href: '#about' },
    { name: 'SERVICES', href: '#services' },
    { name: 'CONTACT', href: '#contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-1 w-full z-[95] p-8 md:pr-24 pointer-events-none blend-difference">
        <div className="flex justify-between items-start w-full">
          <div className="pointer-events-auto" style={{ mixBlendMode: 'difference' }}>
            <motion.a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="text-2xl md:text-3xl font-black tracking-tighter block font-heading transform-gpu"
              whileHover={{ scale: 1.06 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              FAITH IN FRAMES
            </motion.a>
          </div>

          <nav
            className="hidden md:flex items-center space-x-12 pointer-events-auto font-mono"
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

          <div className="md:hidden pointer-events-auto flex items-center gap-2">
            <div
              className="flex items-center text-[10px] text-white"
              style={{ mixBlendMode: 'difference' }}>
              <div className="w-8 h-4 border border-white/40 relative p-0.5">
                <div className="h-full bg-white/80 w-[98%]" />
                <div className="absolute -right-1.5 top-1 w-1 h-2 bg-white/40 rounded-r-sm" />
              </div>
            </div>
            <button
              onClick={() => setIsOpen(true)}
              className="p-2"
              style={{ mixBlendMode: 'difference' }}
            >
              <Menu size={24} color="white" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, filter: 'blur(20px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(20px)' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-white/90 backdrop-blur-xl text-black z-[200] flex flex-col p-10 pointer-events-auto"
          >
            <div className="flex justify-end items-end ">
              <button onClick={() => setIsOpen(false)}><X size={60} /></button>
            </div>
            <div className="flex-1 flex flex-col justify-center space-y-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="text-6xl md:text-8xl font-black tracking-tighter uppercase font-heading hover:italic transition-all"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
