import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { IDENTITY } from '../data/portfolioData';
import DataFlowVisual from './DataFlowVisual';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-[#E4D9C8]">
      {/* Signature Subtle Abstract Data Flow Visual in Warm Brown / Espresso */}
      <DataFlowVisual />

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10 pt-20 pb-24 sm:pt-28 sm:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          {/* Identity & Domains */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs uppercase tracking-[0.16em] text-[#6B4F3A] mb-6">
            <span className="text-[#23170F] font-semibold">{IDENTITY.name}</span>
            <span className="text-[#D8CBB8]">/</span>
            <span>DATA SCIENCE</span>
            <span className="text-[#D8CBB8]">·</span>
            <span>AI / ML</span>
            <span className="text-[#D8CBB8]">·</span>
            <span>DATA ANALYTICS</span>
          </div>

          {/* Large Editorial Headline (Espresso) */}
          <h1 className="font-display text-4xl sm:text-6xl lg:text-[64px] font-bold tracking-[-0.03em] text-[#23170F] leading-[1.08]">
            I build data-driven products that turn information into decisions.
          </h1>

          {/* Short Description (Warm Brown) */}
          <p className="mt-6 text-lg sm:text-xl text-[#6B4F3A] font-normal max-w-2xl leading-relaxed">
            {IDENTITY.shortDescription}
          </p>

          {/* Action Buttons */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#work"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#23170F] hover:bg-[#6B4F3A] text-[#F7F1E7] text-sm font-medium transition-colors duration-200"
            >
              <span>View Work</span>
              <ArrowDown className="w-4 h-4" />
            </a>

            <a
              href={IDENTITY.resumePdfUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#FCF9F4] hover:bg-[#EFE7DA] text-[#23170F] border border-[#E4D9C8] hover:border-[#6B4F3A]/50 text-sm font-medium transition-colors duration-200"
            >
              <span>Download Resume</span>
              <ArrowUpRight className="w-4 h-4 text-[#6B4F3A]" />
            </a>
          </div>

          {/* Subtle Technical Line */}
          <div className="mt-14 pt-8 border-t border-[#E4D9C8]">
            <p className="font-mono text-xs tracking-wider text-[#6B4F3A]">
              {IDENTITY.technicalLine}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
