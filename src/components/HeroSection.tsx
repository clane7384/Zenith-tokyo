import React, { useState, useEffect } from 'react';
import { ArrowRight, Pause, Play } from 'lucide-react';
import { Language, PageSection, ThemeConfig } from '../types';

interface HeroSectionProps {
  lang: Language;
  themeConfig: ThemeConfig;
  onNavigate: (section: PageSection) => void;
  onSelectProjectBySlug: (slug: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  lang,
  themeConfig,
  onNavigate,
  onSelectProjectBySlug
}) => {
  const isJa = lang === 'ja';

  const slides = [
    {
      titleJa: '白金台の邸宅 — 幽玄の光陰',
      titleEn: 'Shirokane Solitude Residence',
      subtitleJa: '黒御影石と屋久杉が織りなす、都市の静謐なる聖域',
      subtitleEn: 'An Urban Sanctuary Sculpted from Nero Marquina & Ancient Yakusugi',
      categoryJa: '高級住宅建築',
      categoryEn: 'Private Estate',
      locationJa: '東京都港区白金台',
      locationEn: 'Shirokanedai, Tokyo',
      slug: 'shirokane-solitude',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85'
    },
    {
      titleJa: '表参道 ハイエンド・ブティック',
      titleEn: 'Omotesando Haute Couture Flagship',
      subtitleJa: '深緑の大理石層と光のスリットが織りなす空間美学',
      subtitleEn: 'Strata of Alpine Verde Alpi Marble and Architectural Linear Slits',
      categoryJa: '商業旗艦店',
      categoryEn: 'Flagship Retail',
      locationJa: '東京都港区南青山',
      locationEn: 'Minami-Aoyama, Tokyo',
      slug: 'omotesando-verde',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2000&q=85'
    },
    {
      titleJa: '軽井沢の別邸 — 苔庭のパビリオン',
      titleEn: 'Karuizawa Forest Moss Pavilion',
      subtitleJa: '原生林の息吹を取り込むキャンチレバー構造',
      subtitleEn: 'A Cantilevered Glass & Timber Haven Embraced by Alpine Woodland',
      categoryJa: '別荘・リゾート',
      categoryEn: 'Alpine Villa',
      locationJa: '長野県北佐久郡軽井沢町',
      locationEn: 'Karuizawa, Nagano',
      slug: 'karuizawa-moss-pavilion',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=85'
    }
  ];

  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPlaying, slides.length]);

  const currentSlide = slides[currentIdx];

  return (
    <section id="home" className="relative h-screen min-h-[680px] w-full overflow-hidden bg-[#0D0D0D]">
      {/* Background Images with Fade Transitions */}
      {slides.map((slide, idx) => {
        const isActive = idx === currentIdx;
        return (
          <div
            key={slide.slug}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
            }`}
            style={{ transition: 'opacity 1.2s ease-in-out, transform 8s ease-out' }}
          >
            <img
              src={slide.image}
              alt={slide.titleEn}
              className="w-full h-full object-cover filter brightness-[0.72] contrast-105"
              referrerPolicy="no-referrer"
            />
            {/* Cinematic Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/40 to-black/60" />
            <div
              className="absolute inset-0 opacity-25 mix-blend-overlay pointer-events-none"
              style={{ backgroundColor: themeConfig.accentColor }}
            />
          </div>
        );
      })}

      {/* Main Content Overlay */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-between pt-28 sm:pt-32 pb-10 sm:pb-14">
        {/* Atelier Monogram & Brand Tag */}
        <div className="flex items-center gap-3">
          <span
            className="w-6 sm:w-8 h-[1px] shrink-0"
            style={{ backgroundColor: themeConfig.goldColor }}
          />
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] font-montserrat text-[#C5A059] whitespace-nowrap">
            {isJa ? 'ラグジュアリー＆ダークネイチャー 建築工房' : 'Luxury & Dark Nature Architecture'}
          </span>
        </div>

        {/* Hero Slogan & Featured Slide Narrative */}
        <div className="max-w-3xl space-y-4 sm:space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-stone-700 text-[11px] sm:text-xs font-mono text-stone-300 whitespace-nowrap">
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{ backgroundColor: themeConfig.goldColor }}
            />
            <span className="whitespace-nowrap">{isJa ? currentSlide.categoryJa : currentSlide.categoryEn}</span>
            <span className="text-stone-500">•</span>
            <span className="whitespace-nowrap">{isJa ? currentSlide.locationJa : currentSlide.locationEn}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white font-shippori leading-[1.15] break-keep">
            {isJa ? currentSlide.titleJa : currentSlide.titleEn}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-stone-300 font-montserrat leading-relaxed max-w-2xl font-light break-keep">
            {isJa ? currentSlide.subtitleJa : currentSlide.subtitleEn}
          </p>

          <div className="pt-2 sm:pt-4 flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              id="hero-view-project-btn"
              onClick={() => onSelectProjectBySlug(currentSlide.slug)}
              className="px-5 sm:px-6 py-3 sm:py-3.5 rounded-full text-xs font-montserrat uppercase tracking-[0.15em] sm:tracking-[0.2em] font-semibold text-white transition-all duration-300 hover:brightness-110 shadow-2xl flex items-center gap-2 border whitespace-nowrap shrink-0"
              style={{
                backgroundColor: themeConfig.accentColor,
                borderColor: themeConfig.goldColor
              }}
            >
              <span className="whitespace-nowrap">{isJa ? 'このプロジェクトの全貌' : 'Explore Project'}</span>
              <ArrowRight className="w-4 h-4 text-[#C5A059] shrink-0" />
            </button>

            <button
              id="hero-portfolio-btn"
              onClick={() => onNavigate('portfolio')}
              className="px-5 sm:px-6 py-3 sm:py-3.5 rounded-full text-xs font-montserrat uppercase tracking-[0.15em] sm:tracking-[0.2em] font-semibold text-stone-200 border border-stone-700 bg-black/40 hover:bg-black/80 hover:border-white transition-all backdrop-blur-sm whitespace-nowrap shrink-0"
            >
              <span className="whitespace-nowrap">{isJa ? '実績一覧を見る' : 'View All Works'}</span>
            </button>
          </div>
        </div>

        {/* Bottom Slide Indicators & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-white/10">
          <div className="flex items-center gap-6">
            {slides.map((s, idx) => {
              const active = idx === currentIdx;
              return (
                <button
                  key={s.slug}
                  id={`hero-slide-indicator-${idx}`}
                  onClick={() => setCurrentIdx(idx)}
                  className="flex items-center gap-2 text-left group transition-all"
                >
                  <span
                    className={`font-mono text-xs transition-colors ${
                      active ? 'text-[#C5A059] font-bold' : 'text-stone-500 group-hover:text-stone-300'
                    }`}
                  >
                    0{idx + 1}
                  </span>
                  <div
                    className={`h-[2px] transition-all duration-500 ${
                      active ? 'w-12 sm:w-16' : 'w-4 group-hover:w-8'
                    }`}
                    style={{
                      backgroundColor: active ? themeConfig.goldColor : '#404040'
                    }}
                  />
                  <span
                    className={`hidden md:inline text-xs font-montserrat line-clamp-1 transition-colors ${
                      active ? 'text-white' : 'text-stone-500 group-hover:text-stone-300'
                    }`}
                  >
                    {isJa ? s.titleJa.split('—')[0] : s.titleEn.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <button
              id="hero-play-pause-btn"
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 rounded-full border border-stone-800 bg-black/50 text-stone-400 hover:text-white transition-colors"
              aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
            <span className="text-[11px] font-mono text-stone-500">
              0{currentIdx + 1} / 0{slides.length}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
