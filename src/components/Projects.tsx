import React from 'react';
import { Shield, Globe, Activity, Lock, Database, Search, ArrowUpRight, Zap } from 'lucide-react';
import { motion } from 'motion/react';

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  icon: React.ReactNode;
  status: 'Active' | 'Operational' | 'Deployment';
  impact: string;
}

interface ProjectsProps {
  theme?: string;
}

export const Projects: React.FC<ProjectsProps> = ({ theme = 'apple-dark' }) => {
  const isLight = theme === 'apple-light';

  const projects: Project[] = [
    {
      id: 'cti-matrix',
      title: 'Global CYBER THREAT INTELLIGENCE Matrix',
      category: 'Strategic Intelligence',
      description: 'A multi-dimensional threat mapping system that aggregates real-time signal intelligence across global perimeters to predict and neutralize zero-day vectors.',
      tags: ['Signal Intel', 'Predictive Analysis', 'Zero-Day Defense'],
      icon: <Globe className="w-6 h-6" />,
      status: 'Operational',
      impact: 'Reduced mean-time-to-detection by 85%'
    },
    {
      id: 'id-gov-nextgen',
      title: 'NextGen Identity and Privilege Governance',
      category: 'Governance & IAM',
      description: 'Orchestrating a unified, AI-driven identity and privilege governance framework across multi-cloud and hybrid perimeters, integrating JIT entitlements and automated lifecycle management.',
      tags: ['IGA', 'Privilege Governance', 'AI-Driven Security'],
      icon: <Shield className="w-6 h-6" />,
      status: 'Active',
      impact: '100% Zero Trust visibility and control'
    },
    {
      id: 'zero-trust-arch',
      title: 'Enterprise Zero-Trust Infrastructure',
      category: 'Architecture',
      description: 'Design and deployment of identity-centric perimeter security using micro-segmentation and continuous verification protocols.',
      tags: ['IAM', 'Micro-segmentation', 'Cloud Security'],
      icon: <Lock className="w-6 h-6" />,
      status: 'Active',
      impact: '100% compliance across multi-cloud environments'
    },
    {
      id: 'siem-evolution',
      title: 'Next-Gen SIEM & SOAR Orchestration',
      category: 'Operations',
      description: 'Automated incident response framework integrating advanced AI/ML for noise reduction and high-fidelity alert prioritization.',
      tags: ['SOAR', 'AI Ops', 'Incident Response'],
      icon: <Zap className="w-6 h-6" />,
      status: 'Deployment',
      impact: 'Automated 92% of Level 1 security events'
    }
  ];

  return (
    <section id="projects" className="min-h-screen lg:h-screen w-full flex flex-col justify-center py-6 sm:py-8 px-6 sm:px-10 lg:px-14 max-w-7xl lg:max-w-[1550px] mx-auto border-t border-white/10">
      <div className="max-w-6xl w-full mx-auto">
        <div className="mb-6">
          <h3 className={`text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-2 ${isLight ? 'text-zinc-900' : 'text-white'}`}>
            Strategic Initiatives
          </h3>
          <p className={`max-w-4xl text-xs sm:text-sm leading-relaxed ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
            Architecting and orchestrating high-impact security solutions that redefine the perimeter and protect global enterprise assets.
          </p>
          <p className={`text-[11px] sm:text-xs italic mt-1.5 ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`}>
            Reflections are personal; resemblances to organizational strategies are unintentional and coincidences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`group relative p-5 rounded-[24px] border transition-all duration-500 overflow-hidden ${
                isLight 
                  ? 'bg-white border-zinc-200 hover:border-blue-400 hover:shadow-2xl shadow-zinc-200/50' 
                  : 'bg-white/[0.02] border-white/10 hover:border-blue-500/30 hover:bg-white/[0.04]'
              }`}
            >
              {/* Abstract Background Element */}
              <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-24 h-24 bg-blue-500/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 h-full flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 ${
                    isLight ? 'bg-blue-50 text-blue-600' : 'bg-blue-900/20 text-blue-400'
                  }`}>
                    {project.icon}
                  </div>
                  <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-mono border ${
                    project.status === 'Operational' 
                      ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500'
                      : 'bg-blue-500/10 border-blue-500/20 text-blue-500'
                  }`}>
                    {project.status}
                  </div>
                </div>

                <div className="flex-grow">
                  <span className={`text-[9px] font-mono uppercase tracking-widest mb-1 block ${isLight ? 'text-blue-600' : 'text-blue-400'}`}>
                    {project.category}
                  </span>
                  <h4 className={`text-base font-bold mb-2 leading-tight group-hover:text-blue-500 transition-colors duration-300 ${
                    isLight ? 'text-zinc-900' : 'text-white'
                  }`}>
                    {project.title}
                  </h4>
                  <p className={`text-xs leading-relaxed mb-4 line-clamp-3 ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`}>
                    {project.description}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span 
                        key={tag}
                        className={`text-[8px] font-semibold px-2 py-0.5 rounded-md border ${
                          isLight 
                            ? 'bg-zinc-50 border-zinc-200 text-zinc-600' 
                            : 'bg-white/5 border-white/10 text-zinc-400'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className={`pt-4 border-t flex items-center justify-between ${isLight ? 'border-zinc-100' : 'border-white/5'}`}>
                    <div className="flex flex-col">
                      <span className={`text-[8px] uppercase tracking-wider font-mono ${isLight ? 'text-zinc-400' : 'text-zinc-500'}`}>Impact</span>
                      <span className={`text-[10px] font-bold ${isLight ? 'text-zinc-900' : 'text-white'}`}>{project.impact}</span>
                    </div>
                    <ArrowUpRight className={`w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                      isLight ? 'text-zinc-300 group-hover:text-blue-500' : 'text-zinc-600 group-hover:text-blue-400'
                    }`} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
