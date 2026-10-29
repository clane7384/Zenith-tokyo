import React from 'react';
import { Compass, ArrowRight, Phone, Mail, PenTool } from 'lucide-react';
import { ArchitecturalDrawingStudio } from './ArchitecturalDrawingStudio';
import { useSiteData } from '../context/SiteDataContext';
import { Language, ThemeConfig } from '../types';

interface AboutSectionProps {
  lang: Language;
  themeConfig: ThemeConfig;
  onNavigateToPortfolio: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  lang,
  themeConfig,
  onNavigateToPortfolio
}) => {
  const { companyInfo } = useSiteData();
  const isJa = lang === 'ja';

  const services = [
    {
      code: 'ARCHITECTURE',
      titleJa: '建築設計・監理',
      titleEn: 'Architectural Design & Engineering',
      descJa: '都市の邸宅から商業施設、別荘建築まで。構造美と機能性を極限まで高めた唯一無二の空間設計。',
      descEn: 'Bespoke residential estates, flagship retail, and alpine villas crafted with sublime structural harmony.'
    },
    {
      code: 'DESIGN',
      titleJa: 'デザイン・空間企画',
      titleEn: 'Spatial Strategy & Creative Direction',
      descJa: 'ブランドの世界観を具現化する空間コンセプト立案、光と陰影のライティング計画、ファサード意匠。',
      descEn: 'Translating brand essence into sculptural interiors with calculated shadow choreography.'
    },
    {
      code: 'INTERIOR',
      titleJa: 'インテリア・特注家具',
      titleEn: 'Interior Architecture & Custom Joinery',
      descJa: 'イタリア産希少石材、銘木、真鍮削り出し特注什器など、永く愛される厳選素材によるラグジュアリー内装。',
      descEn: 'Curating rare alpine marbles, ancient timber, and milled solid brass joinery.'
    },
    {
      code: 'DEMOLITION',
      titleJa: '解体工事・スケルトン再生',
      titleEn: 'Structural Demolition & Renewal',
      descJa: '既存構造の安全な解体からスケルトンリノベーションまで、設計と施工を直結した一貫体制。',
      descEn: 'Precision architectural demolition and adaptive skeletal renewal integrated with master design.'
    }
  ];

  const philosophies = [
    {
      titleJa: '借景 (Shakkei) — 現代の借景論',
      titleEn: 'Contemporary Shakkei (Borrowed Scenery)',
      descJa: '窓を単なる開口部ではなく、厳選された自然光と外部の緑を絵画のように切り取るフレームとして再定義します。',
      descEn: 'Reframing windows not as mere punctures, but as curated living canvases capturing light, cloud shadow, and ancient foliage.'
    },
    {
      titleJa: '間 (Ma) — 余白と闇の調律',
      titleEn: 'Ma (Negative Space & Stillness)',
      descJa: '空間を物質で満たすのではなく、静寂と陰影の余白を創出。光を絞ることで、素材の質感と住まい手の五感を呼び覚まします。',
      descEn: 'Curating the intervals between matter and shadow. By restraining light, we awaken tactile textures and emotional calm.'
    },
    {
      titleJa: '一貫体制 (Integrated Execution)',
      titleEn: 'Complete Architecture & Demolition Synergy',
      descJa: '企画・意匠設計から解体・施工・インテリア監理までワンストップで完結。細部への妥協なきクラフトマンシップを保証します。',
      descEn: 'Seamless end-to-end stewardship spanning design, demolition, interior craft, and generational preservation.'
    }
  ];

  const milestones = [
    {
      year: '2025',
      titleJa: '歌舞伎町ノア新宿2号館 アトリエ拡充・建築設計・インテリア・解体工事の一貫体制を確立',
      titleEn: 'Expansion of Shinjuku Atelier & Full Synergistic Integration of Architecture, Interior Craft & Structural Demolition'
    },
    {
      year: '2026',
      titleJa: '「空間芸術の頂点」を具現化するハイエンド邸宅・商業旗艦店・別荘プロジェクトの本格展開',
      titleEn: 'Establishment of Next-Generation Masterwork Architecture, Luxury Private Retreats & Haute Couture Spaces'
    }
  ];

  return (
    <section id="about" className="relative py-28 bg-[#1A1C20] border-t border-stone-800/80 overflow-hidden">
      {/* Ambient background glow */}
      <div
        className="absolute -top-40 -right-40 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ backgroundColor: themeConfig.accentColor }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 pb-6 border-b border-stone-800">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span
                className="w-2.5 h-[1.5px]"
                style={{ backgroundColor: themeConfig.goldColor }}
              />
              <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-montserrat">
                {isJa ? 'アトリエの建築哲学・企業概要' : 'Philosophy & Corporate Profile'}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white font-shippori">
              {isJa ? '「株式会社ゼニス」が創る空間芸術' : 'The Spatial Artistry of ZENITH'}
            </h2>
          </div>
          <div className="mt-4 md:mt-0 max-w-md">
            <p className="text-xs sm:text-sm text-stone-400 font-montserrat leading-relaxed">
              {isJa
                ? '建築設計・デザイン・インテリア・解体工事まで。確かな技術力と洗練された美意識で、都市と人に調和する空間を創出します。'
                : 'Pioneering integrated architecture, spatial design, luxury interiors, and structural demolition in Tokyo.'}
            </p>
          </div>
        </div>

        {/* 4 Pillars of Operation (From Business Card) */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-[0.3em] text-[#C5A059] font-montserrat block mb-2">
              Core Business Scope
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-shippori text-white">
              {isJa ? '名刺に刻まれた4つの事業領域' : 'Four Pillars of Our Studio'}
            </h3>
            <div className="flex items-center justify-center gap-2 mt-3 opacity-75">
              <div className="h-[0.5px] w-12 bg-[#C5A059]" />
              <div className="w-1.5 h-1.5 rotate-45 bg-[#C5A059]" />
              <div className="h-[0.5px] w-12 bg-[#C5A059]" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((svc, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#22252B] border border-stone-700/60 hover:border-[#C5A059]/60 transition-all duration-300 group hover:-translate-y-1 shadow-xl relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C5A059]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="text-xs font-mono font-bold tracking-widest px-2.5 py-1 rounded bg-[#1A1C20] border border-stone-700/80 text-[#C5A059]"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    0{idx + 1}
                  </span>
                  <span
                    className="text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-stone-400 group-hover:text-white transition-colors"
                    style={{ fontFamily: "'Cinzel', 'Montserrat', sans-serif" }}
                  >
                    {svc.code}
                  </span>
                </div>
                <h4 className="text-lg font-bold font-shippori text-white mb-2 group-hover:text-[#C5A059] transition-colors">
                  {isJa ? svc.titleJa : svc.titleEn}
                </h4>
                <p className="text-xs text-stone-300 font-montserrat leading-relaxed">
                  {isJa ? svc.descJa : svc.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 2-Column: Left Leadership Profile (Lee Woonhak & Takahashi Sunju), Right Core Philosophy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
          {/* Representative Directors Card */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-8 rounded-2xl bg-[#22252B] border border-stone-700/60 shadow-2xl relative">
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-stone-700/70">
                <div>
                  <span className="text-xs text-[#C5A059] font-montserrat uppercase tracking-widest block mb-1">
                    Corporate Leadership
                  </span>
                  <h3 className="text-2xl font-bold font-shippori text-white">
                    {isJa ? '代表取締役のご紹介' : 'Representative Directors'}
                  </h3>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded flex items-center justify-center border shrink-0 shadow-md"
                    style={{
                      backgroundColor: themeConfig.accentColor,
                      borderColor: themeConfig.goldColor
                    }}
                  >
                    <span className="font-garamond text-lg font-bold text-white">Z</span>
                  </div>
                  <div className="text-left">
                    <span className="font-montserrat tracking-[0.2em] text-xs sm:text-sm font-bold text-white block uppercase">
                      ZENITH TOKYO
                    </span>
                    <span className="text-[10px] tracking-[0.15em] text-[#C5A059] block font-shippori">
                      {isJa ? '株式会社ゼニス' : 'ZENITH Co., Ltd.'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Directors List */}
              <div className="space-y-6">
                {companyInfo.directors.map((dir, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-xl bg-[#1A1C20] border border-stone-700/70 hover:border-stone-600 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
                      <div className="flex items-baseline gap-2.5">
                        <span className="text-xs font-montserrat text-[#C5A059] uppercase tracking-wider font-semibold">
                          {dir.roleJa}
                        </span>
                        <span
                          className="text-xl font-bold font-shippori text-white"
                          style={{ fontFamily: "'Shippori Mincho', serif" }}
                        >
                          {dir.nameJa}
                        </span>
                      </div>
                      <div className="text-xs font-montserrat text-stone-400">
                        {dir.nameEn} {dir.nameKana ? `(${dir.nameKana})` : ''}
                      </div>
                    </div>

                    <p className="text-xs text-stone-300 font-montserrat leading-relaxed mb-3">
                      {isJa ? dir.bioJa : dir.bioEn}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-xs font-mono pt-2 border-t border-stone-800/60">
                      <a
                        href={`tel:${dir.phone}`}
                        className="flex items-center gap-1.5 text-stone-300 hover:text-[#C5A059] transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
                        <span>{dir.phone}</span>
                      </a>
                      <a
                        href={`mailto:${dir.email}`}
                        className="flex items-center gap-1.5 text-stone-300 hover:text-[#C5A059] transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5 text-[#C5A059]" />
                        <span>{dir.email}</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 rounded-xl bg-[#1A1C20] border border-stone-700/70">
                <div className="text-xs font-shippori text-stone-300 italic leading-relaxed">
                  {isJa
                    ? '「設計と解体、意匠と構造のすべてを貫くクラフトマンシップ。お客様の想いを最高の空間として具現化します。」'
                    : '"Unifying master design, demolition, and exquisite craftsmanship to bring exceptional spaces into timeless reality."'}
                </div>
                <div className="mt-2 text-right text-xs font-montserrat text-[#C5A059]">
                  — 株式会社ゼニス 代表取締役 李 雲鶴 / 高橋 承柱
                </div>
              </div>
            </div>
          </div>

          {/* Core Philosophy Triad */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#C5A059] font-montserrat block mb-2">
                Spatial Principles
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-shippori text-white leading-tight">
                {isJa ? '三つの空間設計理念' : 'The Three Principles of Our Craft'}
              </h3>
            </div>

            <div className="space-y-4">
              {philosophies.map((phil, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-xl bg-[#22252B] border border-stone-700/60 hover:border-stone-600 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold text-white border"
                      style={{
                        backgroundColor: themeConfig.accentColor,
                        borderColor: themeConfig.goldColor
                      }}
                    >
                      0{idx + 1}
                    </span>
                    <h4 className="text-base sm:text-lg font-bold font-shippori text-white group-hover:text-[#C5A059] transition-colors">
                      {isJa ? phil.titleJa : phil.titleEn}
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-400 font-montserrat leading-relaxed pl-9">
                    {isJa ? phil.descJa : phil.descEn}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Compass className="w-5 h-5 text-[#C5A059]" />
                <span className="text-xs text-stone-400 font-montserrat">
                  {isJa ? '完全オーダーメイド設計・年間着工棟数限定' : 'Strictly Limited Annual Commissions'}
                </span>
              </div>
              <button
                id="about-view-portfolio-btn"
                onClick={onNavigateToPortfolio}
                className="text-xs text-[#C5A059] hover:text-white font-montserrat tracking-wider uppercase flex items-center gap-1 transition-colors"
              >
                <span>{isJa ? '設計実績を見る' : 'View Portfolio'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* ARCHITECTURAL DRAWING STUDIO SECTION (Architectural Blueprints & Sketches) */}
        <div className="pt-16 pb-12 border-t border-stone-800">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A3026] border border-[#C5A059]/40 text-xs font-montserrat text-[#C5A059] mb-3">
              <PenTool className="w-3 h-3" />
              <span>{isJa ? '建築ドローイング＆図面アーカイブ' : 'Architectural Drawings & Blueprints'}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold font-shippori text-white">
              {isJa ? '空間を紡ぐ建築図面・スケッチ' : 'The Architectural Drawing Studio'}
            </h3>
            <p className="text-xs sm:text-sm text-stone-400 font-montserrat mt-2">
              {isJa
                ? '3D透視図、立面展開図、納まり断面図、軸測投影図（アクソノメトリック）。緻密な構造計算と美意識が交差する設計ドローイングの全貌。'
                : 'Interactive architectural drafting viewport featuring 3D perspective wireframes, south facade elevations, structural joinery cross-sections, and spatial axonometry.'}
            </p>
          </div>

          <ArchitecturalDrawingStudio lang={lang} themeConfig={themeConfig} />
        </div>

        {/* Studio Timeline / History Infographic */}
        <div className="pt-16 border-t border-stone-800">
          <div className="mb-10">
            <span className="text-xs uppercase tracking-widest text-[#C5A059] font-montserrat block mb-1">
              Corporate Trajectory
            </span>
            <h3 className="text-2xl font-bold font-shippori text-white">
              {isJa ? 'アトリエの歩みと沿革' : 'Atelier Milestones & History'}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {milestones.map((m, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-7 rounded-2xl bg-[#22252B] border border-stone-700/60 relative hover:border-[#C5A059]/60 transition-all shadow-xl group overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C5A059]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center justify-between mb-3">
                  <div
                    className="text-2xl sm:text-3xl font-bold font-mono tracking-tight"
                    style={{ color: themeConfig.goldColor }}
                  >
                    {m.year}
                  </div>
                  <span className="text-[10px] uppercase font-montserrat tracking-[0.2em] px-2.5 py-1 rounded bg-[#1A1C20] text-stone-400 border border-stone-700/70">
                    {idx === 0 ? (isJa ? 'アトリエ拡充' : 'Expansion') : (isJa ? '空間芸術の新章' : 'Masterwork Era')}
                  </span>
                </div>
                <p className="text-sm sm:text-base text-stone-200 font-shippori leading-relaxed font-medium">
                  {isJa ? m.titleJa : m.titleEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
