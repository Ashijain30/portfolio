import { IDENTITY } from '../data/portfolioData';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-[#F7F1E7]/90 backdrop-blur-md border-b border-[#E4D9C8]">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 h-16 flex items-center justify-between gap-4">
        {/* Brand Name (Espresso) */}
        <a
          href="#"
          className="font-display text-sm sm:text-base font-bold tracking-tight text-[#23170F]"
        >
          {IDENTITY.name}
        </a>

        {/* Simple Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm text-[#6B4F3A]">
          <a
            href="#work"
            className="hover:text-[#23170F] transition-colors"
          >
            Work
          </a>
          <a
            href="#experience"
            className="hover:text-[#23170F] transition-colors"
          >
            Experience
          </a>
          <a
            href="#about"
            className="hover:text-[#23170F] transition-colors"
          >
            About
          </a>
          <a
            href={IDENTITY.resumePdfUrl}
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#23170F] transition-colors"
          >
            Resume
          </a>
          <a
            href="#contact"
            className="hover:text-[#23170F] transition-colors"
          >
            Contact
          </a>
        </nav>

        {/* Right Side Availability Badge */}
        <a
          href="#contact"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FCF9F4] border border-[#E4D9C8] text-xs font-medium text-[#23170F] hover:border-[#6B4F3A] transition-colors"
        >
          <span className="w-2 h-2 rounded-full bg-[#6B4F3A]" />
          <span>{IDENTITY.status}</span>
        </a>
      </div>

      {/* Compact Mobile Links Row */}
      <nav className="md:hidden flex items-center justify-between px-6 py-2.5 border-t border-[#E4D9C8]/70 text-xs text-[#6B4F3A] overflow-x-auto">
        <a href="#work" className="hover:text-[#23170F]">
          Work
        </a>
        <a href="#experience" className="hover:text-[#23170F]">
          Experience
        </a>
        <a href="#about" className="hover:text-[#23170F]">
          About
        </a>
        <a
          href={IDENTITY.resumePdfUrl}
          target="_blank"
          rel="noreferrer"
          className="hover:text-[#23170F]"
        >
          Resume
        </a>
        <a href="#contact" className="hover:text-[#23170F]">
          Contact
        </a>
      </nav>
    </header>
  );
}
