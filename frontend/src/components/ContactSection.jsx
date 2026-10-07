import { useState } from 'react';
import { ArrowUpRight, Copy, Check } from 'lucide-react';
import { IDENTITY } from '../data/portfolioData';

export default function ContactSection() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText(IDENTITY.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer id="contact" className="scroll-mt-20 py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        <div className="max-w-2xl space-y-6">
          <div className="font-mono text-xs uppercase tracking-[0.16em] text-[#6B4F3A]">
            CONTACT
          </div>

          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-[-0.03em] text-[#23170F]">
            Let&apos;s turn data into something useful.
          </h2>

          <p className="text-lg text-[#6B4F3A]">
            Open to Data Science, AI / ML, and Data Analyst opportunities.
          </p>

          {/* Direct Email & Copy */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <a
              href={IDENTITY.links.email}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#23170F] hover:bg-[#6B4F3A] text-[#F7F1E7] text-sm font-medium transition-colors"
            >
              <span>{IDENTITY.email}</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 px-4 py-3.5 rounded-full bg-[#FCF9F4] hover:bg-[#EFE7DA] text-[#23170F] border border-[#E4D9C8] text-xs font-mono transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#6B4F3A]" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#6B4F3A]" />
                  <span>Copy Email</span>
                </>
              )}
            </button>
          </div>

          {/* Links Row */}
          <div className="pt-10 flex flex-wrap items-center gap-8 text-sm font-medium text-[#23170F]">
            <a
              href={IDENTITY.links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 hover:text-[#6B4F3A] transition-colors"
            >
              <span>LinkedIn</span>
              <ArrowUpRight className="w-4 h-4 text-[#6B4F3A]" />
            </a>

            <a
              href={IDENTITY.links.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 hover:text-[#6B4F3A] transition-colors"
            >
              <span>GitHub</span>
              <ArrowUpRight className="w-4 h-4 text-[#6B4F3A]" />
            </a>

            <a
              href={IDENTITY.links.leetcode}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 hover:text-[#6B4F3A] transition-colors"
            >
              <span>LeetCode</span>
              <ArrowUpRight className="w-4 h-4 text-[#6B4F3A]" />
            </a>

            <a
              href={IDENTITY.resumePdfUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 hover:text-[#6B4F3A] transition-colors"
            >
              <span>Resume</span>
              <ArrowUpRight className="w-4 h-4 text-[#6B4F3A]" />
            </a>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-20 pt-8 border-t border-[#E4D9C8] flex flex-wrap items-center justify-between gap-4 text-xs text-[#6B4F3A] font-mono">
          <span>© 2026 ASHI JAIN</span>
          <span>DATA SCIENCE · AI / ML · DATA ANALYTICS</span>
        </div>
      </div>
    </footer>
  );
}
