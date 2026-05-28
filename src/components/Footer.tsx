import Link from 'next/link';

export function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand-name">
              rovult<span className="dot">.</span>
            </div>
            <div className="footer-brand-tag">
              Websites that bring in customers for the people who built the business.
            </div>
          </div>
          <div className="footer-col">
            <h5>Services</h5>
            <Link href="/#services">Websites</Link>
            <Link href="/#services">Local SEO</Link>
            <Link href="/plans">Care plans</Link>
            <Link href="/#services">Audits</Link>
          </div>
          <div className="footer-col">
            <h5>Company</h5>
            <Link href="/#work">Work</Link>
            <Link href="/#process">Process</Link>
            <Link href="/plans">Plans</Link>
            <Link href="/start">Start a project</Link>
            <Link href="/#contact">Contact</Link>
          </div>
          <div className="footer-col">
            <h5>Get in touch</h5>
            <a href="mailto:hello@rovult.com">hello@rovult.com</a>
            <Link href="/#contact">Book a call</Link>
            <a href="#">Instagram</a>
            <a href="#">LinkedIn</a>
          </div>
        </div>
        <div className="footer-bottom">
          <div>© {new Date().getFullYear()} Rovult LLC</div>
          <div>Made in Asheville, NC</div>
        </div>
      </div>
    </footer>
  );
}
