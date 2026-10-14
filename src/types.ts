export type ViewMode = 
  | 'home' 
  | 'about' 
  | 'services' 
  | 'service-detail' 
  | 'portfolio' 
  | 'project-detail' 
  | 'testimonials' 
  | 'faqs' 
  | 'contact' 
  | '404';

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  client: string;
  role: string;
  scope?: string;
  category: 'b2b-saas' | 'analytics' | 'growth' | 'architecture' | 'web-development';
  categoryLabel: string;
  tags: string[];
  summary: string;
  featured: boolean;
  metrics: {
    label: string;
    value: string;
    trend?: string;
  }[];
  challenge: string;
  solution: string;
  impact: string;
  technologies: string[];
  duration: string;
  deliverables: string[];
  liveUrl?: string;
  publishedArticleUrls?: {
    title: string;
    url: string;
    publication: string;
  }[];
}

export interface DevelopedWebsite {
  id: string;
  title: string;
  brandName?: string;
  client: string;
  role: string;
  scope: string; // e.g. "Architecture + UI/UX Design + Content & Copy"
  url: string;
  domain: string;
  industry: string;
  location: string;
  summary: string;
  description: string;
  divisionsOrFeatures: {
    name: string;
    description: string;
  }[];
  architectureHighlights: string[];
  uxDesignHighlights: string[];
  copyHighlights: string[];
  techStack: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  status: 'Live & Operational' | 'Live Production' | 'Live Staging';
  badgeColor?: string;
}

export interface PublishedArticle {
  id: string;
  title: string;
  url: string;
  publication: 'Sprinklr' | 'YU-Pay' | 'BestDoc' | 'YsecIT' | string;
  publicationDomain: string;
  category: 
    | 'Enterprise MarTech & AI' 
    | 'Social Media Analytics' 
    | 'FinTech & Payments' 
    | 'HealthTech SaaS' 
    | 'Hospitality & Operations' 
    | 'Technical Architecture'
    | string;
  description: string;
  keyTopics: string[];
  readTime: string;
  targetAudience: string;
  highlightTag: string;
  keyTakeaways?: string[];
  snippetQuote?: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  focus: string;
  description: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  fullDescription: string;
  iconName: string;
  features: string[];
  deliverables: string[];
  methodology: string;
  tools: string[];
  industries: {
    name: string;
    icon: string;
    desc: string;
  }[];
}

export interface TestimonialItem {
  id: string;
  quote: string;
  clientName: string;
  clientRole: string;
  company: string;
  industry: string;
  avatarText: string;
  rating: number;
  highlightTag: string;
  verifiedProject: string;
}

export interface FaqItem {
  id: string;
  category: 'General' | 'Services' | 'Work Process' | 'Analytics & Python';
  question: string;
  answer: string;
  keyTakeaway?: string;
}

export interface MilestoneItem {
  year: string;
  title: string;
  companyOrVenture: string;
  tagline: string;
  description: string;
  metrics: string;
  skills: string[];
}

export interface PageSeoMeta {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  canonicalPath: string;
  keywords: string[];
  schemaType: string;
}
