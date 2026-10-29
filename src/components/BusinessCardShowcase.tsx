import React, { useState } from 'react';
import { Phone, Mail, MapPin, Copy, Check, RefreshCw, Download } from 'lucide-react';
import { ZenithLogo } from './ZenithLogo';
import { useSiteData } from '../context/SiteDataContext';
import { COMPANY_INFO } from '../data/mockData';
import { Language, ThemeConfig } from '../types';

interface BusinessCardShowcaseProps {
  lang: Language;
  themeConfig?: ThemeConfig;
}

export const BusinessCardShowcase: React.FC<BusinessCardShowcaseProps> = ({
  lang
}) => {
  const { companyInfo } = useSiteData();
  const isJa = lang === 'ja';
  const [activeDirectorIdx, setActiveDirectorIdx] = useState<number>(0);
  const [cardTheme, setCardTheme] = useState<'ivory' | 'dark'>('ivory');
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const directors = companyInfo?.directors?.length ? companyInfo.directors : COMPANY_INFO.directors;
  const currentDirector = directors[activeDirectorIdx] || directors[0];

  const handleCopy = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="w-full">
      {/* Controls Bar: Select Director & Card Color Scheme */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 p-4 rounded-2xl bg-[#141414] border border-stone-800">
        {/* Director Switcher */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-montserrat uppercase tracking-wider text-stone-400 mr-1">
            {isJa ? '名刺選択:' : 'Select Card:'}
          </span>
          {directors.map((d, idx) => (
            <button
              key={idx}
              id={`card-select-director-${idx}`}
              onClick={() => {
                setActiveDirectorIdx(idx);
                setIsFlipped(false);
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-shippori font-medium transition-all ${
                activeDirectorIdx === idx
                  ? 'bg-[#C5A059] text-black font-semibold shadow-lg scale-105'
                  : 'bg-stone-900 text-stone-300 hover:bg-stone-800 hover:text-white border border-stone-800'
              }`}
            >
              {isJa ? `${d.roleJa} ${d.nameJa}` : `${d.nameEn} (${d.roleEn.split('&')[0]})`}
            </button>
          ))}
        </div>

        {/* Card Style & Flip Controls */}
        <div className="flex items-center gap-2.5">
          {/* Ivory / Dark Theme Toggle */}
          <div className="flex items-center bg-stone-900 p-1 rounded-lg border border-stone-800">
            <button
              id="card-theme-ivory-btn"
              onClick={() => setCardTheme('ivory')}
              className={`px-3 py-1 text-xs rounded-md font-montserrat transition-all ${
                cardTheme === 'ivory'
                  ? 'bg-[#F6F4EE] text-[#13221C] font-semibold shadow'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              {isJa ? 'アイボリー版' : 'Linen Ivory'}
            </button>
            <button
              id="card-theme-dark-btn"
              onClick={() => setCardTheme('dark')}
              className={`px-3 py-1 text-xs rounded-md font-montserrat transition-all ${
                cardTheme === 'dark'
                  ? 'bg-[#102019] text-[#C5A059] font-semibold border border-[#C5A059]/40 shadow'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              {isJa ? '深緑・墨黒版' : 'Atelier Dark'}
            </button>
          </div>

          {/* Flip Card Button */}
          <button
            id="card-flip-toggle-btn"
            onClick={() => setIsFlipped(!isFlipped)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-montserrat bg-stone-800 hover:bg-stone-700 text-[#C5A059] border border-stone-700 transition-all"
            title="Flip Card"
          >
            <RefreshCw className={`w-3.5 h-3.5 transition-transform duration-500 ${isFlipped ? 'rotate-180' : ''}`} />
            <span>{isFlipped ? (isJa ? '表面を見る' : 'Front View') : (isJa ? '裏面を見る' : 'Back View')}</span>
          </button>
        </div>
      </div>

      {/* The Interactive Business Card Surface */}
      <div className="relative max-w-4xl mx-auto perspective-1000">
        <div
          className={`w-full rounded-2xl p-6 sm:p-10 shadow-2xl transition-all duration-700 border ${
            cardTheme === 'ivory'
              ? 'bg-[#F7F5F0] text-[#1C1917] border-[#E7E2D8] shadow-amber-950/10'
              : 'bg-[#101C16] text-[#EAE8E1] border-[#1E3A2E] shadow-black/80'
          }`}
          style={{
            backgroundImage:
              cardTheme === 'ivory'
                ? 'radial-gradient(circle at 10% 20%, rgba(245, 240, 230, 0.9), rgba(247, 245, 240, 1))'
                : 'radial-gradient(circle at 10% 20%, rgba(20, 38, 30, 0.9), rgba(16, 28, 22, 1))'
          }}
        >
          {/* CARD FRONT VIEW */}
          {!isFlipped ? (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center min-h-[360px]">
              {/* Left Column: Logo, Brand Name & 4 Pillars */}
              <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left justify-center pr-0 md:pr-4">
                {/* Z Monogram */}
                <div className="mb-3">
                  <ZenithLogo
                    variant="mark"
                    size="lg"
                    theme={cardTheme === 'ivory' ? 'dark' : 'gold'}
                  />
                </div>

                {/* Z E N I T H */}
                <div
                  className={`text-2xl sm:text-3xl font-serif font-normal tracking-[0.42em] pl-[0.42em] leading-tight uppercase ${
                    cardTheme === 'ivory' ? 'text-[#13221C]' : 'text-white'
                  }`}
                  style={{ fontFamily: "'Cinzel', 'Cormorant Garamond', serif" }}
                >
                  ZENITH
                </div>

                {/* 株式会社ゼニス */}
                <div
                  className={`text-xs tracking-[0.3em] pl-[0.3em] mt-2 font-normal ${
                    cardTheme === 'ivory' ? 'text-[#786448]' : 'text-[#C5A059]'
                  }`}
                  style={{ fontFamily: "'Shippori Mincho', 'Noto Serif JP', serif" }}
                >
                  株 式 会 社 ゼ ニ ス
                </div>

                {/* Diamond Line */}
                <div className="flex items-center gap-2 my-4 w-36 max-w-full">
                  <div className={`h-[0.75px] flex-1 ${cardTheme === 'ivory' ? 'bg-[#786448]/40' : 'bg-[#C5A059]/60'}`} />
                  <div className={`w-1.5 h-1.5 rotate-45 ${cardTheme === 'ivory' ? 'bg-[#786448]' : 'bg-[#C5A059]'}`} />
                  <div className={`h-[0.75px] flex-1 ${cardTheme === 'ivory' ? 'bg-[#786448]/40' : 'bg-[#C5A059]/60'}`} />
                </div>

                {/* 4 Pillars of Architecture */}
                <div
                  className={`text-[10px] sm:text-[11px] font-sans font-medium tracking-[0.18em] leading-relaxed uppercase ${
                    cardTheme === 'ivory' ? 'text-[#4A453E]' : 'text-stone-300'
                  }`}
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  <div className="flex items-center gap-1.5">
                    <span>ARCHITECTURE</span>
                    <span className="text-[#C5A059]">|</span>
                    <span>DESIGN</span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span>INTERIOR</span>
                    <span className="text-[#C5A059]">|</span>
                    <span>DEMOLITION</span>
                  </div>
                </div>
              </div>

              {/* Center Column: Architectural Wireframe Skyscraper Sketch with Vertical Framing */}
              <div className="md:col-span-4 flex items-center justify-center py-2 px-2 border-y md:border-y-0 md:border-x border-[#C5A059]/30 relative overflow-hidden">
                <div className="relative w-full max-w-[200px] aspect-[4/7] flex items-center justify-center">
                  {/* Fine-line Architectural Drawing SVG */}
                  <svg
                    viewBox="0 0 200 320"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full opacity-90 transition-transform duration-500 hover:scale-105"
                  >
                    {/* Perspective grid guidelines */}
                    <path
                      d="M 100 10 L 20 280 M 100 10 L 180 280 M 100 10 L 100 310"
                      stroke={cardTheme === 'ivory' ? '#9E8E76' : '#C5A059'}
                      strokeWidth="0.5"
                      strokeDasharray="2 2"
                      opacity="0.5"
                    />

                    {/* Skyscraper Wireframe Structure */}
                    <polygon
                      points="100,20 160,50 160,260 100,290"
                      fill={cardTheme === 'ivory' ? '#EAE5DB' : '#142E22'}
                      stroke={cardTheme === 'ivory' ? '#1C1917' : '#C5A059'}
                      strokeWidth="1.2"
                    />
                    <polygon
                      points="100,20 40,50 40,260 100,290"
                      fill={cardTheme === 'ivory' ? '#F2EDE4' : '#19392B'}
                      stroke={cardTheme === 'ivory' ? '#1C1917' : '#C5A059'}
                      strokeWidth="1.2"
                    />

                    {/* Horizontal Floor Slabs (Levels) */}
                    {[40, 65, 90, 115, 140, 165, 190, 215, 240, 265].map((y, i) => (
                      <g key={i}>
                        <line
                          x1="40"
                          y1={y + 10}
                          x2="100"
                          y2={y + 25}
                          stroke={cardTheme === 'ivory' ? '#333' : '#C5A059'}
                          strokeWidth="0.75"
                        />
                        <line
                          x1="100"
                          y1={y + 25}
                          x2="160"
                          y2={y + 10}
                          stroke={cardTheme === 'ivory' ? '#333' : '#C5A059'}
                          strokeWidth="0.75"
                        />
                      </g>
                    ))}

                    {/* Vertical Facade Mullions */}
                    <line x1="60" y1="40" x2="60" y2="270" stroke={cardTheme === 'ivory' ? '#666' : '#E2C785'} strokeWidth="0.5" />
                    <line x1="80" y1="30" x2="80" y2="280" stroke={cardTheme === 'ivory' ? '#666' : '#E2C785'} strokeWidth="0.5" />
                    <line x1="120" y1="30" x2="120" y2="280" stroke={cardTheme === 'ivory' ? '#666' : '#E2C785'} strokeWidth="0.5" />
                    <line x1="140" y1="40" x2="140" y2="270" stroke={cardTheme === 'ivory' ? '#666' : '#E2C785'} strokeWidth="0.5" />

                    {/* Cross-bracing / Stencil Lines */}
                    <line x1="40" y1="60" x2="100" y2="100" stroke={cardTheme === 'ivory' ? '#888' : '#8CA899'} strokeWidth="0.4" strokeDasharray="1 1" />
                    <line x1="100" y1="100" x2="160" y2="60" stroke={cardTheme === 'ivory' ? '#888' : '#8CA899'} strokeWidth="0.4" strokeDasharray="1 1" />
                    <line x1="40" y1="180" x2="100" y2="220" stroke={cardTheme === 'ivory' ? '#888' : '#8CA899'} strokeWidth="0.4" strokeDasharray="1 1" />
                    <line x1="100" y1="220" x2="160" y2="180" stroke={cardTheme === 'ivory' ? '#888' : '#8CA899'} strokeWidth="0.4" strokeDasharray="1 1" />

                    {/* Ground Reflection & Crosshatch Base */}
                    <ellipse cx="100" cy="295" rx="80" ry="12" fill={cardTheme === 'ivory' ? '#DFD8CC' : '#0B1611'} opacity="0.6" />
                    <path
                      d="M 20 295 L 180 295 M 30 302 L 170 302 M 45 308 L 155 308"
                      stroke={cardTheme === 'ivory' ? '#9E8E76' : '#C5A059'}
                      strokeWidth="0.6"
                    />
                  </svg>
                </div>
              </div>

              {/* Right Column: Representative Director Name, Title & Direct Contact Details */}
              <div className="md:col-span-4 flex flex-col justify-center pl-0 md:pl-4 space-y-4 text-left">
                <div>
                  <div
                    className={`text-[11px] font-sans uppercase tracking-[0.2em] mb-1 font-medium ${
                      cardTheme === 'ivory' ? 'text-[#786448]' : 'text-[#C5A059]'
                    }`}
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {currentDirector.roleJa}
                  </div>
                  <div
                    className={`text-2xl sm:text-3xl font-bold font-serif tracking-widest ${
                      cardTheme === 'ivory' ? 'text-[#13221C]' : 'text-white'
                    }`}
                    style={{ fontFamily: "'Shippori Mincho', 'Noto Serif JP', serif" }}
                  >
                    {currentDirector.nameJa}
                  </div>
                  <div
                    className={`text-xs font-sans tracking-[0.25em] uppercase font-semibold mt-1 ${
                      cardTheme === 'ivory' ? 'text-[#4A453E]' : 'text-stone-300'
                    }`}
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {currentDirector.nameEn}
                  </div>
                  <div
                    className={`text-[11px] font-serif tracking-[0.2em] mt-0.5 ${
                      cardTheme === 'ivory' ? 'text-[#786448]' : 'text-stone-400'
                    }`}
                    style={{ fontFamily: "'Shippori Mincho', serif" }}
                  >
                    {currentDirector.nameKana}
                  </div>
                </div>

                {/* Diamond Line */}
                <div className="flex items-center gap-2 w-28 opacity-75">
                  <div className={`h-[0.75px] flex-1 ${cardTheme === 'ivory' ? 'bg-[#786448]' : 'bg-[#C5A059]'}`} />
                  <div className={`w-1.5 h-1.5 rotate-45 ${cardTheme === 'ivory' ? 'bg-[#786448]' : 'bg-[#C5A059]'}`} />
                  <div className={`h-[0.75px] flex-1 ${cardTheme === 'ivory' ? 'bg-[#786448]' : 'bg-[#C5A059]'}`} />
                </div>

                {/* Contact List */}
                <div className="space-y-2.5 text-xs">
                  {/* Phone */}
                  <div className="flex items-center gap-2.5 group">
                    <Phone className={`w-3.5 h-3.5 flex-shrink-0 ${cardTheme === 'ivory' ? 'text-[#13221C]' : 'text-[#C5A059]'}`} />
                    <a
                      href={`tel:${currentDirector.phone}`}
                      className={`font-mono font-medium hover:underline tracking-wider ${
                        cardTheme === 'ivory' ? 'text-[#13221C]' : 'text-white'
                      }`}
                    >
                      {currentDirector.phone}
                    </a>
                    <button
                      onClick={() => handleCopy(currentDirector.phone, 'phone')}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-stone-400 hover:text-amber-500"
                      title="Copy Phone"
                    >
                      {copiedField === 'phone' ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>

                  {/* Address */}
                  <div className="flex items-start gap-2.5">
                    <MapPin className={`w-3.5 h-3.5 flex-shrink-0 mt-0.5 ${cardTheme === 'ivory' ? 'text-[#13221C]' : 'text-[#C5A059]'}`} />
                    <div
                      className={`text-[11px] leading-relaxed ${
                        cardTheme === 'ivory' ? 'text-[#3E3A33]' : 'text-stone-300'
                      }`}
                      style={{ fontFamily: "'Shippori Mincho', sans-serif" }}
                    >
                      <div>〒160-0021</div>
                      <div>東京都新宿区歌舞伎町2丁目4-3</div>
                      <div>ノア新宿2号館 754室</div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-center gap-2.5 group pt-0.5">
                    <Mail className={`w-3.5 h-3.5 flex-shrink-0 ${cardTheme === 'ivory' ? 'text-[#13221C]' : 'text-[#C5A059]'}`} />
                    <a
                      href={`mailto:${currentDirector.email}`}
                      className={`font-mono text-[11px] hover:underline ${
                        cardTheme === 'ivory' ? 'text-[#13221C]' : 'text-white'
                      }`}
                    >
                      {currentDirector.email}
                    </a>
                    <button
                      onClick={() => handleCopy(currentDirector.email, 'email')}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-stone-400 hover:text-amber-500"
                      title="Copy Email"
                    >
                      {copiedField === 'email' ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* CARD BACK VIEW: Architectural Panorama & Minimalist Zenith Monogram */
            <div className="flex flex-col items-center justify-between min-h-[360px] py-4 text-center">
              {/* Centered Monogram & Title */}
              <div className="flex flex-col items-center">
                <ZenithLogo
                  variant="mark"
                  size="lg"
                  theme={cardTheme === 'ivory' ? 'dark' : 'gold'}
                />
                <div
                  className={`text-2xl sm:text-3xl font-serif font-normal tracking-[0.45em] pl-[0.45em] mt-3 uppercase ${
                    cardTheme === 'ivory' ? 'text-[#13221C]' : 'text-white'
                  }`}
                  style={{ fontFamily: "'Cinzel', 'Cormorant Garamond', serif" }}
                >
                  ZENITH
                </div>
                <div
                  className={`text-xs tracking-[0.35em] pl-[0.35em] mt-1.5 font-normal ${
                    cardTheme === 'ivory' ? 'text-[#786448]' : 'text-[#C5A059]'
                  }`}
                  style={{ fontFamily: "'Shippori Mincho', 'Noto Serif JP', serif" }}
                >
                  株 式 会 社 ゼ ニ ス
                </div>
              </div>

              {/* Panoramic Skyline & Architectural Pavilion Drawing */}
              <div className="w-full max-w-2xl px-4 mt-6">
                <svg
                  viewBox="0 0 800 240"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-auto opacity-85"
                >
                  {/* Horizon Lines */}
                  <line x1="0" y1="200" x2="800" y2="200" stroke={cardTheme === 'ivory' ? '#9E8E76' : '#C5A059'} strokeWidth="1" />
                  <line x1="0" y1="210" x2="800" y2="210" stroke={cardTheme === 'ivory' ? '#9E8E76' : '#C5A059'} strokeWidth="0.5" strokeDasharray="4 4" />

                  {/* Left Pavilion Block */}
                  <polygon
                    points="80,140 160,110 160,200 80,200"
                    fill={cardTheme === 'ivory' ? '#EDE7DC' : '#142820'}
                    stroke={cardTheme === 'ivory' ? '#1C1917' : '#C5A059'}
                    strokeWidth="1.2"
                  />
                  {/* Left Window Grids */}
                  <line x1="100" y1="132" x2="100" y2="200" stroke={cardTheme === 'ivory' ? '#333' : '#E2C785'} strokeWidth="0.6" />
                  <line x1="120" y1="125" x2="120" y2="200" stroke={cardTheme === 'ivory' ? '#333' : '#E2C785'} strokeWidth="0.6" />
                  <line x1="140" y1="117" x2="140" y2="200" stroke={cardTheme === 'ivory' ? '#333' : '#E2C785'} strokeWidth="0.6" />

                  {/* Center High-Rise Tower Complex */}
                  <polygon
                    points="280,60 380,40 380,200 280,200"
                    fill={cardTheme === 'ivory' ? '#F4EEE4' : '#183328'}
                    stroke={cardTheme === 'ivory' ? '#1C1917' : '#C5A059'}
                    strokeWidth="1.4"
                  />
                  <polygon
                    points="380,40 460,70 460,200 380,200"
                    fill={cardTheme === 'ivory' ? '#EAE3D6' : '#132A21'}
                    stroke={cardTheme === 'ivory' ? '#1C1917' : '#C5A059'}
                    strokeWidth="1.4"
                  />
                  {/* High rise vertical lines */}
                  {[300, 320, 340, 360].map((x) => (
                    <line key={x} x1={x} y1="56" x2={x} y2="200" stroke={cardTheme === 'ivory' ? '#555' : '#C5A059'} strokeWidth="0.6" />
                  ))}
                  {[400, 420, 440].map((x) => (
                    <line key={x} x1={x} y1="50" x2={x} y2="200" stroke={cardTheme === 'ivory' ? '#555' : '#C5A059'} strokeWidth="0.6" />
                  ))}

                  {/* Right Cantilevered Modernist Gallery */}
                  <polygon
                    points="540,110 700,60 700,200 540,200"
                    fill={cardTheme === 'ivory' ? '#F7F2E8' : '#1A382C'}
                    stroke={cardTheme === 'ivory' ? '#1C1917' : '#C5A059'}
                    strokeWidth="1.2"
                  />
                  <polygon
                    points="460,130 540,110 540,200 460,200"
                    fill={cardTheme === 'ivory' ? '#E5DDCF' : '#11241C'}
                    stroke={cardTheme === 'ivory' ? '#1C1917' : '#C5A059'}
                    strokeWidth="1"
                  />
                  {/* Right Structure Mullions */}
                  {[580, 620, 660].map((x) => (
                    <line key={x} x1={x} y1="95" x2={x} y2="200" stroke={cardTheme === 'ivory' ? '#444' : '#E2C785'} strokeWidth="0.75" />
                  ))}
                </svg>
              </div>

              <div
                className={`text-[10px] uppercase tracking-[0.3em] font-montserrat ${
                  cardTheme === 'ivory' ? 'text-[#786448]' : 'text-stone-400'
                }`}
              >
                ARCHITECTURE • DESIGN • INTERIOR • DEMOLITION
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Footer: Call, Email, and vCard Export */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <a
          href={`tel:${currentDirector.phone}`}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#C5A059] text-black font-semibold text-xs font-montserrat hover:bg-[#d6b470] transition-all shadow-lg hover:scale-105"
        >
          <Phone className="w-4 h-4" />
          <span>{isJa ? `${currentDirector.nameJa} 代表へ直通電話` : `Call ${currentDirector.nameEn}`}</span>
        </a>

        <a
          href={`mailto:${currentDirector.email}?subject=${encodeURIComponent(isJa ? '【株式会社ゼニス】建築・空間設計・解体のご相談' : '[ZENITH] Architectural Consultation Inquiry')}`}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-medium text-xs font-montserrat border border-stone-800 transition-all hover:scale-105"
        >
          <Mail className="w-4 h-4 text-[#C5A059]" />
          <span>{isJa ? 'メールで直接相談する' : 'Send Direct Email'}</span>
        </a>

        <button
          onClick={() => {
            const vCardData = `BEGIN:VCARD
VERSION:3.0
N:${currentDirector.nameJa};;;;
FN:${currentDirector.nameJa} (${currentDirector.nameEn})
ORG:株式会社ゼニス;ZENITH Co., Ltd.
TITLE:${currentDirector.roleJa} (${currentDirector.roleEn})
TEL;TYPE=CELL:${currentDirector.phone}
EMAIL:${currentDirector.email}
ADR;TYPE=WORK:;;ノア新宿2号館 754室;東京都新宿区歌舞伎町2丁目4-3;Tokyo;160-0021;Japan
URL:https://zenith-tokyo.com
END:VCARD`;
            const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `ZENITH_${currentDirector.nameEn.replace(' ', '_')}.vcf`;
            a.click();
            URL.revokeObjectURL(url);
          }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-[#C5A059] text-xs font-montserrat border border-stone-800 transition-all"
        >
          <Download className="w-3.5 h-3.5" />
          <span>{isJa ? '名刺連絡先 (vCard) 保存' : 'Save vCard'}</span>
        </button>
      </div>
    </div>
  );
};
