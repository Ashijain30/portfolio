import { motion } from 'framer-motion';
import { IDENTITY, SKILL_CATEGORIES } from '../data/portfolioData';

export default function SkillsAndAbout({ selectedRole }) {
  return (
    <section
      id="about"
      className="scroll-mt-20 py-24 sm:py-32 border-b border-[#E4D9C8]"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-10 space-y-24">
        {/* Categorized Skills Section — Typography & Spacing */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <div className="font-mono text-xs uppercase tracking-[0.16em] text-[#6B4F3A] mb-3">
              CAPABILITIES
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-[-0.02em] text-[#23170F]">
              Technical Skills
            </h2>
          </div>

          <div className="lg:col-span-8 divide-y divide-[#E4D9C8]">
            {SKILL_CATEGORIES.map((cat) => {
              const isHighlighted =
                selectedRole !== 'ALL' && cat.roles.includes(selectedRole);

              return (
                <div
                  key={cat.id}
                  className="py-6 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 sm:gap-8"
                >
                  <h3
                    className={`font-mono text-xs uppercase tracking-[0.14em] shrink-0 transition-colors ${
                      isHighlighted
                        ? 'text-[#23170F] font-semibold'
                        : 'text-[#6B4F3A]'
                    }`}
                  >
                    {cat.title}
                  </h3>
                  <p className="font-display text-base sm:text-lg font-medium text-[#23170F] sm:text-right">
                    {cat.skills.join(' · ')}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Short Personal About + Education & Achievements Section */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45 }}
          className="pt-20 border-t border-[#E4D9C8] grid grid-cols-1 lg:grid-cols-12 gap-10 items-start"
        >
          <div className="lg:col-span-4">
            <div className="font-mono text-xs uppercase tracking-[0.16em] text-[#6B4F3A] mb-3">
              ABOUT
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-[-0.02em] text-[#23170F]">
              A Little About Me
            </h2>
          </div>

          <div className="lg:col-span-8 max-w-2xl space-y-10">
            <p className="text-xl sm:text-2xl text-[#23170F] font-normal leading-relaxed">
              {IDENTITY.aboutText}
            </p>

            {/* Education Row from Official Resume */}
            <div className="pt-6 border-t border-[#E4D9C8] flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <div>
                <div className="font-mono text-xs uppercase tracking-[0.14em] text-[#6B4F3A] mb-1">
                  EDUCATION
                </div>
                <div className="font-display text-lg font-bold text-[#23170F]">
                  {IDENTITY.education.institution}
                </div>
                <div className="text-sm text-[#6B4F3A]">
                  {IDENTITY.education.degree}
                </div>
              </div>
              <div className="font-mono text-xs text-[#23170F] sm:text-right">
                <div>{IDENTITY.education.period}</div>
                <div className="text-[#6B4F3A] font-semibold mt-0.5">
                  CGPA: {IDENTITY.education.cgpa}
                </div>
              </div>
            </div>

            {/* Achievements from Official Resume */}
            <div className="pt-6 border-t border-[#E4D9C8]">
              <div className="font-mono text-xs uppercase tracking-[0.14em] text-[#6B4F3A] mb-3">
                ACHIEVEMENTS
              </div>
              <ul className="space-y-2 text-sm sm:text-base text-[#6B4F3A]">
                {IDENTITY.achievements.map((ach, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#6B4F3A] mt-2 shrink-0" />
                    <span>{ach}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
