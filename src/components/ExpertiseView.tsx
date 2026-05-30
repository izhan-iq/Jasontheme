import React, { useState } from 'react';
import { PROJECTS, SPECIALIZED_SKILLS } from '../data';
import { Project } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Award, Microscope, ChevronRight, Activity, Calendar, MapPin, HardHat } from 'lucide-react';

export default function ExpertiseView({ onNavigateToConsultation }: { onNavigateToConsultation: () => void }) {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'clinical' | 'industrial' | 'high-rise'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(PROJECTS[0]);

  const filteredProjects = selectedCategory === 'all' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === selectedCategory);

  return (
    <div className="space-y-16 py-8" id="expertise-view">
      {/* Services grid */}
      <section className="space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-secondary font-display bg-secondary-container/10 px-3 py-1.5 rounded-full inline-block">
            Specialized Services
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary font-display tracking-tight">
            Engineering Critical Infrastructure
          </h2>
          <p className="text-on-surface-variant text-base font-sans max-w-2xl mx-auto">
            Where standard mechanical trades stop, our operation begins. Delivering surgical cleanliness and zero-tolerance pressure flow systems.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {SPECIALIZED_SKILLS.map((skill, index) => {
            const icons = [
              <Microscope className="w-8 h-8 text-secondary" />,
              <Activity className="w-8 h-8 text-secondary" />,
              <ShieldCheck className="w-8 h-8 text-secondary" />
            ];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant/30 relative hover:shadow-[0_10px_30px_rgba(4,52,44,0.05)] transition-all group hover:-translate-y-1 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-lg bg-surface-container-low flex items-center justify-center border border-outline-variant/20 mb-4 group-hover:scale-105 transition-transform">
                    {icons[index]}
                  </div>
                  <h3 className="text-xl font-bold font-display text-primary tracking-tight">
                    {skill.title}
                  </h3>
                  <p className="text-xs text-on-surface-variant font-sans leading-relaxed">
                    {skill.description}
                  </p>
                  <ul className="space-y-2 pt-4">
                    {skill.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-center gap-2.5 text-xs text-primary font-sans">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed-dim" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-6">
                  <button 
                    onClick={onNavigateToConsultation}
                    className="text-secondary text-xs font-bold font-display flex items-center gap-1 group-hover:gap-2 transition-all"
                  >
                    <span>Request System Scope</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Projects Showcase */}
      <section className="space-y-8 pt-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-outline-variant/30 pb-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-secondary font-display">
              Case Registry & Validation
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-primary font-display tracking-tight">
              Clinical Quality Execution Records
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {(['all', 'clinical', 'industrial', 'high-rise'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs font-bold rounded-full font-display border transition-all ${
                  selectedCategory === cat 
                    ? 'bg-primary text-on-primary border-primary' 
                    : 'bg-transparent text-on-surface-variant border-outline-variant/40 hover:bg-surface-container-low'
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Projects List Selection */}
          <div className="col-span-1 lg:col-span-5 space-y-3 max-h-[500px] overflow-y-auto pr-2">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((p) => (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  onClick={() => setSelectedProject(p)}
                  className={`p-5 rounded-lg border cursor-pointer transition-all ${
                    selectedProject?.id === p.id 
                      ? 'bg-surface-container-high border-secondary/30 shadow-[0_4px_12px_rgba(4,52,44,0.03)]' 
                      : 'bg-surface-container-lowest border-outline-variant/20 hover:bg-surface-container-low'
                  }`}
                >
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-[11px] font-bold uppercase font-display bg-primary-fixed/30 text-on-primary-fixed-variant px-2.5 py-1 rounded-full">
                      {p.systemType.split(' ')[0]}
                    </span>
                    <span className="text-[11px] text-on-surface-variant font-mono flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {p.year}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-primary font-display tracking-tight mt-3">
                    {p.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-on-surface-variant font-sans mt-1">
                    <MapPin className="w-3.5 h-3.5 text-outline" />
                    <span>{p.location}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Active Project Detail Panel */}
          <div className="col-span-1 lg:col-span-7 bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-8 shadow-[0_10px_35px_rgba(4,52,44,0.04)] relative">
            <AnimatePresence mode="wait">
              {selectedProject && (
                <motion.div
                  key={selectedProject.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-outline-variant/30 pb-5">
                    <div className="space-y-1">
                      <span className="text-xs font-bold text-secondary uppercase tracking-wider font-display">
                        {selectedProject.systemType}
                      </span>
                      <h3 className="text-xl md:text-2xl font-bold text-primary font-display tracking-tight">
                        {selectedProject.name}
                      </h3>
                      <div className="flex items-center gap-1 text-[11px] text-on-surface-variant font-sans">
                        <MapPin className="w-3.5 h-3.5 text-secondary" />
                        <span>{selectedProject.location}</span>
                      </div>
                    </div>
                    <div className="bg-secondary-container/10 px-4 py-2.5 rounded-lg border border-secondary/20 text-right shrink-0">
                      <div className="text-[10px] text-on-secondary-container font-bold tracking-widest uppercase font-display">
                        Compliance Code
                      </div>
                      <div className="text-xs font-bold text-primary font-mono mt-0.5">
                        {selectedProject.complianceSpec}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-on-surface-variant font-sans leading-relaxed">
                    {selectedProject.description}
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-outline-variant/20">
                    {selectedProject.stats?.map((stat, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="text-[10px] text-on-surface-variant font-semibold tracking-wider font-display uppercase">
                          {stat.label}
                        </div>
                        <div className="text-lg md:text-xl font-bold font-display text-primary">
                          {stat.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-surface p-4 rounded-lg flex items-start gap-3 border border-outline-variant/30 mt-4">
                    <HardHat className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <h4 className="text-[11px] font-bold text-primary font-display uppercase tracking-wider">
                        Technical Execution Highlight
                      </h4>
                      <p className="text-[11px] text-on-surface-variant leading-relaxed">
                        To fulfill the sterile requirements of Section 5.1.10.11.1 of NFPA 99, 100% of joints were oxygen-cleaned, verified free of hydrocarbons, and brazed under a continuous flow of high-purity dry nitrogen gas.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
}
