import { motion } from 'framer-motion';
import { EXPERIENCE } from '../data/portfolioData';

export default function ExperienceTimeline() {
  return (
    <section
      id="experience"
      className="scroll-mt-20 py-24 sm:py-32 border-b border-[#E4D9C8]"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        {/* Heading */}
        <div className="max-w-2xl mb-16">
          <div className="font-mono text-xs uppercase tracking-[0.16em] text-[#6B4F3A] mb-3">
            EXPERIENCE
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-[-0.02em] text-[#23170F]">
            Industry experience and technical training.
          </h2>
        </div>

        {/* Clean Editorial Timeline */}
        <div className="divide-y divide-[#E4D9C8]">
          {EXPERIENCE.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              className="py-10 first:pt-0 last:pb-0 grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-10"
            >
              {/* Left Column: Year & Location */}
              <div className="md:col-span-3 space-y-1">
                <div className="font-mono text-sm font-semibold text-[#23170F]">
                  {item.year}
                </div>
                <div className="text-xs text-[#6B4F3A]">{item.location}</div>
              </div>

              {/* Right Column: Company, Role, Highlights, Concise Bullets */}
              <div className="md:col-span-9 space-y-5">
                <div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[#23170F] tracking-tight">
                    {item.company}
                  </h3>
                  <div className="text-base text-[#6B4F3A] mt-0.5">
                    {item.role}
                  </div>
                </div>

                {/* Key Metrics / Highlights */}
                <div className="flex flex-wrap gap-2">
                  {item.highlights.map((highlight) => (
                    <span
                      key={highlight}
                      className="px-3.5 py-1 rounded-full bg-[#FCF9F4] border border-[#E4D9C8] font-mono text-xs text-[#23170F]"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>

                {/* Concise Bullets */}
                <ul className="space-y-2.5 text-base text-[#6B4F3A] max-w-2xl">
                  {item.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#6B4F3A] mt-2.5 shrink-0" />
                      <span className="leading-relaxed">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
