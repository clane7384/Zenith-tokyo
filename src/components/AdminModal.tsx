import React, { useState } from 'react';
import {
  X,
  Lock,
  Unlock,
  Building2,
  Users,
  FolderKanban,
  FileText,
  Send,
  Shield,
  Save,
  Plus,
  Trash2,
  Edit3,
  RotateCcw,
  Download,
  Upload,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Briefcase,
  Sparkles,
  Wand2
} from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';
import { Language, ThemeConfig, Project, JournalArticle, ProjectCategory, DirectorInfo } from '../types';
import { ImageUploadField, MultiImageGalleryUpload } from './ImageUploadField';
import { autoTranslateProjectTitle, generateSlug } from '../utils/translationUtils';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  themeConfig: ThemeConfig;
}

type AdminTab = 'company' | 'directors' | 'portfolio' | 'services' | 'journal' | 'inquiries' | 'security';

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  lang,
  themeConfig
}) => {
  const {
    companyInfo,
    projects,
    journalArticles,
    formspreeUrl,
    inquiryLogs,
    isAdminAuthenticated,
    loginAdmin,
    logoutAdmin,
    updateCompanyInfo,
    updateDirectors,
    addDirector,
    deleteDirector,
    updateServices,
    addProject,
    updateProject,
    deleteProject,
    addArticle,
    updateArticle,
    deleteArticle,
    setFormspreeUrl,
    updateAdminPassword,
    clearInquiryLogs,
    resetToDefaults,
    exportBackupJSON,
    importBackupJSON
  } = useSiteData();

  const isJa = lang === 'ja';

  // Auth form state
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState<AdminTab>('company');

  // Notification Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Company Form local state
  const [companyForm, setCompanyForm] = useState(companyInfo);

  // Director Form local state
  const [directorsList, setDirectorsList] = useState<DirectorInfo[]>(companyInfo.directors);
  const [editingDirectorIdx, setEditingDirectorIdx] = useState<number | null>(null);
  const [newDirector, setNewDirector] = useState<DirectorInfo>({
    nameJa: '',
    nameEn: '',
    nameKana: '',
    roleJa: '代表取締役',
    roleEn: 'Representative Director',
    phone: '',
    email: '',
    bioJa: '',
    bioEn: ''
  });

  // Services local state
  const [servicesList, setServicesList] = useState(companyInfo.services);

  // Project editing state
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [projectForm, setProjectForm] = useState<Partial<Project>>({});
  const [autoTranslateProject, setAutoTranslateProject] = useState<boolean>(true);

  // Auto translate project title helper
  const handleProjectTitleJaChange = (newTitleJa: string) => {
    let updated: Partial<Project> = {
      ...projectForm,
      title: {
        ja: newTitleJa,
        en: projectForm.title?.en || ''
      }
    };

    if (autoTranslateProject && newTitleJa.trim()) {
      const { englishTitle, slug } = autoTranslateProjectTitle(newTitleJa);
      updated.title = {
        ja: newTitleJa,
        en: englishTitle
      };
      // Auto-update slug if not customized or empty
      updated.slug = slug;
    }

    setProjectForm(updated);
  };

  // Re-generate English Title & Slug on demand
  const handleRegenerateProjectEnglish = () => {
    const titleJa = projectForm.title?.ja;
    if (!titleJa || !titleJa.trim()) {
      showToast(isJa ? '먼저 프로젝트명을 입력해주세요' : 'Please enter project title first');
      return;
    }
    const { englishTitle, slug } = autoTranslateProjectTitle(titleJa);
    setProjectForm({
      ...projectForm,
      title: {
        ja: titleJa,
        en: englishTitle
      },
      slug: slug
    });
    showToast(isJa ? `영문 자동 생성 완료: "${englishTitle}"` : `Auto translated to "${englishTitle}"`);
  };

  // Journal editing state
  const [editingArticle, setEditingArticle] = useState<JournalArticle | null>(null);
  const [isAddingArticle, setIsAddingArticle] = useState(false);
  const [articleForm, setArticleForm] = useState<Partial<JournalArticle>>({});

  // Auto translate article title helper
  const handleArticleTitleJaChange = (newTitleJa: string) => {
    let updated: Partial<JournalArticle> = {
      ...articleForm,
      title: {
        ja: newTitleJa,
        en: articleForm.title?.en || ''
      }
    };

    if (newTitleJa.trim()) {
      const { englishTitle } = autoTranslateProjectTitle(newTitleJa);
      updated.title = {
        ja: newTitleJa,
        en: englishTitle
      };
    }

    setArticleForm(updated);
  };

  // Security Form
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Formspree URL input
  const [endpointInput, setEndpointInput] = useState(formspreeUrl);

  if (!isOpen) return null;

  // Handle Login
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(passwordInput.trim());
    if (success) {
      setAuthError(false);
      setPasswordInput('');
      setCompanyForm(companyInfo);
      setDirectorsList(companyInfo.directors);
      setServicesList(companyInfo.services);
      setEndpointInput(formspreeUrl);
      showToast(isJa ? '管理者として認証されました' : 'Authenticated as Administrator');
    } else {
      setAuthError(true);
    }
  };

  // Save Company Info
  const handleSaveCompany = (e: React.FormEvent) => {
    e.preventDefault();
    updateCompanyInfo(companyForm);
    showToast(isJa ? '会社情報が更新されました' : 'Company info updated successfully');
  };

  // Save Directors
  const handleSaveDirectors = () => {
    updateDirectors(directorsList);
    showToast(isJa ? '役員情報が保存されました' : 'Directors updated successfully');
  };

  // Save Services
  const handleSaveServices = () => {
    updateServices(servicesList);
    showToast(isJa ? '事業領域が保存されました' : 'Services updated successfully');
  };

  // Save Formspree
  const handleSaveEndpoint = () => {
    if (endpointInput.trim()) {
      setFormspreeUrl(endpointInput.trim());
      showToast(isJa ? 'Formspree URLが保存されました' : 'Formspree URL saved');
    }
  };

  // Save or Add Project
  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectForm.title?.ja || !projectForm.heroImage) {
      alert(isJa ? 'タイトルと代表画像URLは必須です' : 'Title and Hero Image are required');
      return;
    }

    if (isAddingProject) {
      const newProj: Project = {
        id: `proj-${Date.now()}`,
        slug: projectForm.slug || `project-${Date.now()}`,
        title: projectForm.title || { ja: '新規プロジェクト', en: 'New Project' },
        subtitle: projectForm.subtitle || { ja: '', en: '' },
        category: (projectForm.category as ProjectCategory) || 'residential',
        categoryLabel: projectForm.categoryLabel || { ja: '高級邸宅', en: 'Private Estate' },
        location: projectForm.location || { ja: '東京都', en: 'Tokyo' },
        year: projectForm.year || '2026',
        area: projectForm.area || '300 ㎡',
        heroImage: projectForm.heroImage || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
        gallery: projectForm.gallery && projectForm.gallery.length > 0 ? projectForm.gallery : [projectForm.heroImage],
        concept: projectForm.concept || { ja: '', en: '' },
        materials: projectForm.materials || { ja: [], en: [] },
        architects: projectForm.architects || { ja: 'ZENITH TOKYO 主宰', en: 'ZENITH TOKYO Principal' },
        awards: projectForm.awards,
        featured: !!projectForm.featured
      };
      addProject(newProj);
      showToast(isJa ? '新規プロジェクトを追加しました' : 'New project added');
    } else if (editingProject) {
      updateProject(editingProject.id, projectForm);
      showToast(isJa ? 'プロジェクト情報を更新しました' : 'Project updated');
    }

    setIsAddingProject(false);
    setEditingProject(null);
    setProjectForm({});
  };

  // Save or Add Article
  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!articleForm.title?.ja) {
      alert(isJa ? 'タイトルは必須です' : 'Title is required');
      return;
    }

    if (isAddingArticle) {
      const newArt: JournalArticle = {
        id: `article-${Date.now()}`,
        title: articleForm.title || { ja: '新規記事', en: 'New Article' },
        category: articleForm.category || 'essay',
        categoryLabel: articleForm.categoryLabel || { ja: '建築論考', en: 'Essay' },
        date: articleForm.date || new Date().toISOString().split('T')[0].replace(/-/g, '.'),
        readTime: articleForm.readTime || '5 min read',
        author: articleForm.author || { ja: 'ZENITH 編集部', en: 'ZENITH Editorial' },
        coverImage: articleForm.coverImage || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        excerpt: articleForm.excerpt || { ja: '', en: '' },
        content: articleForm.content || { ja: [''], en: [''] },
        tags: articleForm.tags || ['建築', 'デザイン']
      };
      addArticle(newArt);
      showToast(isJa ? '新規記事を追加しました' : 'New article published');
    } else if (editingArticle) {
      updateArticle(editingArticle.id, articleForm);
      showToast(isJa ? '記事を更新しました' : 'Article updated');
    }

    setIsAddingArticle(false);
    setEditingArticle(null);
    setArticleForm({});
  };

  // Handle Change Password
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword) return;
    if (newPassword !== confirmPassword) {
      alert(isJa ? '新しいパスワードが一致しません' : 'New passwords do not match');
      return;
    }
    updateAdminPassword(newPassword);
    setNewPassword('');
    setConfirmPassword('');
    showToast(isJa ? '管理者パスワードを変更しました' : 'Password changed successfully');
  };

  // Handle Export
  const handleExportBackup = () => {
    const jsonStr = exportBackupJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `zenith-tokyo-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast(isJa ? 'バックアップJSONをダウンロードしました' : 'Backup exported successfully');
  };

  // Handle Import
  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const content = evt.target?.result as string;
      if (content && importBackupJSON(content)) {
        showToast(isJa ? 'データを正常に復元しました' : 'Backup imported successfully');
      } else {
        alert(isJa ? '無効なJSONバックアップファイルです' : 'Invalid backup JSON file');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div
      id="admin-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
    >
      {/* Toast popup */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-[#1A3026] text-[#E8D5B5] border border-[#C5A059] px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 text-xs font-montserrat animate-in slide-in-from-top-3">
          <CheckCircle2 className="w-4 h-4 text-[#C5A059]" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div
        id="admin-modal-container"
        className="w-full max-w-6xl max-h-[92vh] flex flex-col bg-[#111315] border border-stone-800 rounded-2xl shadow-2xl overflow-hidden text-stone-200"
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-800 bg-[#0C0E10]">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center border text-white"
              style={{
                backgroundColor: themeConfig.accentColor,
                borderColor: themeConfig.goldColor
              }}
            >
              <Shield className="w-4 h-4 text-[#C5A059]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-montserrat font-bold text-sm tracking-wider text-white uppercase">
                  ZENITH ATELIER ADMIN PORTAL
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-stone-900 border border-stone-800 text-[#C5A059] font-mono">
                  {isAdminAuthenticated ? 'AUTHENTICATED' : 'PROTECTED'}
                </span>
              </div>
              <span className="text-xs text-stone-400 font-shippori">
                {isJa ? 'ホームページ情報・コンテンツ統合管理システム' : 'Website CMS & Data Management Portal'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAdminAuthenticated && (
              <button
                onClick={() => {
                  logoutAdmin();
                  showToast(isJa ? 'ログアウトしました' : 'Logged out');
                }}
                className="px-3 py-1.5 rounded-lg border border-stone-800 bg-stone-900 hover:bg-stone-800 text-xs font-montserrat text-stone-300 hover:text-white transition-colors flex items-center gap-1.5"
              >
                <Unlock className="w-3.5 h-3.5 text-stone-400" />
                <span>{isJa ? 'ログアウト' : 'Logout'}</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-white border border-stone-800 transition-colors"
              aria-label="Close admin modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        {!isAdminAuthenticated ? (
          /* =========================================================================
             1. LOGIN / PASSWORD SCREEN (Default: 7458)
             ========================================================================= */
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center min-h-[420px] max-w-md mx-auto w-full text-center">
            <div className="w-16 h-16 rounded-2xl bg-stone-900 border border-stone-800 flex items-center justify-center text-[#C5A059] mb-6 shadow-xl">
              <Lock className="w-8 h-8" />
            </div>

            <h3 className="text-xl sm:text-2xl font-bold font-shippori text-white mb-2">
              {isJa ? '管理者認証が必要です' : 'Administrator Access'}
            </h3>
            <p className="text-xs text-stone-400 font-montserrat mb-8">
              {isJa
                ? 'ホームページの情報更新・プロジェクト編集を行うには、管理パスワードを入力してください。'
                : 'Enter your 4-digit administration password to access CMS controls.'}
            </p>

            <form onSubmit={handleLoginSubmit} className="w-full space-y-4">
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    setAuthError(false);
                  }}
                  placeholder={isJa ? '管理パスワード (初期値: 7458)' : 'Password (Default: 7458)'}
                  className={`w-full px-4 py-3.5 rounded-xl bg-stone-900 border text-center text-lg font-mono tracking-widest text-white placeholder:text-stone-600 focus:outline-none transition-colors ${
                    authError ? 'border-red-500 bg-red-950/20' : 'border-stone-700 focus:border-[#C5A059]'
                  }`}
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {authError && (
                <div className="flex items-center justify-center gap-1.5 text-xs text-red-400 font-montserrat">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{isJa ? 'パスワードが正しくありません (7458)' : 'Incorrect password (7458)'}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl text-xs font-montserrat uppercase tracking-widest font-semibold text-white shadow-xl hover:brightness-110 transition-all flex items-center justify-center gap-2 border"
                style={{
                  backgroundColor: themeConfig.accentColor,
                  borderColor: themeConfig.goldColor
                }}
              >
                <Unlock className="w-3.5 h-3.5" />
                <span>{isJa ? '管理者ログイン' : 'Authenticate'}</span>
              </button>

              <div className="p-3 rounded-lg bg-stone-900/60 border border-stone-800/80 text-[11px] text-stone-400 font-mono">
                {isJa ? '※ 初期パスワード: 7458' : '※ Default Access PIN: 7458'}
              </div>
            </form>
          </div>
        ) : (
          /* =========================================================================
             2. AUTHENTICATED ADMIN DASHBOARD
             ========================================================================= */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Sidebar Navigation */}
            <div className="w-full md:w-64 bg-[#0E1012] border-b md:border-b-0 md:border-r border-stone-800 p-3 space-y-1 overflow-x-auto md:overflow-y-auto flex md:flex-col shrink-0">
              <button
                onClick={() => setActiveTab('company')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-montserrat flex items-center gap-2.5 transition-all whitespace-nowrap ${
                  activeTab === 'company'
                    ? 'bg-[#C5A059] text-black font-semibold shadow-lg'
                    : 'text-stone-400 hover:bg-stone-900 hover:text-white'
                }`}
              >
                <Building2 className="w-4 h-4 shrink-0" />
                <span>{isJa ? '🏢 会社基本情報' : 'Company Info'}</span>
              </button>

              <button
                onClick={() => setActiveTab('directors')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-montserrat flex items-center gap-2.5 transition-all whitespace-nowrap ${
                  activeTab === 'directors'
                    ? 'bg-[#C5A059] text-black font-semibold shadow-lg'
                    : 'text-stone-400 hover:bg-stone-900 hover:text-white'
                }`}
              >
                <Users className="w-4 h-4 shrink-0" />
                <span>{isJa ? '👥 代表・役員' : 'Directors & Execs'}</span>
              </button>

              <button
                onClick={() => setActiveTab('portfolio')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-montserrat flex items-center gap-2.5 transition-all whitespace-nowrap ${
                  activeTab === 'portfolio'
                    ? 'bg-[#C5A059] text-black font-semibold shadow-lg'
                    : 'text-stone-400 hover:bg-stone-900 hover:text-white'
                }`}
              >
                <FolderKanban className="w-4 h-4 shrink-0" />
                <span>{isJa ? '🏛️ 設計プロジェクト' : 'Portfolio Projects'}</span>
              </button>

              <button
                onClick={() => setActiveTab('services')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-montserrat flex items-center gap-2.5 transition-all whitespace-nowrap ${
                  activeTab === 'services'
                    ? 'bg-[#C5A059] text-black font-semibold shadow-lg'
                    : 'text-stone-400 hover:bg-stone-900 hover:text-white'
                }`}
              >
                <Briefcase className="w-4 h-4 shrink-0" />
                <span>{isJa ? '📐 4大事業領域' : 'Core Services'}</span>
              </button>

              <button
                onClick={() => setActiveTab('journal')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-montserrat flex items-center gap-2.5 transition-all whitespace-nowrap ${
                  activeTab === 'journal'
                    ? 'bg-[#C5A059] text-black font-semibold shadow-lg'
                    : 'text-stone-400 hover:bg-stone-900 hover:text-white'
                }`}
              >
                <FileText className="w-4 h-4 shrink-0" />
                <span>{isJa ? '✍️ 建築ジャーナル' : 'Journal Essays'}</span>
              </button>

              <button
                onClick={() => setActiveTab('inquiries')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-montserrat flex items-center gap-2.5 transition-all whitespace-nowrap ${
                  activeTab === 'inquiries'
                    ? 'bg-[#C5A059] text-black font-semibold shadow-lg'
                    : 'text-stone-400 hover:bg-stone-900 hover:text-white'
                }`}
              >
                <Send className="w-4 h-4 shrink-0" />
                <span>{isJa ? '📩 お問い合わせ・Formspree' : 'Inquiries & Formspree'}</span>
              </button>

              <button
                onClick={() => setActiveTab('security')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-montserrat flex items-center gap-2.5 transition-all whitespace-nowrap ${
                  activeTab === 'security'
                    ? 'bg-[#C5A059] text-black font-semibold shadow-lg'
                    : 'text-stone-400 hover:bg-stone-900 hover:text-white'
                }`}
              >
                <Shield className="w-4 h-4 shrink-0" />
                <span>{isJa ? '🔐 セキュリティ・バックアップ' : 'Security & Backup'}</span>
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-4 sm:p-8 overflow-y-auto max-h-[calc(92vh-75px)]">
              {/* TAB 1: COMPANY INFO */}
              {activeTab === 'company' && (
                <form onSubmit={handleSaveCompany} className="space-y-6 max-w-3xl">
                  <div className="border-b border-stone-800 pb-4 flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-bold font-shippori text-white">
                        {isJa ? '会社概要・連絡先情報の編集' : 'Company & Contact Specifications'}
                      </h4>
                      <p className="text-xs text-stone-400 font-montserrat">
                        {isJa ? '変更内容は保存後、ウェブサイト全体に即時反映されます。' : 'Changes apply immediately across all website sections upon saving.'}
                      </p>
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl text-xs font-montserrat uppercase font-semibold text-white flex items-center gap-1.5 border shadow hover:brightness-110"
                      style={{
                        backgroundColor: themeConfig.accentColor,
                        borderColor: themeConfig.goldColor
                      }}
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>{isJa ? '保存する' : 'Save Changes'}</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-montserrat text-stone-400 mb-1.5">
                        {isJa ? '法人名 (日本語)' : 'Corporate Name (JA)'}
                      </label>
                      <input
                        type="text"
                        value={companyForm.corporateNameJa}
                        onChange={(e) => setCompanyForm({ ...companyForm, corporateNameJa: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-sm text-white focus:outline-none focus:border-[#C5A059]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-montserrat text-stone-400 mb-1.5">
                        {isJa ? '法人名 (英語)' : 'Corporate Name (EN)'}
                      </label>
                      <input
                        type="text"
                        value={companyForm.corporateNameEn}
                        onChange={(e) => setCompanyForm({ ...companyForm, corporateNameEn: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-sm text-white focus:outline-none focus:border-[#C5A059]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-montserrat text-stone-400 mb-1.5">
                        {isJa ? 'ブランド名 (日本語)' : 'Brand Name (JA)'}
                      </label>
                      <input
                        type="text"
                        value={companyForm.brandNameJa}
                        onChange={(e) => setCompanyForm({ ...companyForm, brandNameJa: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-sm text-white focus:outline-none focus:border-[#C5A059]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-montserrat text-stone-400 mb-1.5">
                        {isJa ? 'ブランド名 (英語)' : 'Brand Name (EN)'}
                      </label>
                      <input
                        type="text"
                        value={companyForm.brandNameEn}
                        onChange={(e) => setCompanyForm({ ...companyForm, brandNameEn: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-sm text-white focus:outline-none focus:border-[#C5A059]"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-montserrat text-stone-400 mb-1.5">
                        {isJa ? '建築士事務所登録 / 許認可' : 'License & Permits'}
                      </label>
                      <input
                        type="text"
                        value={companyForm.license}
                        onChange={(e) => setCompanyForm({ ...companyForm, license: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-sm text-white focus:outline-none focus:border-[#C5A059]"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-montserrat text-stone-400 mb-1.5">
                        {isJa ? '所在地住所 (日本語)' : 'Address (JA)'}
                      </label>
                      <input
                        type="text"
                        value={companyForm.addressJa}
                        onChange={(e) => setCompanyForm({ ...companyForm, addressJa: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-sm text-white focus:outline-none focus:border-[#C5A059]"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-montserrat text-stone-400 mb-1.5">
                        {isJa ? '所在地住所 (英語)' : 'Address (EN)'}
                      </label>
                      <input
                        type="text"
                        value={companyForm.addressEn}
                        onChange={(e) => setCompanyForm({ ...companyForm, addressEn: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-sm text-white focus:outline-none focus:border-[#C5A059]"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-montserrat text-stone-400 mb-1.5">
                        {isJa ? '最寄り駅アクセス (日本語)' : 'Access Directions (JA)'}
                      </label>
                      <input
                        type="text"
                        value={companyForm.accessJa}
                        onChange={(e) => setCompanyForm({ ...companyForm, accessJa: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-sm text-white focus:outline-none focus:border-[#C5A059]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-montserrat text-stone-400 mb-1.5">
                        {isJa ? '代表電話番号 1' : 'Phone 1 (Principal)'}
                      </label>
                      <input
                        type="text"
                        value={companyForm.phone}
                        onChange={(e) => setCompanyForm({ ...companyForm, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-sm text-white focus:outline-none focus:border-[#C5A059]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-montserrat text-stone-400 mb-1.5">
                        {isJa ? '代表電話番号 2' : 'Phone 2 (Secondary)'}
                      </label>
                      <input
                        type="text"
                        value={companyForm.altPhone}
                        onChange={(e) => setCompanyForm({ ...companyForm, altPhone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-sm text-white focus:outline-none focus:border-[#C5A059]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-montserrat text-stone-400 mb-1.5">
                        {isJa ? '代表メールアドレス 1' : 'Email 1'}
                      </label>
                      <input
                        type="email"
                        value={companyForm.email}
                        onChange={(e) => setCompanyForm({ ...companyForm, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-sm text-white focus:outline-none focus:border-[#C5A059]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-montserrat text-stone-400 mb-1.5">
                        {isJa ? '代表メールアドレス 2' : 'Email 2'}
                      </label>
                      <input
                        type="email"
                        value={companyForm.altEmail}
                        onChange={(e) => setCompanyForm({ ...companyForm, altEmail: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-sm text-white focus:outline-none focus:border-[#C5A059]"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-montserrat text-stone-400 mb-1.5">
                        {isJa ? '営業時間 / ご案内 (日本語)' : 'Office Hours (JA)'}
                      </label>
                      <input
                        type="text"
                        value={companyForm.hoursJa}
                        onChange={(e) => setCompanyForm({ ...companyForm, hoursJa: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-sm text-white focus:outline-none focus:border-[#C5A059]"
                      />
                    </div>
                  </div>
                </form>
              )}

              {/* TAB 2: DIRECTORS */}
              {activeTab === 'directors' && (
                <div className="space-y-6 max-w-3xl">
                  <div className="border-b border-stone-800 pb-4 flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-bold font-shippori text-white">
                        {isJa ? '代表取締役・役員情報の管理' : 'Directors & Executive Architects'}
                      </h4>
                      <p className="text-xs text-stone-400 font-montserrat">
                        {isJa ? '会社概要や名刺セクションに掲載される役員情報を編集します。' : 'Manage executive contacts, telephone numbers, and bios.'}
                      </p>
                    </div>
                    <button
                      onClick={handleSaveDirectors}
                      className="px-4 py-2 rounded-xl text-xs font-montserrat uppercase font-semibold text-white flex items-center gap-1.5 border shadow hover:brightness-110"
                      style={{
                        backgroundColor: themeConfig.accentColor,
                        borderColor: themeConfig.goldColor
                      }}
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>{isJa ? '役員情報を保存' : 'Save Directors'}</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {directorsList.map((dir, idx) => (
                      <div
                        key={idx}
                        className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-4"
                      >
                        <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                          <span className="font-bold text-sm text-[#C5A059] font-shippori">
                            {dir.nameJa} ({dir.nameEn}) — {dir.roleJa}
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => setEditingDirectorIdx(editingDirectorIdx === idx ? null : idx)}
                              className="px-2.5 py-1 rounded bg-stone-800 text-xs text-stone-300 hover:text-white flex items-center gap-1"
                            >
                              <Edit3 className="w-3 h-3" />
                              <span>{editingDirectorIdx === idx ? (isJa ? '閉じる' : 'Close') : (isJa ? '編集' : 'Edit')}</span>
                            </button>
                            {directorsList.length > 1 && (
                              <button
                                type="button"
                                onClick={() => {
                                  if (confirm(isJa ? 'この役員を削除しますか？' : 'Delete this director?')) {
                                    deleteDirector(idx);
                                    setDirectorsList(directorsList.filter((_, i) => i !== idx));
                                    showToast(isJa ? '役員を削除しました' : 'Director deleted');
                                  }
                                }}
                                className="p-1.5 rounded bg-red-950/40 text-red-400 hover:text-red-300 border border-red-900/50"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Editable fields */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                          <div>
                            <label className="block text-stone-400 mb-1">{isJa ? '氏名 (日本語/漢字)' : 'Name (JA)'}</label>
                            <input
                              type="text"
                              value={dir.nameJa}
                              onChange={(e) => {
                                const updated = [...directorsList];
                                updated[idx].nameJa = e.target.value;
                                setDirectorsList(updated);
                              }}
                              className="w-full px-3 py-2 rounded-lg bg-stone-950 border border-stone-800 text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-stone-400 mb-1">{isJa ? '氏名 (英語/ローマ字)' : 'Name (EN)'}</label>
                            <input
                              type="text"
                              value={dir.nameEn}
                              onChange={(e) => {
                                const updated = [...directorsList];
                                updated[idx].nameEn = e.target.value;
                                setDirectorsList(updated);
                              }}
                              className="w-full px-3 py-2 rounded-lg bg-stone-950 border border-stone-800 text-white"
                            />
                          </div>

                          <div>
                            <label className="block text-stone-400 mb-1">{isJa ? '役職 (日本語)' : 'Role (JA)'}</label>
                            <input
                              type="text"
                              value={dir.roleJa}
                              onChange={(e) => {
                                const updated = [...directorsList];
                                updated[idx].roleJa = e.target.value;
                                setDirectorsList(updated);
                              }}
                              className="w-full px-3 py-2 rounded-lg bg-stone-950 border border-stone-800 text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-stone-400 mb-1">{isJa ? '役職 (英語)' : 'Role (EN)'}</label>
                            <input
                              type="text"
                              value={dir.roleEn}
                              onChange={(e) => {
                                const updated = [...directorsList];
                                updated[idx].roleEn = e.target.value;
                                setDirectorsList(updated);
                              }}
                              className="w-full px-3 py-2 rounded-lg bg-stone-950 border border-stone-800 text-white"
                            />
                          </div>

                          <div>
                            <label className="block text-stone-400 mb-1">{isJa ? '直通電話番号' : 'Direct Phone'}</label>
                            <input
                              type="text"
                              value={dir.phone}
                              onChange={(e) => {
                                const updated = [...directorsList];
                                updated[idx].phone = e.target.value;
                                setDirectorsList(updated);
                              }}
                              className="w-full px-3 py-2 rounded-lg bg-stone-950 border border-stone-800 text-white font-mono"
                            />
                          </div>
                          <div>
                            <label className="block text-stone-400 mb-1">{isJa ? '直通メールアドレス' : 'Direct Email'}</label>
                            <input
                              type="email"
                              value={dir.email}
                              onChange={(e) => {
                                const updated = [...directorsList];
                                updated[idx].email = e.target.value;
                                setDirectorsList(updated);
                              }}
                              className="w-full px-3 py-2 rounded-lg bg-stone-950 border border-stone-800 text-white font-mono"
                            />
                          </div>

                          <div className="sm:col-span-2">
                            <label className="block text-stone-400 mb-1">{isJa ? 'プロフィール・経歴 (日本語)' : 'Bio (JA)'}</label>
                            <textarea
                              rows={2}
                              value={dir.bioJa}
                              onChange={(e) => {
                                const updated = [...directorsList];
                                updated[idx].bioJa = e.target.value;
                                setDirectorsList(updated);
                              }}
                              className="w-full px-3 py-2 rounded-lg bg-stone-950 border border-stone-800 text-white text-xs"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add New Director Box */}
                  <div className="p-5 rounded-2xl bg-stone-950 border border-dashed border-stone-800 space-y-3">
                    <h5 className="text-xs font-montserrat font-bold text-stone-300 uppercase flex items-center gap-1.5">
                      <Plus className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span>{isJa ? '新しい役員・建築家を追加' : 'Add New Director'}</span>
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <input
                        type="text"
                        placeholder={isJa ? '氏名 (日本語)' : 'Name (JA)'}
                        value={newDirector.nameJa}
                        onChange={(e) => setNewDirector({ ...newDirector, nameJa: e.target.value })}
                        className="px-3 py-2 rounded-lg bg-stone-900 border border-stone-800 text-white"
                      />
                      <input
                        type="text"
                        placeholder={isJa ? '氏名 (英語)' : 'Name (EN)'}
                        value={newDirector.nameEn}
                        onChange={(e) => setNewDirector({ ...newDirector, nameEn: e.target.value })}
                        className="px-3 py-2 rounded-lg bg-stone-900 border border-stone-800 text-white"
                      />
                      <input
                        type="text"
                        placeholder={isJa ? '役職' : 'Role'}
                        value={newDirector.roleJa}
                        onChange={(e) => setNewDirector({ ...newDirector, roleJa: e.target.value })}
                        className="px-3 py-2 rounded-lg bg-stone-900 border border-stone-800 text-white"
                      />
                      <input
                        type="text"
                        placeholder={isJa ? '電話番号' : 'Phone'}
                        value={newDirector.phone}
                        onChange={(e) => setNewDirector({ ...newDirector, phone: e.target.value })}
                        className="px-3 py-2 rounded-lg bg-stone-900 border border-stone-800 text-white"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        if (!newDirector.nameJa) {
                          alert(isJa ? '氏名を入力してください' : 'Name is required');
                          return;
                        }
                        addDirector(newDirector);
                        setDirectorsList([...directorsList, newDirector]);
                        setNewDirector({
                          nameJa: '',
                          nameEn: '',
                          nameKana: '',
                          roleJa: '代表取締役',
                          roleEn: 'Representative Director',
                          phone: '',
                          email: '',
                          bioJa: '',
                          bioEn: ''
                        });
                        showToast(isJa ? '新しい役員を追加しました' : 'Director added');
                      }}
                      className="px-4 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-xs text-white font-montserrat font-medium flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{isJa ? '役員リストに追加' : 'Add to List'}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 3: PORTFOLIO PROJECTS */}
              {activeTab === 'portfolio' && (
                <div className="space-y-6">
                  <div className="border-b border-stone-800 pb-4 flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-bold font-shippori text-white">
                        {isJa ? '設計実績・ポートフォリオ管理' : 'Architecture Projects Portfolio'}
                      </h4>
                      <p className="text-xs text-stone-400 font-montserrat">
                        {isJa
                          ? `現在 ${projects.length} 件のプロジェクトが登録されています。`
                          : `Total ${projects.length} architectural works registered.`}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setIsAddingProject(true);
                        setEditingProject(null);
                        setProjectForm({
                          category: 'residential',
                          year: '2026',
                          area: '400 ㎡',
                          featured: true
                        });
                      }}
                      className="px-4 py-2 rounded-xl text-xs font-montserrat uppercase font-semibold text-white flex items-center gap-1.5 border shadow hover:brightness-110"
                      style={{
                        backgroundColor: themeConfig.accentColor,
                        borderColor: themeConfig.goldColor
                      }}
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{isJa ? '新規プロジェクト登録' : 'Add Project'}</span>
                    </button>
                  </div>

                  {/* Project Edit / Add Modal Form */}
                  {(isAddingProject || editingProject) && (
                    <form onSubmit={handleSaveProject} className="p-6 rounded-2xl bg-stone-900 border border-[#C5A059]/40 space-y-6">
                      <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-[#C5A059]">
                            {isAddingProject ? (isJa ? '＋ 新規プロジェクトの登録' : 'Add New Project') : (isJa ? '✎ プロジェクト情報の編集' : 'Edit Project')}
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              setAutoTranslateProject(!autoTranslateProject);
                              showToast(
                                !autoTranslateProject
                                  ? '영문 자동 번역이 활성화되었습니다'
                                  : '영문 자동 번역이 비활성화되었습니다 (수동 입력)'
                              );
                            }}
                            className={`text-[11px] px-2.5 py-0.5 rounded-full border flex items-center gap-1 font-mono transition-colors ${
                              autoTranslateProject
                                ? 'bg-emerald-950/70 text-emerald-300 border-emerald-700 hover:bg-emerald-900/60'
                                : 'bg-stone-800 text-stone-400 border-stone-700 hover:text-white'
                            }`}
                          >
                            <Sparkles className="w-3 h-3" />
                            <span>{autoTranslateProject ? '영문 자동 변환 ON' : '영문 자동 변환 OFF (수동)'}</span>
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setIsAddingProject(false);
                            setEditingProject(null);
                          }}
                          className="p-1 rounded text-stone-400 hover:text-white"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                        {/* Title JA / Project Name */}
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <label className="text-stone-300 font-medium">
                              {isJa ? 'プロジェクト名 (日本語 / 한국어)' : 'Project Title (JA / KO)'} <span className="text-[#C5A059]">*</span>
                            </label>
                            <span className="text-[10px] text-stone-400">입력 시 영문 자동 생성</span>
                          </div>
                          <input
                            type="text"
                            required
                            placeholder="예: 軽井沢の森の邸宅 / 한남동 펜트하우스"
                            value={projectForm.title?.ja || ''}
                            onChange={(e) => handleProjectTitleJaChange(e.target.value)}
                            className="w-full px-3 py-2.5 rounded-lg bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-[#C5A059] text-xs font-shippori"
                          />
                        </div>

                        {/* Title EN */}
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <label className="text-stone-300 font-medium">
                              {isJa ? 'プロジェクト名 (英語 / Auto Generated)' : 'Project Title (EN)'}
                            </label>
                            <button
                              type="button"
                              onClick={handleRegenerateProjectEnglish}
                              className="text-[10px] text-[#C5A059] hover:underline flex items-center gap-1 font-mono"
                            >
                              <Wand2 className="w-2.5 h-2.5" />
                              <span>영문 다시 변환</span>
                            </button>
                          </div>
                          <input
                            type="text"
                            placeholder="Karuizawa Forest Sanctuary Residence"
                            value={projectForm.title?.en || ''}
                            onChange={(e) => setProjectForm({
                              ...projectForm,
                              title: { ja: projectForm.title?.ja || '', en: e.target.value }
                            })}
                            className="w-full px-3 py-2.5 rounded-lg bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-[#C5A059] text-xs font-montserrat"
                          />
                        </div>

                        {/* Subtitle JA */}
                        <div>
                          <label className="block text-stone-300 mb-1 font-medium">
                            {isJa ? 'サブタイトル (日本語 / 한국어)' : 'Subtitle (JA / KO)'}
                          </label>
                          <input
                            type="text"
                            placeholder="예: 自然と響き合う静寂の隠れ家"
                            value={projectForm.subtitle?.ja || ''}
                            onChange={(e) => setProjectForm({
                              ...projectForm,
                              subtitle: { ja: e.target.value, en: projectForm.subtitle?.en || '' }
                            })}
                            className="w-full px-3 py-2.5 rounded-lg bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-[#C5A059] text-xs"
                          />
                        </div>

                        {/* Subtitle EN */}
                        <div>
                          <label className="block text-stone-300 mb-1 font-medium">
                            {isJa ? 'サブタイトル (英語)' : 'Subtitle (EN)'}
                          </label>
                          <input
                            type="text"
                            placeholder="A Serene Sanctuary Harmonizing with Forest and Light"
                            value={projectForm.subtitle?.en || ''}
                            onChange={(e) => setProjectForm({
                              ...projectForm,
                              subtitle: { ja: projectForm.subtitle?.ja || '', en: e.target.value }
                            })}
                            className="w-full px-3 py-2.5 rounded-lg bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-[#C5A059] text-xs font-montserrat"
                          />
                        </div>

                        {/* Category & Slug */}
                        <div>
                          <label className="block text-stone-300 mb-1 font-medium">{isJa ? 'カテゴリ' : 'Category'}</label>
                          <select
                            value={projectForm.category || 'residential'}
                            onChange={(e) => {
                              const cat = e.target.value as ProjectCategory;
                              const labelMap: Record<ProjectCategory, { ja: string; en: string }> = {
                                all: { ja: 'すべて', en: 'All' },
                                residential: { ja: '高級邸宅', en: 'Private Estate' },
                                commercial: { ja: '商業旗艦店', en: 'Flagship Retail' },
                                hospitality: { ja: '別荘・リゾート', en: 'Alpine Villa' },
                                renovation: { ja: 'リノベーション', en: 'Regeneration' }
                              };
                              setProjectForm({
                                ...projectForm,
                                category: cat,
                                categoryLabel: labelMap[cat] || { ja: '建築', en: 'Architecture' }
                              });
                            }}
                            className="w-full px-3 py-2.5 rounded-lg bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-[#C5A059] text-xs"
                          >
                            <option value="residential">高級邸宅 (Private Estate)</option>
                            <option value="commercial">商業旗艦店 (Commercial Flagship)</option>
                            <option value="hospitality">別荘・リゾート (Alpine Villa / Hospitality)</option>
                            <option value="renovation">リノベーション (Regeneration / Renovation)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-stone-300 mb-1 font-medium">
                            {isJa ? 'URL識別子 (Slug)' : 'URL Slug'}
                          </label>
                          <input
                            type="text"
                            value={projectForm.slug || ''}
                            onChange={(e) => setProjectForm({ ...projectForm, slug: generateSlug(e.target.value) })}
                            className="w-full px-3 py-2.5 rounded-lg bg-stone-950 border border-stone-800 text-stone-300 font-mono text-xs focus:outline-none focus:border-[#C5A059]"
                          />
                        </div>

                        {/* Location JA & EN */}
                        <div>
                          <label className="block text-stone-300 mb-1 font-medium">{isJa ? '所在地 (日本語 / 한국어)' : 'Location (JA / KO)'}</label>
                          <input
                            type="text"
                            placeholder="長野県軽井沢町 / 서울시 용산구 한남동"
                            value={projectForm.location?.ja || ''}
                            onChange={(e) => setProjectForm({
                              ...projectForm,
                              location: { ja: e.target.value, en: projectForm.location?.en || e.target.value }
                            })}
                            className="w-full px-3 py-2.5 rounded-lg bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-[#C5A059] text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-stone-300 mb-1 font-medium">{isJa ? '所在地 (英語)' : 'Location (EN)'}</label>
                          <input
                            type="text"
                            placeholder="Karuizawa, Nagano / Hannam-dong, Seoul"
                            value={projectForm.location?.en || ''}
                            onChange={(e) => setProjectForm({
                              ...projectForm,
                              location: { ja: projectForm.location?.ja || '', en: e.target.value }
                            })}
                            className="w-full px-3 py-2.5 rounded-lg bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-[#C5A059] text-xs font-montserrat"
                          />
                        </div>

                        {/* Year & Area */}
                        <div>
                          <label className="block text-stone-300 mb-1 font-medium">{isJa ? '竣工年' : 'Completion Year'}</label>
                          <input
                            type="text"
                            value={projectForm.year || '2026'}
                            onChange={(e) => setProjectForm({ ...projectForm, year: e.target.value })}
                            className="w-full px-3 py-2.5 rounded-lg bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-[#C5A059] text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-stone-300 mb-1 font-medium">{isJa ? '延床面積' : 'Total Floor Area'}</label>
                          <input
                            type="text"
                            placeholder="450 ㎡"
                            value={projectForm.area || ''}
                            onChange={(e) => setProjectForm({ ...projectForm, area: e.target.value })}
                            className="w-full px-3 py-2.5 rounded-lg bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-[#C5A059] text-xs"
                          />
                        </div>

                        {/* Hero Image Upload */}
                        <div className="sm:col-span-2 pt-2 border-t border-stone-800">
                          <ImageUploadField
                            label={isJa ? '代表メイン画像 (PC / スマートフォンから直接アップロード)' : 'Hero Main Image (Upload from PC / Mobile)'}
                            required
                            value={projectForm.heroImage}
                            onChange={(url) => setProjectForm({ ...projectForm, heroImage: url })}
                            helperText="PC나 휴대폰에 저장된 사진을 직접 선택하거나 드래그하여 업로드할 수 있습니다."
                          />
                        </div>

                        {/* Gallery Multi Upload */}
                        <div className="sm:col-span-2 pt-2 border-t border-stone-800">
                          <MultiImageGalleryUpload
                            label={isJa ? 'ギャラリー写真コレクション (複数枚アップロード可能)' : 'Gallery Photos (Multi-Upload)'}
                            images={projectForm.gallery || []}
                            onChange={(imgs) => setProjectForm({ ...projectForm, gallery: imgs })}
                            helperText="PC 또는 스마트폰 앨범에서 여러 장의 고화질 준공 사진을 한 번에 선택하여 등록할 수 있습니다."
                          />
                        </div>

                        {/* Design Concept */}
                        <div className="sm:col-span-2 pt-2 border-t border-stone-800">
                          <label className="block text-stone-300 mb-1 font-medium">{isJa ? '設計コンセプト (日本語 / 한국어)' : 'Design Concept (JA / KO)'}</label>
                          <textarea
                            rows={3}
                            placeholder="건축적 철학과 빛, 공간의 연결성에 관한 설명..."
                            value={projectForm.concept?.ja || ''}
                            onChange={(e) => setProjectForm({
                              ...projectForm,
                              concept: { ja: e.target.value, en: projectForm.concept?.en || '' }
                            })}
                            className="w-full px-3 py-2.5 rounded-lg bg-stone-950 border border-stone-800 text-white text-xs focus:outline-none focus:border-[#C5A059]"
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-3 pt-2 border-t border-stone-800">
                        <button
                          type="button"
                          onClick={() => {
                            setIsAddingProject(false);
                            setEditingProject(null);
                          }}
                          className="px-4 py-2 rounded-lg bg-stone-800 text-xs text-stone-300 hover:text-white"
                        >
                          {isJa ? 'キャンセル' : 'Cancel'}
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-2.5 rounded-lg bg-[#C5A059] text-black text-xs font-semibold hover:brightness-110 flex items-center gap-1.5 shadow-lg"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>{isJa ? 'プロジェクトを保存' : 'Save Project'}</span>
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Project Cards List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {projects.map((proj) => (
                      <div
                        key={proj.id}
                        className="rounded-2xl bg-stone-900 border border-stone-800 overflow-hidden group flex flex-col justify-between"
                      >
                        <div className="relative aspect-[16/10] bg-stone-950 overflow-hidden">
                          <img
                            src={proj.heroImage}
                            alt={proj.title.ja}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur text-[10px] text-[#C5A059] font-mono">
                            {proj.category.toUpperCase()}
                          </div>
                        </div>

                        <div className="p-4 flex-1 flex flex-col justify-between">
                          <div>
                            <h5 className="font-bold text-sm text-white font-shippori line-clamp-1">
                              {proj.title.ja}
                            </h5>
                            <p className="text-xs text-stone-400 font-montserrat line-clamp-1 mt-0.5">
                              {proj.location.ja} • {proj.year} • {proj.area}
                            </p>
                          </div>

                          <div className="flex items-center justify-between pt-4 mt-2 border-t border-stone-800">
                            <button
                              onClick={() => {
                                setEditingProject(proj);
                                setProjectForm(proj);
                                setIsAddingProject(false);
                              }}
                              className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-xs text-white font-montserrat flex items-center gap-1"
                            >
                              <Edit3 className="w-3 h-3" />
                              <span>{isJa ? '編集' : 'Edit'}</span>
                            </button>

                            <button
                              onClick={() => {
                                if (confirm(isJa ? `「${proj.title.ja}」を削除しますか？` : 'Delete this project?')) {
                                  deleteProject(proj.id);
                                  showToast(isJa ? 'プロジェクトを削除しました' : 'Project deleted');
                                }
                              }}
                              className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-400 border border-red-900/50"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: SERVICES */}
              {activeTab === 'services' && (
                <div className="space-y-6 max-w-3xl">
                  <div className="border-b border-stone-800 pb-4 flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-bold font-shippori text-white">
                        {isJa ? '4大事業領域の編集' : 'Core Business Pillars'}
                      </h4>
                      <p className="text-xs text-stone-400 font-montserrat">
                        {isJa ? '名刺およびウェブサイトのトップに掲載される4つの事業内容を編集します。' : 'Edit labels and Japanese descriptions for the 4 core business sectors.'}
                      </p>
                    </div>
                    <button
                      onClick={handleSaveServices}
                      className="px-4 py-2 rounded-xl text-xs font-montserrat uppercase font-semibold text-white flex items-center gap-1.5 border shadow hover:brightness-110"
                      style={{
                        backgroundColor: themeConfig.accentColor,
                        borderColor: themeConfig.goldColor
                      }}
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>{isJa ? '保存する' : 'Save Services'}</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {servicesList.map((svc, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-stone-900 border border-stone-800 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div>
                          <label className="block text-stone-400 mb-1">{isJa ? '英語表記 (英字)' : 'English Label'}</label>
                          <input
                            type="text"
                            value={svc.en}
                            onChange={(e) => {
                              const updated = [...servicesList];
                              updated[idx].en = e.target.value;
                              setServicesList(updated);
                            }}
                            className="w-full px-3 py-2 rounded-lg bg-stone-950 border border-stone-800 text-white font-mono uppercase"
                          />
                        </div>
                        <div>
                          <label className="block text-stone-400 mb-1">{isJa ? '日本語説明・業務範囲' : 'Japanese Scope'}</label>
                          <input
                            type="text"
                            value={svc.ja}
                            onChange={(e) => {
                              const updated = [...servicesList];
                              updated[idx].ja = e.target.value;
                              setServicesList(updated);
                            }}
                            className="w-full px-3 py-2 rounded-lg bg-stone-950 border border-stone-800 text-white"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: JOURNAL ARTICLES */}
              {activeTab === 'journal' && (
                <div className="space-y-6">
                  <div className="border-b border-stone-800 pb-4 flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-bold font-shippori text-white">
                        {isJa ? '建築論考・ジャーナル記事管理' : 'Architectural Essays & Journal'}
                      </h4>
                      <p className="text-xs text-stone-400 font-montserrat">
                        {isJa ? `現在 ${journalArticles.length} 件の記事が公開されています。` : `Total ${journalArticles.length} journal essays published.`}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setIsAddingArticle(true);
                        setEditingArticle(null);
                        setArticleForm({
                          category: 'essay',
                          categoryLabel: { ja: '建築論考', en: 'Essay' },
                          date: new Date().toISOString().split('T')[0].replace(/-/g, '.')
                        });
                      }}
                      className="px-4 py-2 rounded-xl text-xs font-montserrat uppercase font-semibold text-white flex items-center gap-1.5 border shadow hover:brightness-110"
                      style={{
                        backgroundColor: themeConfig.accentColor,
                        borderColor: themeConfig.goldColor
                      }}
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{isJa ? '新規記事の執筆' : 'New Article'}</span>
                    </button>
                  </div>

                  {/* Add / Edit Article Form */}
                  {(isAddingArticle || editingArticle) && (
                    <form onSubmit={handleSaveArticle} className="p-6 rounded-2xl bg-stone-900 border border-[#C5A059]/40 space-y-5">
                      <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                        <span className="font-bold text-sm text-[#C5A059]">
                          {isAddingArticle ? (isJa ? '＋ 新規記事の執筆' : 'Write New Essay') : (isJa ? '✎ 記事の編集' : 'Edit Essay')}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setIsAddingArticle(false);
                            setEditingArticle(null);
                          }}
                          className="p-1 rounded text-stone-400 hover:text-white"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                        <div>
                          <label className="block text-stone-300 mb-1 font-medium">{isJa ? '記事タイトル (日本語 / 한국어)' : 'Title (JA / KO)'} *</label>
                          <input
                            type="text"
                            required
                            placeholder="예: 建築における陰翳と静寂の美学"
                            value={articleForm.title?.ja || ''}
                            onChange={(e) => handleArticleTitleJaChange(e.target.value)}
                            className="w-full px-3 py-2.5 rounded-lg bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-[#C5A059]"
                          />
                        </div>

                        <div>
                          <label className="block text-stone-300 mb-1 font-medium">{isJa ? '記事タイトル (英語 / Auto Generated)' : 'Title (EN)'}</label>
                          <input
                            type="text"
                            placeholder="Aesthetics of Shadow and Serenity in Architecture"
                            value={articleForm.title?.en || ''}
                            onChange={(e) => setArticleForm({
                              ...articleForm,
                              title: { ja: articleForm.title?.ja || '', en: e.target.value }
                            })}
                            className="w-full px-3 py-2.5 rounded-lg bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-[#C5A059] font-montserrat"
                          />
                        </div>

                        <div>
                          <label className="block text-stone-300 mb-1 font-medium">{isJa ? '執筆者' : 'Author'}</label>
                          <input
                            type="text"
                            value={articleForm.author?.ja || ''}
                            onChange={(e) => setArticleForm({
                              ...articleForm,
                              author: { ja: e.target.value, en: articleForm.author?.en || e.target.value }
                            })}
                            className="w-full px-3 py-2.5 rounded-lg bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-[#C5A059]"
                          />
                        </div>

                        <div>
                          <label className="block text-stone-300 mb-1 font-medium">{isJa ? '公開日' : 'Published Date'}</label>
                          <input
                            type="text"
                            placeholder="2026.04.15"
                            value={articleForm.date || ''}
                            onChange={(e) => setArticleForm({ ...articleForm, date: e.target.value })}
                            className="w-full px-3 py-2.5 rounded-lg bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-[#C5A059]"
                          />
                        </div>

                        {/* Cover Image with Local Upload */}
                        <div className="sm:col-span-2 pt-2 border-t border-stone-800">
                          <ImageUploadField
                            label={isJa ? '記事カバー画像 (PC / スマートフォンから直接アップロード)' : 'Article Cover Image (Upload from PC / Mobile)'}
                            value={articleForm.coverImage}
                            onChange={(url) => setArticleForm({ ...articleForm, coverImage: url })}
                            helperText="PC나 휴대폰에 저장된 사진을 직접 선택하거나 드래그하여 등록할 수 있습니다."
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-stone-300 mb-1 font-medium">{isJa ? '概要・リード文 (日本語 / 한국어)' : 'Excerpt (JA / KO)'}</label>
                          <textarea
                            rows={3}
                            placeholder="기사의 핵심 요약 및 서두를 입력하세요..."
                            value={articleForm.excerpt?.ja || ''}
                            onChange={(e) => setArticleForm({
                              ...articleForm,
                              excerpt: { ja: e.target.value, en: articleForm.excerpt?.en || '' }
                            })}
                            className="w-full px-3 py-2.5 rounded-lg bg-stone-950 border border-stone-800 text-white text-xs focus:outline-none focus:border-[#C5A059]"
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-3 pt-2 border-t border-stone-800">
                        <button
                          type="button"
                          onClick={() => {
                            setIsAddingArticle(false);
                            setEditingArticle(null);
                          }}
                          className="px-4 py-2 rounded-lg bg-stone-800 text-xs text-stone-300 hover:text-white"
                        >
                          {isJa ? 'キャンセル' : 'Cancel'}
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-2.5 rounded-lg bg-[#C5A059] text-black text-xs font-semibold hover:brightness-110 flex items-center gap-1.5 shadow-lg"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>{isJa ? '記事を保存・公開' : 'Publish Article'}</span>
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Articles List */}
                  <div className="space-y-3">
                    {journalArticles.map((art) => (
                      <div
                        key={art.id}
                        className="p-4 rounded-2xl bg-stone-900 border border-stone-800 flex items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-4">
                          <img src={art.coverImage} alt={art.title.ja} className="w-16 h-12 object-cover rounded-lg" />
                          <div>
                            <h5 className="font-bold text-sm text-white font-shippori line-clamp-1">{art.title.ja}</h5>
                            <span className="text-xs text-stone-400 font-montserrat">{art.date} • {art.author.ja}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setEditingArticle(art);
                              setArticleForm(art);
                              setIsAddingArticle(false);
                            }}
                            className="px-3 py-1.5 rounded-lg bg-stone-800 text-xs text-white flex items-center gap-1"
                          >
                            <Edit3 className="w-3 h-3" />
                            <span>{isJa ? '編集' : 'Edit'}</span>
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(isJa ? 'この記事を削除しますか？' : 'Delete article?')) {
                                deleteArticle(art.id);
                                showToast(isJa ? '記事を削除しました' : 'Article deleted');
                              }
                            }}
                            className="p-1.5 rounded-lg bg-red-950/40 text-red-400 border border-red-900/50"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 6: INQUIRIES & FORMSPREE */}
              {activeTab === 'inquiries' && (
                <div className="space-y-6 max-w-4xl">
                  {/* Formspree Endpoint Configuration Box */}
                  <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-4">
                    <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                      <div>
                        <h4 className="text-sm font-bold font-montserrat uppercase text-white flex items-center gap-2">
                          <Send className="w-4 h-4 text-[#C5A059]" />
                          <span>{isJa ? 'Formspree データ収集エンドポイント設定' : 'Formspree Endpoint Configuration'}</span>
                        </h4>
                        <p className="text-xs text-stone-400 mt-0.5">
                          {isJa
                            ? 'ウェブサイトのお問い合わせフォームから送信されるデータの送信先URLです。'
                            : 'Endpoint URL to receive contact inquiries from the website.'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <input
                        type="url"
                        value={endpointInput}
                        onChange={(e) => setEndpointInput(e.target.value)}
                        className="flex-1 px-4 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-sm text-white font-mono focus:outline-none focus:border-[#C5A059]"
                        placeholder="https://formspree.io/f/mdeoeevy"
                      />
                      <button
                        type="button"
                        onClick={handleSaveEndpoint}
                        className="px-4 py-2.5 rounded-xl bg-[#C5A059] text-black text-xs font-semibold font-montserrat hover:brightness-110 shrink-0"
                      >
                        {isJa ? 'URL更新' : 'Update URL'}
                      </button>
                    </div>
                  </div>

                  {/* Local Inquiries Inbox */}
                  <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-4">
                    <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                      <div>
                        <h4 className="text-sm font-bold font-montserrat uppercase text-white">
                          {isJa ? '📥 最近の相談・問い合わせ受信ログ (Local Log)' : 'Recent Inquiries Archive'}
                        </h4>
                        <span className="text-xs text-stone-400">
                          {isJa ? `合計 ${inquiryLogs.length} 件の相談が記録されています。` : `Total ${inquiryLogs.length} inquiries logged.`}
                        </span>
                      </div>

                      {inquiryLogs.length > 0 && (
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(isJa ? '問い合わせログを消去しますか？' : 'Clear all inquiry logs?')) {
                              clearInquiryLogs();
                              showToast(isJa ? 'ログを消去しました' : 'Logs cleared');
                            }
                          }}
                          className="px-3 py-1 rounded bg-stone-800 text-xs text-red-400 hover:text-red-300"
                        >
                          {isJa ? 'ログ消去' : 'Clear'}
                        </button>
                      )}
                    </div>

                    {inquiryLogs.length === 0 ? (
                      <div className="py-12 text-center text-xs text-stone-500 font-montserrat">
                        {isJa ? 'まだ受信した問い合わせはありません。' : 'No inquiry logs recorded yet.'}
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {inquiryLogs.map((inq) => (
                          <div
                            key={inq.id}
                            className="p-4 rounded-xl bg-stone-950 border border-stone-800 text-xs space-y-2"
                          >
                            <div className="flex items-center justify-between text-stone-400 font-mono">
                              <span className="font-bold text-white text-sm">{inq.name} 様</span>
                              <span>{inq.createdAt}</span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-stone-300">
                              <div><strong>Email:</strong> {inq.email}</div>
                              <div><strong>Phone:</strong> {inq.phone}</div>
                              <div><strong>Category:</strong> {inq.category}</div>
                              <div><strong>Budget:</strong> {inq.budgetScale}</div>
                            </div>
                            <div className="p-2.5 rounded bg-stone-900/80 text-stone-300 border border-stone-800/80 whitespace-pre-wrap">
                              {inq.message}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 7: SECURITY & BACKUP */}
              {activeTab === 'security' && (
                <div className="space-y-6 max-w-3xl">
                  {/* Change Admin Password */}
                  <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-4">
                    <h4 className="text-sm font-bold font-montserrat uppercase text-white flex items-center gap-2">
                      <Lock className="w-4 h-4 text-[#C5A059]" />
                      <span>{isJa ? '管理者パスワード変更' : 'Change Admin Password'}</span>
                    </h4>
                    <p className="text-xs text-stone-400">
                      {isJa ? '現在のパスワード（初期値: 7458）から新しいパスワードに変更できます。' : 'Update your 4-digit or custom admin access passcode.'}
                    </p>

                    <form onSubmit={handleChangePassword} className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="block text-stone-400 mb-1">{isJa ? '新しいパスワード' : 'New Password'}</label>
                        <input
                          type="password"
                          required
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-stone-950 border border-stone-800 text-white font-mono"
                          placeholder="例: 7458"
                        />
                      </div>
                      <div>
                        <label className="block text-stone-400 mb-1">{isJa ? '新しいパスワード (確認)' : 'Confirm Password'}</label>
                        <input
                          type="password"
                          required
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-stone-950 border border-stone-800 text-white font-mono"
                        />
                      </div>
                      <div className="sm:col-span-2 pt-1">
                        <button
                          type="submit"
                          className="px-4 py-2 rounded-lg bg-[#C5A059] text-black text-xs font-semibold hover:brightness-110"
                        >
                          {isJa ? 'パスワードを更新' : 'Update Password'}
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* JSON Backup Export & Import */}
                  <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-4">
                    <h4 className="text-sm font-bold font-montserrat uppercase text-white flex items-center gap-2">
                      <Download className="w-4 h-4 text-[#C5A059]" />
                      <span>{isJa ? 'データバックアップ (JSON) と復元' : 'Data Export & Import'}</span>
                    </h4>
                    <p className="text-xs text-stone-400">
                      {isJa
                        ? '登録したすべての会社情報、プロジェクト、役員データ、ジャーナル記事をJSON形式でダウンロードまたは復元できます。'
                        : 'Download or upload the entire site database JSON file for external archiving.'}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <button
                        type="button"
                        onClick={handleExportBackup}
                        className="px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-white text-xs font-montserrat font-medium flex items-center gap-2 border border-stone-700"
                      >
                        <Download className="w-3.5 h-3.5 text-[#C5A059]" />
                        <span>{isJa ? 'バックアップをダウンロード (.json)' : 'Export JSON Backup'}</span>
                      </button>

                      <label className="px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-white text-xs font-montserrat font-medium flex items-center gap-2 border border-stone-700 cursor-pointer">
                        <Upload className="w-3.5 h-3.5 text-[#C5A059]" />
                        <span>{isJa ? 'バックアップを復元' : 'Import JSON'}</span>
                        <input
                          type="file"
                          accept=".json"
                          onChange={handleImportBackup}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  {/* Reset to Factory Defaults */}
                  <div className="p-5 rounded-2xl bg-red-950/20 border border-red-900/50 space-y-3">
                    <h4 className="text-sm font-bold text-red-400 flex items-center gap-2">
                      <RotateCcw className="w-4 h-4" />
                      <span>{isJa ? '初期データへのリセット' : 'Factory Reset'}</span>
                    </h4>
                    <p className="text-xs text-stone-400">
                      {isJa
                        ? 'すべての編集内容を破棄し、初期の建築プロジェクト・新宿所在地・役員データに戻します。'
                        : 'Restore default Zenith Tokyo architectural projects, directors, and specifications.'}
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(isJa ? '本当に初期データに戻しますか？（変更内容はリセットされます）' : 'Reset all data back to original state?')) {
                          resetToDefaults();
                          showToast(isJa ? '初期データに復元しました' : 'Restored to defaults');
                        }
                      }}
                      className="px-4 py-2 rounded-lg bg-red-900/60 hover:bg-red-800 text-red-100 text-xs font-semibold"
                    >
                      {isJa ? '初期状態に戻す' : 'Reset to Defaults'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
