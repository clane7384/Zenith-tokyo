import React, { useState, useMemo } from 'react';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';
import { JournalArticle, Language, ThemeConfig } from '../types';

interface JournalSectionProps {
  lang: Language;
  themeConfig: ThemeConfig;
  onSelectArticle: (article: JournalArticle) => void;
}

export const JournalSection: React.FC<JournalSectionProps> = ({
  lang,
  themeConfig,
  onSelectArticle
}) => {
  const { journalArticles } = useSiteData();
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const isJa = lang === 'ja';

  const filterOptions = [
    { id: 'all', labelJa: 'すべて', labelEn: 'All Dispatches' },
    { id: 'essay', labelJa: '建築論考・エッセイ', labelEn: 'Essays' },
    { id: 'project', labelJa: '竣工レポート', labelEn: 'Projects' },
    { id: 'sustainability', labelJa: 'バイオフィリック・環境', labelEn: 'Sustainability' }
  ];

  const filteredArticles = useMemo(() => {
    if (selectedTag === 'all') return journalArticles;
    return journalArticles.filter((a) => a.category === selectedTag);
  }, [journalArticles, selectedTag]);

  return (
    <section
      id="journal"
      className="relative py-28 bg-[#181A1E] border-t border-stone-800/80 overflow-hidden"
    >
      {/* Background glow */}
      <div
        className="absolute top-1/3 -right-48 w-80 h-80 rounded-full blur-3xl opacity-15 pointer-events-none"
        style={{ backgroundColor: themeConfig.accentColor }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 pb-6 border-b border-stone-800">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span
                className="w-2.5 h-[1.5px]"
                style={{ backgroundColor: themeConfig.goldColor }}
              />
              <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-montserrat">
                {isJa ? '建築論考・プロジェクト速報' : 'Architecture & Spatial Essays'}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white font-shippori">
              {isJa ? '思索と創造の記録（ジャーナル）' : 'The Zenith Journal'}
            </h2>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-3">
            <span className="text-xs text-stone-400 font-montserrat">
              {isJa ? '最新の建築動向と哲学' : 'Essays on Shadows, Light & Materiality'}
            </span>
          </div>
        </div>

        {/* Filter Tags */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-10 scrollbar-none">
          {filterOptions.map((opt) => {
            const isSelected = selectedTag === opt.id;
            return (
              <button
                key={opt.id}
                id={`journal-filter-${opt.id}`}
                onClick={() => setSelectedTag(opt.id)}
                className={`px-4 py-2 rounded-full text-xs font-montserrat tracking-wider whitespace-nowrap transition-all ${
                  isSelected
                    ? 'text-white border shadow-md'
                    : 'bg-[#22252B] text-stone-400 border border-stone-700/80 hover:text-white hover:border-stone-600'
                }`}
                style={{
                  backgroundColor: isSelected ? themeConfig.accentColor : undefined,
                  borderColor: isSelected ? themeConfig.goldColor : undefined
                }}
              >
                {isJa ? opt.labelJa : opt.labelEn}
              </button>
            );
          })}
        </div>

        {/* Featured Top Article + Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Top Headline Article Card (Col span 7) */}
          {filteredArticles.length > 0 && (
            <div
              id={`featured-journal-article-${filteredArticles[0].id}`}
              onClick={() => onSelectArticle(filteredArticles[0])}
              className="lg:col-span-7 group rounded-2xl overflow-hidden bg-[#22252B] border border-stone-700/60 cursor-pointer hover:border-stone-500 transition-all duration-500 flex flex-col shadow-xl"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-black">
                <img
                  src={filteredArticles[0].coverImage}
                  alt={isJa ? filteredArticles[0].title.ja : filteredArticles[0].title.en}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90 group-hover:brightness-100"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4">
                  <span
                    className="px-3 py-1 rounded text-[11px] font-montserrat uppercase font-semibold text-white border shadow-md"
                    style={{
                      backgroundColor: themeConfig.accentColor,
                      borderColor: `${themeConfig.goldColor}55`
                    }}
                  >
                    {isJa ? filteredArticles[0].categoryLabel.ja : filteredArticles[0].categoryLabel.en}
                  </span>
                </div>
              </div>

              <div className="p-7 flex flex-col justify-between flex-1 bg-[#22252B]">
                <div>
                  <div className="flex items-center gap-3 text-xs text-stone-400 font-montserrat mb-2.5">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-stone-400" />
                      {filteredArticles[0].date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-stone-400" />
                      {filteredArticles[0].readTime}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold font-shippori text-white group-hover:text-[#C5A059] transition-colors leading-snug mb-3">
                    {isJa ? filteredArticles[0].title.ja : filteredArticles[0].title.en}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-300 font-montserrat line-clamp-3 leading-relaxed mb-6">
                    {isJa ? filteredArticles[0].excerpt.ja : filteredArticles[0].excerpt.en}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-700/60 flex items-center justify-between">
                  <span className="text-xs text-stone-400 font-montserrat">
                    {isJa ? filteredArticles[0].author.ja : filteredArticles[0].author.en}
                  </span>
                  <span className="text-xs text-[#C5A059] group-hover:translate-x-1 transition-transform flex items-center gap-1 font-montserrat tracking-wider uppercase">
                    <span>{isJa ? '論考を読む' : 'Read Article'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Secondary Stack (Col span 5) */}
          <div className="lg:col-span-5 space-y-4 flex flex-col">
            {filteredArticles.slice(1).map((article) => (
              <div
                key={article.id}
                id={`journal-sub-card-${article.id}`}
                onClick={() => onSelectArticle(article)}
                className="group p-5 rounded-xl bg-[#22252B] border border-stone-700/60 cursor-pointer hover:border-stone-500 transition-all flex gap-4 items-center shadow-md"
              >
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg overflow-hidden shrink-0 bg-black">
                  <img
                    src={article.coverImage}
                    alt={isJa ? article.title.ja : article.title.en}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 text-[11px] text-stone-500 font-montserrat mb-1">
                    <span
                      className="text-stone-300 font-medium"
                      style={{ color: themeConfig.goldColor }}
                    >
                      {isJa ? article.categoryLabel.ja : article.categoryLabel.en}
                    </span>
                    <span>•</span>
                    <span>{article.date}</span>
                  </div>

                  <h4 className="text-sm font-semibold font-shippori text-white group-hover:text-[#C5A059] transition-colors leading-snug line-clamp-2 mb-1.5">
                    {isJa ? article.title.ja : article.title.en}
                  </h4>

                  <span className="text-[11px] text-stone-500 font-montserrat flex items-center gap-1 group-hover:text-stone-300 transition-colors">
                    <span>{isJa ? '続きを読む' : 'Read more'}</span>
                    <ArrowRight className="w-3 h-3 text-[#C5A059]" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
