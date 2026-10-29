import React from 'react';
import { X, MessageSquare, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';

interface LineConsultModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const LineConsultModal: React.FC<LineConsultModalProps> = ({
  isOpen,
  onClose,
  lang
}) => {
  if (!isOpen) return null;

  const isJa = lang === 'ja';

  return (
    <div
      id="line-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        id="line-modal-dialog"
        className="relative w-full max-w-lg bg-[#141414] border border-stone-800 rounded-2xl shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-stone-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#06C755] flex items-center justify-center text-white shadow-md">
              <MessageSquare className="w-5 h-5 fill-white" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#06C755] uppercase tracking-wider block font-bold">
                LINE Official Atelier Channel
              </span>
              <h3 className="text-lg font-bold font-shippori text-white">
                {isJa ? 'LINE 公式 建築・設計無料相談' : 'Direct Architectural Line'}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="space-y-4 text-xs sm:text-sm text-stone-300 font-montserrat">
          <p className="leading-relaxed">
            {isJa
              ? '敷地のご相談、概算予算のお見積もり、アトリエ（東京都新宿区歌舞伎町）での個別面談のご予約を、LINEのチャットにてスムーズに行っていただけます。'
              : 'Add our verified LINE official account to instantly chat with our principal architectural coordinators or schedule a private consultation at our Shinjuku Atelier.'}
          </p>

          {/* QR Code Presentation Box */}
          <div className="p-6 rounded-xl bg-[#0D0D0D] border border-stone-800 flex flex-col sm:flex-row items-center justify-center gap-6 text-center sm:text-left">
            <div className="p-3 bg-white rounded-xl shadow-lg shrink-0">
              {/* SVG QR Code Simulation */}
              <svg className="w-28 h-28" viewBox="0 0 100 100" fill="black">
                {/* Outer corners */}
                <rect x="5" y="5" width="30" height="30" fill="#06C755" rx="4" />
                <rect x="10" y="10" width="20" height="20" fill="white" />
                <rect x="15" y="15" width="10" height="10" fill="#0D0D0D" />

                <rect x="65" y="5" width="30" height="30" fill="#06C755" rx="4" />
                <rect x="70" y="10" width="20" height="20" fill="white" />
                <rect x="75" y="15" width="10" height="10" fill="#0D0D0D" />

                <rect x="5" y="65" width="30" height="30" fill="#06C755" rx="4" />
                <rect x="10" y="70" width="20" height="20" fill="white" />
                <rect x="15" y="75" width="10" height="10" fill="#0D0D0D" />

                {/* Random Pattern Dots */}
                <rect x="42" y="10" width="8" height="8" fill="#0D0D0D" />
                <rect x="52" y="18" width="8" height="8" fill="#0D0D0D" />
                <rect x="42" y="26" width="8" height="8" fill="#0D0D0D" />
                <rect x="10" y="42" width="8" height="8" fill="#0D0D0D" />
                <rect x="22" y="48" width="8" height="8" fill="#0D0D0D" />
                <rect x="40" y="42" width="20" height="20" fill="#06C755" rx="2" />
                <rect x="68" y="42" width="8" height="8" fill="#0D0D0D" />
                <rect x="80" y="48" width="8" height="8" fill="#0D0D0D" />
                <rect x="42" y="68" width="8" height="8" fill="#0D0D0D" />
                <rect x="55" y="75" width="8" height="8" fill="#0D0D0D" />
                <rect x="72" y="68" width="16" height="16" fill="#0D0D0D" />
              </svg>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-mono text-stone-400">
                LINE ID: <strong className="text-white">@zenith-tokyo</strong>
              </div>
              <div className="text-xs font-shippori text-[#C5A059] font-medium">
                {isJa ? 'スマホカメラでQRコードを読み取り' : 'Scan QR code with smartphone'}
              </div>
              <div className="text-[11px] text-stone-400">
                {isJa ? '受付時間: 24時間365日' : 'Accepting inquiries 24/7'}
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="space-y-2 pt-2">
            {[
              isJa ? '建築家・チーフデザイナーが直接メッセージを確認' : 'Principal architects directly review your query',
              isJa ? '敷地図面や写真の送付・即時確認に対応' : 'Instant dispatch of site photos and architectural PDFs',
              isJa ? 'プライバシー完全保護・しつこい営業電話なし' : 'Absolute privacy protection & zero unsolicited spam'
            ].map((benefit, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-stone-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#06C755] shrink-0" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <a
            id="open-line-app-link"
            href="https://line.me/R/ti/p/@zenith-tokyo"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 rounded-xl bg-[#06C755] hover:brightness-110 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-[1.02]"
          >
            <MessageSquare className="w-4 h-4 fill-white" />
            <span>{isJa ? 'LINE アプリで友だち追加する' : 'Open in LINE Application'}</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
