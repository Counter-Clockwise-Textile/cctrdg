'use client';

import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

// --- Sub-Components ---

const GrainOverlay = () => (
  <div className="pointer-events-none fixed inset-0 z-[100] opacity-[0.04] contrast-150 brightness-110" 
       style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
  </div>
);

const Nav = () => (
  <nav className="fixed top-0 w-full z-50 flex justify-between p-6 items-center border-b border-white/5 backdrop-blur-md bg-black/40 text-white">
    <div className="font-bold tracking-tighter text-2xl drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">
      CLOCKWISE TECHNICAL TEXTILES // <span className="text-blue-400 font-mono text-lg">TT-01</span>
    </div>
    <div className="flex gap-8 text-[10px] uppercase tracking-[0.3em] font-mono text-white/50">
      <a href="#" className="hover:text-blue-300 transition-all hover:drop-shadow-[0_0_5px_rgba(59,130,246,1)]">Inventory</a>
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
  return <div className="text-blue-400 text-xl font-mono mt-2 shadow-[0_0_10px_rgba(59,130,246,0.3)]">{time.toString().padStart(6, '0')}</div>;
};

const NeonTube = () => (
  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-48 bg-blue-400 shadow-[0_0_15px_#3b82f6,0_0_30px_#3b82f6,0_0_60px_#1e3a8a] z-10 opacity-70" />
);

const ProductCard = ({ title, year, category }: { title: string; year: string; category: string }) => (
  <motion.div 
    whileHover={{ scale: 1.02, rotateY: -3, rotateX: 2 }}
    className="relative overflow-hidden border border-white/10 p-10 group cursor-crosshair bg-[#0a0a0a] transition-all"
    style={{ 
      backgroundImage: `linear-gradient(to bottom right, rgba(255,255,255,0.03), transparent)`,
      boxShadow: 'inset 0 0 30px rgba(0,0,0,1)' 
    }}
  >
    {/* Leather Texture Overlay */}
    <div className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none" 
         style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/black-linen.png')` }} />
    
    <div className="flex justify-between items-start mb-20 relative z-10">
      <span className="font-mono text-[9px] tracking-widest text-white/20 italic italic">REF_{year}</span>
      <div className="w-1.5 h-1.5 bg-blue-500 shadow-[0_0_10px_#3b82f6] rounded-full animate-pulse" />
    </div>
    
    <h3 className="text-3xl font-black uppercase mb-1 tracking-tighter text-white/90 group-hover:text-blue-400 transition-colors duration-500">
      {title}
    </h3>
    <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em]">{category}</p>
    <div className="mt-8 h-[1px] w-0 group-hover:w-full bg-gradient-to-r from-blue-600 to-transparent transition-all duration-700" />
  </motion.div>
);

// --- Main Page Component ---

export default function TemporalApp() {
  const { scrollYProgress } = useScroll();
  const reverseProgress = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scaleX = useSpring(reverseProgress, { stiffness: 100, damping: 30 });

  return (
    <div className="bg-[#050505] text-white min-h-screen relative selection:bg-blue-900 selection:text-white overflow-x-hidden">
      {/* Neon Scroll Progress */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[2px] bg-blue-500 z-[60] origin-left shadow-[0_0_15px_#3b82f6]"
        style={{ scaleX }}
      />

      <GrainOverlay />
      <Nav />
      
      <main className="relative">
        {/* Environmental Neon Lighting */}
        <div className="absolute top-0 left-1/4 w-[1px] h-[600px] bg-gradient-to-b from-blue-500/40 via-blue-500/10 to-transparent blur-[2px]" />
        <div className="absolute top-0 right-1/4 w-[1px] h-[800px] bg-gradient-to-b from-blue-400/20 via-blue-400/5 to-transparent blur-[2px]" />

        {/* Hero Section */}
        <section className="h-screen flex flex-col items-center justify-center px-6 relative">
          <NeonTube />
          
          {/* Industrial Metal Plate */}
          <div className="relative p-16 border border-white/5 bg-[#080808] shadow-[0_50px_100px_-20px_rgba(0,0,0,1)] overflow-hidden">
             {/* Brushed Metal Texture */}
             <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                  style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/brushed-alum.png')` }} />
             
             <div className="text-center z-10 relative">
                <div className="mb-4 flex flex-col items-center">
                   <span className="text-[10px] font-mono tracking-[0.5em] text-white/30 uppercase mb-2">System Status: Active</span>
                   <ReverseTimer />
                </div>

                <h1 className="text-7xl md:text-[140px] font-black uppercase tracking-tighter leading-[0.75] mb-10">
                  CLOCKWISE <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/10 italic">TECHNICAL</span>
                </h1>

                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block px-12 py-5 border border-blue-500/40 bg-blue-500/5 text-blue-400 font-mono text-xs tracking-[0.5em] uppercase hover:bg-blue-500 hover:text-black transition-all cursor-crosshair shadow-[0_0_20px_rgba(59,130,246,0.15)]"
                >
                  Enter Laboratory
                </motion.div>
             </div>
          </div>
        </section>

        {/* Materials Grid */}
        <section className="py-40 px-6 max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col mb-24 gap-6">
             <div className="flex justify-between items-end">
                <h2 className="text-[11px] font-mono uppercase tracking-[1em] text-blue-500/70">Materials_Archive</h2>
                <span className="text-[9px] font-mono text-white/20">UNIT_001 // UNIT_004</span>
             </div>
             <div className="h-[1px] w-full bg-gradient-to-r from-blue-500/60 via-white/10 to-transparent" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            <ProductCard title="Heavy Hide Parka" year="2026" category="Hand-Treated Leather" />
            <ProductCard title="Oxidized Shell" year="2024" category="Corroded Membrane" />
            <ProductCard title="Steel Knit" year="2025" category="Metal-Infused Textile" />
          </div>
        </section>

        {/* Philosophy / Technical Specs */}
        <section className="py-40 border-t border-white/5 bg-[#030303]">
          <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-5xl font-bold tracking-tighter uppercase leading-none mb-8">
                Non-Linear <br />Engineering
              </h2>
              <p className="text-lg leading-relaxed text-white/60 font-light">
                Our textiles are engineered to resist the standard degradation of time. 
                By utilizing hand-oxidized finishes and chrome-injected polymers, we 
                create garments that exist in a permanent state of R&D.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 font-mono text-[10px] uppercase tracking-widest text-white/40">
              <div className="p-6 border border-white/5 bg-black/50 hover:border-blue-500/30 transition-colors">
                [01] Hand-treated leather membranes
              </div>
              <div className="p-6 border border-white/5 bg-black/50 hover:border-blue-500/30 transition-colors">
                [02] Thermal-reactive technical dyes
              </div>
              <div className="p-6 border border-white/5 bg-black/50 hover:border-blue-500/30 transition-colors">
                [03] Modular structural assembly
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="p-24 border-t border-white/5 bg-black text-center relative">
         <div className="font-mono text-[9px] uppercase tracking-[1.2em] text-white/15">
           Clockwise Technical Textiles // All Rights Reversed &copy; 2026
         </div>
         {/* Subtle footer glow */}
         <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-[1px] bg-blue-500/20 blur-sm" />
      </footer>
    </div>
  );
}