import React, { useState, useMemo } from 'react';
import { Search, MapPin, ArrowUpRight } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';
import { Language, Project, ProjectCategory, ThemeConfig } from '../types';

interface PortfolioSectionProps {
  lang: Language;
  themeConfig: ThemeConfig;
  onSelectProject: (project: Project) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  lang,
  themeConfig,
  onSelectProject
}) => {
  const { projects } = useSiteData();
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const isJa = lang === 'ja';

  const categories: { id: ProjectCategory; labelJa: string; labelEn: string }[] = [
    { id: 'all', labelJa: 'すべて (All)', labelEn: 'All Works' },
    { id: 'residential', labelJa: '高級邸宅 (Residence)', labelEn: 'Private Estates' },
    { id: 'commercial', labelJa: '商業・旗艦店 (Commercial)', labelEn: 'Flagship Retail' },
    { id: 'hospitality', labelJa: '別荘・リゾート (Villa)', labelEn: 'Villas & Retreats' },
    { id: 'renovation', labelJa: 'リノベーション (Regeneration)', labelEn: 'Modernist Regeneration' }
  ];

  const filteredProjects = useMemo(() => {
    return projects.filter((proj) => {
      const matchCat = selectedCategory === 'all' || proj.category === selectedCategory;
      const matchSearch =
        searchQuery.trim() === '' ||
        proj.title.ja.toLowerCase().includes(searchQuery.toLowerCase()) ||
        proj.title.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
        proj.location.ja.toLowerCase().includes(searchQuery.toLowerCase()) ||
        proj.location.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
        proj.materials.ja.some((m) => m.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [projects, selectedCategory, searchQuery]);

  return (
    <section id="portfolio" className="relative py-28 bg-[#181A1E] border-t border-stone-800/80 overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute top-1/4 -left-48 w-96 h-96 rounded-full blur-3xl opacity-15 pointer-events-none"
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
                {isJa ? '厳選された設計実績' : 'Selected Works'}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white font-shippori">
              {isJa ? '光と陰影が織りなす空間アーカイブ' : 'Architectural Portfolio'}
            </h2>
          </div>
          <div className="mt-4 md:mt-0">
            <span className="text-xs font-mono text-stone-400">
              {isJa
                ? `全 ${projects.length} 作品 / 表示中 ${filteredProjects.length} 件`
                : `Showing ${filteredProjects.length} of ${projects.length} Masterworks`}
            </span>
          </div>
        </div>

        {/* Filter Controls & Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-12">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  id={`portfolio-cat-${cat.id}`}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-montserrat tracking-wider whitespace-nowrap transition-all duration-300 ${
                    isSelected
                      ? 'text-white border shadow-lg'
                      : 'bg-[#22252B] text-stone-400 border border-stone-700/80 hover:border-stone-600 hover:text-white'
                  }`}
                  style={{
                    backgroundColor: isSelected ? themeConfig.accentColor : undefined,
                    borderColor: isSelected ? themeConfig.goldColor : undefined
                  }}
                >
                  {isJa ? cat.labelJa : cat.labelEn}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              id="portfolio-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isJa ? '素材、地域名で検索...' : 'Search by material, location...'}
              className="w-full pl-10 pr-4 py-2 rounded-full bg-[#22252B] border border-stone-700 text-xs text-stone-200 placeholder-stone-400 focus:outline-none focus:border-[#C5A059] transition-colors"
            />
          </div>
        </div>

        {/* Project Grid */}
        {filteredProjects.length === 0 ? (
          <div className="py-20 text-center text-stone-400 font-montserrat text-sm border border-dashed border-stone-700 rounded-2xl">
            {isJa ? '該当するプロジェクトは見つかりませんでした。' : 'No projects match your filter query.'}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                id={`project-card-${project.id}`}
                onClick={() => onSelectProject(project)}
                className="group relative rounded-2xl overflow-hidden bg-[#22252B] border border-stone-700/60 cursor-pointer hover:border-stone-500 transition-all duration-500 shadow-xl flex flex-col"
              >
                {/* Image Aspect Box with Hover Overlay */}
                <div className="relative aspect-[4/3] overflow-hidden bg-black">
                  <img
                    src={project.heroImage}
                    alt={isJa ? project.title.ja : project.title.en}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90 group-hover:brightness-100"
                    referrerPolicy="no-referrer"
                  />

                  {/* Deep Forest Green Hover Overlay */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-85 transition-opacity duration-500 flex flex-col justify-between p-6"
                    style={{ backgroundColor: themeConfig.accentColor }}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className="px-2.5 py-1 rounded text-[11px] font-mono uppercase font-semibold text-white border"
                        style={{ borderColor: `${themeConfig.goldColor}88` }}
                      >
                        {isJa ? project.categoryLabel.ja : project.categoryLabel.en}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-black/40 border border-white/30 flex items-center justify-center text-white">
                        <ArrowUpRight className="w-4 h-4 text-[#C5A059]" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-xs text-stone-200 font-montserrat">
                        <strong>{isJa ? '主要マテリアル:' : 'Key Materials:'}</strong>
                        <div className="line-clamp-2 text-stone-300 mt-0.5">
                          {(isJa ? project.materials.ja : project.materials.en).join(' • ')}
                        </div>
                      </div>
                      <span className="text-xs font-montserrat text-[#C5A059] flex items-center gap-1 font-semibold">
                        <span>{isJa ? '詳細仕様・図面を見る' : 'View Full Details & Specs'}</span>
                      </span>
                    </div>
                  </div>

                  {/* Top Category Badge */}
                  <div className="absolute top-4 left-4 group-hover:opacity-0 transition-opacity">
                    <span className="px-2.5 py-1 rounded bg-black/70 backdrop-blur-md text-[11px] font-mono uppercase text-stone-300 border border-stone-700">
                      {isJa ? project.categoryLabel.ja : project.categoryLabel.en}
                    </span>
                  </div>
                </div>

                {/* Card Bottom Meta */}
                <div className="p-6 flex flex-col justify-between flex-1 bg-[#22252B]">
                  <div>
                    <div className="flex items-center gap-3 text-xs text-stone-400 font-mono mb-2">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#C5A059]" />
                        {isJa ? project.location.ja : project.location.en}
                      </span>
                      <span>•</span>
                      <span>{project.year}</span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold font-shippori text-white group-hover:text-[#C5A059] transition-colors leading-snug mb-2">
                      {isJa ? project.title.ja : project.title.en}
                    </h3>

                    <p className="text-xs text-stone-400 font-montserrat line-clamp-2 leading-relaxed">
                      {isJa ? project.subtitle.ja : project.subtitle.en}
                    </p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-stone-800/80 flex items-center justify-between text-xs font-mono text-stone-400">
                    <span>{project.area}</span>
                    <span className="text-stone-500 group-hover:text-[#C5A059] transition-colors">
                      {project.slug}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
