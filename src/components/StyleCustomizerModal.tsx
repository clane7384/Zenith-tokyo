import React from 'react';
import { X, Check, RefreshCw } from 'lucide-react';
import { ThemeConfig, Language } from '../types';

interface StyleCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  themeConfig: ThemeConfig;
  onChangeTheme: (config: ThemeConfig) => void;
  lang: Language;
}

export const StyleCustomizerModal: React.FC<StyleCustomizerModalProps> = ({
  isOpen,
  onClose,
  themeConfig,
  onChangeTheme,
  lang
}) => {
  if (!isOpen) return null;

  const isJa = lang === 'ja';

  const colorPresets = [
    {
      nameJa: 'ディープフォレスト（標準）',
      nameEn: 'Deep Forest Green (Default)',
      accentColor: '#1A3026',
      goldColor: '#C5A059'
    },
    {
      nameJa: 'エメラルド・モス（深緑）',
      nameEn: 'Emerald Moss',
      accentColor: '#142B20',
      goldColor: '#D4AF37'
    },
    {
      nameJa: '墨黒・チャコール（純和風）',
      nameEn: 'Sumi Charcoal & Bronze',
      accentColor: '#1C1E1D',
      goldColor: '#C0A062'
    },
    {
      nameJa: 'ミッドナイト・パイン（夜松）',
      nameEn: 'Midnight Pine',
      accentColor: '#0E241B',
      goldColor: '#CCA86E'
    }
  ];

  return (
    <div
      id="customizer-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        id="customizer-modal-dialog"
        className="relative w-full max-w-md bg-[#161616] border border-stone-800 rounded-2xl shadow-2xl p-6 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-stone-800 pb-4">
          <div>
            <span className="text-[10px] font-mono text-[#C5A059] uppercase tracking-widest block">
              Design Token Customizer
            </span>
            <h3 className="text-lg font-bold font-shippori text-white">
              {isJa ? 'スタイル＆テーマ調整' : 'Style & Palette Engine'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-stone-400 hover:text-white hover:bg-stone-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Color Presets */}
        <div className="space-y-3">
          <label className="text-xs font-montserrat uppercase tracking-wider text-stone-300 block">
            {isJa ? 'カラーテーマ プリセット' : 'Color Palette Presets'}
          </label>
          <div className="space-y-2">
            {colorPresets.map((preset) => {
              const isSelected = themeConfig.accentColor === preset.accentColor;
              return (
                <button
                  key={preset.accentColor}
                  onClick={() =>
                    onChangeTheme({
                      ...themeConfig,
                      accentColor: preset.accentColor,
                      accentName: isJa ? preset.nameJa : preset.nameEn,
                      goldColor: preset.goldColor
                    })
                  }
                  className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                    isSelected
                      ? 'border-[#C5A059] bg-[#1F1F1F]'
                      : 'border-stone-800 bg-[#121212] hover:border-stone-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-6 h-6 rounded-full border border-white/20 shadow-inner flex items-center justify-center"
                      style={{ backgroundColor: preset.accentColor }}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white">
                        {isJa ? preset.nameJa : preset.nameEn}
                      </div>
                      <div className="text-[10px] font-mono text-stone-400">
                        {preset.accentColor} / {preset.goldColor}
                      </div>
                    </div>
                  </div>

                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: preset.goldColor }}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Typography Mode */}
        <div className="space-y-3 pt-2 border-t border-stone-800">
          <label className="text-xs font-montserrat uppercase tracking-wider text-stone-300 block">
            {isJa ? 'フォント系統' : 'Typography Archetype'}
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onChangeTheme({ ...themeConfig, fontPreset: 'mincho' })}
              className={`p-3 rounded-xl border text-center text-xs transition-all ${
                themeConfig.fontPreset === 'mincho'
                  ? 'border-[#C5A059] bg-stone-800 text-white font-bold'
                  : 'border-stone-800 bg-[#121212] text-stone-400'
              }`}
            >
              <div className="font-shippori text-sm mb-1">しっぽり明朝</div>
              <div className="text-[10px] font-mono text-stone-500">Shippori Mincho</div>
            </button>

            <button
              onClick={() => onChangeTheme({ ...themeConfig, fontPreset: 'sans' })}
              className={`p-3 rounded-xl border text-center text-xs transition-all ${
                themeConfig.fontPreset === 'sans'
                  ? 'border-[#C5A059] bg-stone-800 text-white font-bold'
                  : 'border-stone-800 bg-[#121212] text-stone-400'
              }`}
            >
              <div className="font-montserrat text-sm mb-1">Montserrat</div>
              <div className="text-[10px] font-mono text-stone-500">Modern Sans</div>
            </button>
          </div>
        </div>

        <div className="pt-2 border-t border-stone-800 flex justify-between items-center">
          <button
            onClick={() =>
              onChangeTheme({
                accentColor: '#1A3026',
                accentName: 'Deep Forest Green',
                goldColor: '#C5A059',
                fontPreset: 'mincho'
              })
            }
            className="flex items-center gap-1 text-xs text-stone-400 hover:text-white"
          >
            <RefreshCw className="w-3 h-3" />
            <span>{isJa ? '初期値に戻す' : 'Reset Defaults'}</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-stone-800 hover:bg-stone-700"
          >
            {isJa ? '閉じる' : 'Apply & Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
