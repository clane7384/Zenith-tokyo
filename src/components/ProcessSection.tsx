import React, { useState } from 'react';
import { Clock, FileText, CheckCircle2, ChevronRight } from 'lucide-react';
import { PROCESS_STEPS } from '../data/mockData';
import { Language, ThemeConfig } from '../types';

interface ProcessSectionProps {
  lang: Language;
  themeConfig: ThemeConfig;
  onConsultationClick: () => void;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({
  lang,
  themeConfig,
  onConsultationClick
}) => {
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const isJa = lang === 'ja';
  const currentStep = PROCESS_STEPS[activeStepIdx];

  return (
    <section
      id="process"
      className="relative py-28 bg-[#1A1C20] border-t border-stone-800/80 overflow-hidden"
    >
      {/* Ambient background glows */}
      <div
        className="absolute top-1/2 -left-60 w-96 h-96 rounded-full blur-3xl opacity-15 pointer-events-none"
        style={{ backgroundColor: themeConfig.accentColor }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-stone-800">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span
                className="w-2.5 h-[1.5px]"
                style={{ backgroundColor: themeConfig.goldColor }}
              />
              <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-montserrat">
                {isJa ? '設計・施工プロセスの全貌' : 'Architectural Methodology'}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white font-shippori">
              {isJa ? '構想から永久の管理までの道標' : 'From Vision to Generational Legacy'}
            </h2>
          </div>
          <div className="mt-4 md:mt-0 max-w-md">
            <p className="text-xs sm:text-sm text-stone-400 font-montserrat leading-relaxed">
              {isJa
                ? '対話、精密模型、銘木・自然石の選定、名工との施工監理まで。妥協なき6つのステージで理想の空間を具現化します。'
                : 'An uncompromising six-phase journey combining poetic site analysis, structural engineering, and master craftsmanship.'}
            </p>
          </div>
        </div>

        {/* Infographic Steps Horizontal Pipeline Bar */}
        <div className="mb-14">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
            {PROCESS_STEPS.map((step, idx) => {
              const isSelected = activeStepIdx === idx;
              return (
                <button
                  key={step.number}
                  id={`process-tab-${step.number}`}
                  onClick={() => setActiveStepIdx(idx)}
                  className={`p-4 rounded-xl border text-left transition-all duration-300 relative flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#282B33] border-[#C5A059] shadow-xl'
                      : 'bg-[#22252B] border-stone-700/70 hover:border-stone-600 opacity-80 hover:opacity-100'
                  }`}
                >
                  {/* Selected Top Indicator */}
                  {isSelected && (
                    <div
                      className="absolute top-0 left-4 right-4 h-[2px]"
                      style={{ backgroundColor: themeConfig.goldColor }}
                    />
                  )}

                  <div className="flex items-center justify-between mb-2">
                    <span
                      className="font-mono text-xs font-semibold"
                      style={{ color: isSelected ? themeConfig.goldColor : '#9CA3AF' }}
                    >
                      PHASE {step.number}
                    </span>
                    {isSelected && (
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: themeConfig.goldColor }}
                      />
                    )}
                  </div>

                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold font-shippori text-white line-clamp-1">
                      {isJa ? step.title.ja.split('＆')[0] : step.title.en.split('&')[0]}
                    </h4>
                    <span className="text-[10px] text-stone-400 font-montserrat block mt-1">
                      {isJa ? step.duration.ja : step.duration.en}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Step Detailed Showcase (Infographic Focus Card) */}
        <div className="bg-[#22252B] border border-stone-700/60 rounded-2xl p-6 sm:p-10 relative overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Step Left: Narrative and Deliverables */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <span
                  className="px-3 py-1 rounded text-xs font-mono font-bold text-white border"
                  style={{
                    backgroundColor: themeConfig.accentColor,
                    borderColor: `${themeConfig.goldColor}55`
                  }}
                >
                  PHASE {currentStep.number}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-stone-400 font-montserrat">
                  <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>{isJa ? currentStep.duration.ja : currentStep.duration.en}</span>
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-bold font-shippori text-white mb-2 leading-tight">
                  {isJa ? currentStep.title.ja : currentStep.title.en}
                </h3>
                <p className="text-xs sm:text-sm text-[#C5A059] font-montserrat tracking-wide">
                  {isJa ? currentStep.subtitle.ja : currentStep.subtitle.en}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-stone-300 font-montserrat leading-relaxed">
                {isJa ? currentStep.description.ja : currentStep.description.en}
              </p>

              {/* Deliverables Infographic Box */}
              <div className="bg-[#0D0D0D] border border-stone-800 rounded-xl p-5">
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-stone-400 font-montserrat mb-3.5">
                  <FileText className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>{isJa ? 'このフェーズでの具体的な成果物' : 'Phase Deliverables & Milestones'}</span>
                </div>
                <div className="space-y-2.5">
                  {(isJa ? currentStep.deliverables.ja : currentStep.deliverables.en).map(
                    (del, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-xs text-stone-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{del}</span>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Step Navigation Controls */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2">
                  <button
                    id="prev-process-step-btn"
                    disabled={activeStepIdx === 0}
                    onClick={() => setActiveStepIdx((p) => Math.max(0, p - 1))}
                    className="px-3 py-1.5 rounded text-xs border border-stone-800 bg-stone-900 text-stone-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-stone-800 transition-colors"
                  >
                    {isJa ? '← 前のフェーズ' : '← Previous Phase'}
                  </button>
                  <button
                    id="next-process-step-btn"
                    disabled={activeStepIdx === PROCESS_STEPS.length - 1}
                    onClick={() =>
                      setActiveStepIdx((p) => Math.min(PROCESS_STEPS.length - 1, p + 1))
                    }
                    className="px-3 py-1.5 rounded text-xs border border-stone-800 bg-stone-900 text-stone-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-stone-800 transition-colors"
                  >
                    {isJa ? '次のフェーズ →' : 'Next Phase →'}
                  </button>
                </div>

                <button
                  id="process-inquire-btn"
                  onClick={onConsultationClick}
                  className="text-xs text-[#C5A059] hover:text-white font-montserrat tracking-wider flex items-center gap-1 transition-colors"
                >
                  <span>{isJa ? '初期相談を申し込む' : 'Start Initial Consultation'}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Step Right: Cinematic Image with Architecture Framing */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-stone-700 shadow-2xl">
                <img
                  src={currentStep.image}
                  alt={isJa ? currentStep.title.ja : currentStep.title.en}
                  className="w-full h-full object-cover filter brightness-95"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-xs font-mono text-stone-300 flex justify-between items-center">
                  <span>Zenith Tokyo Atelier Protocol</span>
                  <span className="text-[#C5A059]">0{activeStepIdx + 1} / 06</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
