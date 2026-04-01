'use client';

import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

// --- Sub-Components ---

const Nav = () => (
  <nav className="fixed top-0 w-full z-50 mix-blend-difference flex justify-between p-6 items-center border-b border-white/10 backdrop-blur-sm">
    <div className="font-bold tracking-tighter text-2xl text-white">R&D // REV-01</div>
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

const TemporalClock = () => {
  return (
    <div className="relative w-64 h-64 md:w-96 md:h-96 border border-white/20 rounded-full flex items-center justify-center">
      {/* Counter-Clockwise Rotating Ring */}
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
};

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
  // Reverse the progress: 1 to 0 instead of 0 to 1
  const reverseProgress = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scaleX = useSpring(reverseProgress, { stiffness: 100, damping: 30 });

  return (
    <div className="bg-black text-white min-h-screen selection:bg-blue-500 selection:text-black">
      {/* 1. Progress Bar (Reversed) */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-blue-500 z-[60] origin-left"
        style={{ scaleX }}
      />