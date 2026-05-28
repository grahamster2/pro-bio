import Link from 'next/link';

export function Navigation() {
  return (
    <div className="nav-wrap">
      <nav className="nav">
        <Link href="/" className="nav-logo">
          rovult<span className="dot">.</span>
        </Link>
        <div className="nav-links">
          <Link href="/#work" className="nav-link">Work</Link>
          <Link href="/#services" className="nav-link">Services</Link>
          <Link href="/plans" className="nav-link">Plans</Link>
          <Link href="/#process" className="nav-link">Process</Link>
          <Link href="/#contact" className="nav-link">Contact</Link>
        </div>
        <Link href="/start" className="nav-cta">
          Start Project
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
        </Link>
      </nav>
    </div>
  );
}
