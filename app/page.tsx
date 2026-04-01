'use client';

import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

// --- Sub-Components ---

const ClockFace = () => {
  const ticks = Array.from({ length: 60 }); 
  return (
    <div className="fixed inset-0 z-0 flex items-center justify-center pointer-events-none opacity-10">
      <div className="relative w-[90vw] h-[90vw] max-w-[900px] max-h-[900px] rounded-full border border-blue-900/40">
        {ticks.map((_, i) => (
          <div 
            key={i} 
            className="absolute top-0 left-1/2 -translate-x-1/2 origin-bottom bg-blue-900/50"
            style={{
              height: i % 5 === 0 ? '15px' : '5px',
              width: i % 5 === 0 ? '2px' : '1px',
              top: '10px',
              transform: `translateX(-50%) rotate(${i * 6}deg)`,
              transformOrigin: '50% 450px' // Adjust based on max-width
            }}
          />
        ))}
      </div>
    </div>
  );
};

const TemporalHand = () => (
  <motion.div 
    className="fixed inset-0 z-10 flex items-center justify-center pointer-events-none"
    style={{ rotate: 180 }}
  >
    <motion.div 
      className="w-[1.5px] bg-[#111] shadow-[0_0_10px_rgba(59,130,246,0.2)]"
      style={{ height: '45vh', maxHeight: '450px', originY: 1 }}
      animate={{ rotate: -360 }}
      transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
    />
  </motion.div>
);

const GrainOverlay = () => (
  <div className="pointer-events-none fixed inset-0 z-[100] opacity-[0.04] contrast-150 brightness-110" 
       style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
  </div>
);

const Nav = () => (
  <nav className="fixed top-0 w-full z-50 flex justify-between p-6 items-center border-b border-white/5 backdrop-blur-md bg-black/40 text-white">
    <div className="font-bold tracking-tighter text-2xl drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">
      CTTRDG // <span className="text-blue-400 font-mono text-lg">TT-01</span>
    </div>
    <div className="flex gap-8 text-[10px] uppercase tracking-[0.3em] font-mono text-white/50 relative z-20">
      <a href="#" className="hover:text-blue-300 transition-all">Inventory</a>
      <a href="#" className="hover:text-blue-300 transition-all">Cart (0)</a>
    </div>
  </nav>
);

const ReverseTimer = () => {
  const [time, setTime] = useState(9999);
  useEffect(() => {
    const interval = setInterval(() => setTime(t => (t <= 0 ? 9999 : t - 1)), 100);
    return () => clearInterval(interval);
  }, []);
  return <div className="text-blue-400 text-xl font-mono mt-2">{time.toString().padStart(6, '0')}</div>;
};

const ProductCard = ({ title, year, category }: { title: string; year: string; category: string }) => (
  <motion.div 
    whileHover={{ scale: 1.02, rotateY: -3 }}
    className="relative overflow-hidden border border-white/10 p-10 group cursor-crosshair bg-[#0a0a0a] transition-all"
    style={{ boxShadow: 'inset 0 0 30px rgba(0,0,0,1)' }}
  >
    <div className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none" 
         style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/black-linen.png')` }} />
    <div className="flex justify-between items-start mb-20 relative z-10">
      <span className="font-mono text-[9px] tracking-widest text-white/20 italic">REF_{year}</span>
      <div className="w-1.5 h-1.5 bg-blue-500 shadow-[0_0_10px_#3b82f6] rounded-full animate-pulse" />
    </div>
    <h3 className="text-3xl font-black uppercase mb-1 tracking-tighter text-white/90 group-hover:text-blue-400 transition-colors">
      {title}
    </h3>
    <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em]">{category}</p>
  </motion.div>
);

export default function TemporalApp() {
  const { scrollYProgress } = useScroll();
  const reverseProgress = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scaleX = useSpring(reverseProgress, { stiffness: 100, damping: 30 });

  return (
    <div className="bg-[#050505] text-white min-h-screen relative selection:bg-blue-900 selection:text-white overflow-x-hidden">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=UnifrakturMaguntia&display=swap" rel="stylesheet" />

      <ClockFace />
      <TemporalHand />

      <motion.div 
        className="fixed top-0 left-0 right-0 h-[2px] bg-blue-500 z-[60] origin-left shadow-[0_0_15px_#3b82f6]"
        style={{ scaleX }}
      />

      <GrainOverlay />
      <Nav />
      
      <main className="relative z-20">
        <section className="h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
          <div className="relative p-16 border border-white/5 bg-[#080808]/90 backdrop-blur-sm shadow-2xl overflow-hidden">
             <div className="text-center z-10 relative">
                <div className="mb-4 flex flex-col items-center">
                   <span className="text-[10px] font-mono tracking-[0.5em] text-white/30 uppercase mb-2">System_Active</span>
                   <ReverseTimer />
                </div>
                <div className="relative mb-12">
                   <div className="absolute top-[-20px] left-[-20px] w-4 h-4 text-blue-500 shadow-[0_0_10px_#3b82f6]">✦</div>
                   <div className="absolute bottom-[-20px] right-[-20px] w-4 h-4 text-blue-500 shadow-[0_0_10px_#3b82f6]">✦</div>
                   <h1 
                     className="text-[100px] md:text-[220px] leading-[0.7] tracking-tight text-center relative z-20"
                     style={{ 
                       fontFamily: '"UnifrakturMaguntia", serif',
                       backgroundImage: 'linear-gradient(to bottom, #f1f5f9 0%, #cbd5e1 30%, #475569 50%, #94a3b8 70%, #f8fafc 100%)',
                       WebkitBackgroundClip: 'text',
                       WebkitTextFillColor: 'transparent',
                       textShadow: '-2px -2px 0 #ffffff, 2px 2px 0 #1e293b',
                       filter: 'drop-shadow(0 0 10px rgba(59,130,246,0.3))'
                     }}
                   >
                     Clockwise
                   </h1>
                </div>
                <div className="inline-block px-12 py-5 border border-blue-500/40 bg-blue-500/5 text-blue-400 font-mono text-xs tracking-[0.5em] uppercase hover:bg-blue-500 hover:text-black transition-all cursor-crosshair">
                  Enter Laboratory
                </div>
             </div>
          </div>
        </section>

        <section className="py-40 px-6 max-w-7xl mx-auto relative z-10 bg-[#050505]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            <ProductCard title="Heavy Hide Parka" year="2026" category="Hand-Treated Leather" />
            <ProductCard title="Oxidized Shell" year="2024" category="Corroded Membrane" />
            <ProductCard title="Steel Knit" year="2025" category="Metal-Infused Textile" />
          </div>
        </section>
      </main>

      <footer className="p-24 border-t border-white/5 bg-black text-center relative z-20">
         <div className="font-mono text-[9px] uppercase tracking-[1.2em] text-white/15">
           Clockwise Technical Textiles // All Rights Reversed &copy; 2026
         </div>
      </footer>
    </div>
  );
}