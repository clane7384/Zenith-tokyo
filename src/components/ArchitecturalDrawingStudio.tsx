import React, { useState } from 'react';
import { Compass, PenTool } from 'lucide-react';
import { Language, ThemeConfig } from '../types';

interface ArchitecturalDrawingStudioProps {
  lang: Language;
  themeConfig?: ThemeConfig;
}

export const ArchitecturalDrawingStudio: React.FC<ArchitecturalDrawingStudioProps> = ({
  lang
}) => {
  const isJa = lang === 'ja';

  // Active Drawing View: Perspective / Axonometric / Elevation / Detail Cross-Section
  const [activeTab, setActiveTab] = useState<'perspective' | 'elevation' | 'detail' | 'axonometric'>('perspective');
  // Layer toggles
  const [showWireframe, setShowWireframe] = useState(true);
  const [showDimensions, setShowDimensions] = useState(true);
  const [showShading, setShowShading] = useState(true);
  const [showGrid, setShowGrid] = useState(true);
  const [activeBlueprintTheme, setActiveBlueprintTheme] = useState<'darkSlate' | 'blueprint' | 'goldenIvory'>('darkSlate');

  const themes = {
    darkSlate: {
      bg: '#0F1215',
      grid: '#1E252D',
      lineMain: '#EAE6DF',
      lineSecondary: '#C5A059',
      lineAccent: '#E2C785',
      dimension: '#8B949E',
      fillBase: '#161C22',
      fillAccent: 'rgba(197, 160, 89, 0.15)',
      badgeBg: '#182026',
      badgeText: '#C5A059'
    },
    blueprint: {
      bg: '#0A192F',
      grid: '#172A45',
      lineMain: '#64FFDA',
      lineSecondary: '#8892B0',
      lineAccent: '#CCD6F6',
      dimension: '#64FFDA',
      fillBase: '#112240',
      fillAccent: 'rgba(100, 255, 218, 0.12)',
      badgeBg: '#112240',
      badgeText: '#64FFDA'
    },
    goldenIvory: {
      bg: '#171410',
      grid: '#26201A',
      lineMain: '#E8D5B5',
      lineSecondary: '#C5A059',
      lineAccent: '#FFFFFF',
      dimension: '#A3917B',
      fillBase: '#201B14',
      fillAccent: 'rgba(197, 160, 89, 0.22)',
      badgeBg: '#261F16',
      badgeText: '#E8D5B5'
    }
  }[activeBlueprintTheme];

  const drawingTabs = [
    {
      id: 'perspective',
      nameJa: '3D 建築透視図 (Perspective)',
      nameEn: '3D Perspective Wireframe',
      scale: 'SCALE: 1/100',
      category: 'ZENITH RESIDENTIAL TOWER'
    },
    {
      id: 'elevation',
      nameJa: '南側 立面展開図 (Elevation)',
      nameEn: 'South Elevation Facade',
      scale: 'SCALE: 1/50',
      category: 'FACADE LOUVER & GLASS'
    },
    {
      id: 'detail',
      nameJa: '意匠納まり断面図 (Detail Section)',
      nameEn: 'Structural & Joinery Detail',
      scale: 'SCALE: 1/10',
      category: 'CANTILEVER SLAB & TIMBER'
    },
    {
      id: 'axonometric',
      nameJa: '軸測投影図 (Axonometric)',
      nameEn: 'Exploded Spatial Axonometry',
      scale: 'SCALE: 1/75',
      category: 'INTERIOR VOLUME STUDY'
    }
  ];

  return (
    <div className="w-full">
      {/* Studio Header & Interactive Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 p-4 rounded-2xl bg-[#141414] border border-stone-800">
        {/* Drawing Selectors */}
        <div className="flex flex-wrap items-center gap-2">
          {drawingTabs.map((tab) => (
            <button
              key={tab.id}
              id={`drawing-tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-3.5 py-2 rounded-xl text-xs font-montserrat tracking-wider transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-[#C5A059] text-black font-semibold shadow-lg scale-105'
                  : 'bg-stone-900 text-stone-300 hover:bg-stone-800 hover:text-white border border-stone-800'
              }`}
            >
              <PenTool className="w-3.5 h-3.5" />
              <span>{isJa ? tab.nameJa.split('(')[0] : tab.nameEn}</span>
            </button>
          ))}
        </div>

        {/* Layer Controls & Theme Switcher */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Blueprint Theme Switch */}
          <div className="flex items-center bg-stone-900 p-1 rounded-xl border border-stone-800 text-xs font-montserrat">
            <button
              onClick={() => setActiveBlueprintTheme('darkSlate')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${activeBlueprintTheme === 'darkSlate' ? 'bg-[#1F2937] text-white font-medium shadow' : 'text-stone-400 hover:text-white'}`}
            >
              Dark Slate
            </button>
            <button
              onClick={() => setActiveBlueprintTheme('blueprint')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${activeBlueprintTheme === 'blueprint' ? 'bg-[#0A192F] text-[#64FFDA] font-medium shadow' : 'text-stone-400 hover:text-white'}`}
            >
              Cyan Blueprint
            </button>
            <button
              onClick={() => setActiveBlueprintTheme('goldenIvory')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${activeBlueprintTheme === 'goldenIvory' ? 'bg-[#2A2015] text-[#C5A059] font-medium shadow' : 'text-stone-400 hover:text-white'}`}
            >
              Gold Linen
            </button>
          </div>

          {/* Quick Toggles */}
          <div className="hidden sm:flex items-center gap-1.5 bg-stone-900/80 p-1 rounded-xl border border-stone-800">
            <button
              onClick={() => setShowGrid(!showGrid)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all ${showGrid ? 'bg-stone-800 text-[#C5A059]' : 'text-stone-500'}`}
              title="Toggle Grid"
            >
              GRID
            </button>
            <button
              onClick={() => setShowWireframe(!showWireframe)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all ${showWireframe ? 'bg-stone-800 text-[#C5A059]' : 'text-stone-500'}`}
              title="Toggle Guide Lines"
            >
              GUIDE
            </button>
            <button
              onClick={() => setShowDimensions(!showDimensions)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all ${showDimensions ? 'bg-stone-800 text-[#C5A059]' : 'text-stone-500'}`}
              title="Toggle Dimensions"
            >
              DIM
            </button>
            <button
              onClick={() => setShowShading(!showShading)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all ${showShading ? 'bg-stone-800 text-[#C5A059]' : 'text-stone-500'}`}
              title="Toggle Hatching"
            >
              HATCH
            </button>
          </div>
        </div>
      </div>

      {/* Drawing Canvas Frame */}
      <div
        className="relative w-full rounded-2xl p-6 sm:p-10 border transition-all duration-700 shadow-2xl overflow-hidden"
        style={{
          backgroundColor: themes.bg,
          borderColor: themes.grid,
          backgroundImage: showGrid
            ? `radial-gradient(${themes.grid} 1px, transparent 1px), linear-gradient(to right, ${themes.grid} 1px, transparent 1px), linear-gradient(to bottom, ${themes.grid} 1px, transparent 1px)`
            : 'none',
          backgroundSize: '24px 24px, 48px 48px, 48px 48px'
        }}
      >
        {/* Top Technical Metadata Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div
              className="px-3 py-1 rounded-md text-xs font-mono font-bold tracking-widest uppercase"
              style={{ backgroundColor: themes.badgeBg, color: themes.badgeText }}
            >
              ZENITH ATELIER SPECIFICATION
            </div>
            <div className="text-xs font-mono text-stone-400">
              DWG NO. ZN-2026-{activeTab.toUpperCase()}
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-stone-400">
            <span>PROJECT: RESIDENTIAL & COMMERCIAL ARCHITECTURE</span>
            <span className="hidden sm:inline">•</span>
            <span className="text-[#C5A059] font-bold">
              {drawingTabs.find((t) => t.id === activeTab)?.scale}
            </span>
          </div>
        </div>

        {/* SVG Drawing Canvas depending on active tab */}
        <div className="relative w-full aspect-[16/9] min-h-[380px] sm:min-h-[480px] flex items-center justify-center">
          {/* 1. PERSPECTIVE VIEW */}
          {activeTab === 'perspective' && (
            <svg
              viewBox="0 0 1000 600"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              {/* Vanishing Point Perspective Construction Lines */}
              {showWireframe && (
                <g stroke={themes.dimension} strokeWidth="0.5" strokeDasharray="3 3" opacity="0.35">
                  <line x1="500" y1="120" x2="0" y2="40" />
                  <line x1="500" y1="120" x2="1000" y2="40" />
                  <line x1="500" y1="120" x2="100" y2="580" />
                  <line x1="500" y1="120" x2="900" y2="580" />
                  <line x1="500" y1="120" x2="500" y2="580" />
                </g>
              )}

              {/* Ground Shadow & Podium Plane */}
              {showShading && (
                <polygon
                  points="140,480 860,480 940,540 60,540"
                  fill={themes.fillAccent}
                  stroke={themes.lineSecondary}
                  strokeWidth="0.8"
                />
              )}

              {/* Left Cantilever Wing (Master Bedroom & Tea Pavilion) */}
              <polygon
                points="180,340 380,260 380,460 180,480"
                fill={themes.fillBase}
                stroke={themes.lineMain}
                strokeWidth="1.5"
              />
              <polygon
                points="180,340 380,260 480,290 280,380"
                fill={themes.fillAccent}
                stroke={themes.lineMain}
                strokeWidth="1.2"
              />
              {/* Glass Floor-to-Ceiling Ribbon Windows */}
              {[370, 400, 430].map((y, i) => (
                <line
                  key={i}
                  x1="190"
                  y1={y}
                  x2="370"
                  y2={y - 20}
                  stroke={themes.lineAccent}
                  strokeWidth="0.8"
                />
              ))}
              {[220, 260, 300, 340].map((x, i) => (
                <line
                  key={i}
                  x1={x}
                  y1="345"
                  x2={x}
                  y2="465"
                  stroke={themes.lineSecondary}
                  strokeWidth="0.6"
                />
              ))}

              {/* Central Soaring Tower Volume */}
              <polygon
                points="380,140 620,100 620,470 380,500"
                fill={themes.fillBase}
                stroke={themes.lineMain}
                strokeWidth="2"
              />
              <polygon
                points="620,100 780,150 780,450 620,470"
                fill={themes.fillAccent}
                stroke={themes.lineMain}
                strokeWidth="1.8"
              />
              <polygon
                points="380,140 620,100 780,150 540,190"
                fill={themes.fillBase}
                stroke={themes.lineMain}
                strokeWidth="1.5"
              />

              {/* Tower Vertical Slats (Louver Architectural System) */}
              {[410, 440, 470, 500, 530, 560, 590].map((x, i) => (
                <line
                  key={i}
                  x1={x}
                  y1={135 + (i * -4)}
                  x2={x}
                  y2={495 + (i * -3)}
                  stroke={themes.lineAccent}
                  strokeWidth="0.75"
                />
              ))}
              {[650, 680, 710, 740].map((x, i) => (
                <line
                  key={i}
                  x1={x}
                  y1={110 + (i * 9)}
                  x2={x}
                  y2={465 - (i * 4)}
                  stroke={themes.lineAccent}
                  strokeWidth="0.75"
                />
              ))}

              {/* Floor Slab Bands */}
              {[200, 260, 320, 380, 440].map((y, i) => (
                <g key={i}>
                  <line
                    x1="380"
                    y1={y}
                    x2="620"
                    y2={y - 30}
                    stroke={themes.lineMain}
                    strokeWidth="1.2"
                  />
                  <line
                    x1="620"
                    y1={y - 30}
                    x2="780"
                    y2={y + 10}
                    stroke={themes.lineMain}
                    strokeWidth="1.2"
                  />
                </g>
              ))}

              {/* Right Floating Gallery with Overhang */}
              <polygon
                points="720,280 880,310 880,460 720,440"
                fill={themes.fillBase}
                stroke={themes.lineMain}
                strokeWidth="1.5"
              />
              <polygon
                points="620,250 780,280 880,310 720,280"
                fill={themes.fillAccent}
                stroke={themes.lineSecondary}
                strokeWidth="1"
              />

              {/* Dimension Callouts */}
              {showDimensions && (
                <g stroke={themes.dimension} strokeWidth="0.75">
                  {/* Height Leader */}
                  <line x1="820" y1="100" x2="820" y2="470" />
                  <line x1="810" y1="100" x2="830" y2="100" />
                  <line x1="810" y1="470" x2="830" y2="470" />
                  <text x="835" y="290" fill={themes.dimension} fontSize="11" fontFamily="monospace">
                    H = 36,400 mm
                  </text>

                  {/* Width Leader */}
                  <line x1="180" y1="520" x2="880" y2="520" />
                  <line x1="180" y1="510" x2="180" y2="530" />
                  <line x1="880" y1="510" x2="880" y2="530" />
                  <text x="500" y="540" fill={themes.dimension} fontSize="11" fontFamily="monospace" textAnchor="middle">
                    W = 54,800 mm (OVERALL SPAN)
                  </text>

                  {/* Feature Annotations */}
                  <line x1="280" y1="360" x2="200" y2="280" strokeDasharray="2 2" />
                  <circle cx="280" cy="360" r="3" fill={themes.lineSecondary} />
                  <text x="120" y="270" fill={themes.lineSecondary} fontSize="11" fontFamily="sans-serif">
                    CANTILEVER TIMBER TERRACE
                  </text>

                  <line x1="620" y1="100" x2="680" y2="50" strokeDasharray="2 2" />
                  <circle cx="620" cy="100" r="3" fill={themes.lineSecondary} />
                  <text x="690" y="50" fill={themes.lineSecondary} fontSize="11" fontFamily="sans-serif">
                    SKYLINE PENTHOUSE ATELIER
                  </text>
                </g>
              )}
            </svg>
          )}

          {/* 2. ELEVATION VIEW */}
          {activeTab === 'elevation' && (
            <svg
              viewBox="0 0 1000 600"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              {/* Ground Baseline */}
              <line x1="80" y1="500" x2="920" y2="500" stroke={themes.lineMain} strokeWidth="2.5" />
              <line x1="80" y1="508" x2="920" y2="508" stroke={themes.lineSecondary} strokeWidth="0.8" />

              {/* Main Building Facade Envelope */}
              <rect x="220" y="100" width="560" height="400" fill={themes.fillBase} stroke={themes.lineMain} strokeWidth="2" />

              {/* Floor Levels */}
              {[180, 260, 340, 420].map((y, i) => (
                <g key={i}>
                  <line x1="220" y1={y} x2="780" y2={y} stroke={themes.lineMain} strokeWidth="1.2" />
                  <text x="180" y={y + 4} fill={themes.dimension} fontSize="10" fontFamily="monospace">
                    {`FL +${(5 - i) * 3600}`}
                  </text>
                </g>
              ))}

              {/* Vertical Timber/Metal Screen Pattern */}
              {Array.from({ length: 28 }).map((_, i) => (
                <line
                  key={i}
                  x1={240 + i * 19}
                  y1="180"
                  x2={240 + i * 19}
                  y2="500"
                  stroke={themes.lineSecondary}
                  strokeWidth="0.8"
                  opacity={i % 3 === 0 ? '1' : '0.4'}
                />
              ))}

              {/* Glass Inset Curtain Walls */}
              <rect x="280" y="120" width="200" height="50" fill={themes.fillAccent} stroke={themes.lineAccent} strokeWidth="1" />
              <rect x="520" y="120" width="200" height="50" fill={themes.fillAccent} stroke={themes.lineAccent} strokeWidth="1" />
              <rect x="360" y="280" width="280" height="50" fill={themes.fillAccent} stroke={themes.lineAccent} strokeWidth="1" />

              {/* Dimension Leaders */}
              {showDimensions && (
                <g stroke={themes.dimension} strokeWidth="0.8">
                  <line x1="810" y1="100" x2="810" y2="500" />
                  <line x1="800" y1="100" x2="820" y2="100" />
                  <line x1="800" y1="500" x2="820" y2="500" />
                  <text x="825" y="300" fill={themes.dimension} fontSize="11" fontFamily="monospace">
                    TOTAL HT: 18,000 mm
                  </text>

                  <line x1="220" y1="540" x2="780" y2="540" />
                  <line x1="220" y1="530" x2="220" y2="550" />
                  <line x1="780" y1="530" x2="780" y2="550" />
                  <text x="500" y="565" fill={themes.dimension} fontSize="11" fontFamily="monospace" textAnchor="middle">
                    SOUTH FACADE WIDTH: 32,000 mm
                  </text>
                </g>
              )}
            </svg>
          )}

          {/* 3. DETAIL SECTION */}
          {activeTab === 'detail' && (
            <svg
              viewBox="0 0 1000 600"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              {/* Structural Concrete Slab */}
              <polygon
                points="150,250 850,250 850,330 150,330"
                fill={themes.fillBase}
                stroke={themes.lineMain}
                strokeWidth="2"
              />
              {/* Concrete Hatching */}
              {showShading && (
                <g stroke={themes.lineSecondary} strokeWidth="0.5" opacity="0.6">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <line key={i} x1={160 + i * 35} y1="260" x2={190 + i * 35} y2="320" />
                  ))}
                </g>
              )}

              {/* Acoustic Underlayment & Solid Hinoki Wood Flooring */}
              <rect x="150" y="230" width="700" height="20" fill={themes.fillAccent} stroke={themes.lineAccent} strokeWidth="1.2" />

              {/* Thermal Broken Low-E Glass Assembly */}
              <rect x="520" y="80" width="24" height="150" fill={themes.fillAccent} stroke={themes.lineMain} strokeWidth="1.5" />
              <rect x="550" y="80" width="24" height="150" fill={themes.fillAccent} stroke={themes.lineMain} strokeWidth="1.5" />

              {/* Solid Milled Brass Fastener Joint */}
              <circle cx="532" cy="150" r="6" fill={themes.lineSecondary} stroke={themes.lineAccent} strokeWidth="1" />
              <circle cx="562" cy="150" r="6" fill={themes.lineSecondary} stroke={themes.lineAccent} strokeWidth="1" />

              {/* Deep Soffit Cantilever Timber Cladding */}
              <rect x="150" y="330" width="400" height="18" fill={themes.fillBase} stroke={themes.lineSecondary} strokeWidth="1" />

              {/* Annotations */}
              {showDimensions && (
                <g stroke={themes.dimension} strokeWidth="0.8">
                  <line x1="280" y1="240" x2="200" y2="160" />
                  <circle cx="280" cy="240" r="3" fill={themes.lineSecondary} />
                  <text x="80" y="150" fill={themes.lineSecondary} fontSize="11" fontFamily="sans-serif">
                    JAPANESE HINOKI HARDWOOD (30mm)
                  </text>

                  <line x1="532" y1="120" x2="680" y2="60" />
                  <circle cx="532" cy="120" r="3" fill={themes.lineSecondary} />
                  <text x="690" y="60" fill={themes.lineSecondary} fontSize="11" fontFamily="sans-serif">
                    DOUBLE GLAZED LOW-E THERMAL UNIT
                  </text>

                  <line x1="500" y1="290" x2="680" y2="400" />
                  <circle cx="500" cy="290" r="3" fill={themes.lineSecondary} />
                  <text x="690" y="405" fill={themes.lineSecondary} fontSize="11" fontFamily="sans-serif">
                    POST-TENSIONED REINFORCED SLAB
                  </text>
                </g>
              )}
            </svg>
          )}

          {/* 4. AXONOMETRIC VIEW */}
          {activeTab === 'axonometric' && (
            <svg
              viewBox="0 0 1000 600"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              {/* Ground Grid Projection */}
              <polygon
                points="500,450 780,310 500,170 220,310"
                fill={themes.fillBase}
                stroke={themes.lineSecondary}
                strokeWidth="1"
                strokeDasharray="3 3"
              />

              {/* Lower Courtyard Module */}
              <polygon
                points="340,320 500,240 500,400 340,480"
                fill={themes.fillBase}
                stroke={themes.lineMain}
                strokeWidth="1.5"
              />
              <polygon
                points="500,240 660,320 660,480 500,400"
                fill={themes.fillAccent}
                stroke={themes.lineMain}
                strokeWidth="1.5"
              />
              <polygon
                points="340,320 500,240 660,320 500,400"
                fill={themes.fillBase}
                stroke={themes.lineMain}
                strokeWidth="1.5"
              />

              {/* Upper Floating Mezzanine (Exploded Offset) */}
              <polygon
                points="340,160 500,80 500,200 340,280"
                fill={themes.fillAccent}
                stroke={themes.lineAccent}
                strokeWidth="1.5"
              />
              <polygon
                points="500,80 660,160 660,280 500,200"
                fill={themes.fillBase}
                stroke={themes.lineAccent}
                strokeWidth="1.5"
              />
              <polygon
                points="340,160 500,80 660,160 500,240"
                fill={themes.fillAccent}
                stroke={themes.lineAccent}
                strokeWidth="1.5"
              />

              {/* Exploded Connecting Lines */}
              <line x1="340" y1="160" x2="340" y2="320" stroke={themes.dimension} strokeWidth="0.8" strokeDasharray="4 4" />
              <line x1="500" y1="80" x2="500" y2="240" stroke={themes.dimension} strokeWidth="0.8" strokeDasharray="4 4" />
              <line x1="660" y1="160" x2="660" y2="320" stroke={themes.dimension} strokeWidth="0.8" strokeDasharray="4 4" />

              {/* Dimension Texts */}
              {showDimensions && (
                <g fill={themes.dimension} fontSize="11" fontFamily="monospace">
                  <text x="210" y="220">EXPLODED LEVEL 02: PENTHOUSE LOUNGE</text>
                  <text x="210" y="440">LEVEL 01: JAPANESE ZEN COURTYARD</text>
                </g>
              )}
            </svg>
          )}
        </div>

        {/* Bottom Technical Spec Footer */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 mt-6 border-t border-white/10 text-xs font-mono text-stone-400">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-[#C5A059]" />
            <span>ZENITH ARCHITECTURAL DESIGN & ENGINEERING</span>
          </div>

          <div className="flex items-center gap-6">
            <span>COORDINATES: TOKYO 35.6963° N, 139.7058° E</span>
            <span className="text-[#C5A059]">STATUS: APPROVED FOR CONSTRUCTION</span>
          </div>
        </div>
      </div>
    </div>
  );
};
