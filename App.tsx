
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useAnimation, useTransform, useMotionValueEvent } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import CameraHUD from './components/CameraHUD';
import Shutter from './components/Shutter';
import { Camera, MousePointer2 } from 'lucide-react';

const App: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const scrollRef = useRef<HTMLDivElement>(null);
    const [startIntro, setStartIntro] = useState(false)
    const [hasClicked, setHasClicked] = useState(false);
    const [isAppLoaded, setIsAppLoaded] = useState(false);
    const [hasEntered, setHasEntered] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [isIdle, setIsIdle] = useState(false);
    const cursorControls = useAnimation();
    const cameraControls = useAnimation();
    // Use ReturnType<typeof setTimeout> to fix TypeScript error in browser environments
    const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const resetIdleTimer = () => {
        setIsIdle(false);
        if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
        idleTimerRef.current = setTimeout(() => {
            setIsIdle(true);
        }, 60000); // Updated to 30 seconds idle threshold
    };

    const handleClick = async () => {
        if (hasClicked) return;
        setHasClicked(true);

        // 1. Subtle click animation
        await cameraControls.start({
            scale: 0.9,
            transition: { duration: 0.1, ease: "easeOut" }
        });

        // 2. Hand off to App.tsx expansion
        // setHasEntered(true);
    };

    useEffect(() => {
        if (hasEntered) return;

        const timer = setTimeout(() => {
            setExpanded(false)
        }, 4800);
        const t = setTimeout(() => {
            setHasEntered(true);
        }, 5000); // match animation duration
        handleClick();

        return () => {
            clearTimeout(t);
            clearTimeout(timer);
        }
    }, [hasEntered, expanded]);

    const { scrollYProgress } = useScroll({ container: scrollRef });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    const [scrollPercent, setScrollPercent] = useState(0);

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        setScrollPercent(Math.round(latest * 100));
    });

    useEffect(() => {
        const t = setTimeout(() => setStartIntro(true), 1500)

        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 4000);
        const ti = setTimeout(() => {
            setIsAppLoaded(true);
        }, 3000);
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
            resetIdleTimer();
        };

        const handleInteraction = () => resetIdleTimer();

        document.addEventListener('click', handleGlobalHashClick);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('scroll', handleInteraction, true);
        window.addEventListener('keydown', handleInteraction);
        
        resetIdleTimer();
        const sequence = async () => {
            await new Promise(resolve => setTimeout(resolve, 800));

            // Cursor travels to dock icon
            await cursorControls.start({
                x: 'calc(100vw - 110px)',
                y: 'calc(100vh - 110px)',
                opacity: 1,
                transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 1.5 }
            });

            await new Promise(resolve => setTimeout(resolve, 300));

            if (!hasClicked) {
                handleClick();
            }
        };

        sequence();
        return () => {
            clearTimeout(timer);
            clearTimeout(t);
            clearTimeout(ti);
            if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
            document.removeEventListener('click', handleGlobalHashClick);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('scroll', handleInteraction, true);
            window.removeEventListener('keydown', handleInteraction);
        };
    }, [cursorControls, cameraControls]);

    const rLevel = Math.min(100, Math.max(10, (mousePos.x / (typeof window !== 'undefined' ? window.innerWidth : 1)) * 100));
    const gLevel = Math.min(100, Math.max(10, (mousePos.y / (typeof window !== 'undefined' ? window.innerHeight : 1)) * 100));
    const bLevel = Math.min(100, Math.max(10, ((mousePos.x + mousePos.y) / (typeof window !== 'undefined' ? (window.innerWidth + window.innerHeight) : 1)) * 100));

    const handleInquire = () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        return scrollYProgress.on("change", v => {
            console.log("scroll progress:", v);
        });
    }, []);

    return (
        <div className="relative min-h-screen selection:bg-white selection:text-black">

            <AnimatePresence mode="wait">
                {isLoading ? (
                    <>
                    <motion.div
                        key="loader"
                        className="fixed inset-0 z-[200] bg-black flex items-center justify-center flex-col p-10"
                        // exit={{ y: '-100%' }}
                        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                    >
                        <div className="flex flex-col items-center">
                            {/* <motion.div
                                initial={{ width: 0 }}
                                animate={{
                                    width: '100%',
                                    x: [0, 2, -1, 3, 0, 0],
                                    y: [0, -2, 2, -1, 0, 0],
                                    rotate: [0, 0.2, -0.1, 0, 0],
                                    opacity: 1,
                                    scale: 1,
                                    filter: [
                                        'blur(20px)',
                                        'blur(0px)',
                                        'blur(2px)',
                                        'blur(0px)'
                                    ]
                                }}
                                transition={{ duration: 2, delay: 0.7, ease: "easeOut" }}
                                className="h-px bg-white w-64 mb-10"
                            /> */}
                            {/* Handheld Content Wrapper */}
                            <motion.div
                                animate={startIntro
                                    ? {
                                        x: [0, 2, -1, 3, 0, 0],
                                        y: [0, -2, 2, -1, 0, 0],
                                        rotate: [0, 0.2, -0.1, 0, 0],
                                    }
                                    : {}}
                                transition={{
                                    duration: 1.5,
                                    repeat: 0,
                                    ease: "easeInOut"
                                }}
                                className="relative z-10 flex flex-col items-center w-full"
                            >


                                {/* Main Title Group - Heavy Focus Effect with Chromatic Aberration */}
                                <div className="relative w-full flex items-center justify-center mb-6">
                                    {/* Red Channel (Outer Aberration) */}
                                    <motion.h1
                                        initial={{ opacity: 0, x: 25, y: 2, filter: "blur(20px)" }}
                                        animate={{
                                            x: [25, 0],
                                            y: [2, 0],
                                            filter: ['blur(20px)', 'blur(0px)'],
                                            opacity: [0, 1, 0.6, 1]
                                        }}
                                        transition={{ duration: 1.5, delay: 0.7, ease: "easeOut" }}
                                        className="absolute inset-x-0 text-center text-5xl font-black tracking-[-0.05em] text-red-600/50 uppercase font-heading select-none mix-blend-screen"
                                    >
                                        FAITH IN FRAMES
                                    </motion.h1>


                                    {/* Blue Channel (Outer Aberration) */}
                                    <motion.h1
                                        initial={{ opacity: 0, x: 25, y: 2, filter: "blur(20px)" }}
                                        animate={{
                                            x: [50, 0],
                                            y: [4, 0],
                                            filter: ['blur(20px)', 'blur(0px)'],
                                            opacity: [0, 0, 1, 0.6, 1]
                                        }}
                                        transition={{ duration: 1.5, delay: 0.7, ease: "easeOut" }}
                                        className="absolute inset-x-0 text-center text-5xl  font-black tracking-[-0.05em] text-cyan-600/50 uppercase font-heading select-none mix-blend-screen"
                                    >
                                        FAITH IN FRAMES
                                    </motion.h1>

                                    {/* Main Settle Layer (Sharp) */}
                                    <motion.h1
                                        initial={{ opacity: 0, scale: 1.08, filter: 'blur(50px)' }}
                                        animate={{
                                            opacity: [0, 11],
                                            scale: 1,
                                            filter: [
                                                'blur(20px)',
                                                'blur(0px)',
                                                'blur(12px)',
                                                'blur(0px)'
                                            ]
                                        }}
                                        transition={{
                                            duration: 1.2,
                                            delay: 1.2,
                                            ease: "easeOut"
                                        }}
                                        className="text-5xl font-black tracking-[-0.05em] text-white uppercase font-heading text-center relative z-20"
                                    >
                                        FAITH IN FRAMES
                                    </motion.h1>
                                </div>

                                {/* Subtext - Frame-by-Frame Glitch Settle */}

                                <div className="flex justify-center -mr-[1.2em]">
                                    {"STUDIO".split("").map((char, i) => (
                                        <motion.span
                                            key={i}
                                            initial={{ opacity: 0, filter: 'blur(40px)', y: 0 }}
                                            animate={{
                                                opacity: 1,
                                                filter: [
                                                    'blur(40px)',
                                                    'blur(0px)',
                                                    'blur(20px)',
                                                    'blur(2px)',
                                                    'blur(0px)'
                                                ],
                                                y: 0
                                            }}
                                            transition={{
                                                duration: 2,
                                                delay: 2 + (i * 0.1),
                                                ease: [0.23, 1, 0.32, 1]
                                            }}
                                            className="text-[20px]  font-mono text-white/40 tracking-[1.2em] uppercase inline-block"
                                        >
                                            {char}
                                        </motion.span>
                                    ))}
                                </div>
                            </motion.div>
                            {/* Dock Icon - The Anchor Point */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{
                                    opacity: isAppLoaded ? 1 : 0,
                                    scale: isAppLoaded ? 1 : 0.8,
                                    y: isAppLoaded ? 0 : 30
                                }}
                                className="absolute bottom-20 right-20 z-10"
                            >
                                <motion.div className="relative overflow-hidden">
                                    {/* Background */}
                                    <div className="absolute inset-0 z-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />

                                    {/* Icon */}
                                    <Camera className="relative z-10 w-10 h-10 text-white" />

                                    {/* Pulse ring */}
                                    <motion.div className="absolute inset-0 z-20 border border-white/20 rounded-[28px]" />
                                </motion.div>
                            </motion.div>

                            {/* Simulated Desktop Cursor */}
                            <motion.div
                                initial={{ x: '10vw', y: '10vh', opacity: 0 }}
                                animate={cursorControls}
                                className="fixed top-0 left-0 pointer-events-none z-[510]"
                            >
                                <div className="relative">
                                    <MousePointer2 className="w-6 h-6 text-white fill-white drop-shadow-[0_0_15px_rgba(255,255,255,1)]" />
                                    <motion.div
                                        animate={{ scale: [1, 1.4, 1], opacity: [0.1, 0.4, 0.1] }}
                                        transition={{ duration: 1.8, repeat: Infinity, }}
                                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-18 h-18 border border-white/20 rounded-full"
                                    />
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                        <div className="fixed inset-0 z-[200] flex items-center justify-center">
                            <Shutter onOpened={() => { setIsLoading(false) }} />
                        </div>

                    </>

                ) : (
                    <motion.div
                        key="content"
                        initial={{
                            position: 'fixed',
                            bottom: '80px',
                            right: '80px',
                            width: '104px',
                            height: '104px',
                            borderRadius: '28px',
                            scale: 1,
                            zIndex: 600,
                            overflow: 'hidden',
                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                            backdropFilter: 'blur(40px)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                        }}
                        animate={{
                            bottom: '0px',
                            right: '0px',
                            width: '100%',
                            height: '100%',
                            borderRadius: '0px',
                            backgroundColor: 'rgb(5, 5, 5)',
                            border: '0px solid rgba(255, 255, 255, 0)',
                            overflow: 'visible',
                            zIndex: 'auto',
                        }}
                        transition={{
                            duration: 0.8,
                            ease: [0.16, 1, 0.3, 1]
                        }}
                        style={{
                            position: expanded ? "static" : "fixed",
                        }}
                        className="flex flex-col h-screen shadow-[0_0_100px_rgba(0,0,0,0.5)]"
                    >
                        <motion.div
                            initial={{ opacity: 1, scale: 1 }}
                            animate={{ opacity: 0, scale: 2 }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                            className="absolute inset-0 flex items-center justify-center pointer-events-none z-[100]"
                        >
                            <Camera className="w-10 h-10 text-white opacity-40" strokeWidth={1} />
                        </motion.div>


                        <motion.main
                            initial={{ opacity: 0, filter: 'blur(80px)', scale: 1.1 }}
                            animate={{ opacity: 1, filter: isIdle ? "blur(10px)" : "blur(0px)", scale: 1 }}
                            transition={{
                                duration:isIdle ?0.7: 1.8,
                                delay:isIdle ?0: 0.8,
                                ease: [0.22, 1, 0.36, 1]
                            }} className="flex-1 overflow-hidden">
                            <div
                                ref={scrollRef}
                                className="h-full overflow-y-auto"
                            >
                                <Hero />
                                <About />
                                <Portfolio scrollContainer={scrollRef} />
                                <Services onInquire={(name) => handleInquire()} />
                                <Contact />
                            </div>

                        </motion.main>
                        <Header onInquire={handleInquire} isIdle={isIdle}/>
                        <CameraHUD isIdle={isIdle}/>
                        {/* Full Screen Idle Overlay */}
                        <AnimatePresence>
                            {isIdle && (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none bg-black/40 z-[400] blend-difference"
                            >
                                <motion.div 
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="flex flex-col items-center gap-6"
                                >
                                    <Camera size={80} strokeWidth={1} className="text-white/60 animate-pulse relative z-10" />
                                    <motion.div 
                                        animate={{ scale: [1, 1.4], opacity: [0.2, 0] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="absolute inset-0 border border-white/20 rounded-full"
                                    />
                                    <div className="flex flex-col items-center gap-1">
                                        <span className="text-[12px] font-mono tracking-[0.8em] text-white/40 uppercase">System Idle</span>
                                    </div>
                                </motion.div>
                            </motion.div>
                            )}
                        </AnimatePresence>

                        {/* RGB Meters - NO BLEND (Isolated to keep colors pure) */}
                        <div
                            className="fixed right-3.5 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3 z-[160] pointer-events-none"
                            style={{ filter: isIdle ? "blur(2px)" : "blur(0px)", }}
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
                        <div className="fixed bottom-[35px] right-[120px] z-[160] flex items-center gap-4 pointer-events-none"
                        style={{ filter: isIdle ? "blur(2px)" : "blur(0px)", }}>
                            {/* Record Status - Red Indicator (ISOLATED) */}
                            <div className="flex items-center gap-2" style={{ isolation: 'isolate', mixBlendMode: 'normal' }} >
                                <div className="w-2.5 h-2.5 bg-[#ff0000] rounded-full animate-blink shadow-[0_0_10px_rgba(255,0,0,0.6)]" />
                            </div>
                        </div>

                        
                    </motion.div>

                )}
            </AnimatePresence>
        </div>
    );
};

export default App;
