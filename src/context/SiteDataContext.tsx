import React, { createContext, useContext, useState, useEffect } from 'react';
import { COMPANY_INFO, PROJECTS, JOURNAL_ARTICLES } from '../data/mockData';
import {
  CompanyInfo,
  DirectorInfo,
  ServiceInfo,
  Project,
  JournalArticle,
  InquiryData,
  InquiryLog
} from '../types';

interface SiteDataContextType {
  companyInfo: CompanyInfo;
  projects: Project[];
  journalArticles: JournalArticle[];
  formspreeUrl: string;
  adminPassword: string;
  inquiryLogs: InquiryLog[];
  isAdminOpen: boolean;
  isAdminAuthenticated: boolean;
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;
  openAdmin: () => void;
  closeAdmin: () => void;
  updateCompanyInfo: (info: Partial<CompanyInfo>) => void;
  updateServices: (services: ServiceInfo[]) => void;
  updateDirectors: (directors: DirectorInfo[]) => void;
  addDirector: (director: DirectorInfo) => void;
  deleteDirector: (index: number) => void;
  addProject: (project: Project) => void;
  updateProject: (id: string, updated: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  addArticle: (article: JournalArticle) => void;
  updateArticle: (id: string, updated: Partial<JournalArticle>) => void;
  deleteArticle: (id: string) => void;
  setFormspreeUrl: (url: string) => void;
  updateAdminPassword: (newPw: string) => void;
  logInquiry: (inquiry: InquiryData) => void;
  clearInquiryLogs: () => void;
  resetToDefaults: () => void;
  exportBackupJSON: () => string;
  importBackupJSON: (jsonStr: string) => boolean;
}

const SiteDataContext = createContext<SiteDataContextType | null>(null);

const STORAGE_KEYS = {
  COMPANY: 'zenith_tokyo_company_info',
  PROJECTS: 'zenith_tokyo_projects',
  JOURNAL: 'zenith_tokyo_journal',
  FORMSPREE: 'zenith_tokyo_formspree_endpoint',
  ADMIN_PW: 'zenith_tokyo_admin_password',
  INQUIRY_LOGS: 'zenith_tokyo_inquiry_logs'
};

const DEFAULT_ADMIN_PW = '7458';
const DEFAULT_FORMSPREE_URL = 'https://formspree.io/f/mdeoeevy';

export const SiteDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Company Info State
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COMPANY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return COMPANY_INFO;
  });

  // Projects State
  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROJECTS);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return PROJECTS;
  });

  // Journal Articles State
  const [journalArticles, setJournalArticles] = useState<JournalArticle[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.JOURNAL);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return JOURNAL_ARTICLES;
  });

  // Formspree Endpoint State
  const [formspreeUrl, setFormspreeUrlState] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FORMSPREE);
      if (saved) return saved;
    } catch {
      // ignore
    }
    return DEFAULT_FORMSPREE_URL;
  });

  // Admin Password State (Default '7458')
  const [adminPassword, setAdminPassword] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ADMIN_PW);
      if (saved) return saved;
    } catch {
      // ignore
    }
    return DEFAULT_ADMIN_PW;
  });

  // Inquiry logs
  const [inquiryLogs, setInquiryLogs] = useState<InquiryLog[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.INQUIRY_LOGS);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [];
  });

  // Admin Modal UI & Auth state
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  // Sync to LocalStorage on updates
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.COMPANY, JSON.stringify(companyInfo));
    } catch {
      // ignore
    }
  }, [companyInfo]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
    } catch {
      // ignore
    }
  }, [projects]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.JOURNAL, JSON.stringify(journalArticles));
    } catch {
      // ignore
    }
  }, [journalArticles]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.FORMSPREE, formspreeUrl);
    } catch {
      // ignore
    }
  }, [formspreeUrl]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ADMIN_PW, adminPassword);
    } catch {
      // ignore
    }
  }, [adminPassword]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.INQUIRY_LOGS, JSON.stringify(inquiryLogs));
    } catch {
      // ignore
    }
  }, [inquiryLogs]);

  // Auth methods
  const loginAdmin = (enteredPassword: string): boolean => {
    if (enteredPassword === adminPassword || enteredPassword === DEFAULT_ADMIN_PW) {
      setIsAdminAuthenticated(true);
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
  };

  const openAdmin = () => {
    setIsAdminOpen(true);
  };

  const closeAdmin = () => {
    setIsAdminOpen(false);
  };

  // Company Info Update
  const updateCompanyInfo = (info: Partial<CompanyInfo>) => {
    setCompanyInfo((prev) => ({
      ...prev,
      ...info
    }));
  };

  const updateServices = (services: ServiceInfo[]) => {
    setCompanyInfo((prev) => ({
      ...prev,
      services
    }));
  };

  const updateDirectors = (directors: DirectorInfo[]) => {
    setCompanyInfo((prev) => ({
      ...prev,
      directors
    }));
  };

  const addDirector = (director: DirectorInfo) => {
    setCompanyInfo((prev) => ({
      ...prev,
      directors: [...prev.directors, director]
    }));
  };

  const deleteDirector = (index: number) => {
    setCompanyInfo((prev) => ({
      ...prev,
      directors: prev.directors.filter((_, i) => i !== index)
    }));
  };

  // Projects CRUD
  const addProject = (project: Project) => {
    setProjects((prev) => [project, ...prev]);
  };

  const updateProject = (id: string, updated: Partial<Project>) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updated } : p))
    );
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  // Journal Articles CRUD
  const addArticle = (article: JournalArticle) => {
    setJournalArticles((prev) => [article, ...prev]);
  };

  const updateArticle = (id: string, updated: Partial<JournalArticle>) => {
    setJournalArticles((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...updated } : a))
    );
  };

  const deleteArticle = (id: string) => {
    setJournalArticles((prev) => prev.filter((a) => a.id !== id));
  };

  const setFormspreeUrl = (url: string) => {
    setFormspreeUrlState(url.trim());
  };

  const updateAdminPassword = (newPw: string) => {
    if (newPw.trim()) {
      setAdminPassword(newPw.trim());
    }
  };

  // Inquiry Logger
  const logInquiry = (inquiry: InquiryData) => {
    const newEntry: InquiryLog = {
      ...inquiry,
      id: `inq-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      createdAt: new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })
    };
    setInquiryLogs((prev) => [newEntry, ...prev.slice(0, 49)]); // keep last 50
  };

  const clearInquiryLogs = () => {
    setInquiryLogs([]);
  };

  // Reset to Factory Defaults
  const resetToDefaults = () => {
    setCompanyInfo(COMPANY_INFO);
    setProjects(PROJECTS);
    setJournalArticles(JOURNAL_ARTICLES);
    setFormspreeUrlState(DEFAULT_FORMSPREE_URL);
    setAdminPassword(DEFAULT_ADMIN_PW);
    try {
      localStorage.removeItem(STORAGE_KEYS.COMPANY);
      localStorage.removeItem(STORAGE_KEYS.PROJECTS);
      localStorage.removeItem(STORAGE_KEYS.JOURNAL);
      localStorage.removeItem(STORAGE_KEYS.FORMSPREE);
      localStorage.removeItem(STORAGE_KEYS.ADMIN_PW);
      localStorage.removeItem(STORAGE_KEYS.INQUIRY_LOGS);
    } catch {
      // ignore
    }
  };

  // Export / Import
  const exportBackupJSON = (): string => {
    const data = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      companyInfo,
      projects,
      journalArticles,
      formspreeUrl,
      inquiryLogs
    };
    return JSON.stringify(data, null, 2);
  };

  const importBackupJSON = (jsonStr: string): boolean => {
    try {
      const data = JSON.parse(jsonStr);
      if (data.companyInfo) setCompanyInfo(data.companyInfo);
      if (data.projects && Array.isArray(data.projects)) setProjects(data.projects);
      if (data.journalArticles && Array.isArray(data.journalArticles)) setJournalArticles(data.journalArticles);
      if (data.formspreeUrl) setFormspreeUrlState(data.formspreeUrl);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <SiteDataContext.Provider
      value={{
        companyInfo,
        projects,
        journalArticles,
        formspreeUrl,
        adminPassword,
        inquiryLogs,
        isAdminOpen,
        isAdminAuthenticated,
        loginAdmin,
        logoutAdmin,
        openAdmin,
        closeAdmin,
        updateCompanyInfo,
        updateServices,
        updateDirectors,
        addDirector,
        deleteDirector,
        addProject,
        updateProject,
        deleteProject,
        addArticle,
        updateArticle,
        deleteArticle,
        setFormspreeUrl,
        updateAdminPassword,
        logInquiry,
        clearInquiryLogs,
        resetToDefaults,
        exportBackupJSON,
        importBackupJSON
      }}
    >
      {children}
    </SiteDataContext.Provider>
  );
};

export const useSiteData = (): SiteDataContextType => {
  const context = useContext(SiteDataContext);
  if (!context) {
    throw new Error('useSiteData must be used within a SiteDataProvider');
  }
  return context;
};
