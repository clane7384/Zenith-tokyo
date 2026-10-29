import React, { useState } from 'react';
import { X, Layers, Award, ChevronLeft, ChevronRight, MessageSquare } from 'lucide-react';
import { Project, Language, ThemeConfig } from '../types';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  themeConfig: ThemeConfig;
  onInquireAboutProject: (projectTitle: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  isOpen,
  onClose,
  lang,
  themeConfig,
  onInquireAboutProject
}) => {
  const [activeImgIdx, setActiveImgIdx] = useState(0);

  if (!isOpen || !project) return null;

  const isJa = lang === 'ja';
  const galleryImages = project.gallery && project.gallery.length > 0 ? project.gallery : [project.heroImage];

  return (
    <div
      id="project-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="project-modal-container"
        className="relative w-full max-w-5xl bg-[#121212] border border-stone-800 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-800 bg-[#151515] shrink-0">
          <div className="flex items-center gap-3">
            <span
              className="text-xs px-2.5 py-0.5 rounded font-mono uppercase font-semibold text-white border"
              style={{
                backgroundColor: themeConfig.accentColor,
                borderColor: `${themeConfig.goldColor}66`
              }}
            >
              {isJa ? project.categoryLabel.ja : project.categoryLabel.en}
            </span>
            <span className="text-xs text-stone-400 font-mono">
              {project.year} • {isJa ? project.location.ja : project.location.en}
            </span>
          </div>

          <button
            id="close-project-modal-btn"
            onClick={onClose}
            className="p-1.5 rounded text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8 flex-1">
          {/* Main Large Hero Image Viewer */}
          <div className="relative aspect-[16/9] rounded-xl overflow-hidden border border-stone-800 bg-black">
            <img
              src={galleryImages[activeImgIdx]}
              alt={isJa ? project.title.ja : project.title.en}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />

            {/* Gallery Navigation arrows */}
            {galleryImages.length > 1 && (
              <>
                <button
                  id="modal-prev-image-btn"
                  onClick={() =>
                    setActiveImgIdx((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1))
                  }
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  id="modal-next-image-btn"
                  onClick={() => setActiveImgIdx((prev) => (prev + 1) % galleryImages.length)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Thumbnails */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 p-1.5 rounded-xl bg-black/60 backdrop-blur-sm border border-stone-700">
                  {galleryImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImgIdx(i)}
                      className={`w-12 h-8 rounded overflow-hidden border transition-all ${
                        activeImgIdx === i
                          ? 'border-[#C5A059] scale-105'
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="thumb" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Project Title & Narrative */}
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-shippori text-white leading-snug">
              {isJa ? project.title.ja : project.title.en}
            </h2>
            <p className="text-sm sm:text-base text-[#C5A059] font-montserrat tracking-wide font-medium">
              {isJa ? project.subtitle.ja : project.subtitle.en}
            </p>
            <p className="text-xs sm:text-sm text-stone-300 font-montserrat leading-relaxed pt-2">
              {isJa ? project.concept.ja : project.concept.en}
            </p>
          </div>

          {/* Specs & Natural Materials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-stone-800">
            {/* Natural Materials */}
            <div className="p-5 rounded-xl bg-[#151515] border border-stone-800 space-y-3">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#C5A059] font-montserrat">
                <Layers className="w-4 h-4 text-[#C5A059]" />
                <span>{isJa ? '厳選された自然素材 (Curated Materials)' : 'Curated Natural Materials'}</span>
              </div>
              <ul className="space-y-2 text-xs text-stone-300 font-montserrat">
                {(isJa ? project.materials.ja : project.materials.en).map((mat, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: themeConfig.goldColor }}
                    />
                    <span>{mat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Architectural Meta Specs */}
            <div className="p-5 rounded-xl bg-[#151515] border border-stone-800 space-y-3">
              <div className="text-xs uppercase tracking-widest text-[#C5A059] font-montserrat">
                {isJa ? '建築仕様・諸元 (Architectural Specs)' : 'Architectural Specs'}
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs font-montserrat">
                <div>
                  <span className="text-stone-400 block">{isJa ? '延床面積' : 'Total Area'}</span>
                  <span className="text-white font-mono">{project.area}</span>
                </div>
                <div>
                  <span className="text-stone-400 block">{isJa ? '竣工時期' : 'Completion'}</span>
                  <span className="text-white font-mono">{project.year}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-stone-400 block">{isJa ? '設計・監理' : 'Principal Architect'}</span>
                  <span className="text-stone-200">
                    {isJa ? project.architects.ja : project.architects.en}
                  </span>
                </div>
                {project.awards && (
                  <div className="col-span-2 pt-1 text-emerald-400 flex items-center gap-1.5 text-xs">
                    <Award className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>{isJa ? project.awards.ja : project.awards.en}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer CTA */}
        <div className="px-6 py-4 border-t border-stone-800 bg-[#151515] shrink-0 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-stone-400 font-montserrat">
            {isJa
              ? '同規模の建築・リノベーションをご検討中ですか？'
              : 'Interested in commissioning a similar architectural project?'}
          </span>

          <button
            id="modal-inquire-project-btn"
            onClick={() => {
              onClose();
              onInquireAboutProject(isJa ? project.title.ja : project.title.en);
            }}
            className="w-full sm:w-auto px-5 py-2 rounded-xl text-xs font-montserrat uppercase tracking-wider font-semibold text-white transition-all hover:brightness-110 shadow-lg flex items-center justify-center gap-2 border"
            style={{
              backgroundColor: themeConfig.accentColor,
              borderColor: themeConfig.goldColor
            }}
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>{isJa ? 'この事例について相談する' : 'Inquire About This Project'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
