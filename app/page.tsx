'use client';

import { motion } from 'framer-motion';

// --- Sub-Components ---

const GrainOverlay = () => (
  <div className="pointer-events-none fixed inset-0 z-[100] opacity-[0.03] contrast-150 brightness-110" 
       style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3C%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
  </div>
);

const Nav = () => (
  <nav className="fixed top-0 w-full z-50 flex justify-between p-6 items-center border-b border-white/5 backdrop-blur-md bg-black/40">
    <div className="font-bold tracking-tighter text-2xl text-white drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]">
      CCTRDG // <span className="text-blue-400">LAB-01</span>
    </div>
    <div className="flex gap-8 text-[10px] uppercase tracking-[0.3em] font-mono text-white/50">
      <a href="#" className="hover:text-blue-300 transition-all hover:drop-shadow-[0_0_5px_rgba(59,130,246,1)]">Inventory</a>
      <a href="#" className="hover:text-blue-300 transition-all">Cart (0)</a>
    </div>
  </nav>
);

const NeonTube = () => (
  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-32 bg-blue-400 shadow-[0_0_15px_#3b82f6,0_0_30px_#3b82f6,0_0_60px_#1e3a8a] z-10 opacity-80" />
);

const ProductCard = ({ title, year, category }: { title: string; year: string; category: string }) => (
  <motion.div 
    whileHover={{ scale: 1.02, rotateY: -5 }}
    className="relative overflow-hidden border border-white/10 p-8 group cursor-crosshair bg-[#0a0a0a] transition-all"
    style={{ 
      backgroundImage: `linear-gradient(to bottom right, rgba(255,255,255,0.05), transparent)`,
      boxShadow: 'inset 0 0 20px rgba(0,0,0,0.8)' 
    }}
  >
    {/* Leather Texture Overlay */}
    <div className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none" 
         style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/black-linen.png')` }} />
    
    <div className="flex justify-between items-start mb-16 relative z-10">
      <span className="font-mono text-[9px] tracking-widest text-white/30 italic">PROTO_{year}</span>
      <div className="w-1.5 h-1.5 bg-blue-500 shadow-[0_0_8px_#3b82f6] rounded-full animate-pulse" />
    </div>
    
    <h3 className="text-2xl font-black uppercase mb-1 tracking-tighter text-white/90 group-hover:text-blue-400 transition-colors">
      {title}
    </h3>
    <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest">{category}</p>
  </motion.div>
);

// --- Main Page Component ---

export default function TemporalApp() {
  return (
    <div className="bg-[#050505] text-white min-h-screen relative selection:bg-blue-900 overflow-x-hidden">
      <GrainOverlay />
      <Nav />
      
      <main className="relative">
        {/* Neon Light Source (The "Ceiling" Light) */}
        <div className="absolute top-0 left-1/4 w-[1px] h-[500px] bg-gradient-to-b from-blue-500/50 to-transparent blur-[1px]" />
        <div className="absolute top-0 right-1/4 w-[1px] h-[700px] bg-gradient-to-b from-blue-400/30 to-transparent blur-[1px]" />

        {/* Hero Section */}
        <section className="h-screen flex flex-col items-center justify-center px-6 relative">
          <NeonTube />
          
          {/* Metal Plate Look */}
          <div className="relative p-12 border border-white/5 bg-[#0a0a0a] shadow-2xl overflow-hidden group">
             <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
                  style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/brushed-alum.png')` }} />
             
             <div className="text-center z-10 relative">
                <h1 className="text-6xl md:text-[120px] font-black uppercase tracking-[calc(-0.05em)] leading-[0.8] mb-8 drop-shadow-2xl">
                  RUGGED <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 italic">SENSORY</span>
                </h1>
                <div className="inline-block px-10 py-4 border border-blue-500/50 bg-blue-500/5 text-blue-400 font-mono text-xs tracking-[0.4em] uppercase hover:bg-blue-500 hover:text-black transition-all cursor-pointer shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                  Enter Laboratory
                </div>
             </div>
          </div>
        </section>

        {/* Archive Section */}
        <section className="py-32 px-6 max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col mb-20 gap-4">
             <h2 className="text-[10px] font-mono uppercase tracking-[0.8em] text-blue-500/60">Materials_Database</h2>
             <div className="h-[1px] w-full bg-gradient-to-r from-blue-500/50 via-white/5 to-transparent" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
            <ProductCard title="Heavy Hide Parka" year="01" category="Treated Leather" />
            <ProductCard title="Oxidized Shell" year="02" category="Corroded Nylon" />
            <ProductCard title="Steel Knit" year="03" category="Metal Infusion" />
          </div>
        </section>
      </main>

      <footer className="p-20 border-t border-white/5 bg-black text-center relative overflow-hidden">
         <div className="font-mono text-[9px] uppercase tracking-[1em] text-white/20">
           Manual Process // No Digital Symmetry
         </div>
      </footer>
    </div>
  );
}