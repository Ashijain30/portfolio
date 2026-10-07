import { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ProjectsSection from './components/ProjectsSection';
import ExperienceTimeline from './components/ExperienceTimeline';
import SkillsAndAbout from './components/SkillsAndAbout';
import ContactSection from './components/ContactSection';
import ProjectCaseStudyModal from './components/ProjectCaseStudyModal';
import FloatingAIAssistant from './components/FloatingAIAssistant';

export default function App() {
  const [selectedRole, setSelectedRole] = useState('ALL');
  const [activeProject, setActiveProject] = useState(null);

  return (
    <div className="min-h-screen bg-[#F7F1E7] text-[#23170F] selection:bg-[#6B4F3A]/20 selection:text-[#23170F]">
      {/* Simple Sticky Navigation */}
      <Navbar />

      {/* Main Content */}
      <main>
        {/* Hero with Subtle Signature Data Flow Visual */}
        <HeroSection />

        {/* Selected Work (Visual Centerpiece) + Simplified Role Filter */}
        <ProjectsSection
          selectedRole={selectedRole}
          onSelectRole={setSelectedRole}
          onOpenProject={(project) => setActiveProject(project)}
        />

        {/* Editorial Experience Timeline */}
        <ExperienceTimeline />

        {/* Categorized Skills & Short Personal About Section */}
        <SkillsAndAbout selectedRole={selectedRole} />
      </main>

      {/* Contact Footer */}
      <ContactSection />

      {/* Clean Case-Study Modal on Project Click */}
      <ProjectCaseStudyModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />

      {/* Compact Floating AI Assistant Button (Bottom-Right) */}
      <FloatingAIAssistant />
    </div>
  );
}
