'use client';

import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

// --- Sub-Components ---

const ClockFace = () => {
  const ticks = Array.from({ length: 60 }); 
  return (
    <div className="fixed inset-0 z-0 flex items-center justify-center pointer-events-none opacity-20">
      <div className="relative w-[90vw] h-[90vw] max-w-[800px] max-h-[800px] rounded-full border border-blue-500/20">
        {ticks.map((_, i) => (
          <div 
            key={i} 
            className="absolute top-0 left-1/2 -translate-x-1/2 origin-bottom bg-blue-500/30"
            style={{
              height: i % 5 === 0 ? '25px' : '10px',
              width: i % 5 === 0 ? '2px' : '1px',
              transform: `rotate(${i * 6}deg) translateY(0px)`,
              transformOrigin: `0 400px` 
            }}
          />
        ))}
      </div>
    </div>
  );
};

const TemporalHand = () => (
  <div className="absolute inset-0 z-[100] flex items-center justify-center pointer-events-none">
    {/* The Machined Metal Pin */}
    <div 
      className="w-4 h-4 rounded-full z-[101] relative shadow-[0_0_15px_rgba(59,130,246,0.3)]"
      style={{
        background: `radial-gradient(circle at 30% 30%, #94a3b8 0%, #475569 50%, #1e293b 100%)`,
        boxShadow: `
          inset -1px -1px 2px rgba(255,255,255,0.4),
          inset 1px 1px 2px rgba(0,0,0,0.8),
          0 0 10px rgba(59,130,246,0.2)
        `,
        border: '1px solid rgba(255,255,255,0.1)'
      }}
    >
      <div className="absolute inset-0 rounded-full opacity-20 mix-blend-overlay"
           style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/carbon-fibre.png')` }} />
    </div>
    
    <motion.div 
      className="absolute bg-gradient-to-t from-blue-500/50 via-[#111] to-transparent shadow-[0_0_20px_rgba(0,0,0,0.5)]"
      style={{ 
        width: '2px', 
        height: '45vh', 
        maxHeight: '400px',
        originY: 1, 
        bottom: '50%' 
      }}
      animate={{ rotate: -360 }}
      transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
    />
  </div>
);

const GrainOverlay = () => (
  <div className="pointer-events-none fixed inset-0 z-[110] opacity-[0.05] contrast-150 brightness-110" 
       style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
  </div>
);

const Nav = () => (
  <nav className="fixed top-0 w-full z-[120] flex justify-between p-6 items-center border-b border-white/5 backdrop-blur-md bg-black/40 text-white">
    <div className="font-bold tracking-tighter text-2xl drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">
      CLOCKWISE /// <span className="text-blue-400 font-mono text-lg uppercase">RD-1.1</span>
    </div>
    <div className="flex gap-8 text-[10px] uppercase tracking-[0.3em] font-mono text-white/50">
      <a href="#" className="hover:text-blue-300 transition-all">Archive</a>
      <a href="#" className="hover:text-blue-300 transition-all">Cart (0)</a>
    </div>
  </nav>
);

const ReverseTimer = () => {
  const [time, setTime] = useState(999999);
  useEffect(() => {
    const interval = setInterval(() => setTime(t => (t <= 0 ? 999999 : t - 1)), 100);
    return () => clearInterval(interval);
  }, []);
  return <div className="text-blue-400 text-2xl font-mono mt-2 tracking-widest">{time.toString().padStart(6, '0')}</div>;
};

const ProductCard = ({ title, year, category }: { title: string; year: string; category: string }) => (
  <motion.div 
    whileHover={{ scale: 1.02, rotateY: -3 }}
    className="relative overflow-hidden border border-white/10 p-12 group cursor-crosshair bg-[#0a0a0a] transition-all z-20"
  >
    <div className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none" 
         style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/black-linen.png')` }} />
    <div className="flex justify-between items-start mb-24 relative">
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
      
      {/* MACHINED HELVETICA STYLING */}
      <style dangerouslySetInnerHTML={{ __html: `
        .machined-text {
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif !important;
          font-weight: 900 !important;
          text-transform: uppercase !important;
          background: linear-gradient(to bottom, 
            #ffffff 0%, 
            #cbd5e1 45%, 
            #475569 50%, 
            #1e293b 55%, 
            #64748b 100%) !important;
          -webkit-background-clip: text !important;
          -webkit-text-fill-color: transparent !important;
          background-clip: text !important;
          
          /* ENLARGED BEVEL EFFECT */
          filter: 
            drop-shadow(2px 2px 0px rgba(255,255,255,0.4)) 
            drop-shadow(-2px -2px 0px rgba(0,0,0,0.7))
            drop-shadow(0px 0px 20px rgba(59,130,246,0.3));
          
          letter-spacing: -0.05em;
        }
      `}} />

      <ClockFace />

      <motion.div 
        className="fixed top-0 left-0 right-0 h-[2px] bg-blue-500 z-[130] origin-left shadow-[0_0_15px_#3b82f6]"
        style={{ scaleX }}
      />

      <GrainOverlay />
      <Nav />
      
      <main className="relative z-30">
        <section className="h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
          
          <TemporalHand />

          <div className="relative p-20 border border-white/5 bg-[#080808]/80 backdrop-blur-md shadow-2xl overflow-hidden">
             <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                  style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/brushed-alum.png')` }} />
             
             <div className="text-center z-10 relative">
                <div className="mb-6 flex flex-col items-center">
                   <span className="text-[10px] font-mono tracking-[0.4em] text-white/20 uppercase mb-2">
                     counterCLOCKWISE Textile Research and Development Group // RD1.1
                   </span>
                   <ReverseTimer />
                </div>
                
                <div className="relative mb-14 px-10">
                   <div className="absolute top-0 left-0 text-blue-500 shadow-[0_0_15px_#3b82f6] opacity-50 text-2xl">✦</div>
                   <div className="absolute bottom-0 right-0 text-blue-500 shadow-[0_0_15px_#3b82f6] opacity-50 text-2xl">✦</div>
                   
                   {/* UPDATED HEADER: Helvetica style with Enlarged Bevel */}
                   <h1 className="machined-text text-[100px] md:text-[200px] leading-[0.8] tracking-tight text-center">
                     Clockwise
                   </h1>
                </div>

                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="inline-block px-14 py-6 border border-blue-500/40 bg-blue-500/5 text-blue-400 font-mono text-xs tracking-[0.6em] uppercase hover:bg-blue-500 hover:text-black transition-all cursor-crosshair"
                >
                  Enter Laboratory
                </motion.div>
             </div>
          </div>
        </section>

        <section className="py-40 px-6 max-w-7xl mx-auto relative z-40">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ProductCard title="Heavy Hide Parka" year="2026" category="Hand-Treated Leather" />
            <ProductCard title="Oxidized Shell" year="2024" category="Corroded Membrane" />
            <ProductCard title="Steel Knit" year="2025" category="Metal-Infused Textile" />
          </div>
        </section>
      </main>

      <footer className="p-32 border-t border-white/5 bg-black text-center relative z-50">
         <div className="font-mono text-[10px] uppercase tracking-[1.5em] text-white/10">
           Clockwise Technical Textiles // &copy; 2026
         </div>
      </footer>
    </div>
  );
}