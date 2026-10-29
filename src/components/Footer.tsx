import React from 'react';
import { ArrowUp, MessageSquare } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';
import { Language, PageSection, ThemeConfig } from '../types';

interface FooterProps {
  lang: Language;
  themeConfig: ThemeConfig;
  onNavigate: (section: PageSection) => void;
  onOpenLineModal: () => void;
  onOpenCustomizer: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  lang,
  themeConfig,
  onNavigate,
  onOpenLineModal,
  onOpenCustomizer
}) => {
  const { companyInfo } = useSiteData();
  const isJa = lang === 'ja';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="main-footer"
      className="relative text-[#E5E5E5] border-t border-stone-800 pt-20 pb-12 overflow-hidden"
      style={{
        backgroundColor: themeConfig.accentColor // Deep Forest Green (#1A3026)
      }}
    >
      {/* Subtle Dark Nature Overlay to ensure perfect contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-white/15">
          {/* Brand Col (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            <button
              id="footer-brand-logo-btn"
              onClick={() => onNavigate('home')}
              className="flex items-center gap-3 text-left group"
            >
              <div
                className="w-9 h-9 rounded flex items-center justify-center border transition-all duration-300 group-hover:scale-105 shrink-0"
                style={{
                  backgroundColor: themeConfig.accentColor,
                  borderColor: themeConfig.goldColor
                }}
              >
                <span className="font-garamond text-lg font-bold text-white">Z</span>
              </div>
              <div>
                <span className="font-montserrat tracking-[0.25em] text-sm sm:text-base font-bold text-white block uppercase">
                  ZENITH TOKYO
                </span>
                <span className="text-[10px] tracking-[0.2em] text-[#C5A059] block font-shippori">
                  {isJa ? '空間芸術の頂点' : 'Architectural Atelier'}
                </span>
              </div>
            </button>

            {/* 4 Pillars from Business Card */}
            <div className="flex items-center gap-2 text-[11px] font-montserrat uppercase tracking-[0.18em] text-stone-300">
              <span>ARCHITECTURE</span>
              <span className="text-[#C5A059]">|</span>
              <span>DESIGN</span>
              <span className="text-[#C5A059]">|</span>
              <span>INTERIOR</span>
              <span className="text-[#C5A059]">|</span>
              <span>DEMOLITION</span>
            </div>

            <p className="text-xs sm:text-sm text-stone-200/90 font-montserrat leading-relaxed max-w-md">
              {isJa
                ? '建築設計・デザイン監理・特注高級インテリア・解体工事まで一貫して手がける総合空間スタジオ。都市の洗練と深遠なる自然の美意識を融合します。'
                : 'A multidisciplinary architecture and interior atelier championing "Luxury & Dark Nature." Merging Tokyo modernity with Japanese elemental stillness across private residences and flagship retail.'}
            </p>

            <div className="text-[11px] text-stone-300/80 font-mono space-y-1">
              <div>{companyInfo.license}</div>
              <div>{companyInfo.corporateNameJa} / {companyInfo.corporateNameEn}</div>
            </div>
          </div>

          {/* Quick Sitemap (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="text-xs uppercase tracking-widest text-[#C5A059] font-montserrat font-semibold">
              {isJa ? 'サイトマップ' : 'Navigation'}
            </div>
            <ul className="space-y-2.5 text-xs font-montserrat">
              <li>
                <button
                  id="footer-nav-home"
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#C5A059] transition-colors text-stone-200"
                >
                  {isJa ? 'ホーム (Main Home)' : 'Home'}
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-about"
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#C5A059] transition-colors text-stone-200"
                >
                  {isJa ? '建築理念・代表挨拶 (About Philosophy)' : 'About Studio'}
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-portfolio"
                  onClick={() => onNavigate('portfolio')}
                  className="hover:text-[#C5A059] transition-colors text-stone-200"
                >
                  {isJa ? '設計実績作品 (Portfolio Works)' : 'Selected Portfolio'}
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-process"
                  onClick={() => onNavigate('process')}
                  className="hover:text-[#C5A059] transition-colors text-stone-200"
                >
                  {isJa ? '設計・施工フロー (Process)' : 'Architectural Process'}
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-journal"
                  onClick={() => onNavigate('journal')}
                  className="hover:text-[#C5A059] transition-colors text-stone-200"
                >
                  {isJa ? 'ジャーナル・建築論考 (Journal & News)' : 'Journal & Essays'}
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-contact"
                  onClick={() => onNavigate('contact')}
                  className="hover:text-[#C5A059] transition-colors text-stone-200"
                >
                  {isJa ? 'お問い合わせ・面談予約 (Contact)' : 'Inquiries & Atelier'}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Studio Locations (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="text-xs uppercase tracking-widest text-[#C5A059] font-montserrat font-semibold">
              {isJa ? 'アトリエ所在地' : 'Studio Locations'}
            </div>
            <div className="text-xs text-stone-200/90 font-montserrat space-y-2 leading-relaxed">
              <div>
                <strong className="text-white block font-medium">
                  {isJa ? '東京 新宿旗艦アトリエ' : 'Tokyo Shinjuku Flagship Atelier'}
                </strong>
                <span>{isJa ? companyInfo.addressJa : companyInfo.addressEn}</span>
                <span className="text-[11px] text-stone-300 block mt-0.5">
                  {isJa ? companyInfo.accessJa : companyInfo.accessEn}
                </span>
              </div>
              <div className="pt-1">
                <strong className="text-white block font-medium">
                  {isJa ? '軽井沢 フォレストスタジオ' : 'Karuizawa Forest Studio'}
                </strong>
                <span>長野県北佐久郡軽井沢町大字長倉</span>
              </div>
              <div className="pt-2 text-stone-300 font-mono text-[11px]">
                TEL: {companyInfo.phone} / EMAIL: {companyInfo.email}
              </div>
            </div>

            {/* Social Icons & Controls */}
            <div className="pt-2 flex items-center gap-3">
              <a
                id="footer-insta-btn"
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/80 border border-white/20 flex items-center justify-center text-stone-200 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>

              <button
                id="footer-line-btn"
                onClick={onOpenLineModal}
                className="w-8 h-8 rounded-full bg-[#06C755] hover:brightness-110 flex items-center justify-center text-white shadow transition-transform hover:scale-105"
                aria-label="LINE Consultation"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
              </button>

              <button
                id="footer-cms-theme-btn"
                onClick={onOpenCustomizer}
                className="text-[11px] px-3 py-1 rounded bg-black/40 hover:bg-black/70 border border-white/20 text-[#C5A059] font-montserrat tracking-wider transition-colors ml-2"
              >
                {isJa ? '🎨 CMSスタイル設定' : '🎨 CMS Theme Engine'}
              </button>
            </div>
          </div>
        </div>

        {/* Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:row items-center justify-between gap-4 text-xs text-stone-300 font-montserrat">
          <div className="flex items-center gap-4">
            <span>© {new Date().getFullYear()} ZENITH TOKYO Inc. All rights reserved.</span>
            <span className="hidden sm:inline text-white/30">•</span>
            <span className="hidden sm:inline">zenith-tokyo.com</span>
          </div>

          <button
            id="back-to-top-btn"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-black/40 hover:bg-black/70 border border-white/20 text-stone-200 hover:text-white transition-colors text-xs font-montserrat"
          >
            <span>{isJa ? 'ページ先頭へ' : 'Back to Top'}</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#C5A059]" />
          </button>
        </div>
      </div>
    </footer>
  );
};
