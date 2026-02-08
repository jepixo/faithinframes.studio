
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import CameraHUD from './components/CameraHUD';

const App: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2500);

        const handleGlobalHashClick = (e: MouseEvent) => {
            const target = (e.target as HTMLElement).closest('a');
            if (!target) return;
            const href = target.getAttribute('href');
            if (href && href.startsWith('#') && href.length > 1) {
                try {
                    const element = document.querySelector(href);
                    if (element) {
                        e.preventDefault();
                        element.scrollIntoView({ behavior: 'smooth' });
                    }
                } catch (err) {
                    console.warn('Navigation error:', err);
                }
            }
        };

        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };

        document.addEventListener('click', handleGlobalHashClick);
        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            clearTimeout(timer);
            document.removeEventListener('click', handleGlobalHashClick);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    const rLevel = Math.min(100, Math.max(10, (mousePos.x / (typeof window !== 'undefined' ? window.innerWidth : 1)) * 100));
    const gLevel = Math.min(100, Math.max(10, (mousePos.y / (typeof window !== 'undefined' ? window.innerHeight : 1)) * 100));
    const bLevel = Math.min(100, Math.max(10, ((mousePos.x + mousePos.y) / (typeof window !== 'undefined' ? (window.innerWidth + window.innerHeight) : 1)) * 100));

    const handleInquire = () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="relative min-h-screen selection:bg-white selection:text-black">
            {!isLoading && (<motion.div
                className="fixed top-[16px] left-[175px] right-[110px] h-[2px] bg-white/80 origin-left z-[300] blend-difference"
                style={{ scaleX }}
            />)}
            <AnimatePresence mode="wait">
                {isLoading ? (
                    <motion.div
                        key="loader"
                        className="fixed inset-0 z-[200] bg-black flex items-center justify-center flex-col p-10"
                        exit={{ y: '-100%' }}
                        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                    >
                        <div className="flex flex-col items-center">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: '100%' }}
                                transition={{ duration: 2 }}
                                className="h-px bg-white w-64 mb-10"
                            />
                            <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase mb-4 font-heading">
                                FAITH IN FRAMES
                            </h1>
                            <div className="flex gap-10 font-mono text-[9px] text-neutral-500 tracking-[0.5em] uppercase">
                                <span>SYSTEM BOOT V1.0</span>
                                <span className="animate-pulse">LOADING DATA...</span>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.main
                        key="content"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.2 }}
                        className="relative"
                    >
                        <Hero />
                        <About />
                        <Portfolio />
                        <Services onInquire={(name) => handleInquire()} />
                        <Contact />
                    </motion.main>
                )}
            </AnimatePresence>
            {!isLoading && (
                <>
                    <Header onInquire={handleInquire} />
                    <CameraHUD />

                    {/* RGB Meters - NO BLEND (Isolated to keep colors pure) */}
                    <div
                        className="fixed left-3.5 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3 z-[160] pointer-events-none"
                    >
                        {[
                            { color: '#ef4444', level: rLevel, label: 'R' },
                            { color: '#22c55e', level: gLevel, label: 'G' },
                            { color: '#3b82f6', level: bLevel, label: 'B' }
                        ].map((bar, i) => (
                            <div key={i} className="flex flex-col items-center gap-2">
                                <div className="w-[1.5px] h-[55px] md:h-[55px] relative">
                                    {/* Blending Track Background */}
                                    {/* <div className="absolute inset-0 bg-white/50 blend-difference" /> */}

                                    {/* Pure Color Level Bar */}
                                    <motion.div
                                        animate={{ height: `${bar.level}%` }}
                                        transition={{ type: 'spring', damping: 25, stiffness: 120 }}
                                        className="absolute bottom-0 left-0 w-full z-10"
                                        style={{
                                            backgroundColor: bar.color,
                                            mixBlendMode: 'normal'
                                        }}
                                    />
                                </div>
                                <span className="text-[8px] text-white/0 font-bold mb-1 leading-none blend-difference">{bar.label}</span>
                            </div>
                        ))}
                    </div>
                    <div className="fixed bottom-[35px] right-[120px] z-[160] flex items-center gap-4 pointer-events-none">
                        {/* Record Status - Red Indicator (ISOLATED) */}
                        <div
                            className="flex items-center gap-2"
                            style={{ isolation: 'isolate', mixBlendMode: 'normal' }}
                        >
                            <div className="w-2.5 h-2.5 bg-[#ff0000] rounded-full animate-blink shadow-[0_0_10px_rgba(255,0,0,0.6)]" />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default App;
