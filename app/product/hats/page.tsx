export default function ProductPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center">
      <div className="text-center p-12 border border-white/5 bg-black/40 backdrop-blur-3xl">
        <span className="block font-mono text-[8px] tracking-[0.8em] uppercase text-white/20 mb-6">
          Status // Incoming
        </span>
        <h1 className="text-4xl font-black tracking-tighter uppercase mb-4">
          Coming Soon
        </h1>
        <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-white/20">
          This product is not yet available
        </p>
      </div>
    </div>
  );
}