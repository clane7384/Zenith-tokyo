import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, MessageSquare, Palette, ChevronRight, ShieldCheck } from 'lucide-react';
import { Language, PageSection, ThemeConfig } from '../types';

interface NavbarProps {
  currentSection: PageSection;
  onNavigate: (section: PageSection) => void;
  lang: Language;
  onToggleLang: () => void;
  themeConfig: ThemeConfig;
  onOpenCustomizer: () => void;
  onOpenLineModal: () => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentSection,
  onNavigate,
  lang,
  onToggleLang,
  themeConfig,
  onOpenCustomizer,
  onOpenLineModal,
  onOpenAdmin
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { id: PageSection; labelJa: string; labelEn: string }[] = [
    { id: 'home', labelJa: 'ホーム', labelEn: 'Home' },
    { id: 'about', labelJa: '理念・建築家', labelEn: 'About' },
    { id: 'portfolio', labelJa: '設計実績', labelEn: 'Portfolio' },
    { id: 'process', labelJa: '設計フロー', labelEn: 'Process' },
    { id: 'journal', labelJa: 'ジャーナル', labelEn: 'Journal' },
    { id: 'contact', labelJa: 'お問い合わせ', labelEn: 'Contact' }
  ];

  const isJa = lang === 'ja';

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? 'bg-[#1A1C20]/95 backdrop-blur-md border-b border-stone-800/80 py-2.5 sm:py-3 shadow-2xl'
          : 'bg-gradient-to-b from-black/85 via-black/50 to-transparent py-3.5 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Brand Logo */}
          <button
            id="brand-logo-btn"
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2.5 sm:gap-3 text-left group shrink-0"
          >
            <div
              className="w-8 h-8 sm:w-9 sm:h-9 rounded flex items-center justify-center border transition-all duration-300 group-hover:scale-105 shrink-0 shadow-md"
              style={{
                backgroundColor: themeConfig.accentColor,
                borderColor: themeConfig.goldColor
              }}
            >
              <span className="font-garamond text-base sm:text-lg font-bold text-white">Z</span>
            </div>
            <div className="whitespace-nowrap">
              <span className="font-montserrat tracking-[0.2em] sm:tracking-[0.25em] text-xs sm:text-sm md:text-base font-bold text-white block uppercase leading-tight">
                ZENITH TOKYO
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.2em] text-[#C5A059] block font-shippori leading-tight">
                {isJa ? '空間芸術の頂点' : 'Architectural Atelier'}
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6 2xl:gap-8 shrink-0" aria-label="Main Navigation">
            {navItems.map((item) => {
              const active = currentSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => onNavigate(item.id)}
                  className={`text-[11px] xl:text-xs uppercase tracking-[0.15em] xl:tracking-[0.2em] font-montserrat transition-all relative py-1 whitespace-nowrap ${
                    active
                      ? 'text-[#C5A059] font-semibold'
                      : 'text-stone-300 hover:text-white'
                  }`}
                >
                  {isJa ? item.labelJa : item.labelEn}
                  {active && (
                    <span
                      className="absolute bottom-0 left-0 right-0 h-[1.5px] rounded-full transition-all"
                      style={{ backgroundColor: themeConfig.goldColor }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Desktop Right Actions: Lang Switcher, Style Engine, LINE quick contact */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-2.5 shrink-0">
            {/* Language Switcher */}
            <button
              id="lang-toggle-btn"
              onClick={onToggleLang}
              className="flex items-center gap-1.5 px-2.5 xl:px-3 py-1.5 rounded-full border border-stone-800 bg-[#141414] hover:border-stone-700 text-xs font-montserrat text-stone-300 hover:text-white transition-all whitespace-nowrap shrink-0"
              aria-label="Toggle language"
            >
              <Globe className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
              <span className="font-semibold text-[11px] whitespace-nowrap">{isJa ? 'EN' : '日本語'}</span>
            </button>

            {/* CMS Theme & Style Preset Toggle */}
            <button
              id="open-customizer-btn"
              onClick={onOpenCustomizer}
              className="p-1.5 xl:p-2 rounded-full border border-stone-800 bg-[#141414] hover:border-[#C5A059] text-stone-400 hover:text-[#C5A059] transition-all shrink-0"
              title={isJa ? 'スタイル設定・テーマ変更' : 'Customize Theme Style'}
              aria-label="Open style customizer"
            >
              <Palette className="w-3.5 h-3.5" />
            </button>

            {/* LINE Official Consultation CTA */}
            <button
              id="nav-line-consult-btn"
              onClick={onOpenLineModal}
              className="flex items-center gap-1.5 px-3 xl:px-3.5 py-1.5 rounded-full bg-[#06C755] hover:brightness-110 text-white text-[11px] xl:text-xs font-montserrat font-medium shadow-lg transition-transform hover:scale-105 whitespace-nowrap shrink-0"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-white shrink-0" />
              <span>LINE 相談</span>
            </button>

            {/* Direct Consultation Request CTA */}
            <button
              id="nav-consult-cta-btn"
              onClick={() => onNavigate('contact')}
              className="flex items-center gap-1 px-3 xl:px-4 py-1.5 rounded-full text-[11px] xl:text-xs font-montserrat tracking-wider font-semibold text-white border transition-all hover:brightness-110 shadow-lg whitespace-nowrap shrink-0"
              style={{
                backgroundColor: themeConfig.accentColor,
                borderColor: themeConfig.goldColor
              }}
            >
              <span>{isJa ? '設計相談' : 'Inquire'}</span>
              <ChevronRight className="w-3 h-3 text-[#C5A059] shrink-0" />
            </button>

            {/* Admin Management Access Button */}
            <button
              id="nav-admin-btn"
              onClick={onOpenAdmin}
              className="flex items-center gap-1 px-2.5 xl:px-3 py-1.5 rounded-full border border-[#C5A059]/60 bg-[#161616] hover:bg-[#C5A059] text-[#C5A059] hover:text-black text-[11px] xl:text-xs font-mono font-bold tracking-wider transition-all shadow-md whitespace-nowrap shrink-0 ml-0.5"
              title={isJa ? '管理者ログイン (パスワード: 7458)' : 'Admin Portal (Password: 7458)'}
              aria-label="Open admin management portal"
            >
              <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
              <span>ADMIN</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              id="mobile-admin-btn"
              onClick={onOpenAdmin}
              className="px-2 py-1 rounded border border-[#C5A059]/50 text-[#C5A059] bg-[#161616] text-[11px] font-mono font-bold flex items-center gap-1 whitespace-nowrap shrink-0"
              title="Admin"
              aria-label="Admin login"
            >
              <ShieldCheck className="w-3 h-3 shrink-0" />
              <span>ADMIN</span>
            </button>
            <button
              id="mobile-lang-btn"
              onClick={onToggleLang}
              className="px-2 py-1 rounded text-xs font-montserrat border border-stone-800 text-stone-300 whitespace-nowrap shrink-0"
            >
              {isJa ? 'EN' : 'JP'}
            </button>
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 sm:p-2 rounded border border-stone-800 text-stone-300 hover:text-white shrink-0"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#101010]/95 backdrop-blur-xl border-b border-stone-800 px-6 py-6 space-y-4 animate-in slide-in-from-top-4">
          <div className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left text-sm py-2 font-montserrat tracking-wider ${
                  currentSection === item.id
                    ? 'text-[#C5A059] font-bold'
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                {isJa ? item.labelJa : item.labelEn}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-stone-800 flex flex-col gap-3">
            <button
              onClick={() => {
                onOpenAdmin();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 rounded-lg border border-[#C5A059]/60 bg-[#181818] text-[#C5A059] text-xs font-mono font-bold flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{isJa ? '管理者管理画面 (ADMIN - PW: 7458)' : 'Admin Portal (PW: 7458)'}</span>
            </button>

            <button
              onClick={() => {
                onOpenLineModal();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 rounded-lg bg-[#06C755] text-white text-xs font-semibold flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{isJa ? 'LINE 公式無料相談' : 'LINE Consultation'}</span>
            </button>

            <button
              onClick={() => {
                onOpenCustomizer();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 rounded-lg border border-stone-700 bg-stone-900 text-stone-300 text-xs font-semibold flex items-center justify-center gap-2"
            >
              <Palette className="w-4 h-4 text-[#C5A059]" />
              <span>{isJa ? 'スタイル & テーマ設定' : 'Theme Settings'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
