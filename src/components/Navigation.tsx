import Link from 'next/link';

export function Navigation() {
  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl rounded-full border border-white/5 bg-[#0a0a0a] flex justify-between items-center px-6 py-3 z-50 shadow-2xl">
      <div className="flex items-center gap-2">
        <Link href="/" className="text-xl font-bold tracking-tight text-white hover:text-[#38bdf8] transition-colors">Rovult</Link>
      </div>
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-400">
        <Link href="/work" className="hover:text-white transition-colors">Work</Link>
        <Link href="/services" className="hover:text-white transition-colors">Services</Link>
        <Link href="/plans" className="hover:text-white transition-colors">Plans</Link>
        <Link href="/process" className="hover:text-white transition-colors">Process</Link>
        <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
      </div>
      <Link
        href="/start"
        className="text-sm font-semibold text-black bg-white rounded-full px-5 py-2 hover:bg-neutral-200 transition-colors"
      >
        Start Project
      </Link>
    </nav>
  );
}
