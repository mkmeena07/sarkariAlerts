export enum PostCategory {
  LATEST_JOBS = 'Latest Jobs',
  ADMIT_CARD = 'Admit Card',
  RESULT = 'Result',
  ANSWER_KEY = 'Answer Key',
  SYLLABUS = 'Syllabus',
  ADMISSION = 'Admission',
  IMPORTANT = 'Important',
}

export interface ImportantDate {
  event: string;
  date: string;
}

export interface ApplicationFee {
  category: string;
  fee: string;
}

export interface AgeLimit {
  detail: string;
  age: string;
}

export interface VacancyDetail {
  postName: string;
  totalPosts: string;
  eligibility: string;
}

export interface ImportantLink {
  title: string;
  link: string;
}

export interface Post {
  id: number;
  title:string;
  isNew: boolean;
  category: PostCategory;
  link: string;
  publishDate: string;
  isFeatured: boolean;
  expiryDate?: string;
  
  // Detailed Content Fields
  shortInformation: string;
  importantDates: ImportantDate[];
  applicationFee: ApplicationFee[];
  ageLimit: AgeLimit[];
  vacancyDetails: VacancyDetail[];
  howToFillForm: string[];
  importantLinks: ImportantLink[];
}

export interface AdSlotConfig {
  id: string;
  width?: number;
  height?: number;
}

export interface AdSenseConfig {
  client: string;
  slots: {
    header: AdSlotConfig;
    sidebar: AdSlotConfig;
    inArticle: AdSlotConfig;
  };
}

export interface StaticPage {
  id: 'about-us' | 'contact-us' | 'privacy-policy' | 'disclaimer';
  title: string;
  content: string;
}

export interface SocialLink {
  name: string;
  link: string;
  color: string;
}

// Base interface for all homepage sections
interface HomePageSectionBase {
  id: string;
  title: string;
  style: 'default' | 'primary' | 'accent';
  width: '1' | '2' | '3'; // Represents column span on large screens
}

// For sections that display a list of posts from a category
export interface HomePagePostListSection extends HomePageSectionBase {
  type: 'post-list';
  category: PostCategory;
}

// For sections that display custom text content
export interface HomePageTextSection extends HomePageSectionBase {
  type: 'text';
  content: string;
}

// A union type for any kind of homepage section
export type HomePageSection = HomePagePostListSection | HomePageTextSection;

export interface SEOSettings {
  homeTitle: string;
  homeDescription: string;
  ogImageUrl: string;
  homeKeywords: string;
  footerText: string;
}