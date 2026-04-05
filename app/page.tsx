'use client';

import { motion, useScroll, useSpring } from 'framer-motion';
import { GeistSans } from "geist/font/sans";
import { useEffect, useMemo, useRef, useState } from 'react';

const DESIGN_SYSTEM = {
  colors: {
    accent: '#3b82f6',
    bg: '#050505',
    border: 'rgba(255, 255, 255, 0.1)',
  },
  animations: {
    stiffness: 100,
    damping: 30,
  }
};

function useHasMounted() {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => setHasMounted(true), []);
  return hasMounted;
}

const MetalSurface = () => (
  <div 
    className="pointer-events-none fixed inset-0 z-[10] opacity-[0.05] select-none" 
    style={{ 
      backgroundImage: `url('https://www.transparenttextures.com/patterns/brushed-alum.png')`,
      backgroundSize: '600px' 
    }} 
    aria-hidden="true"
  />
);

const ClockFace = () => {
  const ticks = useMemo(() => Array.from({ length: 60 }), []);
  return (
    <div className="fixed inset-0 z-0 flex items-center justify-center pointer-events-none opacity-[0.1]">
      <div className="relative w-[90vw] h-[90vw] max-w-[850px] max-h-[850px] rounded-full border border-blue-500/10">
        {ticks.map((_, i) => (
          <div 
            key={i} 
            className="absolute top-0 left-1/2 -translate-x-1/2 origin-bottom transition-colors duration-700"
            style={{
              height: i % 5 === 0 ? '24px' : '10px',
              width: i % 5 === 0 ? '2px' : '1px',
              backgroundColor: i % 5 === 0 ? 'rgba(59, 130, 246, 0.3)' : 'rgba(255, 255, 255, 0.05)',
              transform: `rotate(${i * 6}deg)`,
              transformOrigin: `0 425px` 
            }}
          />
        ))}
      </div>
    </div>
  );
};

const ReverseTimer = () => {
  const [time, setTime] = useState(999999);
  const mounted = useHasMounted();
  useEffect(() => {
    if (!mounted) return;
    const interval = setInterval(() => setTime(p => (p <= 0 ? 999999 : p - 1)), 100);
    return () => clearInterval(interval);
  }, [mounted]);
  return (
    <div className="font-mono text-2xl tracking-[0.3em] text-blue-400/80 uppercase">
      {mounted ? time.toString().padStart(6, '0') : "000000"}
    </div>
  );
};

const WatchFace = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const W = 540, H = 540, CX = 270, CY = 270, R = 240;

    function drawWatch() {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);

      const now = new Date();
      const totalMs = now.getHours()*3600000 + now.getMinutes()*60000 + now.getSeconds()*1000 + now.getMilliseconds();
      const reversed = (43200000 - (totalMs % 43200000));
      const sec = (reversed / 1000) % 60;
      const min = (reversed / 60000) % 60;
      const hr  = (reversed / 3600000) % 12;

      ctx.beginPath();
      ctx.arc(CX, CY, R+8, 0, Math.PI*2);
      ctx.strokeStyle = 'rgba(200,135,58,0.12)';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(CX, CY, R+4, 0, Math.PI*2);
      ctx.strokeStyle = 'rgba(74,127,212,0.10)';
      ctx.lineWidth = 0.5;
      ctx.stroke();

      const dialGrad = ctx.createRadialGradient(CX-40, CY-60, 20, CX, CY, R);
      dialGrad.addColorStop(0,   '#1a1620');
      dialGrad.addColorStop(0.2, '#12100e');
      dialGrad.addColorStop(0.5, '#0d0f14');
      dialGrad.addColorStop(0.75,'#100d09');
      dialGrad.addColorStop(1,   '#080809');
      ctx.beginPath();
      ctx.arc(CX, CY, R, 0, Math.PI*2);
      ctx.fillStyle = dialGrad;
      ctx.fill();

      const amberBurn = ctx.createRadialGradient(CX+80, CY-80, 10, CX+80, CY-80, 180);
      amberBurn.addColorStop(0,   'rgba(196,106,0,0.18)');
      amberBurn.addColorStop(0.4, 'rgba(160,80,0,0.10)');
      amberBurn.addColorStop(1,   'rgba(196,106,0,0)');
      ctx.beginPath();
      ctx.arc(CX, CY, R, 0, Math.PI*2);
      ctx.fillStyle = amberBurn;
      ctx.fill();

      const blueBurn = ctx.createRadialGradient(CX-80, CY+80, 10, CX-80, CY+80, 180);
      blueBurn.addColorStop(0,   'rgba(34,81,160,0.22)');
      blueBurn.addColorStop(0.4, 'rgba(20,50,120,0.12)');
      blueBurn.addColorStop(1,   'rgba(34,81,160,0)');
      ctx.beginPath();
      ctx.arc(CX, CY, R, 0, Math.PI*2);
      ctx.fillStyle = blueBurn;
      ctx.fill();

      const purpleBurn = ctx.createRadialGradient(CX, CY, 0, CX, CY, R*0.7);
      purpleBurn.addColorStop(0,   'rgba(107,53,200,0.08)');
      purpleBurn.addColorStop(0.5, 'rgba(70,35,140,0.05)');
      purpleBurn.addColorStop(1,   'rgba(107,53,200,0)');
      ctx.beginPath();
      ctx.arc(CX, CY, R, 0, Math.PI*2);
      ctx.fillStyle = purpleBurn;
      ctx.fill();

      ctx.save();
      ctx.beginPath();
      ctx.arc(CX, CY, R, 0, Math.PI*2);
      ctx.clip();
      for (let i = 0; i < 80; i++) {
        const angle = (i/80)*Math.PI*2;
        ctx.beginPath();
        ctx.moveTo(CX, CY);
        ctx.lineTo(CX+Math.cos(angle)*R, CY+Math.sin(angle)*R);
        ctx.strokeStyle = `rgba(255,255,255,${i%4===0?0.025:0.010})`;
        ctx.lineWidth = 0.4;
        ctx.stroke();
      }
      ctx.restore();

      const edgeShadow = ctx.createRadialGradient(CX, CY, R*0.75, CX, CY, R);
      edgeShadow.addColorStop(0, 'rgba(0,0,0,0)');
      edgeShadow.addColorStop(1, 'rgba(0,0,0,0.6)');
      ctx.beginPath();
      ctx.arc(CX, CY, R, 0, Math.PI*2);
      ctx.fillStyle = edgeShadow;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(CX, CY, R*0.88, 0, Math.PI*2);
      ctx.strokeStyle = 'rgba(255,255,255,0.04)';
      ctx.lineWidth = 0.5;
      ctx.stroke();

      for (let i = 0; i < 60; i++) {
        const angle = (i/60)*Math.PI*2 - Math.PI/2;
        const isHour = i%5===0;
        const outer = R*0.88;
        const inner = isHour ? R*0.72 : R*0.82;
        ctx.beginPath();
        ctx.moveTo(CX+Math.cos(angle)*outer, CY+Math.sin(angle)*outer);
        ctx.lineTo(CX+Math.cos(angle)*inner, CY+Math.sin(angle)*inner);
        ctx.strokeStyle = isHour ? 'rgba(74,127,212,0.55)' : 'rgba(255,255,255,0.12)';
        ctx.lineWidth = isHour ? 2 : 0.8;
        ctx.stroke();
      }

      for (let i = 0; i < 12; i++) {
        const angle = (i/12)*Math.PI*2 - Math.PI/2;
        const x = CX+Math.cos(angle)*R*0.78;
        const y = CY+Math.sin(angle)*R*0.78;
        const glow = ctx.createRadialGradient(x, y, 0, x, y, 5);
        glow.addColorStop(0, 'rgba(74,127,212,0.7)');
        glow.addColorStop(1, 'rgba(74,127,212,0)');
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI*2);
        ctx.fillStyle = glow;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI*2);
        ctx.fillStyle = 'rgba(140,190,255,0.8)';
        ctx.fill();
      }

      ctx.beginPath();
      ctx.arc(CX, CY, R*0.42, 0, Math.PI*2);
      ctx.strokeStyle = 'rgba(200,135,58,0.08)';
      ctx.lineWidth = 0.5;
      ctx.stroke();

      ctx.font = '500 10px monospace';
      ctx.fillStyle = 'rgba(255,255,255,0.2)';
      ctx.textAlign = 'center';
      ctx.fillText('COUNTER CLOCKWISE', CX, CY-R*0.28);
      ctx.font = '400 8px monospace';
      ctx.fillStyle = 'rgba(74,127,212,0.4)';
      ctx.fillText('TECHNICAL TEXTILES', CX, CY-R*0.18);

      ctx.save();
      ctx.translate(CX, CY);
      ctx.rotate((hr/12)*Math.PI*2 - Math.PI/2);
      ctx.beginPath();
      ctx.moveTo(-14, 0);
      ctx.lineTo(0, -5);
      ctx.lineTo(R*0.48, 0);
      ctx.lineTo(0, 5);
      ctx.closePath();
      ctx.fillStyle = 'rgba(220,220,230,0.9)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(74,127,212,0.3)';
      ctx.lineWidth = 0.5;
      ctx.stroke();
      ctx.restore();

      ctx.save();
      ctx.translate(CX, CY);
      ctx.rotate((min/60)*Math.PI*2 - Math.PI/2);
      ctx.beginPath();
      ctx.moveTo(-18, 0);
      ctx.lineTo(0, -3.5);
      ctx.lineTo(R*0.7, 0);
      ctx.lineTo(0, 3.5);
      ctx.closePath();
      ctx.fillStyle = 'rgba(200,210,225,0.88)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(74,127,212,0.3)';
      ctx.lineWidth = 0.5;
      ctx.stroke();
      ctx.restore();

      ctx.save();
      ctx.translate(CX, CY);
      ctx.rotate((sec/60)*Math.PI*2 - Math.PI/2);
      ctx.beginPath();
      ctx.moveTo(-30, 0);
      ctx.lineTo(R*0.82, 0);
      ctx.strokeStyle = 'rgba(196,106,0,0.85)';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(0, 0, 3, 0, Math.PI*2);
      ctx.fillStyle = 'rgba(196,106,0,0.9)';
      ctx.fill();
      ctx.restore();

      const capGrad = ctx.createRadialGradient(CX-1, CY-1, 0, CX, CY, 6);
      capGrad.addColorStop(0, '#d4d8e0');
      capGrad.addColorStop(1, '#606878');
      ctx.beginPath();
      ctx.arc(CX, CY, 6, 0, Math.PI*2);
      ctx.fillStyle = capGrad;
      ctx.fill();
      ctx.strokeStyle = 'rgba(74,127,212,0.4)';
      ctx.lineWidth = 0.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(CX, CY, R, 0, Math.PI*2);
      ctx.strokeStyle = 'rgba(200,135,58,0.15)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    drawWatch();
    const interval = setInterval(drawWatch, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={540}
      height={540}
      className="w-full h-auto max-w-[540px] opacity-90"
    />
  );
};

const ProductCard = ({ title, year, category }: { title: string; year: string; category: string }) => (
  <motion.div 
    whileHover={{ y: -8, borderColor: 'rgba(59, 130, 246, 0.4)' }}
    className="relative group p-12 border border-white/5 bg-[#080808] transition-all overflow-hidden cursor-pointer"
  >
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-blue-500/5 to-transparent pointer-events-none" />
    <div className="relative z-10">
      <div className="flex justify-between items-start mb-24">
        <span className="font-mono text-[9px] text-white/20 tracking-[0.2em]">{year} // R&D_LOG</span>
        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
      </div>
      <h3 className="text-3xl font-bold uppercase tracking-tighter mb-2 group-hover:text-blue-400 transition-colors">{title}</h3>
      <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-white/10">{category}</p>
    </div>
  </motion.div>
);

export default function ClockwiseLaboratory() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, DESIGN_SYSTEM.animations);
  const mounted = useHasMounted();

  if (!mounted) return <div className="bg-black min-h-screen" />;

  return (
    <div className={`min-h-screen metal-bg text-white overflow-x-hidden selection:bg-blue-500/30 ${GeistSans.className}`}>
      
      <ClockFace />
      <MetalSurface />
      
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-blue-600 z-[210] origin-left shadow-[0_0_15px_rgba(37,99,235,0.4)]"
        style={{ scaleX }}
      />

      <nav className="fixed top-0 w-full z-[200] flex justify-between items-center p-8 border-b border-white/5 backdrop-blur-xl bg-black/60">
        <div className="flex items-center gap-4">
          <span className="font-black tracking-tighter text-2xl italic">CLOCKWISE</span>
          <span className="text-blue-500 font-mono text-xs tracking-widest bg-blue-500/5 border border-blue-500/10 px-3 py-1 uppercase">Phase_1.7</span>
        </div>
        <div className="hidden md:flex gap-10 text-[9px] uppercase tracking-[0.4em] font-mono text-white/30">
          <a href="#" className="hover:text-blue-400 transition-colors">Lab_Index</a>
          <a href="#" className="hover:text-blue-400 transition-colors">System_Cart</a>
        </div>
      </nav>

      <main className="relative z-50">
        
        <section className="min-h-screen flex items-center justify-center p-6 md:p-12 pt-32">
          <div className="relative w-full max-w-5xl">
            <div className="relative p-10 md:p-16 border border-white/5 bg-black/40 backdrop-blur-3xl shadow-[inset_0_0_100px_rgba(255,255,255,0.01),0_50px_120px_rgba(0,0,0,0.9)]">
              <div className="relative flex flex-col items-center">
                
                <div className="mb-4 text-center">
                  <span className="block font-mono text-[8px] tracking-[0.8em] uppercase text-white/20 mb-3 ml-[0.8em]">
                    Facility // RD_01_REVERSE
                  </span>
                  <ReverseTimer />
                </div>

                <div className="relative w-full flex justify-center pb-0">
                  <div className="absolute top-8 left-8 w-8 h-8 border-t border-l border-white/10 hidden md:block" />
                  <div className="absolute bottom-8 right-8 w-8 h-8 border-b border-r border-white/10 hidden md:block" />
                  <WatchFace />
                </div>

                <motion.div 
                  className="relative z-[60] mt-8"
                  whileHover={{ scale: 1.02 }}
                >
                  <motion.a
                    href="/laboratory"
                    whileHover={{ borderColor: DESIGN_SYSTEM.colors.accent, backgroundColor: 'rgba(59, 130, 246, 0.05)' }}
                    className="flex flex-col items-center px-16 py-5 border border-white/10 bg-black/90 backdrop-blur-md transition-all group overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-blue-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <span className="relative z-10 font-mono text-[10px] tracking-[1em] uppercase text-white group-hover:text-blue-400 transition-colors pl-[1em]">
                      Enter Laboratory
                    </span>
                    <div className="mt-2 h-0.5 w-0 bg-blue-500 group-hover:w-full transition-all duration-500" />
                  </motion.a>
                </motion.div>
                
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-8 py-60">
          <div className="mb-16 flex items-center gap-6">
            <h2 className="text-[10px] font-mono tracking-[1.2em] uppercase text-blue-500/60">Research_Inventory</h2>
            <div className="h-px flex-grow bg-white/5" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <ProductCard title="Heavy Hide Parka" year="BATCH_2026" category="Hard-Anodized Surface" />
            <ProductCard title="Oxidized Shell" year="BATCH_2024" category="Membrane Diffusion" />
            <ProductCard title="Steel Knit" year="BATCH_2025" category="Metal-Infused Mesh" />
          </div>
        </section>

      </main>

      <footer className="leather-panel py-48 px-12 flex flex-col items-center overflow-hidden">
        <motion.div 
          initial={{ opacity: 0.4 }}
          whileHover={{ opacity: 1 }}
          className="group transition-all duration-700 flex flex-col items-center gap-6"
        >
          <div className="h-px w-24 bg-blue-500/30 group-hover:w-80 group-hover:bg-blue-400 transition-all duration-1000" />
          <span className="font-mono text-[10px] md:text-[11px] tracking-[1.8em] uppercase text-white/60 group-hover:text-blue-100 transition-colors text-center pl-[1.8em] drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
            COUNTER CLOCKWISE TECHNICAL TEXTILES
          </span>
          <div className="h-px w-24 bg-blue-500/30 group-hover:w-80 group-hover:bg-blue-400 transition-all duration-1000" />
        </motion.div>
      </footer>
    </div>
  );
}