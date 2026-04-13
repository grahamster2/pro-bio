import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full border-t border-white/5 py-12 px-6 bg-[#050505]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <Link href="/" className="text-lg font-bold text-white tracking-tight hover:text-[#38bdf8] transition-colors">Rovult</Link>
          <span className="text-xs text-neutral-500">© {new Date().getFullYear()} Rovult, Precision Makers.</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6 mt-4 md:mt-0">
           <Link href="/bio" className="text-xs font-bold uppercase tracking-wider text-[#38bdf8] hover:text-white transition-colors bg-[#38bdf8]/10 px-3 py-1.5 rounded-full border border-[#38bdf8]/20">Link-In-Bio Platform</Link>
           <Link href="/privacy" className="text-xs font-semibold uppercase tracking-wider text-neutral-500 hover:text-white transition-colors">Privacy</Link>
           <Link href="/tos" className="text-xs font-semibold uppercase tracking-wider text-neutral-500 hover:text-white transition-colors">Terms</Link>
           <Link href="#" className="text-xs font-semibold uppercase tracking-wider text-neutral-500 hover:text-white transition-colors">Twitter</Link>
           <Link href="#" className="text-xs font-semibold uppercase tracking-wider text-neutral-500 hover:text-white transition-colors">Instagram</Link>
        </div>
      </div>
    </footer>
  );
}
