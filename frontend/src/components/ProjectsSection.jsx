import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Plus, Minus } from 'lucide-react';
import { PROJECTS, RECRUITER_ROLES } from '../data/portfolioData';

function SubtleDataPreview({ points, label }) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const width = 160;
  const height = 44;

  const coords = points
    .map((pt, idx) => {
      const x = (idx / (points.length - 1)) * width;
      const y = height - ((pt - min) / range) * (height - 12) - 6;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className="flex flex-col items-end justify-center">
      <svg width={width} height={height} className="overflow-visible">
        <polyline
          fill="none"
          stroke="#6B4F3A"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={coords}
        />
        {points.map((pt, idx) => {
          const x = (idx / (points.length - 1)) * width;
          const y = height - ((pt - min) / range) * (height - 12) - 6;
          return (
            <circle
              key={idx}
              cx={x}
              cy={y}
              r={idx === points.length - 1 ? 3 : 2}
              fill={idx === points.length - 1 ? '#23170F' : '#FCF9F4'}
              stroke="#6B4F3A"
              strokeWidth="1.5"
            />
          );
        })}
      </svg>
      <span className="mt-1.5 font-mono text-[10px] text-[#6B4F3A]">{label}</span>
    </div>
  );
}

export default function ProjectsSection({
  selectedRole,
  onSelectRole,
  onOpenProject,
}) {
  const [showAllProjects, setShowAllProjects] = useState(false);

  const visibleProjects = useMemo(() => {
    const sorted = [...PROJECTS].sort((a, b) => {
      if (selectedRole === 'ALL') return 0;
      const aIndex = a.roles.indexOf(selectedRole);
      const bIndex = b.roles.indexOf(selectedRole);
      const aScore = aIndex === -1 ? 99 : aIndex;
      const bScore = bIndex === -1 ? 99 : bIndex;
      return aScore - bScore;
    });

    if (showAllProjects) return sorted;
    return sorted.slice(0, 3);
  }, [selectedRole, showAllProjects]);

  return (
    <section id="work" className="scroll-mt-20 py-24 sm:py-32 border-b border-[#E4D9C8]">
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        {/* Simplified Recruiter Mode Bar */}
        <div className="mb-16 pb-8 border-b border-[#E4D9C8] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <span className="font-mono text-xs uppercase tracking-[0.14em] text-[#6B4F3A]">
            WHAT I&apos;M LOOKING FOR
          </span>

          <div className="flex flex-wrap items-center gap-2">
            {RECRUITER_ROLES.map((role) => {
              const isSelected = selectedRole === role.id;
              return (
                <button
                  key={role.id}
                  onClick={() =>
                    onSelectRole(isSelected && role.id !== 'ALL' ? 'ALL' : role.id)
                  }
                  className={`px-4 py-2 rounded-full font-mono text-xs transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#23170F] text-[#F7F1E7] font-medium'
                      : 'bg-[#FCF9F4] text-[#6B4F3A] border border-[#E4D9C8] hover:border-[#6B4F3A] hover:text-[#23170F]'
                  }`}
                >
                  {role.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Section Heading */}
        <div className="max-w-2xl mb-14">
          <div className="font-mono text-xs uppercase tracking-[0.16em] text-[#6B4F3A] mb-3">
            SELECTED WORK
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-[-0.02em] text-[#23170F]">
            Projects where data meets analysis, modeling and product thinking.
          </h2>
        </div>

        {/* Large Horizontal Project Cards with Generous Whitespace */}
        <div className="space-y-6">
          {visibleProjects.map((project, idx) => {
            const isRoleHighlighted =
              selectedRole !== 'ALL' && project.roles[0] === selectedRole;

            return (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => onOpenProject(project)}
                className={`group relative bg-[#FCF9F4] rounded-2xl p-7 sm:p-10 border transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(35,23,15,0.08)] ${
                  isRoleHighlighted
                    ? 'border-[#6B4F3A]'
                    : 'border-[#E4D9C8] hover:border-[#6B4F3A]'
                }`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  {/* Left: Number, Title, Description, Technologies */}
                  <div className="lg:col-span-7 space-y-4">
                    <div className="flex items-center gap-3 font-mono text-xs text-[#6B4F3A]">
                      <span>0{idx + 1}</span>
                      <span className="text-[#D8CBB8]">—</span>
                      <span>{project.technologies.join(' · ')}</span>
                    </div>

                    <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-[-0.02em] text-[#23170F] group-hover:text-[#6B4F3A] transition-colors flex items-center gap-2.5">
                      <span>{project.title}</span>
                      <ArrowUpRight className="w-5 h-5 text-[#6B4F3A] group-hover:text-[#23170F] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                    </h3>

                    <p className="text-base text-[#6B4F3A] leading-relaxed max-w-xl">
                      {project.description}
                    </p>
                  </div>

                  {/* Right: 1–3 Important Metrics + Subtle Hover Data Preview + GitHub Button */}
                  <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between gap-6 pt-4 lg:pt-0 border-t lg:border-t-0 border-[#E4D9C8]">
                    {/* 3 Clean Metrics */}
                    <div className="flex flex-wrap lg:justify-end gap-2">
                      {project.metrics.map((metric) => (
                        <span
                          key={metric}
                          className="px-3.5 py-1.5 rounded-full bg-[#F7F1E7] border border-[#E4D9C8] font-mono text-xs text-[#23170F]"
                        >
                          {metric}
                        </span>
                      ))}
                    </div>

                    {/* Subtle Data Preview on Hover + GitHub Link */}
                    <div className="w-full flex items-center justify-between lg:justify-end gap-6">
                      <div className="hidden sm:block opacity-65 group-hover:opacity-100 transition-opacity duration-300">
                        <SubtleDataPreview
                          points={project.previewPoints}
                          label={project.previewLabel}
                        />
                      </div>

                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#F7F1E7] hover:bg-[#23170F] text-[#23170F] hover:text-[#F7F1E7] border border-[#E4D9C8] text-xs font-medium transition-colors shrink-0"
                      >
                        <span>GitHub</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Subtle Toggle to View All 6 Verified GitHub Repositories */}
        <div className="mt-10 flex items-center justify-between pt-6 border-t border-[#E4D9C8]">
          <button
            onClick={() => setShowAllProjects((prev) => !prev)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FCF9F4] hover:bg-[#23170F] text-[#23170F] hover:text-[#F7F1E7] border border-[#E4D9C8] font-mono text-xs transition-colors cursor-pointer"
          >
            {showAllProjects ? (
              <>
                <Minus className="w-3.5 h-3.5" />
                <span>Show Top 3 Selected Projects</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>View All {PROJECTS.length} Projects from GitHub</span>
              </>
            )}
          </button>

          <a
            href="https://github.com/Ashijain30?tab=repositories"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-[#6B4F3A] hover:text-[#23170F] transition-colors"
          >
            <span>github.com/Ashijain30</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
