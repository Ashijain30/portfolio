import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight } from 'lucide-react';

export default function ProjectCaseStudyModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#23170F]/40 backdrop-blur-xs"
          />

          {/* Clean Editorial Case Study Modal */}
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-2xl bg-[#FCF9F4] rounded-2xl border border-[#E4D9C8] shadow-[0_24px_60px_rgba(35,23,15,0.16)] overflow-hidden my-auto"
          >
            {/* Header */}
            <div className="px-7 sm:px-10 pt-8 pb-6 border-b border-[#E4D9C8] flex items-start justify-between gap-4">
              <div>
                <div className="font-mono text-xs text-[#6B4F3A] uppercase tracking-widest mb-2">
                  PROJECT {project.number} // CASE STUDY
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#23170F] tracking-tight">
                  {project.title}
                </h2>
              </div>

              <button
                onClick={onClose}
                aria-label="Close case study"
                className="p-2 rounded-full bg-[#F7F1E7] hover:bg-[#E4D9C8] text-[#23170F] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body: PROBLEM, APPROACH, TECHNOLOGY, RESULT, GITHUB */}
            <div className="px-7 sm:px-10 py-8 space-y-7 max-h-[75vh] overflow-y-auto">
              {/* Metrics Row */}
              <div className="flex flex-wrap gap-2">
                {project.metrics.map((metric) => (
                  <span
                    key={metric}
                    className="px-3.5 py-1.5 rounded-full bg-[#F7F1E7] border border-[#E4D9C8] font-mono text-xs text-[#23170F]"
                  >
                    {metric}
                  </span>
                ))}
              </div>

              {/* PROBLEM */}
              <div>
                <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-[#6B4F3A] mb-2">
                  PROBLEM
                </h3>
                <p className="text-base text-[#23170F] leading-relaxed">
                  {project.caseStudy.problem}
                </p>
              </div>

              {/* APPROACH */}
              <div>
                <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-[#6B4F3A] mb-2">
                  APPROACH
                </h3>
                <p className="text-base text-[#23170F] leading-relaxed">
                  {project.caseStudy.approach}
                </p>
              </div>

              {/* TECHNOLOGY */}
              <div>
                <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-[#6B4F3A] mb-2.5">
                  TECHNOLOGY
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.caseStudy.technology.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-md bg-[#F7F1E7] border border-[#E4D9C8] font-mono text-xs text-[#23170F]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* RESULT */}
              <div>
                <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-[#6B4F3A] mb-2">
                  RESULT
                </h3>
                <p className="text-base text-[#23170F] leading-relaxed">
                  {project.caseStudy.result}
                </p>
              </div>

              {/* GITHUB */}
              <div className="pt-4 border-t border-[#E4D9C8] flex items-center justify-between">
                <span className="font-mono text-xs text-[#6B4F3A]">
                  GITHUB REPOSITORY
                </span>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#23170F] hover:bg-[#6B4F3A] text-[#F7F1E7] text-xs font-medium transition-colors"
                >
                  <span>View on GitHub</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
