import React from 'react';
import { X, Calendar, Clock, User, Tag, ArrowLeft } from 'lucide-react';
import { JournalArticle, Language, ThemeConfig } from '../types';

interface ArticleModalProps {
  article: JournalArticle | null;
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  themeConfig: ThemeConfig;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  isOpen,
  onClose,
  lang,
  themeConfig
}) => {
  if (!isOpen || !article) return null;

  const isJa = lang === 'ja';

  return (
    <div
      id="article-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-lg overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="article-modal-dialog"
        className="relative w-full max-w-4xl bg-[#121212] border border-stone-800 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-800 bg-[#151515] shrink-0">
          <div className="flex items-center gap-3">
            <span
              className="text-xs px-2.5 py-0.5 rounded font-mono uppercase text-white border"
              style={{
                backgroundColor: themeConfig.accentColor,
                borderColor: `${themeConfig.goldColor}44`
              }}
            >
              {isJa ? article.categoryLabel.ja : article.categoryLabel.en}
            </span>
            <span className="text-xs text-stone-500 font-mono flex items-center gap-1">
              <Calendar className="w-3 h-3 text-stone-500" />
              {article.date}
            </span>
          </div>

          <button
            id="close-article-modal-btn"
            onClick={onClose}
            className="p-1.5 rounded text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Article Body */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-8 flex-1">
          {/* Article Title & Metadata */}
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-shippori text-white leading-snug mb-4">
              {isJa ? article.title.ja : article.title.en}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-xs text-stone-400 font-montserrat">
              <span className="flex items-center gap-1.5 text-stone-300">
                <User className="w-3.5 h-3.5 text-[#C5A059]" />
                {isJa ? article.author.ja : article.author.en}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-stone-500" />
                {article.readTime}
              </span>
            </div>
          </div>

          {/* Feature Cover Image */}
          <div className="relative aspect-[16/9] rounded-xl overflow-hidden border border-stone-800 bg-black">
            <img
              src={article.coverImage}
              alt={isJa ? article.title.ja : article.title.en}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Excerpt Lead */}
          <div className="p-5 rounded-xl bg-[#161616] border-l-2 border-[#C5A059] text-sm sm:text-base font-shippori text-stone-200 italic leading-relaxed">
            {isJa ? article.excerpt.ja : article.excerpt.en}
          </div>

          {/* Main Story Paragraphs */}
          <div className="space-y-5 text-sm sm:text-base text-stone-300 font-montserrat leading-relaxed">
            {(isJa ? article.content.ja : article.content.en).map((para, i) => (
              <p key={i} className="leading-relaxed">
                {para}
              </p>
            ))}
          </div>

          {/* Tags */}
          <div className="pt-6 border-t border-stone-800 flex flex-wrap items-center gap-2">
            <Tag className="w-3.5 h-3.5 text-stone-500" />
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2.5 py-1 rounded bg-stone-900 border border-stone-800 text-stone-400"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-stone-800 bg-[#151515] shrink-0 flex items-center justify-between">
          <button
            onClick={onClose}
            className="text-xs text-stone-400 hover:text-white flex items-center gap-1.5 transition-colors font-montserrat"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{isJa ? 'ジャーナル一覧へ戻る' : 'Back to Journal'}</span>
          </button>

          <span className="text-xs text-stone-500 font-montserrat">
            Zenith Tokyo Editorial Atelier
          </span>
        </div>
      </div>
    </div>
  );
};
