'use client';

import { motion, useMotionValue, useTransform } from 'framer-motion';
import { GeistSans } from "geist/font/sans";
import { useEffect } from 'react';

// --- Design System (Mirrored from Landing) ---
const DESIGN_SYSTEM = {
  colors: {
    accent: '#3b82f6',
    bg: '#020202',
    border: 'rgba(255, 255, 255, 0.05)',
  },
  animations: {
    stiffness: 80,
    damping: 25,
  }
};

// --- Atomic Components ---
const ReactiveMetalSurface = ({ mouseX, mouseY }: { mouseX: any, mouseY: any }) => {
  const x = useTransform(mouseX, [0, 2000], [3, -3]);
  const y = useTransform(mouseY, [0, 1200], [3, -3]);
  return (
    <motion.div style={{ x, y }} className="pointer-events-none fixed inset-[-2%] z-0 opacity-[0.06] select-none scale-105">
      <div className="absolute inset-0" style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/brushed-alum.png')`, backgroundSize: '600px' }} />
      <motion.div style={{ left: mouseX, top: mouseY, background: `radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, transparent 70%)` }} className="absolute w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl" />
    </motion.div>
  );
};

const HeaderHUD = () => (
  <header className="fixed top-0 left-0 w-full z-[100] p-6 border-b border-white/5 backdrop-blur-xl bg-black/40 flex justify-between items-center">
    <div className="flex items-center gap-4">
      <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
      <span className="font-black tracking-tighter text-xl italic uppercase">Laboratory_Terminal</span>
    </div>
    <div className="font-mono text-[9px] tracking-[0.5em] text-white/30 uppercase">
      Access_Level: Dr. Todd Collins // 04.01.26
    </div>
  </header>
);

// --- The Main Laboratory Interface ---
export default function ClockwiseLaboratoryTerminal() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    // Add the listener
    window.addEventListener('mousemove', handleMouseMove);

    // CLEANUP: Use removeEventListener, not removeMouseMove
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]); // Adding dependencies for absolute safety

  return (
    <div className={`min-h-screen bg-[#020202] text-white overflow-hidden selection:bg-blue-500/40 ${GeistSans.className}`}>
      
      {/* Shared Kinetic Backgrounds */}
      <ReactiveMetalSurface mouseX={mouseX} mouseY={mouseY} />
      <HeaderHUD />

      <main className="relative z-10 pt-24 h-screen flex">
        
        {/* --- LEFT SIDEBAR: System Navigation --- */}
        <aside className="w-80 h-full border-r border-white/5 p-8 flex flex-col justify-between backdrop-blur-sm bg-black/20">
          <div className="space-y-12">
            <div>
              <h4 className="text-[10px] font-mono tracking-[0.4em] text-blue-500 uppercase mb-6">Internal_Nodes</h4>
              <nav className="space-y-4 font-mono text-[11px] tracking-widest text-white/40">
                <a href="#" className="block hover:text-white transition-colors">01. Material_Index</a>
                <a href="#" className="block hover:text-white transition-colors">02. Stress_Tests</a>
                <a href="#" className="block hover:text-white transition-colors">03. Project_Clockwise</a>
                <a href="#" className="block hover:text-white transition-colors">04. Kinetic_Archive</a>
              </nav>
            </div>
            
            <div className="p-6 border border-white/5 bg-white/5">
              <span className="block text-[8px] font-mono text-white/20 uppercase mb-2">System_Log</span>
              <p className="text-[10px] font-mono leading-relaxed text-blue-400/60 italic">
                Scanning for structural anomalies... Keep moving backward...
              </p>
            </div>
          </div>

          <div className="font-mono text-[8px] text-white/10 uppercase tracking-[0.5em]">
            UNIT_DrToddCollins
          </div>
        </aside>

        {/* --- MAIN DATA VIEW: Open for Text & Images --- */}
        <section className="flex-grow h-full overflow-y-auto custom-scrollbar p-12 md:p-20 relative">
          
          {/* Example Content Container (This is where you drop your stuff) */}
          <div className="max-w-4xl mx-auto space-y-32 pb-40">
            
            {/* Header Block */}
            <div className="space-y-6">
              <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none italic">
                Counter_ <br />CLOCKWISE
              </h1>
              <div className="h-1 w-24 bg-blue-600 shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
              <p className="text-lg md:text-xl text-white/60 font-light max-w-2xl leading-relaxed">
                Analysis, implementation, and execution of traditional products, with modernization only when necessary.
              </p>
            </div>

            {/* Image & Text Row (Grid Pattern) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div className="aspect-square bg-white/5 border border-white/10 relative overflow-hidden group">
                 <div className="absolute inset-0 bg-blue-500/5 group-hover:bg-transparent transition-all" />
                 {/* This is where an image would go */}
                 <div className="absolute inset-0 flex items-center justify-center font-mono text-[10px] text-white/10 uppercase tracking-widest">
                   Media_Asset_Ref_01
                 </div>
              </div>
              <div className="space-y-6">
                <h3 className="text-2xl font-bold uppercase tracking-tight text-blue-400">Structural Anisotropy</h3>
                <p className="text-white/40 leading-loose text-sm italic">
                  Analysis of the RD-1.7 shell. The material responds to kinetic energy by hardening its molecular mesh, ensuring durability in extreme manufacturing environments.
                </p>
                <button className="px-8 py-3 border border-white/10 font-mono text-[10px] uppercase tracking-widest hover:bg-white/5 transition-all">
                  Read_Full_Log
                </button>
              </div>
            </div>

            {/* Full Width Large Text */}
            <div className="py-20 border-y border-white/5">
              <blockquote className="text-3xl md:text-4xl font-light italic text-white/80 leading-snug">
                "Materials inertly have not regressed over time— but <span className="text-blue-500 not-italic font-black"> materials used in modern textiles certainly have.</span>"
              </blockquote>
            </div>
          </div>
        </section>

      </main>

      {/* Persistent Laser Line Footer */}
      <footer className="fixed bottom-0 right-0 p-8 z-[100]">
        <div className="flex items-center gap-6">
          <div className="h-[1px] w-12 bg-blue-500/20" />
          <span className="font-mono text-[9px] tracking-[1em] text-white/20 uppercase">
            Counter Clockwise
          </span>
        </div>
      </footer>

    </div>
  );
}