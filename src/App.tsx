import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { PortfolioSection } from './components/PortfolioSection';
import { ProjectModal } from './components/ProjectModal';
import { ProcessSection } from './components/ProcessSection';
import { JournalSection } from './components/JournalSection';
import { ArticleModal } from './components/ArticleModal';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { StyleCustomizerModal } from './components/StyleCustomizerModal';
import { LineConsultModal } from './components/LineConsultModal';
import { AdminModal } from './components/AdminModal';
import { SiteDataProvider, useSiteData } from './context/SiteDataContext';
import { Language, PageSection, Project, JournalArticle, ThemeConfig } from './types';

function AppContent() {
  const { projects, isAdminOpen, openAdmin, closeAdmin } = useSiteData();
  const [lang, setLang] = useState<Language>('ja');
  const [currentSection, setCurrentSection] = useState<PageSection>('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<JournalArticle | null>(null);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isLineModalOpen, setIsLineModalOpen] = useState(false);
  const [prefilledInquiryTopic, setPrefilledInquiryTopic] = useState('');

  // Default theme token configuration based on Zenith Tokyo "Luxury & Dark Nature"
  const [themeConfig, setThemeConfig] = useState<ThemeConfig>({
    accentColor: '#1A3026', // Deep Forest Green
    accentName: 'Deep Forest Green',
    goldColor: '#C5A059', // Champagne Gold
    fontPreset: 'mincho'
  });

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'ja' ? 'en' : 'ja'));
  };

  const handleNavigate = (section: PageSection) => {
    setCurrentSection(section);
    const elem = document.getElementById(section);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    } else if (section === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectProjectBySlug = (slug: string) => {
    const found = projects.find((p) => p.slug === slug);
    if (found) {
      setSelectedProject(found);
    }
  };

  const handleInquireAboutProject = (projectTitle: string) => {
    setPrefilledInquiryTopic(projectTitle);
    handleNavigate('contact');
  };

  return (
    <div
      id="zenith-tokyo-app-root"
      className={`min-h-screen bg-[#1A1C20] text-[#EAEAEA] ${
        themeConfig.fontPreset === 'mincho' ? 'font-shippori' : 'font-sans-modern'
      }`}
    >
      {/* Top Fixed Header Navbar */}
      <Navbar
        currentSection={currentSection}
        onNavigate={handleNavigate}
        lang={lang}
        onToggleLang={toggleLanguage}
        themeConfig={themeConfig}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
        onOpenLineModal={() => setIsLineModalOpen(true)}
        onOpenAdmin={openAdmin}
      />

      <main id="main-content">
        {/* Hero Section */}
        <HeroSection
          lang={lang}
          themeConfig={themeConfig}
          onNavigate={handleNavigate}
          onSelectProjectBySlug={handleSelectProjectBySlug}
        />

        {/* Studio Philosophy & Architect Section */}
        <AboutSection
          lang={lang}
          themeConfig={themeConfig}
          onNavigateToPortfolio={() => handleNavigate('portfolio')}
        />

        {/* Selected Architecture Portfolio Works */}
        <PortfolioSection
          lang={lang}
          themeConfig={themeConfig}
          onSelectProject={(proj) => setSelectedProject(proj)}
        />

        {/* Methodology & Process Timeline */}
        <ProcessSection
          lang={lang}
          themeConfig={themeConfig}
          onConsultationClick={() => handleNavigate('contact')}
        />

        {/* Essays & Architecture Journal */}
        <JournalSection
          lang={lang}
          themeConfig={themeConfig}
          onSelectArticle={(article) => setSelectedArticle(article)}
        />

        {/* Contact & Consultation with New Shinjuku Address */}
        <ContactSection
          lang={lang}
          themeConfig={themeConfig}
          onOpenLineModal={() => setIsLineModalOpen(true)}
          prefilledTopic={prefilledInquiryTopic}
        />
      </main>

      {/* Main Footer with New Shinjuku Address */}
      <Footer
        lang={lang}
        themeConfig={themeConfig}
        onNavigate={handleNavigate}
        onOpenLineModal={() => setIsLineModalOpen(true)}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
      />

      {/* Interactive Modals */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        lang={lang}
        themeConfig={themeConfig}
        onInquireAboutProject={handleInquireAboutProject}
      />

      <ArticleModal
        article={selectedArticle}
        isOpen={!!selectedArticle}
        onClose={() => setSelectedArticle(null)}
        lang={lang}
        themeConfig={themeConfig}
      />

      <StyleCustomizerModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        themeConfig={themeConfig}
        onChangeTheme={(newConfig) => setThemeConfig(newConfig)}
        lang={lang}
      />

      <LineConsultModal
        isOpen={isLineModalOpen}
        onClose={() => setIsLineModalOpen(false)}
        lang={lang}
      />

      {/* Admin Management System (Password Protected: 7458) */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={closeAdmin}
        lang={lang}
        themeConfig={themeConfig}
      />
    </div>
  );
}

export function App() {
  return (
    <SiteDataProvider>
      <AppContent />
    </SiteDataProvider>
  );
}

export default App;
