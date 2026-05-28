import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full border-t border-zinc-900 py-12 px-6 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start gap-1">
          <Link href="/" className="text-lg font-bold text-white tracking-tight hover:text-zinc-400 transition-colors">Rovult</Link>
          <span className="text-xs text-zinc-500">© {new Date().getFullYear()} Rovult.</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium">
           <Link href="/work" className="text-zinc-400 hover:text-white transition-colors">Work</Link>
           <Link href="/services" className="text-zinc-400 hover:text-white transition-colors">Services</Link>
           <Link href="/contact" className="text-zinc-400 hover:text-white transition-colors">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
