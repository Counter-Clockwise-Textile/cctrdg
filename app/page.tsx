'use client';

import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

// --- Sub-Components ---

const Nav = () => (
  <nav className="fixed top-0 w-full z-50 mix-blend-difference flex justify-between p-6 items-center border-b border-white/10 backdrop-blur-sm text-white">
    <div className="font-bold tracking-tighter text-2xl">R&D // REV-01</div>
    <div className="flex gap-8 text-xs uppercase tracking-widest font-mono text-white/70">
      <a href="#" className="hover:text-blue-400 transition-colors">Archive</a>
      <a href="#" className="hover:text-blue-400 transition-colors">Temporal-Shop</a>
      <a href="#" className="hover:text-blue-400 transition-colors">Cart (0)</a>
    </div>
  </nav>
);

const ReverseTimer = () => {
  const [time, setTime] = useState(9999);
  useEffect(() => {
    const interval = setInterval(() => setTime(t => (t <= 0 ? 9999 : t - 1)), 100);
    return () => clearInterval(interval);
  }, []);
  return <div className="text-blue-400 text-xl font-mono">{time.toString().padStart(6, '0')}</div>;
};

const TemporalClock = () => (
  <div className="relative w-64 h-64 md:w-96 md:h-96 border border-white/20 rounded-full flex items-center justify-center">
    <motion.div 
      animate={{ rotate: -360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="absolute inset-0 border-2 border-dashed border-blue-500/40 rounded-full"
    />
    <div className="text-center font-mono">
      <h2 className="text-4xl md:text-6xl font-bold tracking-tighter italic text-white">T-MINUS</h2>
      <ReverseTimer />
    </div>
  </div>
);

const ProductCard = ({ title, year, category }: { title: string; year: string; category: string }) => (
  <motion.div 
    whileHover={{ skewX: -3 }}
    className="border border-white/10 p-6 group cursor-crosshair bg-black hover:border-blue-500 transition-all"
  >
    <div className="flex justify-between items-start mb-12">
      <span className="font-mono text-[10px] text-white/40">REF_{year}</span>
      <div className="w-2 h-2 bg-blue-500 animate-pulse" />
    </div>
    <h3 className="text-2xl font-bold uppercase mb-2 tracking-tighter group-hover:italic text-white">{title}</h3>
    <p className="text-xs font-mono text-white/60 uppercase">{category}</p>
    <div className="mt-8 h-[1px] w-0 group-hover:w-full bg-blue-500 transition-all duration-500" />
  </motion.div>
);

// --- Main Page Component ---

export default function TemporalApp() {
  const { scrollYProgress } = useScroll();
  const reverseProgress = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scaleX = useSpring(reverseProgress, { stiffness: 100, damping: 30 });

  return (
    <div className="bg-black text-white min-h-screen selection:bg-blue-500 selection:text-black">
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-blue-500 z-[60] origin-left"
        style={{ scaleX }}
      />
      <Nav />
      <main>
        <section className="h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 blur-3xl w-[500px] h-[500px] bg-blue-600 rounded-full" />
          <TemporalClock />
          <div className="mt-12 text-center z-10">
            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-tight text-white">
              Time was never meant <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40 italic">to move forward</span>
            </h1>
            <button className="mt-8 px-8 py-3 border border-white hover:bg-white hover:text-black transition-all font-mono uppercase tracking-widest text-sm text-white">
              Reverse the Clock
            </button>
          </div>
        </section>
        <section className="py-32 px-6 max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16 border-b border-white/10 pb-4">
            <h2 className="text-xs font-mono uppercase tracking-[0.5em] text-white/40">R&D_Archive // Vol_01</h2>
            <div className="text-right font-mono text-[10px] text-white/40">TOTAL_RECOVERY: 04</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <ProductCard title="Inverted Parka" year="2026" category="Outerwear" />
            <ProductCard title="Decay Knit" year="2019" category="Mid-Layer" />
            <ProductCard title="Static Trouser" year="2024" category="Technical" />
            <ProductCard title="Zero Shell" year="2025" category="R&D Sample" />
          </div>
        </section>
      </main>
      <footer className="p-12 border-t border-white/10 text-center font-mono text-[10px] uppercase tracking-widest text-white/40 bg-black">
        &copy; 2026 Counter-Clockwise Group // All Rights Reversed
      </footer>
    </div>
  );
}