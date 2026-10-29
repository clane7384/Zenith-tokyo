export type Language = 'ja' | 'en';

export type PageSection = 'home' | 'about' | 'portfolio' | 'process' | 'journal' | 'contact';

export type ProjectCategory = 'all' | 'residential' | 'commercial' | 'hospitality' | 'renovation';

export interface LocalizedString {
  ja: string;
  en: string;
}

export interface LocalizedList {
  ja: string[];
  en: string[];
}

export interface Project {
  id: string;
  title: LocalizedString;
  subtitle: LocalizedString;
  category: ProjectCategory;
  categoryLabel: LocalizedString;
  location: LocalizedString;
  year: string;
  area: string;
  heroImage: string;
  gallery: string[];
  concept: LocalizedString;
  materials: LocalizedList;
  architects: LocalizedString;
  awards?: LocalizedString;
  featured?: boolean;
  slug: string;
}

export interface JournalArticle {
  id: string;
  title: LocalizedString;
  category: string;
  categoryLabel: LocalizedString;
  date: string;
  readTime: string;
  author: LocalizedString;
  coverImage: string;
  excerpt: LocalizedString;
  content: LocalizedList;
  tags: string[];
}

export interface ProcessStep {
  number: string;
  title: LocalizedString;
  subtitle: LocalizedString;
  duration: LocalizedString;
  description: LocalizedString;
  deliverables: LocalizedList;
  image: string;
}

export interface ThemeConfig {
  accentColor: string;
  accentName: string;
  goldColor: string;
  fontPreset: 'mincho' | 'sans';
}

export interface DirectorInfo {
  nameJa: string;
  nameEn: string;
  nameKana?: string;
  roleJa: string;
  roleEn: string;
  phone: string;
  email: string;
  altEmail?: string;
  bioJa: string;
  bioEn: string;
}

export interface ServiceInfo {
  id: string;
  en: string;
  ja: string;
}

export interface CompanyInfo {
  corporateNameJa: string;
  corporateNameEn: string;
  brandNameJa: string;
  brandNameEn: string;
  license: string;
  addressJa: string;
  addressEn: string;
  accessJa: string;
  accessEn: string;
  phone: string;
  altPhone: string;
  email: string;
  altEmail: string;
  hoursJa: string;
  hoursEn: string;
  services: ServiceInfo[];
  directors: DirectorInfo[];
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface InquiryData {
  name: string;
  email: string;
  phone: string;
  category: string;
  location: string;
  budgetScale: string;
  timeline: string;
  message: string;
  preferredContact: 'email' | 'phone' | 'line';
}

export interface InquiryLog extends InquiryData {
  id: string;
  createdAt: string;
}
