import React from 'react';

interface ZenithLogoProps {
  variant?: 'mark' | 'full' | 'horizontal' | 'compact' | 'card';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  theme?: 'gold' | 'dark' | 'light' | 'white';
  showSubtitle?: boolean;
  className?: string;
  lang?: 'ja' | 'en';
}

/**
 * Official ZENITH Co., Ltd. (株式会社ゼニス) Logo Component
 * Replicated with architectural precision from the company's official business card:
 * - Geometric Double-Slash "Z" Monogram with Serifs
 * - Spaced "Z E N I T H" Display Serif Typography
 * - "株 式 会 社 ゼ ニ ス" / "ZENITH Co., Ltd." Corporate Subline
 * - Diamond divider "— ◆ —"
 * - Service pillars: ARCHITECTURE | DESIGN | INTERIOR | DEMOLITION
 */
export const ZenithLogo: React.FC<ZenithLogoProps> = ({
  variant = 'mark',
  size = 'md',
  theme = 'gold',
  showSubtitle = true,
  className = '',
  lang = 'ja'
}) => {
  // Theme color definitions
  const colors = {
    gold: {
      mark: '#C5A059',
      markAccent: '#E2C785',
      primaryText: '#FFFFFF',
      subText: '#C5A059',
      metaText: '#A3A3A3',
      divider: '#C5A059'
    },
    dark: {
      mark: '#11221B',
      markAccent: '#1B352B',
      primaryText: '#111827',
      subText: '#4B5563',
      metaText: '#6B7280',
      divider: '#C5A059'
    },
    light: {
      mark: '#1C1917',
      markAccent: '#44403C',
      primaryText: '#1C1917',
      subText: '#C5A059',
      metaText: '#78716C',
      divider: '#C5A059'
    },
    white: {
      mark: '#FFFFFF',
      markAccent: '#F5F5F5',
      primaryText: '#FFFFFF',
      subText: '#E5E5E5',
      metaText: '#A3A3A3',
      divider: '#FFFFFF'
    }
  }[theme];

  // Sizing definitions for the Monogram SVG
  const svgSizes = {
    sm: { w: 26, h: 32 },
    md: { w: 38, h: 46 },
    lg: { w: 56, h: 68 },
    xl: { w: 80, h: 96 },
    hero: { w: 110, h: 132 }
  }[size];

  // The distinctive Double-Slash Geometric Serif Z Logo Mark
  const ZMark = (
    <svg
      width={svgSizes.w}
      height={svgSizes.h}
      viewBox="0 0 100 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="transition-transform duration-300 group-hover:scale-[1.03]"
    >
      <defs>
        <linearGradient id={`zGoldGrad-${theme}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={colors.markAccent} />
          <stop offset="50%" stopColor={colors.mark} />
          <stop offset="100%" stopColor={colors.markAccent} />
        </linearGradient>
      </defs>

      {/* Top Horizontal Bar with Serifs */}
      {/* Top left serif bracket */}
      <path
        d="M 12 18 L 12 28 L 19 28 L 19 23 L 81 23 L 81 28 L 88 28 L 88 18 L 12 18 Z"
        fill={`url(#zGoldGrad-${theme})`}
      />

      {/* Main Double-Diagonal Ribbon System */}
      {/* Left Diagonal Stroke */}
      <polygon
        points="74,25 61,25 18,95 31,95"
        fill={`url(#zGoldGrad-${theme})`}
      />

      {/* Right Parallel Diagonal Stroke */}
      <polygon
        points="86,25 78,25 35,95 43,95"
        fill={`url(#zGoldGrad-${theme})`}
      />

      {/* Bottom Horizontal Bar with Serifs */}
      <path
        d="M 12 92 L 12 102 L 19 102 L 19 97 L 81 97 L 81 102 L 88 102 L 88 92 L 12 92 Z"
        fill={`url(#zGoldGrad-${theme})`}
      />
    </svg>
  );

  // 1. Mark Only Variant
  if (variant === 'mark') {
    return <div className={`inline-flex items-center justify-center ${className}`}>{ZMark}</div>;
  }

  // 2. Horizontal Navbar Variant
  if (variant === 'horizontal') {
    return (
      <div className={`flex items-center gap-3.5 ${className}`}>
        <div className="flex-shrink-0 flex items-center justify-center">
          {ZMark}
        </div>
        <div className="flex flex-col text-left">
          <span
            className="font-serif font-semibold tracking-[0.32em] text-sm sm:text-base leading-none uppercase"
            style={{ fontFamily: "'Cinzel', 'Cormorant Garamond', serif", color: colors.primaryText }}
          >
            ZENITH
          </span>
          <div className="flex items-center gap-2 mt-1">
            <span
              className="text-[10px] sm:text-[11px] tracking-[0.25em] font-normal leading-none"
              style={{ fontFamily: "'Shippori Mincho', 'Noto Serif JP', serif", color: colors.subText }}
            >
              {lang === 'ja' ? '株式会社ゼニス' : 'ZENITH Co., Ltd.'}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // 3. Compact Logo
  if (variant === 'compact') {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        {ZMark}
        <span
          className="font-serif font-bold tracking-[0.35em] text-base mt-2 uppercase"
          style={{ fontFamily: "'Cinzel', 'Cormorant Garamond', serif", color: colors.primaryText }}
        >
          ZENITH
        </span>
        <span
          className="text-[10px] tracking-[0.28em] mt-1"
          style={{ fontFamily: "'Shippori Mincho', 'Noto Serif JP', serif", color: colors.subText }}
        >
          {lang === 'ja' ? '株式会社ゼニス' : 'ARCHITECTURAL STUDIO'}
        </span>
      </div>
    );
  }

  // 4. Full Business Card Authentic Lockup Variant
  return (
    <div className={`flex flex-col items-center text-center select-none ${className}`}>
      {/* Z Emblem */}
      <div className="mb-3">{ZMark}</div>

      {/* Main Title: Z E N I T H */}
      <h1
        className="font-serif font-normal text-2xl sm:text-3xl md:text-4xl tracking-[0.42em] leading-tight uppercase pl-[0.42em]"
        style={{
          fontFamily: "'Cinzel', 'Cormorant Garamond', serif",
          color: colors.primaryText,
          letterSpacing: '0.42em'
        }}
      >
        ZENITH
      </h1>

      {/* Japanese Subtitle: 株 式 会 社 ゼ ニ ス */}
      {showSubtitle && (
        <>
          <div
            className="text-xs sm:text-sm tracking-[0.35em] pl-[0.35em] mt-2 font-normal"
            style={{
              fontFamily: "'Shippori Mincho', 'Noto Serif JP', serif",
              color: colors.subText
            }}
          >
            {lang === 'ja' ? '株 式 会 社 ゼ ニ ス' : 'ZENITH CO., LTD.'}
          </div>

          {/* Diamond Divider */}
          <div className="flex items-center justify-center gap-2 my-3.5 w-32 max-w-full opacity-80">
            <div className="h-[0.75px] flex-1" style={{ backgroundColor: colors.divider }} />
            <div className="w-1.5 h-1.5 rotate-45" style={{ backgroundColor: colors.divider }} />
            <div className="h-[0.75px] flex-1" style={{ backgroundColor: colors.divider }} />
          </div>

          {/* 4 Pillars of Operations from the Business Card */}
          <div
            className="text-[10px] sm:text-[11px] font-sans font-medium tracking-[0.2em] leading-relaxed uppercase"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              color: colors.metaText
            }}
          >
            <div>ARCHITECTURE <span className="mx-1 text-[#C5A059]">|</span> DESIGN</div>
            <div>INTERIOR <span className="mx-1 text-[#C5A059]">|</span> DEMOLITION</div>
          </div>
        </>
      )}
    </div>
  );
};
