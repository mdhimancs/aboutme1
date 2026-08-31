import React, { useState } from 'react';
import { 
  Shield, 
  Lock, 
  Brain, 
  CheckCircle2, 
  Award, 
  BookOpen, 
  BadgeCheck, 
  Sparkles,
  ArrowDown
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ExecutiveBioProps {
  theme?: string;
  onNextPage?: () => void;
}

export const ExecutiveBio: React.FC<ExecutiveBioProps> = ({ theme = 'apple-dark', onNextPage }) => {
  const isLight = theme === 'apple-light';
  const [activeBioTab, setActiveBioTab] = useState<'summary' | 'philosophy' | 'credentials'>('summary');

  return (
    <section 
      id="bio" 
      className={`min-h-screen lg:h-screen w-full flex flex-col justify-center py-4 sm:py-5 px-6 sm:px-10 lg:px-14 max-w-7xl lg:max-w-[1550px] mx-auto border-t ${
        isLight ? 'border-zinc-200 bg-[#fcfcfd]' : 'border-white/10 bg-[#000000]'
      }`}
    >
      
      {/* 1. Section Header */}
      <div className="text-left space-y-2 mb-5 sm:mb-6 shrink-0 px-4 sm:px-[10%]">
        <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border ${
          isLight ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-blue-500/10 border-blue-500/20 text-blue-400'
        }`}>
          <Sparkles className="w-3.5 h-3.5" />
          <span>Professional Profile & Architecture</span>
        </div>
        <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight ${isLight ? 'text-zinc-900' : 'text-white'}`}>
          Bio & Leadership
        </h2>
        <p className={`max-w-4xl text-xs sm:text-sm leading-relaxed ${isLight ? 'text-zinc-700' : 'text-zinc-400'}`}>
          21+ years engineering enterprise Zero Trust IAM, hardened cryptographic perimeters, and executive security governance.
        </p>
      </div>

      {/* 2. Full-Width Executive Dossier Card */}
      <div className={`rounded-3xl p-4 sm:p-5 lg:p-6 backdrop-blur-xl shadow-xl transition-all border shrink-0 w-[80%] mx-auto ${
        isLight ? 'bg-white border-zinc-200 shadow-sm' : 'bg-white/[0.02] border-white/10 shadow-2xl'
      }`}>
        
        {/* Navigation Tabs Header */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pb-3 mb-3.5 border-b border-zinc-100 dark:border-white/5 relative">
          <div className="hidden lg:flex items-center space-x-2.5 absolute left-0">
            <div className={`w-2.5 h-2.5 rounded-full ${isLight ? 'bg-blue-600' : 'bg-blue-400'} animate-pulse`} />
            <span className={`text-xs sm:text-sm font-semibold tracking-wide uppercase ${isLight ? 'text-zinc-900' : 'text-white'}`}>
              Executive Dossier
            </span>
          </div>

          <div className={`flex items-center justify-center gap-1 p-1 rounded-2xl border mx-auto whitespace-nowrap overflow-x-auto ${
            isLight ? 'bg-zinc-100 border-zinc-200' : 'bg-black/50 border-white/10'
          }`}>
            <button
              onClick={() => setActiveBioTab('summary')}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                activeBioTab === 'summary'
                  ? (isLight ? 'bg-white text-zinc-900 shadow-sm font-semibold' : 'bg-white text-black shadow-sm font-semibold')
                  : (isLight ? 'text-zinc-600 hover:text-black' : 'text-zinc-400 hover:text-white')
              }`}
            >
              Executive Summary
            </button>
            <button
              onClick={() => setActiveBioTab('philosophy')}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                activeBioTab === 'philosophy'
                  ? (isLight ? 'bg-white text-zinc-900 shadow-sm font-semibold' : 'bg-white text-black shadow-sm font-semibold')
                  : (isLight ? 'text-zinc-600 hover:text-black' : 'text-zinc-400 hover:text-white')
              }`}
            >
              Leadership Philosophy
            </button>
            <button
              onClick={() => setActiveBioTab('credentials')}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                activeBioTab === 'credentials'
                  ? (isLight ? 'bg-white text-zinc-900 shadow-sm font-semibold' : 'bg-white text-black shadow-sm font-semibold')
                  : (isLight ? 'text-zinc-600 hover:text-black' : 'text-zinc-400 hover:text-white')
              }`}
            >
              Edu & Credentials
            </button>
          </div>
        </div>

        {/* Tab 1: Executive Summary */}
        {activeBioTab === 'summary' && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="space-y-2">
              <p className={`text-sm sm:text-base lg:text-lg font-medium leading-relaxed ${isLight ? 'text-zinc-900' : 'text-zinc-100'}`}>
                {PERSONAL_INFO.bioShort}
              </p>
              <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-zinc-700' : 'text-zinc-300'}`}>
                Over two decades of hands-on and strategic leadership across tier-1 financial institutions and global cloud enterprises. Proven track record modernizing legacy federations into cloud-native passwordless authentication, implementing least-privilege Zero Trust boundaries, and embedding AI-driven behavioral defense mechanisms across high-consequence production perimeters.
              </p>
            </div>

            {/* Strategic Highlight Tiles */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-1">
              <div className={`p-4 rounded-2xl border transition-all ${
                isLight ? 'bg-zinc-50/80 border-zinc-200' : 'bg-white/[0.03] border-white/5 hover:border-white/15'
              }`}>
                <div className="flex items-center space-x-2 mb-1.5">
                  <Shield className="w-4 h-4 text-blue-500" />
                  <div className={`font-bold text-xs sm:text-sm ${isLight ? 'text-zinc-900' : 'text-white'}`}>Enterprise Cybertechnology & IAM Scale</div>
                </div>
                <div className={`text-xs leading-relaxed ${isLight ? 'text-zinc-700' : 'text-zinc-400'}`}>
                  Architected federated IAM platforms serving 15M+ enterprise users with 99.999% SLA across multi-region hybrid clouds.
                </div>
              </div>

              <div className={`p-4 rounded-2xl border transition-all ${
                isLight ? 'bg-zinc-50/80 border-zinc-200' : 'bg-white/[0.03] border-white/5 hover:border-white/15'
              }`}>
                <div className="flex items-center space-x-2 mb-1.5">
                  <Brain className="w-4 h-4 text-purple-500" />
                  <div className={`font-bold text-xs sm:text-sm ${isLight ? 'text-zinc-900' : 'text-white'}`}>AI Threat Intelligence</div>
                </div>
                <div className={`text-xs leading-relaxed ${isLight ? 'text-zinc-700' : 'text-zinc-400'}`}>
                  Engineered automated SOAR workflows, real-time UEBA behavioral anomaly detection, and robust LLM guardrails.
                </div>
              </div>

              <div className={`p-4 rounded-2xl border transition-all ${
                isLight ? 'bg-zinc-50/80 border-zinc-200' : 'bg-white/[0.03] border-white/5 hover:border-white/15'
              }`}>
                <div className="flex items-center space-x-2 mb-1.5">
                  <Lock className="w-4 h-4 text-indigo-500" />
                  <div className={`font-bold text-xs sm:text-sm ${isLight ? 'text-zinc-900' : 'text-white'}`}>Zero Trust & PAM</div>
                </div>
                <div className={`text-xs leading-relaxed ${isLight ? 'text-zinc-700' : 'text-zinc-400'}`}>
                  Implemented Tier-0 credential isolation, JIT provisioning, and FIDO2 passwordless ecosystems cutting breach vectors by 94%.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Leadership Philosophy */}
        {activeBioTab === 'philosophy' && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <p className={`text-sm sm:text-base font-semibold leading-snug ${isLight ? 'text-zinc-900' : 'text-white'}`}>
              Security is an enabler of business velocity, built on defense-in-depth, clear RFC architectures, and continuous verification.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className={`p-4 rounded-2xl border space-y-1.5 ${isLight ? 'bg-zinc-50/80 border-zinc-200' : 'bg-white/[0.03] border-white/5'}`}>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <strong className={`text-xs sm:text-sm ${isLight ? 'text-zinc-900' : 'text-white'}`}>Write the RFC First</strong>
                </div>
                <p className={`text-xs leading-relaxed ${isLight ? 'text-zinc-700' : 'text-zinc-400'}`}>
                  Architectural alignment prior to code execution prevents technical debt and aligns compliance, engineering, and product stakeholders.
                </p>
              </div>

              <div className={`p-4 rounded-2xl border space-y-1.5 ${isLight ? 'bg-zinc-50/80 border-zinc-200' : 'bg-white/[0.03] border-white/5'}`}>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <strong className={`text-xs sm:text-sm ${isLight ? 'text-zinc-900' : 'text-white'}`}>Zero Trust by Default</strong>
                </div>
                <p className={`text-xs leading-relaxed ${isLight ? 'text-zinc-700' : 'text-zinc-400'}`}>
                  Never trust, always verify every identity, transaction, payload, and internal API call across all micro-perimeters.
                </p>
              </div>

              <div className={`p-4 rounded-2xl border space-y-1.5 ${isLight ? 'bg-zinc-50/80 border-zinc-200' : 'bg-white/[0.03] border-white/5'}`}>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <strong className={`text-xs sm:text-sm ${isLight ? 'text-zinc-900' : 'text-white'}`}>Blameless Post-Mortems</strong>
                </div>
                <p className={`text-xs leading-relaxed ${isLight ? 'text-zinc-700' : 'text-zinc-400'}`}>
                  Treating anomalies and alerts as systemic learning opportunities to harden automated regression suites and policy gates.
                </p>
              </div>

              <div className={`p-4 rounded-2xl border space-y-1.5 ${isLight ? 'bg-zinc-50/80 border-zinc-200' : 'bg-white/[0.03] border-white/5'}`}>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <strong className={`text-xs sm:text-sm ${isLight ? 'text-zinc-900' : 'text-white'}`}>Empower High-Agency Teams</strong>
                </div>
                <p className={`text-xs leading-relaxed ${isLight ? 'text-zinc-700' : 'text-zinc-400'}`}>
                  Security leadership succeeds by providing intuitive guardrails and self-service automation, not operational bottlenecks.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Edu & Credentials */}
        {activeBioTab === 'credentials' && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className={`p-4 rounded-2xl border flex items-start justify-between ${isLight ? 'bg-zinc-50/80 border-zinc-200' : 'bg-white/[0.03] border-white/5'}`}>
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-500/10 text-amber-500 mb-0.5">
                    <Award className="w-3 h-3" />
                    <span>US Patent</span>
                  </div>
                  <div className={`font-semibold text-xs sm:text-sm ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                    Distributed Identity Verification & Dynamic Token Hardening
                  </div>
                  <div className={`text-xs ${isLight ? 'text-zinc-700' : 'text-zinc-400'}`}>Issued by USPTO • Enterprise Cryptography & IAM</div>
                </div>
              </div>

              <div className={`p-4 rounded-2xl border flex items-start justify-between ${isLight ? 'bg-zinc-50/80 border-zinc-200' : 'bg-white/[0.03] border-white/5'}`}>
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-500/10 text-blue-500 mb-0.5">
                    <BookOpen className="w-3 h-3" />
                    <span>Master of Science</span>
                  </div>
                  <div className={`font-semibold text-xs sm:text-sm ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                    Masters of Computer Applications
                  </div>
                  <div className={`text-xs ${isLight ? 'text-zinc-700' : 'text-zinc-400'}`}>Stanford University</div>
                </div>
              </div>

              <div className={`p-4 rounded-2xl border flex items-start justify-between ${isLight ? 'bg-zinc-50/80 border-zinc-200' : 'bg-white/[0.03] border-white/5'}`}>
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-semibold bg-indigo-500/10 text-indigo-500 mb-0.5">
                    <BookOpen className="w-3 h-3" />
                    <span>Bachelor of Science</span>
                  </div>
                  <div className={`font-semibold text-xs sm:text-sm ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                    B.S. in Electrical Engineering & Computer Science
                  </div>
                  <div className={`text-xs ${isLight ? 'text-zinc-700' : 'text-zinc-400'}`}>UC Berkeley</div>
                </div>
              </div>

              <div className={`p-4 rounded-2xl border flex items-start justify-between ${isLight ? 'bg-zinc-50/80 border-zinc-200' : 'bg-white/[0.03] border-white/5'}`}>
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-500/10 text-emerald-500 mb-0.5">
                    <BadgeCheck className="w-3 h-3" />
                    <span>Industry Trainings</span>
                  </div>
                  <div className={`font-semibold text-xs sm:text-sm ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                    CISSP, CISM, AWS Security Specialist, FIDO2 Architect
                  </div>
                  <div className={`text-xs ${isLight ? 'text-zinc-700' : 'text-zinc-400'}`}>Global Security & IAM Governing Bodies</div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
