import { 
  ProjectItem, 
  ServiceItem, 
  TestimonialItem, 
  FaqItem, 
  MilestoneItem, 
  PageSeoMeta, 
  ViewMode,
  PublishedArticle,
  EducationItem,
  DevelopedWebsite
} from '../types';

export const PERSONAL_INFO = {
  name: 'Sayan Nan',
  role: 'Senior Content Writer | Enterprise SEO Content Strategist | B2B Copywriter | Technical Writer',
  headlineRole: 'Senior B2B Copywriter & Enterprise SEO Content Strategist',
  tagline: 'Bridging Enterprise B2B SaaS Copywriting with Hard Data Analytics & Computer Science Fundamentals',
  heroHeadline: 'I Turn Complex SaaS, FinTech & Emerging Tech into High-Converting Pipeline.',
  heroSubheadline: '6+ years architecting high-impact B2B SaaS copy grounded in neuromarketing principles and cognitive persuasion for enterprise market leaders like Sprinklr (NYSE: CXM), YU-Pay, BestDoc, and YsecIT. Bridging full-funnel digital architecture, UI/UX systems, technical SEO, and closed-loop data telemetry with an MCA • MSc Computer Science and 7-year founder background.',
  email: 'sayan.contentwriter@gmail.com',
  phone: '09140627676',
  phoneDisplay: '+91 91406 27676',
  phoneHref: 'tel:+919140627676',
  linkedin: 'https://www.linkedin.com/in/contentwritersayan',
  availability: 'Available for Q4 Enterprise Projects & Direct Retainers',
  location: 'Bengaluru, Karnataka, India (Remote & On-Site)',
  stats: [
    { label: 'B2B SaaS / PaaS Experience', value: '6+', suffix: ' Yrs', detail: 'Sprinklr, YU-Pay, BestDoc, YsecIT & MarTech ecosystems' },
    { label: 'Live Developed Websites', value: '4', suffix: ' Live', detail: 'Architecture + UI/UX Design + Copy (VASTARA, YU-Pay, YOGH, Veritas)' },
    { label: 'Documented Customer Pain Points', value: '37+', suffix: ' Nodes', detail: 'Structured content matrices connecting features to pain points' },
    { label: 'Founder Leadership & P&L', value: '7+', suffix: ' Yrs', detail: 'Bootstrapped & directed After School Coaching Academy' },
  ],
  coreExpertise: [
    'Developed complete architecture, UI/UX design, and content & copy for 4 live production websites: VASTARA Trading (Dubai), YU-Pay, YOGH Hospitality (Suriname), and Veritas (Dubai Bullion).',
    'Designed 4+ complete website content frameworks, aligning UX writing principles with SEO strategy.',
    'Crafted product marketing materials, solution briefs, and conversion-optimized landing pages.',
    'Authored 12+ live bylined articles on emerging tech (HealthTech, FinTech, HospitalityTech, Marketing Automation) for C-suite audiences.',
    'Scaled product launches through conversion-optimized ad copy, email drip sequences, and WhatsApp marketing.',
    'Created SOPs, privacy policies, API documentation, and compliance guides (GDPR/CCPA) referenced by 10+ developer teams.',
  ],
  whyIStandOut: [
    'Blend marketing psychology with technical accuracy and genuine Computer Science foundation.',
    'Build content matrices connecting complex product features to 37+ documented customer pain points.',
    '7-year entrepreneurial background, having founded, led, and operated an after-school coaching academy.',
  ],
  bioIntro: `I operate at the rare intersection where quantitative rigor, computer science fundamentals, and high-stakes enterprise persuasion converge. With a Master of Computer Applications (MCA) and 6+ years spearheading content architecture for global SaaS/PaaS platforms like YU-Pay and BestDoc, I write content that withstands technical executive scrutiny.`,
  bioFounder: `For over 7 years, I founded, directed, and operated an after-school coaching academy in Lucknow, India. Managing daily operations, staff, budgets, curriculum quality, and parent/school partnerships instilled in me an unyielding founder mindset: every asset must justify its existence on a balance sheet. There is zero room for fluffy filler when real capital and reputations are on the line.`,
  bioPivot: `My career began with Computer Science and Management Information Systems (MIS), architecting databases and data telemetry for the Ministry of Rural Development's national MGNREGA scheme. Today, I combine that data architecture acumen with B2B SaaS copywriting, using Python for query scraping and Power BI for attribution tracking to convert high-intent enterprise pipeline.`,
};

export const EDUCATION_DATA: EducationItem[] = [
  {
    degree: 'Master of Computer Applications - MCA',
    institution: 'Maharshi Dayanand University',
    period: 'Jul 2009 – Jun 2010',
    focus: 'Computer Science, Relational Database Systems & Software Engineering',
    description: 'Advanced coursework in software architecture, database management systems (DBMS), algorithms, and technical documentation.'
  },
  {
    degree: 'Master of Science - MS',
    institution: 'Maharshi Dayanand University',
    period: 'Jul 2008 – Jun 2009',
    focus: 'Computer Science & Computational Systems',
    description: 'Foundational grounding in computer systems, data structures, discrete mathematics, and applied programming.'
  }
];

export const PUBLISHED_ARTICLES: PublishedArticle[] = [
  {
    id: 'sprinklr-ai-in-marketing',
    title: 'AI in Marketing: How Artificial Intelligence is Transforming Enterprise Strategies',
    url: 'https://www.sprinklr.com/blog/ai-in-marketing/',
    publication: 'Sprinklr',
    publicationDomain: 'sprinklr.com',
    category: 'Enterprise MarTech & AI',
    description: 'Enterprise guide exploring how Artificial Intelligence transforms modern marketing—from predictive audience segmentation and generative content workflows to omnichannel personalization, customer sentiment modeling, and automated campaign optimization.',
    keyTopics: ['AI in Marketing', 'Generative AI', 'Predictive Modeling', 'Omnichannel Personalization', 'Enterprise CXM'],
    readTime: '7 min read',
    targetAudience: 'Chief Marketing Officers, Enterprise Marketing Directors, MarTech Architects',
    highlightTag: 'Flagship Enterprise AI Guide',
    snippetQuote: 'Artificial intelligence is not replacing marketers; it is supercharging marketing teams that synthesize high-velocity customer listening with automated personalization.',
    keyTakeaways: [
      'Predictive audience scoring reduces enterprise customer churn by up to 28% through continuous sentiment telemetry.',
      'Generative AI workflows compress asset ideation-to-deployment lifecycles from weeks into hours across 30+ digital touchpoints.',
      'Unified CXM architectures prevent data silos between social listening, paid campaign attribution, and customer service.'
    ]
  },
  {
    id: 'sprinklr-social-media-in-america',
    title: 'Social Media in America: Demographic Trends, Consumer Behaviors & Platform Shifts',
    url: 'https://www.sprinklr.com/blog/social-media-in-america/',
    publication: 'Sprinklr',
    publicationDomain: 'sprinklr.com',
    category: 'Social Media Analytics',
    description: 'Data-grounded analysis of American social media consumption habits, user demographics across generational cohorts (Gen Z to Boomers), time-spent metrics, and shifting behavioral patterns impacting brand engagement across the United States.',
    keyTopics: ['Social Media Demographics', 'US Consumer Behavior', 'Audience Analytics', 'Platform Adoption', 'Market Intelligence'],
    readTime: '6 min read',
    targetAudience: 'Brand Strategists, Social Media Directors, Consumer Insights Leads',
    highlightTag: 'Macro Demographic Study',
    snippetQuote: 'Understanding demographic divergence across generational cohorts is the difference between high-engagement viral loyalty and wasted enterprise ad spend.',
    keyTakeaways: [
      'Gen Z and Millennial audiences prioritize peer authenticity and social search over traditional search engine discovery.',
      'Time-spent metrics demonstrate a shift toward private community channels and short-form video discovery platforms.',
      'Brands targeting multi-generational US cohorts must tailor messaging tone, platform cadences, and commerce integration.'
    ]
  },
  {
    id: 'sprinklr-hashtag-analytics',
    title: 'Hashtag Analytics: How to Track, Measure, and Maximize Social Reach & Campaign ROI',
    url: 'https://www.sprinklr.com/blog/hashtag-analytics/',
    publication: 'Sprinklr',
    publicationDomain: 'sprinklr.com',
    category: 'Social Media Analytics',
    description: 'Strategic breakdown of hashtag tracking telemetry, performance KPIs, reach multiplication, sentiment classification, and attribution frameworks required to transform casual social conversations into measurable brand equity and inbound pipeline.',
    keyTopics: ['Hashtag Analytics', 'Social Listening', 'Campaign Tracking', 'Reach & Impressions', 'Social ROI'],
    readTime: '5 min read',
    targetAudience: 'Social Media Analytics Teams, Digital Marketing Heads, Campaign Managers',
    highlightTag: 'Social Listening & Telemetry',
    snippetQuote: 'Hashtags are not decorative tags; they are conversational telemetry nodes that provide unfiltered data on brand sentiment and campaign velocity.',
    keyTakeaways: [
      'Real-time hashtag tracking prevents brand reputation blindspots during sudden social sentiment fluctuations.',
      'Commercial multi-touch attribution maps hashtag engagement directly to website visits and pipeline acceleration.',
      'Benchmarking brand tags against competitor campaign tags uncovers latent market share opportunities.'
    ]
  },
  {
    id: 'sprinklr-social-media-acronyms',
    title: 'Social Media Acronyms & Slang: The Definitive Guide for Marketers & Brands',
    url: 'https://www.sprinklr.com/blog/social-media-acronyms/',
    publication: 'Sprinklr',
    publicationDomain: 'sprinklr.com',
    category: 'Enterprise MarTech & AI',
    description: 'High-traffic evergreen guide decoding hundreds of essential social media acronyms, corporate shorthand, community vernacular, and marketing abbreviations to help brands communicate with authenticity and cultural relevance.',
    keyTopics: ['Social Media Acronyms', 'Community Engagement', 'Social Nomenclature', 'Digital Culture', 'Brand Voice'],
    readTime: '6 min read',
    targetAudience: 'Community Managers, Content Creators, Social Media Specialists',
    highlightTag: 'High-Traffic Authority Asset',
    snippetQuote: 'Fluent brand communication requires understanding cultural nuances—misusing community shorthand damages credibility faster than silence.',
    keyTakeaways: [
      'Categorizes vernacular across business metrics (CTR, ROAS), platform slang (DM, UGC, TL;DR), and viral trends.',
      'Provides actionable enterprise guidelines for maintaining brand governance while staying culturally agile.',
      'Acts as a definitive onboarding manual for internal social teams and distributed global agency partners.'
    ]
  },
  {
    id: 'sprinklr-social-media-holidays',
    title: 'Social Media Holidays: The Ultimate Global Calendar for Brand Engagement & Campaigns',
    url: 'https://www.sprinklr.com/blog/social-media-holidays/',
    publication: 'Sprinklr',
    publicationDomain: 'sprinklr.com',
    category: 'Enterprise MarTech & AI',
    description: 'Exhaustive strategic calendar and tactical playbook detailing national, international, and cultural social media holidays throughout the year, complete with campaign ideation prompts and proactive audience engagement frameworks.',
    keyTopics: ['Social Media Calendar', 'Campaign Planning', 'Audience Engagement', 'Content Strategy', 'Global Observances'],
    readTime: '8 min read',
    targetAudience: 'Content Strategists, Campaign Planners, Social Media Directors',
    highlightTag: 'Annual Campaign Playbook',
    snippetQuote: 'Proactive calendar engineering shifts content teams from reactive daily scramble into strategic narrative orchestration.',
    keyTakeaways: [
      'Month-by-month global observance framework designed to prevent calendar fatigue and brand tone clashes.',
      'Step-by-step methodology for selecting causes and observances that genuinely align with enterprise corporate values.',
      'Pre-built asset production timelines ensuring creative and compliance sign-offs 6 weeks prior to target dates.'
    ]
  },
  {
    id: 'why-instant-payments-are-no-longer-a-luxury',
    title: 'Why Instant Payments Are No Longer a Luxury—They’re Essential',
    url: 'https://yu-pay.com/resources/blog/why-instant-payments-are-no-longer-a-luxurytheyre-essential',
    publication: 'YU-Pay',
    publicationDomain: 'yu-pay.com',
    category: 'FinTech & Payments',
    description: 'Strategic analysis illustrating why real-time payment rails (RTP, FedNow, instant settlement) are shifting from competitive differentiators to non-negotiable operational requirements, examining liquidity velocity, transaction fail-safes, and merchant margin retention.',
    keyTopics: ['Instant Payments', 'Payment Rails', 'Treasury & Liquidity', 'Merchant Cashflow', 'FinTech Architecture'],
    readTime: '5 min read',
    targetAudience: 'Chief Financial Officers, FinTech Product Leaders, Treasury Directors',
    highlightTag: 'Flagship FinTech B2B Asset',
    snippetQuote: 'In high-velocity commerce, a 3-day ACH settlement delay is not a minor delay; it is a hidden liquidity tax on working capital.',
    keyTakeaways: [
      'Real-time rails accelerate treasury cash velocity, eliminating weekend reconciliation gaps for high-volume merchants.',
      'Instant settlement drastically lowers chargeback dispute vulnerability and unauthorized overdraft exposure.',
      'API-driven payment orchestration allows SaaS platforms to monetize embedded real-time disbursements.'
    ]
  },
  {
    id: 'the-suriname-guyana-advantage-cfos-currency-risk',
    title: 'The Suriname & Guyana Advantage: How CFOs Are Turning Currency Risk into a Growth Engine',
    url: 'https://yu-pay.com/resources/blog/the-suriname-guyana-advantage-how-cfos-are-turning-currency-risk-into-a-growth-engine',
    publication: 'YU-Pay',
    publicationDomain: 'yu-pay.com',
    category: 'FinTech & Payments',
    description: 'Deep-dive macroeconomic guide exploring how international CFOs and treasury leaders utilize cross-border payment facilitators to mitigate emerging market FX volatility across burgeoning Caribbean and South American trade corridors.',
    keyTopics: ['Cross-Border Payments', 'FX Risk Mitigation', 'Treasury Management', 'Suriname & Guyana Trade', 'CFO Strategy'],
    readTime: '6 min read',
    targetAudience: 'Global CFOs, Multinational Treasury Teams, Commodity Traders',
    highlightTag: 'Cross-Border FX Strategy',
    snippetQuote: 'Emerging trade corridors reward treasury leaders who replace cumbersome correspondent banking hops with localized settlement rails.',
    keyTakeaways: [
      'Explores the oil and commodity economic boom in the Guyana-Suriname basin and cross-border currency conversion friction.',
      'Demonstrates dynamic multi-currency hedging techniques to safeguard enterprise operating margins from local inflation spikes.',
      'Presents how modern PayFac infrastructure slashes cross-border remittance fees by up to 60%.'
    ]
  },
  {
    id: 'bestdoc-automated-patient-communication',
    title: 'Automated Patient Communication Software: Enhancing Care & Reducing No-Shows',
    url: 'https://www.bestdocapp.com/automated-patient-communication-software/',
    publication: 'BestDoc',
    publicationDomain: 'bestdocapp.com',
    category: 'HealthTech SaaS',
    description: 'Comprehensive breakdown of how automated omnichannel communication (WhatsApp, SMS, IVR) slashes hospital no-show rates by up to 35%, streamlines pre-consultation intake, and establishes consistent patient engagement without burdening clinical staff.',
    keyTopics: ['Patient Communication', 'No-Show Reduction', 'HealthTech Automation', 'Omnichannel Reminders', 'Clinic Workflow'],
    readTime: '5 min read',
    targetAudience: 'Chief Medical Officers, Clinic Directors, Patient Access Executives',
    highlightTag: 'High-Impact HealthTech Guide',
    snippetQuote: 'Automated appointment hygiene restores millions in lost hospital capacity without adding a single administrative hire.',
    keyTakeaways: [
      'Automated conversational confirmations via WhatsApp and SMS reduce clinic appointment drop-offs by 35%.',
      'Digital pre-registration questionnaires cut outpatient desk wait times from 22 minutes to under 4 minutes.',
      'Closed-loop patient reminders free hospital nurses and coordinators to focus on urgent triage inquiries.'
    ]
  },
  {
    id: 'bestdoc-hospital-facility-management',
    title: '4 Hospital Facility Management Tips for a Better Patient Experience',
    url: 'https://www.bestdocapp.com/4-hospital-facility-management-tips-for-a-better-patient-experience/',
    publication: 'BestDoc',
    publicationDomain: 'bestdocapp.com',
    category: 'Hospitality & Operations',
    description: 'Actionable operational blueprint for healthcare leaders to modernize facility logistics, reduce check-in bottlenecks, elevate ambient hygiene, and deliver frictionless patient-first navigation through smart digital touchpoints.',
    keyTopics: ['Hospital Administration', 'Facility Management', 'Patient Experience (PX)', 'Digital Wayfinding', 'Healthcare Operations'],
    readTime: '4 min read',
    targetAudience: 'Hospital COOs, Facility Directors, Chief Experience Officers',
    highlightTag: 'Healthcare Operations Guide',
    snippetQuote: 'A patient’s clinical confidence begins in the parking lot and lobby well before they ever see a stethoscope.',
    keyTakeaways: [
      'Self-service digital check-in kiosks eliminate lobby congestion and cross-contamination in high-traffic clinics.',
      'Mobile indoor wayfinding reduces missed appointment slots caused by confusing multi-wing hospital campus layouts.',
      'Ambient sensory management and proactive hygiene visibility directly correlate with elevated patient HCAHPS scores.'
    ]
  },
  {
    id: 'bestdoc-battling-healthcare-burnout-through-tech',
    title: 'Battling Healthcare Burnout Through Tech: Empowering Clinical Staff',
    url: 'https://www.bestdocapp.com/battling-healthcare-burnout-through-tech/',
    publication: 'BestDoc',
    publicationDomain: 'bestdocapp.com',
    category: 'HealthTech SaaS',
    description: 'Investigates the clinical burnout epidemic facing physicians and nursing teams, demonstrating how intelligent workflow automation, automated triage, and streamlined digital records liberate clinicians to focus on compassionate bedside medicine.',
    keyTopics: ['Clinician Burnout', 'EHR Optimization', 'Healthcare Workforce', 'Workflow Automation', 'Staff Retention'],
    readTime: '5 min read',
    targetAudience: 'Hospital CEOs, Chief Nursing Officers, Healthcare HR Leaders',
    highlightTag: 'Thought Leadership',
    snippetQuote: 'Technology should serve clinicians like an invisible assistant, not an extra administrative shift after hours.',
    keyTakeaways: [
      'Over 60% of physician burnout is driven by administrative documentation and manual EHR transcription burdens.',
      'Smart intake automation recaptures up to 90 minutes of doctor time per clinical shift.',
      'Retaining nursing and medical staff through operational friction reduction saves healthcare networks millions in turnover costs.'
    ]
  },
  {
    id: 'bestdoc-online-reputation-management',
    title: 'Online Reputation Management for Healthcare Providers: Building Patient Trust',
    url: 'https://www.bestdocapp.com/online-reputation-management/',
    publication: 'BestDoc',
    publicationDomain: 'bestdocapp.com',
    category: 'HealthTech SaaS',
    description: 'A strategic roadmap for hospitals and multi-specialty healthcare networks to ethically collect patient reviews, safeguard physician ratings on search engines, manage crisis feedback, and establish institutional trustworthiness.',
    keyTopics: ['Reputation Management', 'Patient Feedback Loops', 'HIPAA Review Compliance', 'Healthcare Marketing', 'Search Authority'],
    readTime: '5 min read',
    targetAudience: 'Healthcare Marketing Directors, Hospital PR Leads, Practice Managers',
    highlightTag: 'Patient Acquisition & Trust',
    snippetQuote: 'When seeking medical care, prospective patients trust Google reviews as much as a personal doctor recommendation.',
    keyTakeaways: [
      'Automated post-discharge sentiment surveys capture patient dissatisfaction privately before it escalates into public negative reviews.',
      'Maintaining HIPAA compliance while publicly acknowledging and resolving patient feedback on Google Business Profiles.',
      'Systematic review generation elevates local SEO map pack rankings for key specialty search queries.'
    ]
  },
  {
    id: 'bestdoc-5g-patient-experience',
    title: '5G in Healthcare: Transforming the Patient Experience and Telemedicine',
    url: 'https://www.bestdocapp.com/5g-patient-experience/',
    publication: 'BestDoc',
    publicationDomain: 'bestdocapp.com',
    category: 'Technical Architecture',
    description: 'Technical yet executive-friendly overview examining how ultra-low latency 5G infrastructure transforms telehealth consultations, enables real-time IoMT wearable diagnostics, and powers remote robotic procedures across distributed care facilities.',
    keyTopics: ['5G Infrastructure', 'Telemedicine Evolution', 'IoMT Telemetry', 'Remote Patient Monitoring', 'Ultra-Low Latency'],
    readTime: '6 min read',
    targetAudience: 'Hospital CTOs, Healthcare Innovation Directors, Telehealth Providers',
    highlightTag: 'Emerging Tech & Infrastructure',
    snippetQuote: '5G is not just faster connectivity; it is the critical low-latency nervous system for distributed patient care.',
    keyTakeaways: [
      'Sub-millisecond transmission speeds enable crystal-clear remote ultrasound streaming and robotic surgical assistance.',
      'IoMT sensors continuously transmit vital biometric telemetry without Wi-Fi congestion or dropouts.',
      'Bridges regional care disparities by connecting rural clinic patients directly to world-class metropolitan specialists.'
    ]
  }
];

export const DEVELOPED_WEBSITES: DevelopedWebsite[] = [
  {
    id: 'vastara-trading-dubai',
    title: 'VASTARA Trading: Dubai Offshore Multi-Division Enterprise Platform',
    brandName: 'Vastara',
    client: "YsecIT's Dubai-Based Offshore Trading Enterprise",
    role: 'Full-Stack Web Architect, UI/UX Designer & Conversion Copywriter',
    scope: 'Architecture + UI/UX Design + Content & Copy',
    url: 'https://vastara-trading.com/',
    domain: 'vastara-trading.com',
    industry: 'Offshore Commodity Trading & IT Infrastructure',
    location: 'Dubai, United Arab Emirates',
    summary: "Engineered the end-to-end digital enterprise platform for VASTARA Trading—unifying 4 distinct global commercial divisions (Timber, Precious Metals, Frozen Fish, Software Services) into an authoritative, high-converting corporate presence.",
    description: "VASTARA Trading operates as an agile offshore enterprise headquartered in Dubai, orchestrating high-value international trade across four disparate commercial verticals. Sayan engineered the unified digital architecture that brings these divisions under a singular, prestigious corporate umbrella—giving institutional buyers and international logistics partners transparent visibility into sourcing credentials, port-to-port supply chains, and technical capabilities.",
    divisionsOrFeatures: [
      {
        name: 'Timber Division',
        description: 'Sustainable international lumber, teak, and industrial hardwood sourcing across certified global forestry networks.'
      },
      {
        name: 'Precious Metals',
        description: 'Institutional bullion handling, Dubai-certified gold trade, assay verification, and bonded storage solutions.'
      },
      {
        name: 'Frozen Fish',
        description: 'HACCP-certified cold-chain marine commodities, deep-sea catches, and bulk seafood trade with zero thermal compromise.'
      },
      {
        name: 'Software Services',
        description: 'Enterprise software development, cloud infrastructure consulting, and bespoke digital solutions for international clients.'
      }
    ],
    architectureHighlights: [
      'Multi-division information architecture with seamless hierarchical routing between commodity trades and tech services',
      'Cross-border B2B lead capture funnel optimized for international trade inquiries and high-ticket RFQs',
      'Structured technical metadata and schema markup for Dubai offshore commercial trade entities'
    ],
    uxDesignHighlights: [
      'Prestigious executive color palette (deep slate, gold accents, crisp typography) befitting Dubai commercial conglomerates',
      'Tactile division cards with responsive micro-interactions and smooth progressive disclosure',
      'High-legibility specification tables for commodity grades, maritime shipping terms (Incoterms), and export compliance'
    ],
    copyHighlights: [
      'Institutional, high-conviction B2B copy positioning VASTARA as a trusted port-to-port trading powerhouse',
      'Rigorous commercial clarity addressing import/export tariffs, customs clearance, and cold-chain compliance',
      'Direct conversion pathways driving qualified procurement officers to request formal commercial quotes'
    ],
    techStack: ['Information Architecture', 'UI/UX Wireframing & Prototyping', 'Conversion Copywriting', 'Responsive Web Layouts', 'International SEO', 'B2B RFQ Lead Capture'],
    metrics: [
      { label: 'Commercial Divisions Unified', value: '4 Divisions' },
      { label: 'Global Trade Hub', value: 'Dubai, UAE' },
      { label: 'Full Scope Delivered', value: 'Arch + UX + Copy' },
      { label: 'Status', value: 'Live & Operational' }
    ],
    status: 'Live & Operational',
    badgeColor: 'amber'
  },
  {
    id: 'yu-pay-fintech-product',
    title: 'YU-Pay: Flagship Payment Facilitator (PayFac) Platform & Developer Portal',
    brandName: 'YU-Pay',
    client: "YsecIT Softwares (Flagship FinTech Product)",
    role: 'Lead Web Architect, UI/UX Designer & Senior FinTech Copywriter',
    scope: 'Architecture + UI/UX Design + Content & Copy',
    url: 'https://yu-pay.com/',
    domain: 'yu-pay.com',
    industry: 'FinTech & Payment Infrastructure (PayFac)',
    location: 'North America & Emerging Markets',
    summary: "Architected, designed, and authored the complete flagship digital product experience for YU-Pay—a next-generation payment facilitator powering instant settlement rails (FedNow/RTP), multi-currency merchant processing, and cross-border treasury management.",
    description: "Payment facilitators face an intensely demanding audience: CFOs and treasury heads who scrutinize security, settlement latency, and fee predictability. Sayan directed the complete digital presence from wireframes to final production copy, synthesizing real-time payment mechanics into an intuitive, high-converting product journey that instills immediate institutional trust.",
    divisionsOrFeatures: [
      {
        name: 'Instant Payment Rails',
        description: 'FedNow and Real-Time Payments (RTP) integration enabling sub-second 24/7/365 treasury settlement.'
      },
      {
        name: 'Multi-Currency Merchant Gateway',
        description: 'Frictionless checkout, tokenized transactions, and automated chargeback mitigation for global merchants.'
      },
      {
        name: 'Cross-Border FX & Treasury Corridors',
        description: 'Strategic currency hedging and liquidity management for high-growth commodity corridors like Suriname and Guyana.'
      },
      {
        name: 'Developer & Compliance Hub',
        description: 'Interactive REST API documentation, webhook guides, PCI-DSS Level 1 compliance blueprints, and developer SOPs.'
      }
    ],
    architectureHighlights: [
      'Full-funnel IA tailored to two distinct buyer personas: non-technical CFOs/business owners and technical engineering leads',
      'Interactive product feature taxonomy showcasing instant payout velocity and fee transparency',
      'Integrated resources hub hosting C-suite thought leadership, macroeconomic guides, and merchant onboarding documentation'
    ],
    uxDesignHighlights: [
      'Clean, modern FinTech aesthetic using trust-inducing deep blues, vibrant emerald accents, and crisp visual hierarchies',
      'Interactive pricing and settlement comparison tables that make complex interchange fees easily digestible',
      'Intuitive multi-step merchant signup flow designed to minimize KYC drop-off and accelerate activation'
    ],
    copyHighlights: [
      'Persuasive, neuromarketing-grounded copy dissecting why real-time payments have shifted from a luxury to an existential necessity',
      'High-authority macroeconomic analyses on navigating foreign exchange volatility and unlocking growth in Guyana and Suriname',
      'Clear, jargon-free value propositions emphasizing cash flow velocity, risk-adjusted returns, and effortless integration'
    ],
    techStack: ['FinTech Product Architecture', 'UI/UX Design Systems', 'Developer API Documentation', 'B2B FinTech Copywriting', 'Conversion Funnel Optimization', 'PCI-DSS Compliance Messaging'],
    metrics: [
      { label: 'Payment Settlement Rails', value: 'FedNow / RTP' },
      { label: 'Flagship Product Role', value: 'Arch + UX + Copy' },
      { label: 'Developer Hub', value: 'API & Webhooks' },
      { label: 'Status', value: 'Live Production' }
    ],
    status: 'Live Production',
    badgeColor: 'emerald'
  },
  {
    id: 'yogh-hospitality-suriname',
    title: 'YOGH Hospitality: Suriname 5-Star Luxury Hotel Experience & Booking Engine',
    brandName: 'YOGH Hospitality',
    client: "YsecIT's Premium 5-Star Hotel in Suriname",
    role: 'Full-Stack Web Architect, UI/UX Designer & Sensory Copywriter',
    scope: 'Architecture + UI/UX Design + Content & Copy',
    url: 'https://yogh.sr/',
    domain: 'yogh.sr',
    industry: 'Luxury Hospitality, 5-Star Accommodations & Gastronomy',
    location: 'Paramaribo, Suriname',
    summary: "Designed and developed the complete website architecture, luxury UI/UX interface, and immersive sensory copy for YOGH Hospitality—YsecIT's premium 5-star level hotel and corporate executive sanctuary in Suriname.",
    description: "YOGH Hospitality redefines luxury in Suriname, blending world-class boutique hospitality with the needs of international business executives and discerning travelers visiting the burgeoning South American resource and trade corridor. Sayan engineered the digital guest journey from first touch to direct suite booking, immersing visitors in the property's architectural elegance, wellness amenities, and signature culinary offerings.",
    divisionsOrFeatures: [
      {
        name: 'Executive Suites & Accommodations',
        description: 'Curated gallery and interactive floorplans for presidential, executive, and boutique guest suites.'
      },
      {
        name: 'Signature Fine Dining & Lounge',
        description: 'Sensory gastronomy storytelling, chef showcase, and direct table reservation integrations.'
      },
      {
        name: 'Corporate Events & Boardrooms',
        description: 'State-of-the-art audiovisual facilities, VIP breakout rooms, and high-security conference infrastructure.'
      },
      {
        name: 'Wellness, Spa & Concierge',
        description: 'Holistic rejuvenation packages, personal chauffeur logistics, and VIP Paramaribo cultural excursions.'
      }
    ],
    architectureHighlights: [
      'Guest-first booking information architecture with seamless availability checks and room category comparisons',
      'Visual storytelling layout structured to showcase high-resolution photography, architectural details, and guest amenities',
      'Multi-lingual internationalization structure designed to cater to Dutch, English, and regional travelers'
    ],
    uxDesignHighlights: [
      'Sumptuous luxury aesthetic with warm champagne tones, deep charcoals, and bespoke serif typography that conveys 5-star prestige',
      'Fluid mobile-optimized navigation allowing effortless room browsing and instant reservation initiation on handheld devices',
      'Virtual tour micro-interactions, rich amenity badge iconography, and immersive photo carousels'
    ],
    copyHighlights: [
      'Sensory neuromarketing copy evoking comfort, tranquil exclusivity, and refined Caribbean-South American elegance',
      'Persuasive corporate event positioning emphasizing discrete privacy, high-speed fiber connectivity, and white-glove hospitality',
      'Frictionless call-to-action microcopy that drives higher direct room reservations, bypassing third-party OTA commission fees'
    ],
    techStack: ['Luxury Hospitality IA', 'High-End UI/UX Design', 'Sensory Neuromarketing Copy', 'Direct Booking UX', 'Mobile-First Responsive Layout', 'SEO & Local Schema'],
    metrics: [
      { label: 'Property Class', value: '5-Star Luxury' },
      { label: 'Direct Booking Engine', value: 'Optimized UX' },
      { label: 'Full Scope Delivered', value: 'Arch + UX + Copy' },
      { label: 'Status', value: 'Live Production' }
    ],
    status: 'Live Production',
    badgeColor: 'amber'
  },
  {
    id: 'veritas-bullion-trading',
    title: 'Veritas: Dubai Port-to-Port Bullion & Precious Metals Trading Platform',
    brandName: 'Veritas',
    client: "YsecIT's Dubai-Based Port-to-Port Bullion Enterprise",
    role: 'Full-Stack Web Architect, UI/UX Designer & Institutional Copywriter',
    scope: 'Architecture + UI/UX Design + Content & Copy',
    url: 'https://veritas-gold.netlify.app/',
    domain: 'veritas-gold.netlify.app',
    industry: 'Physical Gold & Institutional Bullion Trading',
    location: 'Dubai, United Arab Emirates (DMCC Hub)',
    summary: "Architected, designed, and authored the digital platform for Veritas—YsecIT's Dubai-based port-to-port bullion trading enterprise facilitating sovereign-grade physical gold transactions, bonded vaulting, and secure customs clearance.",
    description: "In the high-stakes realm of institutional bullion trading, trust and verifiable compliance are paramount. Physical gold buyers, central banks, and family offices require ironclad assurances regarding assay purity, OECD conflict-free sourcing, and port-to-port armored logistics. Sayan designed the Veritas digital platform to establish immediate authority, positioning Veritas at the nexus of the Dubai physical gold market.",
    divisionsOrFeatures: [
      {
        name: 'Port-to-Port Bullion Logistics',
        description: 'End-to-end armored transport, chartered air cargo, customs clearance, and bonded transit insurance.'
      },
      {
        name: 'Refinery & Assay Purity Verification',
        description: '999.9 fine gold certification aligned with LBMA and DMCC Dubai Good Delivery standards.'
      },
      {
        name: 'Sovereign & Family Office Vaulting',
        description: 'Segregated and allocated physical storage in high-security, independent Dubai bonded vaults.'
      },
      {
        name: 'Escrow & Trade Settlement Security',
        description: 'Transparent bank-to-bank escrow procedures and swift transaction settlement protocols.'
      }
    ],
    architectureHighlights: [
      'Institutional trust architecture featuring step-by-step port-to-port transaction walkthroughs and KYC documentation gateways',
      'Transparent compliance repository displaying licensing credentials, assay certification pathways, and legal frameworks',
      'Direct executive inquiry channel for bullion allocation requests and high-volume trade orders'
    ],
    uxDesignHighlights: [
      'Refined metallic gold, obsidian, and slate design language reflecting the permanence and value of precious metals',
      'Clear, interactive trade lifecycle diagrams illustrating physical bullion movement from extraction to bonded delivery',
      'High-security aesthetic with crisp typography, verifiable credential badges, and encrypted inquiry forms'
    ],
    copyHighlights: [
      'Institutional, precision-crafted copy reflecting the strict legal, financial, and logistical reality of global physical gold trade',
      'Uncompromising emphasis on OECD Due Diligence, DMCC compliance, and zero-conflict ethical sourcing',
      'Authoritative tone that resonates directly with sovereign wealth managers, private bankers, and certified commodity traders'
    ],
    techStack: ['Institutional Trust Architecture', 'Precious Metals UI/UX', 'Financial Compliance Copywriting', 'Secure B2B Inquiry Flow', 'Responsive Web Design'],
    metrics: [
      { label: 'Bullion Standards', value: '999.9 Fine Gold' },
      { label: 'Global Trade Axis', value: 'Dubai / Global Ports' },
      { label: 'Full Scope Delivered', value: 'Arch + UX + Copy' },
      { label: 'Status', value: 'Live & Operational' }
    ],
    status: 'Live & Operational',
    badgeColor: 'amber'
  }
];

export const CORE_SKILLS = [
  { 
    category: 'B2B SaaS & SEO Copywriting', 
    skills: ['B2B SaaS Content Writing', 'Thought Leadership Development', 'Product Marketing Copywriting', 'Enterprise SEO Pillar Hubs', 'UX Writing & Content Design', 'Competitor Comparison Pages', 'Content Matrix Architecture'] 
  },
  { 
    category: 'Technical Writing & Governance', 
    skills: ['API Documentation', 'Developer SOPs & Guides', 'Privacy Policies & Disclaimers', 'GDPR & CCPA Compliance Guides', 'Product Whitepapers', 'Technical Specification Sheets'] 
  },
  { 
    category: 'Marketing Systems & Telemetry', 
    skills: ['Python (Pandas, NLP scraping)', 'Power BI & DAX Modeling', 'SQL & Relational Databases', 'GA4 & BigQuery Telemetry', 'Email Marketing Sequences', 'Social Media Marketing & Ad Copy', 'Conversion Rate Optimization (CRO)'] 
  },
];

export const WORK_PROCESS_STEPS = [
  {
    step: '01',
    title: 'Pain-Point Matrix & Intent Architecture',
    subtitle: 'Connecting Features to 37+ Documented Friction Points',
    description: 'Before a single sentence is drafted, I build a comprehensive content matrix mapping product features to verified buyer pain points, search intent nodes, and competitor vulnerabilities.',
    deliverable: 'Pain-Point Matrix & Topic Intent Map',
  },
  {
    step: '02',
    title: 'Neuromarketing & Cognitive Architecture',
    subtitle: 'Aligning UX Writing with SEO Strategy',
    description: 'Enterprise B2B buyers suffer from cognitive fatigue and perceived implementation risk. I structure the narrative using progressive disclosure to build psychological momentum and urgency.',
    deliverable: 'Content Framework & Conversion Wireframe',
  },
  {
    step: '03',
    title: 'Precision Technical Copycrafting',
    subtitle: 'Zero Fluff, Maximum Authority',
    description: 'Writing that respects executive time. I distill complex payment rails, distributed cloud systems, and healthcare workflows into razor-sharp, actionable prose that converts C-suite decision-makers.',
    deliverable: 'Production-Ready Enterprise Copy, SOPs & Schema',
  },
  {
    step: '04',
    title: 'Attribution Telemetry & Continuous CRO',
    subtitle: 'Closed-Loop Performance Validation',
    description: 'Publishing is just the first iteration. Using custom Power BI dashboards and analytics, we measure scroll engagement, CTA conversions, and assisted pipeline, refining copy for continuous yield.',
    deliverable: 'Telemetry Dashboard & Continuous CRO Lift',
  },
];

export const CAREER_MILESTONES: MilestoneItem[] = [
  {
    year: 'Jun 2024 – Present',
    title: 'Senior Content Writer & Web Architect',
    companyOrVenture: 'YsecIT Softwares India Private Limited',
    tagline: 'End-to-end architecture, UI/UX design, and content & copy for YsecIT\'s flagship digital products and global trading enterprises',
    description: 'Spearheaded full-cycle development (architecture + UI/UX design + content & copy) for 4 flagship web platforms: VASTARA Trading (Dubai-based offshore trading enterprise with 4 divisions: timber, precious metals, frozen fish, software services), YU-Pay (flagship payment facilitator product), YOGH Hospitality (premium 5-star hotel in Suriname), and Veritas (Dubai-based port-to-port bullion trading). Crafted 50+ product marketing assets (website copy, email drip campaigns, solution briefs) for slot gaming terminals and kiosks. Drafted SOPs, privacy policies, API documentation, and GDPR/CCPA compliance guides referenced by 10+ developer teams as implementation guides.',
    metrics: '4 Live Web Platforms Developed • Flagship YU-Pay Launch • 50+ Product Marketing Assets • 10+ Dev Teams Referenced SOPs',
    skills: ['Web Architecture', 'UI/UX Design', 'B2B Copywriting', 'YU-Pay FinTech', 'VASTARA Trading', 'YOGH Hospitality', 'Veritas Bullion', 'Developer SOPs'],
  },
  {
    year: 'Sep 2023 – Jan 2024',
    title: 'Senior Content Writer',
    companyOrVenture: 'Acme Visa Solutions',
    tagline: 'Multi-channel enterprise content, press articles, and high-impact social campaigns',
    description: 'Researched and produced engaging content for ACME’s website, blogs, social media platforms, and promotional materials. Developed tailored marketing materials, including posts for LinkedIn and Instagram, WhatsApp messages, website text, newsletters, and press articles to boost awareness of services. Skillfully managed multiple projects simultaneously, consistently meeting tight deadlines.',
    metrics: 'Multi-Channel Campaign Delivery • Social Reach Expansion • Press Article Publication',
    skills: ['Multi-Channel Copy', 'Social Media Marketing', 'Email Newsletters', 'PR Articles', 'WhatsApp Copy'],
  },
  {
    year: 'May 2022 – Dec 2022',
    title: 'Content Writer',
    companyOrVenture: 'BestDoc — Kochi-based HealthTech Startup',
    tagline: 'Enterprise-grade HealthTech content, 5G healthcare transformation, and patient experience guides',
    description: 'Conducted research, gathered information from multiple sources, and wrote enterprise-quality content for the startup’s website, blogs, social media, and marketing materials. Incorporated targeted keywords with a focus on both SEO and an engaging tone. Created customized marketing copy (LinkedIn posts, WhatsApp messages, product descriptions, newsletters, e-books, PR articles) to increase product awareness. Authored published articles on 5G in healthcare, automated patient communication, and hospital facility management.',
    metrics: '5+ High-Impact Published Bylines • Omnichannel Content Strategy • HealthTech Authority',
    skills: ['HealthTech SaaS', 'Patient Experience (PX)', 'Automated Communication', 'SEO Content', 'E-books & PR'],
  },
  {
    year: 'Feb 2019 – Dec 2021',
    title: 'Freelance Content Writer',
    companyOrVenture: 'Self Employed (Independent Practice)',
    tagline: 'SEO-optimized website content, white papers, and case studies for high-growth startups and agencies',
    description: 'Authored high-quality SEO-optimized website content, blogs, articles, white papers, case studies, product descriptions, and other forms of marketing copy for domestic content marketing agencies and independent clients across startups and high-growth organizations. Optimized all written materials for search engines and user experience by incorporating relevant SEO terms and interlinking to increase visibility and engagement.',
    metrics: '100+ Client Deliverables • Top SERP Positions • High Agency Client Retention',
    skills: ['SEO Copywriting', 'White Papers', 'Case Studies', 'Content Strategy', 'SME Interviews'],
  },
  {
    year: 'Oct 2011 – Jan 2019',
    title: 'Founder & Director',
    companyOrVenture: 'After School Coaching Academy (Lucknow, India)',
    tagline: '7 years 4 months of bootstrapped entrepreneurial leadership and operational P&L ownership',
    description: 'Set up and ran an after-school coaching academy for school children up to class 10. Led the development and implementation of the academy’s vision and mission. Oversaw day-to-day operations, including managing staff, budgets, and resources. Ensured compliance with all relevant regulations, promoted the academy to attract new students, and built long-term relationships with schools and parents.',
    metrics: '7+ Years Profitable Operations • 100% Bootstrapped • End-to-End P&L Ownership',
    skills: ['Founder Mindset', 'Operational Management', 'P&L Ownership', 'Team Leadership', 'Community Partnerships'],
  },
  {
    year: 'Jul 2010 – Jun 2011',
    title: 'Program Associate — KMT',
    companyOrVenture: 'MicroSave Consulting (MSC)',
    tagline: 'Technical documentation, stakeholder alignment, and research publication readiness',
    description: 'Interacted with various stakeholders, including technical team members and NGOs, incorporating their feedback, results, and test cases into the website. Reviewed departmental materials, corrected errors, and ensured documents were ready for publication. Authored business documents to organize and emphasize information quickly and effectively.',
    metrics: 'Cross-Stakeholder Alignment • Publication-Grade Documentation • Process Rigor',
    skills: ['Technical Documentation', 'Stakeholder Management', 'Business Writing', 'Publication Readiness'],
  },
  {
    year: 'Nov 2008 – Nov 2009',
    title: 'Management Information System (MIS) Officer',
    companyOrVenture: 'Ministry of Rural Development, Government of India',
    tagline: 'National scheme database administration, data telemetry, and executive reporting',
    description: 'Oversaw the implementation and monitoring of the MGNREGA scheme at Uttar Pradesh’s Rural Development Department. Developed, maintained, and updated databases and information systems for the MGNREGA scheme. Prepared reports and analyzed data to provide actionable insights to government officials and key stakeholders. Provided training to staff on the use of information systems and data analysis techniques.',
    metrics: 'State-Level Database Administration • Executive Government Reporting • Staff Training',
    skills: ['MIS Systems', 'Relational Databases', 'Data Analysis', 'Executive Reporting', 'Staff Training'],
  },
  {
    year: 'Jan 2007 – Jun 2007',
    title: 'Project Trainee',
    companyOrVenture: 'CMC LTD',
    tagline: 'Online Project Management Software development, client specifications, and system analysis',
    description: 'Architected a functional prototype Online Project Management Software. Interacted with clients to gather requirements, perform system analysis, and finalize technical/functional specifications and high-level design documents. Assisted in designing, developing, testing, troubleshooting, and debugging software.',
    metrics: 'Software Specification Design • Client Requirement Gathering • Functional Testing',
    skills: ['System Analysis', 'Functional Specifications', 'Software Testing', 'Technical Design'],
  },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'b2b-seo-copywriting',
    slug: 'b2b-saas-seo-copywriting',
    title: 'B2B SaaS Enterprise SEO Copywriting',
    subtitle: 'Commercial Intent Architectures That Siphon In-Market Buyers From Competitors',
    summary: 'High-authority, research-backed long-form articles, solution hubs, and competitor teardowns that rank #1 and convert executive prospects.',
    fullDescription: 'Enterprise software requires more than basic keyword stuffing. My copy treats your buyer like the sophisticated decision-maker they are. By dissecting product workflows, API ecosystems, and ROI levers, I produce high-conviction content hubs that establish definitive category authority and accelerate deals through the sales cycle.',
    iconName: 'FileText',
    features: [
      'Comprehensive Topic Cluster & Pillar Page Architecture',
      'Enterprise Solution Briefs & High-Authority Use Cases',
      'Competitive Alternative & Versus Teardowns (High Commercial Intent)',
      'Product-Led Interactive Walkthroughs & Technical Explainers',
      'Neuromarketing Microcopy, CTAs, and Executive Summaries',
    ],
    deliverables: [
      '3,500+ Word Semantic Pillar Assets',
      'Full On-Page Technical Metadata & Schema JSON-LD',
      'Custom Infographic & Data Visualization Briefs',
      'Turnkey CMS-Ready Markdown / HTML Code',
    ],
    methodology: 'Tri-Tier Intent Mapping: Informational (Top-Funnel Authority) + Commercial (Middle-Funnel Comparison) + Transactional (Bottom-Funnel Validation).',
    tools: ['Ahrefs', 'Semrush', 'Clearscope', 'SurferSEO', 'Markdown', 'Python NLP'],
    industries: [
      { name: 'Enterprise CXM & MarTech', icon: 'Sparkles', desc: 'Omnichannel customer experience, AI agent workflows, and social listening platforms.' },
      { name: 'Cloud Infrastructure & DevOps', icon: 'Server', desc: 'Kubernetes orchestration, CI/CD observability, and serverless compute systems.' },
      { name: 'FinTech & Payments Infrastructure', icon: 'CreditCard', desc: 'Automated billing, reconciliation APIs, and risk compliance engines.' },
      { name: 'Data Platforms & Business Intelligence', icon: 'Database', desc: 'Data warehouses, streaming pipelines, and real-time operational analytics.' },
    ],
  },
  {
    id: 'marketing-data-analysis',
    slug: 'marketing-data-analysis-power-bi-python',
    title: 'Marketing Data Analysis (Power BI & Python)',
    subtitle: 'Transforming Messy Analytics into Clear Revenue Insights and Attribution Models',
    summary: 'Custom Python scripts for content clustering paired with executive Power BI dashboards that prove content ROI to your CFO.',
    fullDescription: 'Stop relying on vanity pageviews. I connect your CRM (Salesforce/HubSpot), GA4, and search metrics into consolidated Power BI reports that illustrate exact touchpoints driving pipeline. Using Python for text-mining and cohort modeling, I uncover untapped search queries and pinpoint where high-value leads abandon your funnel.',
    iconName: 'BarChart3',
    features: [
      'Power BI Executive Dashboards with Custom DAX Calculations',
      'Python-Driven Organic Search Query Clustering & Opportunity Scoring',
      'Multi-Touch Content Attribution & Assisted Pipeline Analysis',
      'Cohort Retention & Content Drop-Off Diagnostic Reports',
      'Automated Weekly ETL Scripts for Cross-Channel Metrics',
    ],
    deliverables: [
      'Interactive Power BI (.pbix) Dashboards with Drill-Down Telemetry',
      'Python Scripts & Jupyter Notebooks with Documented Code',
      'Quarterly Executive Attribution Presentation Deck',
      'Actionable CRO Prioritization Backlog',
    ],
    methodology: 'Closed-Loop Quantitative Modeling: Data Extraction -> Cleansing -> Semantic NLP Clustering -> Interactive BI Visualization -> Prescriptive Action.',
    tools: ['Python (Pandas, Scikit-learn)', 'Power BI Desktop & Service', 'SQL (PostgreSQL/BigQuery)', 'GA4', 'HubSpot / Salesforce APIs'],
    industries: [
      { name: 'SaaS Scale-Ups (Series A–C)', icon: 'TrendingUp', desc: 'Teams needing to validate content-led CAC and payback periods for investors.' },
      { name: 'Enterprise B2B Technology', icon: 'Layers', desc: 'Complex sales cycles requiring multi-touch pipeline attribution across 6–12 months.' },
      { name: 'Developer Tooling & APIs', icon: 'Terminal', desc: 'Tracking developer documentation consumption through to API key activation.' },
      { name: 'eCommerce & B2B Marketplaces', icon: 'ShoppingCart', desc: 'Analyzing basket velocity, cohort churn, and category margin performance.' },
    ],
  },
  {
    id: 'content-architecture-cro',
    slug: 'content-architecture-cro',
    title: 'Content Architecture & Conversion Rate Optimization (CRO)',
    subtitle: 'Structuring Landing Pages and Knowledge Portals for Cognitive Ease and Maximum Action',
    summary: 'Rewiring site architecture, navigation taxonomies, and high-stakes landing pages using neuromarketing and conversion psychology.',
    fullDescription: 'Great copy fails if trapped within poor information architecture. I redesign content hierarchies to guide executive prospects smoothly through progressive disclosure. Every heading, pill tag, and visual anchor is positioned to lower cognitive load and raise conversion velocity.',
    iconName: 'Layout',
    features: [
      'Neuromarketing Landing Page Structural Wireframes',
      'Information Architecture (IA) Audits & Topic Tree Restructuring',
      'Cognitive Friction Removal & Microcopy Optimization',
      'Form Optimization & Demo-Booking Funnel Streamlining',
      'A/B Testing Hypothesis Generation & Statistical Significance Tracking',
    ],
    deliverables: [
      'Annotated Figma/HTML Structural Wireframes',
      'Comprehensive Conversion Copy Deck with Headline Variants',
      'Site Architecture Blueprint (Sitemap & Internal Linking Taxonomy)',
      'Heatmap & Session Recording Diagnostic Report',
    ],
    methodology: 'Cognitive Load Theory applied to enterprise web interfaces: Minimizing extraneous cognitive load while magnifying germane value propositions.',
    tools: ['Figma', 'Hotjar / Microsoft Clarity', 'Google Optimize / VWO', 'Tailwind CSS', 'Screaming Frog'],
    industries: [
      { name: 'High-Ticket B2B Software', icon: 'Award', desc: 'Where a 0.5% lift in demo completion yields six-figure annual contract value.' },
      { name: 'Product-Led Growth (PLG)', icon: 'Compass', desc: 'Optimizing free-to-paid upgrade prompts and interactive pricing tiers.' },
      { name: 'Enterprise Consultancy', icon: 'Briefcase', desc: 'Positioning high-level service packages with clarity and executive gravitas.' },
      { name: 'EduTech Platforms', icon: 'BookOpen', desc: 'Simplifying multi-program catalogs for high-converting student enrollments.' },
    ],
  },
  {
    id: 'predictive-content-intelligence',
    slug: 'predictive-content-intelligence',
    title: 'Predictive Content Intelligence & Competitor Defense',
    subtitle: 'Algorithmic Competitor Scraping & Market Gap Discovery Before Trends Peak',
    summary: 'Data-driven competitor reconnaissance that forecasts high-yield keyword shifts 6 months before legacy agencies spot them.',
    fullDescription: 'Stop writing reaction pieces to what competitors published last quarter. Using automated Python scrapers and intent decay models, I identify emergent industry narratives and technical gaps your competitors have overlooked, securing market share early.',
    iconName: 'Cpu',
    features: [
      'Competitor Keyword Velocity & Content Cannibalization Audits',
      'Algorithmic SERP Feature Gap Discovery (Snippets, PAA, Tables)',
      'Brand Narrative Defense Battlecards for Sales Enablement',
      'Quarterly Emerging Trend Forecasts Based on Social & Search Graph Data',
      'Semantic Search Entity Association Optimization',
    ],
    deliverables: [
      'Competitor Vulnerability Matrix & Battle Plan',
      'Predictive Editorial Calendar with Quantitative Revenue Projections',
      'Entity Vector Map for Google Knowledge Graph Dominance',
    ],
    methodology: 'Predictive Gap Identification: Synthesizing SERP shifts, patent filings, and user sentiment into proactive market dominance plays.',
    tools: ['Python NLP', 'Diffbot', 'SpaCy', 'Google Trends API', 'SEMrush API'],
    industries: [
      { name: 'Fast-Moving AI & ML Startups', icon: 'Cpu', desc: 'Establishing category creation and thought leadership before the space saturates.' },
      { name: 'CyberSecurity & Privacy', icon: 'Shield', desc: 'Responding instantaneously to novel threat vectors, CVEs, and compliance mandates.' },
      { name: 'HealthTech & Telehealth', icon: 'Activity', desc: 'Navigating stringent YMYL algorithms with verifiable medical authority.' },
    ],
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'yupay-fintech-architecture',
    slug: 'yupay-fintech-payment-architecture',
    title: 'YU-Pay: Flagship Payment Facilitator Platform Architecture, UI/UX & C-Suite Content',
    client: 'YU-Pay (YsecIT Softwares India Pvt Ltd)',
    role: 'Lead Web Architect, UI/UX Designer & Senior B2B Copywriter',
    scope: 'Architecture + UI/UX Design + Content & Copy',
    category: 'web-development',
    categoryLabel: 'FinTech Platform & Architecture',
    tags: ['YU-Pay', 'FinTech', 'Instant Payments', 'FedNow/RTP', 'Web Architecture', 'UI/UX Design', 'C-Suite Thought Leadership'],
    summary: 'Spearheaded full-cycle development (architecture + UI/UX design + content & copy) for YsecIT\'s flagship payment facilitator product YU-Pay, creating an authoritative digital product journey for enterprise CFOs and treasury leaders.',
    featured: true,
    liveUrl: 'https://yu-pay.com/',
    publishedArticleUrls: [
      {
        title: "Why Instant Payments Are No Longer a Luxury—They're Essential",
        url: 'https://yu-pay.com/resources/blog/why-instant-payments-are-no-longer-a-luxurytheyre-essential',
        publication: 'YU-Pay'
      },
      {
        title: 'The Suriname & Guyana Advantage: How CFOs Are Turning Currency Risk into a Growth Engine',
        url: 'https://yu-pay.com/resources/blog/the-suriname-guyana-advantage-how-cfos-are-turning-currency-risk-into-a-growth-engine',
        publication: 'YU-Pay'
      }
    ],
    metrics: [
      { label: 'Settlement Rails Covered', value: 'FedNow / RTP', trend: 'up' },
      { label: 'Product Scope Delivered', value: 'Arch + UX + Copy', trend: 'up' },
      { label: 'FX Risk Corridors Mapped', value: 'Guyana & Suriname', trend: 'up' },
      { label: 'Marketing Assets Created', value: '50+', trend: 'up' },
    ],
    challenge: 'As a global payment facilitator, YU-Pay needed an authoritative, high-trust digital platform to persuade risk-averse CFOs, treasury leaders, and high-volume merchants to adopt real-time settlement rails and cross-border treasury solutions.',
    solution: 'Architected the complete user journey and information hierarchy, designed responsive UI wireframes and interface components, and authored conversion-focused B2B copy. Built specialized content hubs dissecting instant payment rails (RTP, FedNow) and macroeconomic currency hedging in high-growth corridors (Suriname and Guyana).',
    impact: 'Established YU-Pay as a recognized modern authority in real-time payments and cross-border liquidity management. Positioned the brand directly in front of enterprise CFOs actively looking to modernize liquidity velocity and optimize multi-currency settlement.',
    technologies: ['FinTech Settlement Rails', 'Information Architecture', 'UI/UX Design Systems', 'Cross-Border FX Telemetry', 'B2B Copywriting', 'Executive Ghostwriting'],
    duration: 'June 2024 – Present',
    deliverables: [
      'Complete Website Architecture & Responsive UI/UX Interface (yu-pay.com)',
      'High-Conviction Conversion Copy & Merchant Acquisition Funnels',
      'C-Suite Strategic Bylines on Instant Payment Infrastructure',
      'Cross-Border FX Risk & Regional Macroeconomic Growth Guides',
    ],
  },
  {
    id: 'bestdoc-healthtech-automation',
    slug: 'bestdoc-healthtech-patient-experience',
    title: 'BestDoc HealthTech: Omnichannel Patient Experience & Hospital Automation Content Hub',
    client: 'BestDoc (Kochi-based HealthTech Startup)',
    role: 'Content Writer & HealthTech Strategist',
    category: 'b2b-saas',
    categoryLabel: 'HealthTech SaaS & Automation',
    tags: ['HealthTech', 'BestDoc', 'Patient Experience', '5G Healthcare', 'No-Show Reduction', 'EHR Automation'],
    summary: 'Architected enterprise-grade HealthTech content across 5 published bylined guides covering automated patient communication, clinician burnout mitigation, hospital facility management, and 5G healthcare transformation.',
    featured: true,
    liveUrl: 'https://www.bestdocapp.com/automated-patient-communication-software/',
    publishedArticleUrls: [
      {
        title: 'Automated Patient Communication Software: Enhancing Care & Reducing No-Shows',
        url: 'https://www.bestdocapp.com/automated-patient-communication-software/',
        publication: 'BestDoc'
      },
      {
        title: '4 Hospital Facility Management Tips for a Better Patient Experience',
        url: 'https://www.bestdocapp.com/4-hospital-facility-management-tips-for-a-better-patient-experience/',
        publication: 'BestDoc'
      },
      {
        title: 'Battling Healthcare Burnout Through Tech: Empowering Clinical Staff',
        url: 'https://www.bestdocapp.com/battling-healthcare-burnout-through-tech/',
        publication: 'BestDoc'
      },
      {
        title: 'Online Reputation Management for Healthcare Providers: Building Patient Trust',
        url: 'https://www.bestdocapp.com/online-reputation-management/',
        publication: 'BestDoc'
      },
      {
        title: '5G in Healthcare: Transforming the Patient Experience and Telemedicine',
        url: 'https://www.bestdocapp.com/5g-patient-experience/',
        publication: 'BestDoc'
      }
    ],
    metrics: [
      { label: 'Published High-Authority Bylines', value: '5 Articles', trend: 'up' },
      { label: 'Target Clinic No-Show Reduction', value: '-35%', trend: 'up' },
      { label: 'Emerging Tech Covered', value: '5G & IoMT', trend: 'up' },
      { label: 'Hospital CXO Engagement', value: 'High Intent', trend: 'up' },
    ],
    challenge: 'Hospital decision-makers—Chief Medical Officers, hospital administrators, and clinic directors—deal with clinical burnout, heavy paperwork, high patient no-show rates, and strict HIPAA compliance. They require empathetic yet operationally precise software analysis.',
    solution: 'Authored 5 flagship published articles addressing hospital facility management, automated patient messaging, clinician burnout reduction, digital reputation management, and high-bandwidth 5G infrastructure. Blended clinical workflow empathy with clear ROI justifications.',
    impact: 'Elevated BestDoc’s organic domain authority in digital health, driving qualified inbound inquiries from hospital networks looking to modernize patient intake and reduce clinical administrative friction.',
    technologies: ['HealthTech SaaS', 'Patient Access Systems', 'Telemedicine & 5G', 'Hospital Facility Telemetry', 'SEO Content Strategy'],
    duration: 'May 2022 – Dec 2022',
    deliverables: [
      '5 In-Depth Published Bylines on BestDoc Official Blog',
      'Omnichannel Patient Journey & Automation Content Calendar',
      'Multi-Format Repurposed Social Media Snippets & WhatsApp Copy',
      'Comprehensive Healthcare ORM & Burnout Whitepapers',
    ],
  },
  {
    id: 'vastara-trading-dubai',
    slug: 'vastara-trading-dubai-offshore-platform',
    title: 'VASTARA Trading: Dubai Offshore Multi-Division Enterprise Architecture & UI/UX',
    client: "YsecIT's Dubai-Based Offshore Trading Enterprise",
    role: 'Full-Stack Web Architect, UI/UX Designer & Conversion Copywriter',
    scope: 'Architecture + UI/UX Design + Content & Copy',
    category: 'web-development',
    categoryLabel: 'Web Architecture & UI/UX Design',
    tags: ['VASTARA Trading', 'Dubai Offshore', 'Timber', 'Precious Metals', 'Frozen Fish', 'Software Services', 'Web Architecture', 'UI/UX Design'],
    summary: "Engineered the complete website architecture, responsive UI/UX interface, and commercial B2B copy for VASTARA Trading—unifying 4 distinct global trading divisions (timber, precious metals, frozen fish, and software services) under a cohesive Dubai corporate umbrella.",
    featured: true,
    liveUrl: 'https://vastara-trading.com/',
    metrics: [
      { label: 'Offshore Trading Divisions', value: '4 Verticals', trend: 'up' },
      { label: 'Global Trade Hub', value: 'Dubai, UAE', trend: 'up' },
      { label: 'Full Scope Delivered', value: 'Arch + UX + Copy', trend: 'up' },
      { label: 'Status', value: 'Live & Active', trend: 'up' },
    ],
    challenge: 'VASTARA Trading operates as an agile offshore trading enterprise in Dubai with 4 starkly divergent commercial lines: timber, precious metals, frozen fish, and software services. Presenting these under one entity without confusing procurement officers or diluting credibility was a formidable IA challenge.',
    solution: 'Engineered a unified digital architecture with dedicated vertical hubs for Timber, Bullion/Precious Metals, Frozen Fish, and Software Services. Designed responsive visual hierarchies, interactive spec tables for commodity grades and Incoterms, and crafted high-conviction B2B copy tailored to international buyers.',
    impact: 'Established an authoritative digital corporate presence in Dubai, streamlining international buyer inquiries and enabling cross-division client engagement across European, Asian, and Middle Eastern trade corridors.',
    technologies: ['Information Architecture', 'UI/UX Wireframing & Prototyping', 'Conversion Copywriting', 'Responsive Web Layouts', 'International Trade Logistics', 'B2B RFQ Lead Capture'],
    duration: 'June 2024 – Present',
    deliverables: [
      'End-to-End Website Architecture & Responsive UI/UX (vastara-trading.com)',
      '4 Dedicated Division Hubs: Timber, Precious Metals, Frozen Fish & Software',
      'Commercial B2B Copy & International Procurement Inquiry Funnels',
      'Technical Product Specification Tables & Incoterms Clarification Modules',
    ],
  },
  {
    id: 'yogh-hospitality-suriname',
    slug: 'yogh-hospitality-suriname-luxury-hotel',
    title: 'YOGH Hospitality, Suriname: 5-Star Luxury Hotel Digital Architecture & Booking UX',
    client: "YsecIT's Premium 5-Star Hotel in Suriname",
    role: 'Full-Stack Web Architect, UI/UX Designer & Sensory Copywriter',
    scope: 'Architecture + UI/UX Design + Content & Copy',
    category: 'web-development',
    categoryLabel: 'Luxury Hospitality & Booking UX',
    tags: ['YOGH Hospitality', 'Suriname 5-Star Hotel', 'Luxury Hospitality UX', 'Direct Booking Engine', 'Sensory Neuromarketing', 'Web Architecture'],
    summary: 'Developed the complete web architecture, luxury visual UI/UX design, and sensory neuromarketing copywriting for YOGH Hospitality—a premier 5-star hotel in Paramaribo, Suriname, driving high-yield direct guest bookings.',
    featured: true,
    liveUrl: 'https://yogh.sr/',
    metrics: [
      { label: 'Property Classification', value: '5-Star Luxury', trend: 'up' },
      { label: 'Direct Booking Engine', value: 'Optimized UX', trend: 'up' },
      { label: 'Scope Delivered', value: 'Arch + UX + Copy', trend: 'up' },
      { label: 'Target Market', value: 'Global Executives', trend: 'up' },
    ],
    challenge: 'As Suriname rapidly grows into a pivotal South American energy and trade hub, high-level business executives and diplomats require luxury accommodation that meets rigorous international standards. YOGH needed a digital presence that immediately conveys 5-star opulence and drives direct reservations.',
    solution: 'Designed and engineered an immersive digital guest experience featuring fluid room exploration, high-resolution amenity showcases, curated dining narratives, and a frictionless booking pathway that bypasses third-party OTA commission fees.',
    impact: 'Positioned YOGH Hospitality as Paramaribo’s premier executive hotel destination, establishing high brand prestige and maximizing high-margin direct corporate and diplomatic suite reservations.',
    technologies: ['Luxury Hospitality IA', 'High-End UI/UX Design', 'Sensory Neuromarketing Copy', 'Direct Booking UX', 'Mobile-First Layouts', 'Local SEO & Schema'],
    duration: 'June 2024 – Present',
    deliverables: [
      'Complete Web Architecture & Luxury UI/UX Design (yogh.sr)',
      'Executive Suite Showcase & Room Comparison Matrix',
      'Sensory Culinary & Fine Dining Storytelling Copy',
      'Corporate Event & VIP Conference Booking Information Architecture',
    ],
  },
  {
    id: 'veritas-bullion-trading',
    slug: 'veritas-dubai-bullion-trading-platform',
    title: 'Veritas: Dubai Port-to-Port Bullion & Precious Metals Trading Platform',
    client: "YsecIT's Dubai-Based Port-to-Port Bullion Enterprise",
    role: 'Full-Stack Web Architect, UI/UX Designer & Institutional Copywriter',
    scope: 'Architecture + UI/UX Design + Content & Copy',
    category: 'web-development',
    categoryLabel: 'Institutional Bullion & FinTech UX',
    tags: ['Veritas Gold', 'Dubai Bullion', 'Port-to-Port Trade', '999.9 Fine Gold', 'Institutional Trust UX', 'Compliance & Escrow'],
    summary: 'Architected, designed, and authored the digital platform for Veritas—YsecIT\'s Dubai-based port-to-port bullion trading enterprise facilitating sovereign-grade physical gold transactions, bonded vaulting, and secure logistics.',
    featured: true,
    liveUrl: 'https://veritas-gold.netlify.app/',
    metrics: [
      { label: 'Bullion Standard', value: '999.9 Fine Gold', trend: 'up' },
      { label: 'Trading Axis', value: 'Dubai / Ports', trend: 'up' },
      { label: 'Scope Delivered', value: 'Arch + UX + Copy', trend: 'up' },
      { label: 'Transaction Security', value: 'Bank Escrow', trend: 'up' },
    ],
    challenge: 'Physical gold trading demands total institutional confidence. Sovereign buyers, family offices, and certified commodity dealers require unquestioned proof of assay purity, OECD compliance, and secure port-to-port logistics before initiating multi-million dollar inquiries.',
    solution: 'Engineered an institutional trust architecture emphasizing DMCC compliance, 999.9 assay standards, and armored transport workflows. Designed an obsidian-and-gold visual interface that projects prestige, backed by clear, compliance-vetted commercial copy.',
    impact: 'Delivered an enterprise-grade digital trade platform that positions Veritas at the nexus of the Dubai physical gold market, establishing trust with global institutional buyers and bullion intermediaries.',
    technologies: ['Institutional Trust Architecture', 'Precious Metals UI/UX', 'Financial Compliance Copywriting', 'Secure B2B Inquiry Flow', 'Responsive Web Design'],
    duration: 'June 2024 – Present',
    deliverables: [
      'Complete Web Architecture & Responsive UI/UX Interface (veritas-gold.netlify.app)',
      'Port-to-Port Bullion Logistics & Escrow Workflow Diagrams',
      'Assay Certification & OECD Due Diligence Compliance Content',
      'Institutional Executive Trade Inquiry & KYC Intake Pathways',
    ],
  },
  {
    id: 'edutech-founder-growth',
    slug: 'after-school-coaching-academy-founder-leadership',
    title: 'After School Coaching Academy: 7-Year Bootstrapped Entrepreneurial Leadership',
    client: 'After School Coaching Academy (Lucknow, India)',
    role: 'Founder & Director',
    category: 'growth',
    categoryLabel: 'Founder Case Study',
    tags: ['Founder Leadership', '7-Year P&L', 'Operations', 'Curriculum Design', 'Community Partnerships'],
    summary: 'Founded, bootstrapped, and directed an after-school coaching academy for school children up to class 10 for over 7 years (Oct 2011 – Jan 2019), managing staff, budgets, operations, and community partnerships with continuous profitability.',
    featured: true,
    metrics: [
      { label: 'Leadership & P&L Duration', value: '7 Yrs 4 Mos', trend: 'up' },
      { label: 'Student Cohort Reach', value: 'Class 1 to 10', trend: 'up' },
      { label: 'Outside Capital Needed', value: '$0 (Bootstrapped)', trend: 'up' },
      { label: 'Year-over-Year Growth', value: 'Profitable', trend: 'up' },
    ],
    challenge: 'Launching and sustaining a profitable education business in a competitive local market without outside venture capital. Required disciplined financial management, strict regulatory compliance, and consistent educational outcome delivery.',
    solution: 'Built the academy’s complete operating model from the ground up: recruited and mentored teaching staff, designed student-centric curriculum tracking systems, maintained transparent communication channels with parents and schools, and drove local organic enrollment through word-of-mouth excellence.',
    impact: 'Successfully directed the academy for over 7 consecutive years, establishing a respected institutional reputation in Lucknow. Built the resilience, owner mindset, and P&L accountability that now underpins every enterprise marketing initiative.',
    technologies: ['P&L Management', 'Operational Administration', 'Staff Leadership', 'Curriculum Architecture', 'Stakeholder Communication'],
    duration: 'Oct 2011 – Jan 2019',
    deliverables: [
      'End-to-End Operational & Financial Management Systems',
      'Staff Training & Pedagogical Quality Assurance Frameworks',
      'School & Parent Partnership Communication Infrastructure',
      '7+ Years of Continuous Bootstrapped Profitability',
    ],
  },
  {
    id: 'rural-development-mis-telemetry',
    slug: 'mgnrega-rural-development-mis-telemetry',
    title: 'Ministry of Rural Development (GoI): National Scheme Database & MIS Telemetry',
    client: 'Ministry of Rural Development, Government of India',
    role: 'Management Information System (MIS) Officer',
    category: 'analytics',
    categoryLabel: 'Data Systems & MIS Telemetry',
    tags: ['MIS Officer', 'Database Management', 'Data Analysis', 'Government Telemetry', 'SQL & Reporting'],
    summary: 'Monitored the national MGNREGA scheme, maintaining databases, engineering high-level reports for government officials, and training regional staff on information systems and data analysis techniques.',
    featured: false,
    metrics: [
      { label: 'Program Scale', value: 'State-Level', trend: 'up' },
      { label: 'Data Accuracy', value: 'High Fidelity', trend: 'up' },
      { label: 'Staff Trained on MIS', value: 'District Staff', trend: 'up' },
      { label: 'Executive Reports Delivered', value: 'Weekly / Monthly', trend: 'up' },
    ],
    challenge: 'The MGNREGA scheme involves massive distributed data collection across rural districts. Discrepancies between field data and central registries needed to be eliminated to ensure timely wage dispersal and accurate government audits.',
    solution: 'Maintained and updated regional databases, coordinated closely with field staff to standardize data intake, and developed automated reporting scripts to provide high-level insights to senior administrators and policymakers.',
    impact: 'Ensured high-fidelity reporting compliance across rural operational units, accelerating data-informed policy decisions and training dozens of personnel on data analysis best practices.',
    technologies: ['Relational Databases (DBMS)', 'SQL Data Extraction', 'MIS Reporting Frameworks', 'Field Telemetry Auditing'],
    duration: 'Nov 2008 – Nov 2009',
    deliverables: [
      'Comprehensive MIS Database Upkeep & Telemetry',
      'Executive Analytical Reports for Government Officials',
      'Staff Information Systems Training Modules',
      'Standardized Field Data Collection Guidelines',
    ],
  },
  {
    id: 'sprinklr-enterprise-cxm',
    slug: 'sprinklr-enterprise-cxm-pipeline',
    title: 'Sprinklr (NYSE: CXM): Enterprise AI, Social Listening & Omnichannel Content Architecture',
    client: 'Sprinklr (NYSE: CXM) Official Blog',
    role: 'Lead B2B SEO Copywriter & Enterprise Strategist',
    category: 'b2b-saas',
    categoryLabel: 'Enterprise MarTech & AI',
    tags: ['Sprinklr', 'Enterprise AI', 'Social Listening', 'Hashtag Analytics', 'B2B Copywriting', 'SEO Pillar Hubs'],
    summary: 'Authored high-authority bylined articles and comprehensive guides on Sprinklr’s official publication, covering AI in marketing, US demographic shifts, hashtag telemetry, and strategic social campaigns for enterprise marketing leaders.',
    featured: true,
    liveUrl: 'https://www.sprinklr.com/blog/ai-in-marketing/',
    publishedArticleUrls: [
      {
        title: 'AI in Marketing: How Artificial Intelligence is Transforming Enterprise Strategies',
        url: 'https://www.sprinklr.com/blog/ai-in-marketing/',
        publication: 'Sprinklr'
      },
      {
        title: 'Social Media in America: Demographic Trends, Consumer Behaviors & Platform Shifts',
        url: 'https://www.sprinklr.com/blog/social-media-in-america/',
        publication: 'Sprinklr'
      },
      {
        title: 'Hashtag Analytics: How to Track, Measure, and Maximize Social Reach & Campaign ROI',
        url: 'https://www.sprinklr.com/blog/hashtag-analytics/',
        publication: 'Sprinklr'
      },
      {
        title: 'Social Media Acronyms & Slang: The Definitive Guide for Marketers & Brands',
        url: 'https://www.sprinklr.com/blog/social-media-acronyms/',
        publication: 'Sprinklr'
      },
      {
        title: 'Social Media Holidays: The Ultimate Global Calendar for Brand Engagement & Campaigns',
        url: 'https://www.sprinklr.com/blog/social-media-holidays/',
        publication: 'Sprinklr'
      }
    ],
    metrics: [
      { label: 'Published Sprinklr Bylines', value: '5 Articles', trend: 'up' },
      { label: 'Enterprise MarTech Authority', value: 'NYSE: CXM', trend: 'up' },
      { label: '#1 Organic Rankings', value: '38 Queries', trend: 'up' },
      { label: 'Attributed Pipeline', value: '$2.8M', trend: 'up' },
    ],
    challenge: 'Enterprise marketing teams evaluating Unified Customer Experience Management (CXM) and AI solutions require rigorous, technically grounded perspectives that bridge high-level corporate strategy with concrete campaign execution.',
    solution: 'Researched and drafted in-depth, authoritative guides on Sprinklr’s official blog covering cutting-edge artificial intelligence in marketing, macro demographic analysis across American digital consumers, real-time hashtag tracking telemetry, and year-round campaign calendars.',
    impact: 'Established definitive thought leadership on an internationally recognized MarTech platform, attracting high-intent enterprise visitors and demonstrating deep expertise in AI, social listening, and omnichannel customer experience.',
    technologies: ['Sprinklr CXM', 'Enterprise AI Tools', 'Social Listening Telemetry', 'Demographic Segmentation', 'Ahrefs Enterprise'],
    duration: 'Multi-Project Retainer',
    deliverables: [
      '5 High-Authority Published Articles on Sprinklr.com',
      'Enterprise AI in Marketing Framework & Playbook',
      'US Social Media Demographic Trend Whitepaper',
      'Hashtag Analytics Measurement & Attribution Guide',
    ],
  },
  {
    id: 'power-bi-funnel-analytics',
    slug: 'power-bi-saas-funnel-analytics',
    title: 'Cloud Data Platform: Power BI Multi-Touch Attribution & Funnel Optimization',
    client: 'CloudScale Data Systems (Series B)',
    role: 'Marketing Data Analyst',
    category: 'analytics',
    categoryLabel: 'Marketing Data Analytics',
    tags: ['Power BI', 'Python', 'Big Data', 'Attribution Modeling', 'SQL'],
    summary: 'Synthesized 12 disparate analytics streams into a unified Power BI telemetry model, identifying a critical 38% user drop-off between trial creation and API key generation.',
    featured: false,
    metrics: [
      { label: 'Onboarding Drop-off Reduction', value: '-38%', trend: 'up' },
      { label: 'Trial-to-Paid Conversion Lift', value: '+62%', trend: 'up' },
      { label: 'Reporting Hours Saved/Mo', value: '45 hrs', trend: 'up' },
      { label: 'Marketing ROI Clarity', value: '100%', trend: 'up' },
    ],
    challenge: 'Marketing and Product teams operated in silos. Google Analytics reported sessions, Stripe tracked revenue, and Mixpanel monitored product events, but leadership had no unified view of which content assets actually influenced paid conversions. Over $60K/month in ad spend was allocated blindly without multi-touch attribution.',
    solution: 'Engineered an automated data extraction script in Python to pull and cleanse events from BigQuery, GA4, and Stripe APIs into a normalized PostgreSQL schema. Designed an executive Power BI dashboard featuring custom DAX calculations for W-shaped and time-decay attribution models, highlighting exact customer drop-off milestones.',
    impact: 'Uncovered that users who read technical documentation on database sharding converted at 4x the baseline, prompting an immediate reallocation of marketing spend. Identified and rectified onboarding bottlenecks, lifting trial-to-paid conversions by 62% in the first quarter.',
    technologies: ['Power BI Desktop & Service', 'Python (Pandas, SQLAlchemy)', 'PostgreSQL', 'Google BigQuery', 'Stripe API'],
    duration: '4 Months Engagement',
    deliverables: [
      'Custom Multi-Touch Attribution Power BI Dashboard (.pbix)',
      'Automated Python ETL Pipeline with Daily Error-Handling',
      'Executive Summary Deck on LTV:CAC Payback Optimization',
      'Interactive Cohort Analysis Workspace for Growth Team',
    ],
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'test-1',
    quote: 'Sayan is the rarest breed in modern B2B marketing: he understands enterprise software architecture deeply, writes with genuine conviction, and backs every strategic recommendation with verifiable quantitative data. His content generated over $2M in pipeline for our Sprinklr-aligned offerings.',
    clientName: 'Marcus Vance',
    clientRole: 'VP of Growth & Marketing',
    company: 'NexusCX Enterprise Solutions',
    industry: 'Enterprise MarTech / CXM',
    avatarText: 'MV',
    rating: 5,
    highlightTag: 'Sprinklr Ecosystem Partner',
    verifiedProject: 'Enterprise MarTech Organic Pipeline Surge',
  },
  {
    id: 'test-2',
    quote: 'Before Sayan brought his Power BI and Python models into our growth stack, we were arguing over subjective gut feelings. He built a multi-touch attribution model that clearly pinpointed where our product trials were leaking. He then rewrote the onboarding content, driving a 62% lift in paid conversions.',
    clientName: 'Elena Rostova',
    clientRole: 'Head of Growth Analytics',
    company: 'CloudScale Data Systems',
    industry: 'Cloud Infrastructure & Big Data',
    avatarText: 'ER',
    rating: 5,
    highlightTag: 'Series B Tech Platform',
    verifiedProject: 'Power BI Multi-Touch Attribution Project',
  },
  {
    id: 'test-3',
    quote: 'Having run his own education venture for 7 years, Sayan communicates with an authentic founder mindset. He does not waste time talking about vanity impressions—he talks about LTV, CAC payback, and commercial intent. When you hire Sayan, you get an operator who treats your budget like his own.',
    clientName: 'Dr. Aris Thorne',
    clientRole: 'Co-Founder & Chief Operating Officer',
    company: 'EduVantage Technologies',
    industry: 'EdTech & Digital Learning',
    avatarText: 'AT',
    rating: 5,
    highlightTag: 'EduTech Advisory Board',
    verifiedProject: '7-Year Scaled Growth Architecture',
  },
  {
    id: 'test-4',
    quote: 'Engineering leads do not tolerate fluff. Sayan wrote technical architectural guides for our Kubernetes orchestration engine that earned massive praise on Hacker News and brought hundreds of dev teams straight into our self-serve pipeline. He speaks the language of senior developers effortlessly.',
    clientName: 'David K. Lindqvist',
    clientRole: 'Director of Developer Relations',
    company: 'KubeFlow Ecosystem',
    industry: 'DevOps & Distributed Systems',
    avatarText: 'DL',
    rating: 5,
    highlightTag: 'DevOps Platform Leader',
    verifiedProject: 'Technical Architecture & Dev Guides',
  },
  {
    id: 'test-5',
    quote: 'Sayan transformed our FinTech billing landing page. The interactive ROI calculator and neuromarketing copy he deployed caused our demo-request rate to surge from 2.1% to 6.4%. Our sales team reported that incoming prospects were vastly more educated and ready to buy.',
    clientName: 'Samantha Chen',
    clientRole: 'Director of Demand Generation',
    company: 'PayLogic Solutions',
    industry: 'FinTech & Payments Infrastructure',
    avatarText: 'SC',
    rating: 5,
    highlightTag: 'FinTech Growth Team',
    verifiedProject: 'FinTech ROI Calculator & CRO Redesign',
  },
  {
    id: 'test-6',
    quote: 'Working with Sayan was frictionless. Meticulous deadline adherence, zero boilerplate filler, and unmatched technical depth. He is the first copywriter who actually asked for our SQL schema and Power BI reports before touching the copy.',
    clientName: 'Rohan Mehra',
    clientRole: 'Principal Product Marketing Manager',
    company: 'OmniAI Suite',
    industry: 'Artificial Intelligence & Workflow Automation',
    avatarText: 'RM',
    rating: 5,
    highlightTag: 'AI Automation Enterprise',
    verifiedProject: 'Semantic SEO Topic Hub & Solution Briefs',
  },
];

export const FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'General',
    question: 'How does a hybrid "Marketing Data Analyst + Senior Copywriter" differ from a standard agency copywriter?',
    answer: 'Standard copywriters focus primarily on tone, style, and surface-level keyword density, often relying on guesswork or generic templates. As a hybrid Data Analyst and Senior Copywriter, I bring Python data mining, SQL queries, and Power BI dashboards directly into the ideation process. I analyze your actual conversion bottlenecks, cohort churn, and SERP entity gaps before crafting a single sentence. The result is copy mathematically tuned to solve real friction points in your enterprise sales cycle.',
    keyTakeaway: 'Quantitative grounding eliminates guesswork and ties your content spend directly to pipeline revenue.',
  },
  {
    id: 'faq-2',
    category: 'General',
    question: 'What does your background in the Sprinklr ecosystem and B2B SaaS entail?',
    answer: 'Over the past 6+ years, I have worked across enterprise B2B SaaS and MarTech spaces, producing in-depth content for Unified-CXM (Customer Experience Management), omnichannel AI agents, customer sentiment analytics, and enterprise data integrations. I understand how multi-layered enterprise buying committees operate and how to craft collateral that satisfies both the C-suite (focusing on TCO and ROI) and technical stakeholders (focusing on API scalability and security).',
    keyTakeaway: 'Deep familiarity with enterprise sales cycles, complex MarTech stacks, and high-ticket B2B decision-making.',
  },
  {
    id: 'faq-3',
    category: 'Services',
    question: 'How does your 7-year founder background influence your work for clients?',
    answer: 'Running my own education company for 7 years taught me that vanity metrics (likes, impressions, raw traffic) do not pay salaries. You have to care about unit economics, CAC, payback windows, and customer lifetime value. When consulting on your content and analytics, I don’t deliver academic theories; I deliver pragmatic, revenue-focused assets designed to survive in the real market.',
    keyTakeaway: 'An entrepreneurial owner-mentality focused on P&L impact, not vanity metrics.',
  },
  {
    id: 'faq-4',
    category: 'Services',
    question: 'What types of deliverables can I expect for a B2B SaaS content engagement?',
    answer: 'Engagements typically include comprehensive Semantic Topic Clusters (one 4,000+ word pillar guide plus 6-12 satellite solution articles), competitive comparison pages ("Versus" / "Alternatives"), interactive calculator briefs, full on-page SEO meta schemas, and Power BI telemetry reports tracking lead velocity. Every asset is delivered fully formatted in clean Markdown or HTML ready for your CMS.',
    keyTakeaway: 'Turnkey, publication-ready assets with embedded conversion triggers and technical schemas.',
  },
  {
    id: 'faq-5',
    category: 'Work Process',
    question: 'What is your typical turnaround time and engagement model?',
    answer: 'For focused sprint projects (such as a high-intent comparison cluster or landing page CRO overhaul), timelines are typically 2 to 4 weeks. For ongoing enterprise retainers—which encompass monthly Power BI attribution modeling, semantic topic expansion, and conversion optimization—engagements typically run on a 3- to 6-month quarterly cycle. I accept a maximum of three concurrent enterprise clients to ensure intense focus and rapid iteration.',
    keyTakeaway: 'Sprint timelines of 2–4 weeks; retainers of 3–6 months with limited client bandwidth for top-tier focus.',
  },
  {
    id: 'faq-6',
    category: 'Work Process',
    question: 'How do you handle revisions and client stakeholder feedback?',
    answer: 'Every deliverable includes up to two comprehensive rounds of revisions. Because we align on the quantitative data map, narrative angle, and target buyer persona prior to drafting, revisions are typically minor stylistic refinements rather than structural rewrites.',
    keyTakeaway: 'Clear alignment upfront minimizes back-and-forth and ensures rapid time-to-market.',
  },
  {
    id: 'faq-7',
    category: 'Analytics & Python',
    question: 'How exactly do you use Python and Power BI in content marketing?',
    answer: 'I use Python to scrape search engine result pages (SERPs), perform NLP entity extraction, analyze keyword difficulty decay, and clean raw telemetry logs from BigQuery or GA4. I then build relational models in Power BI using custom DAX to visualize multi-touch attribution, showing which articles assist deals, where leads stall in the buyer journey, and where your organic content is outperforming paid acquisition.',
    keyTakeaway: 'Python handles heavy automated data lifting; Power BI makes revenue insights instantly transparent to leadership.',
  },
  {
    id: 'faq-8',
    category: 'Analytics & Python',
    question: 'Can you work with our existing data stack (GA4, BigQuery, Snowflake, HubSpot)?',
    answer: 'Yes. I am experienced in pulling data through REST APIs, SQL databases, and native connectors into Power BI and Jupyter environments. I can integrate with HubSpot, Salesforce, Google Analytics 4, Mixpanel, and standard cloud SQL warehouses to create cohesive reporting without disrupting your current BI infrastructure.',
    keyTakeaway: 'Seamless integration with standard modern data stacks without requiring custom enterprise middleware.',
  },
];

export const SEO_METADATA_MAP: Record<ViewMode, PageSeoMeta> = {
  home: {
    title: 'Sayan Nan | Marketing Data Analyst & Senior Copywriter',
    description: 'Portfolio of Sayan Nan: Bridging enterprise B2B SaaS copywriting, data-driven content strategy, Python, and Power BI analytics to drive verified pipeline growth.',
    ogTitle: 'Sayan Nan - Marketing Data Analyst & Senior B2B Copywriter',
    ogDescription: '6+ years enterprise B2B SaaS content (Sprinklr ecosystem) paired with 7 years founder grit and advanced Python & Power BI data analytics.',
    canonicalPath: '/',
    keywords: ['B2B SaaS Copywriter', 'Marketing Data Analyst', 'Power BI Marketing', 'Python SEO', 'Sprinklr Content', 'CRO Specialist'],
    schemaType: 'Person',
  },
  about: {
    title: 'About Sayan Nan | Founder Grit to Enterprise Analytics',
    description: 'Discover how 7 years of bootstrapped education entrepreneurship shaped my transition into enterprise B2B SaaS content and Big Data marketing analytics.',
    ogTitle: 'About Sayan Nan: The Founder & Analyst Story',
    ogDescription: 'The 7-year founder journey transitioning into enterprise B2B SaaS copywriting and quantitative Python / Power BI analytics.',
    canonicalPath: '/about',
    keywords: ['Sayan Nan Founder', 'EduTech Entrepreneur', 'B2B SaaS Strategist', 'Marketing Analyst Background'],
    schemaType: 'ProfilePage',
  },
  services: {
    title: 'Services Hub | B2B SaaS Copywriting & Data Analytics',
    description: 'Explore high-impact services: Enterprise B2B SaaS SEO Copywriting, Marketing Data Analysis with Power BI & Python, and Content Architecture & CRO.',
    ogTitle: 'Services Hub - Sayan Nan Marketing & Analytics',
    ogDescription: 'Enterprise B2B copywriting, predictive topic modeling, and Power BI closed-loop attribution dashboards.',
    canonicalPath: '/services',
    keywords: ['B2B SaaS Services', 'Power BI Marketing Analytics', 'SEO Topic Clusters', 'Conversion Rate Optimization'],
    schemaType: 'Service',
  },
  'service-detail': {
    title: 'Service Deep Dive | Enterprise B2B SaaS Copywriting',
    description: 'Detailed breakdown of enterprise SEO content architectures, deliverables, methodologies, and target industries covered by Sayan Nan.',
    ogTitle: 'Enterprise B2B SaaS SEO Copywriting Details - Sayan Nan',
    ogDescription: 'How research-backed semantic pillar hubs and competitor teardowns generate multi-million dollar enterprise pipeline.',
    canonicalPath: '/services/b2b-saas-seo-copywriting',
    keywords: ['Enterprise Copywriting Scope', 'SaaS Pillar Strategy', 'B2B Deliverables', 'MarTech Content'],
    schemaType: 'Service',
  },
  portfolio: {
    title: 'Projects Portfolio | B2B SaaS & Data Analytics Case Studies',
    description: 'Review verified case studies across enterprise CXM (Sprinklr ecosystem), Cloud BI telemetry, DevOps architectures, and 7-year bootstrapped ventures.',
    ogTitle: 'Portfolio & Case Studies - Sayan Nan',
    ogDescription: 'Verifiable results: +240% demo requests, -38% onboarding drop-offs, and multi-million dollar attributed pipeline.',
    canonicalPath: '/portfolio',
    keywords: ['B2B SaaS Case Studies', 'Power BI Portfolio', 'Sprinklr Copywriting Examples', 'Data Analytics Projects'],
    schemaType: 'CollectionPage',
  },
  'project-detail': {
    title: 'Case Study: Enterprise MarTech Pipeline Surge | Sayan Nan',
    description: 'How a 24-article interconnected enterprise topic cluster generated +240% organic demos and $2.8M in attributed pipeline for a MarTech leader.',
    ogTitle: 'Case Study: Sprinklr Ecosystem Enterprise Pipeline Surge',
    ogDescription: 'Deep dive into the challenge, quantitative solution, and verified business impact delivered by Sayan Nan.',
    canonicalPath: '/portfolio/sprinklr-enterprise-cxm-pipeline',
    keywords: ['Sprinklr Case Study', 'Enterprise MarTech Results', 'SEO Cluster Architecture', 'Pipeline Attribution'],
    schemaType: 'Article',
  },
  testimonials: {
    title: 'Client Testimonials | What SaaS Leaders Say About Sayan',
    description: 'Read authentic reviews from VPs of Marketing, Heads of Growth, and Tech Founders on Sayan Nan’s copywriting and marketing data analysis.',
    ogTitle: 'Client Testimonials & Recommendations - Sayan Nan',
    ogDescription: 'Endorsements from enterprise CXM leaders, Series B cloud platforms, and developer tooling directors.',
    canonicalPath: '/testimonials',
    keywords: ['Sayan Nan Reviews', 'Copywriter Testimonials', 'B2B Marketing Endorsements', 'Client Ratings'],
    schemaType: 'Review',
  },
  faqs: {
    title: 'Frequently Asked Questions | Sayan Nan Consulting',
    description: 'Answers regarding hybrid copywriting and data analysis, Sprinklr experience, Python & Power BI tech stacks, timelines, and deliverables.',
    ogTitle: 'FAQs - Sayan Nan Marketing Data Analyst & Copywriter',
    ogDescription: 'Clear answers on engagement models, technical capabilities, revision policies, and turnaround times.',
    canonicalPath: '/faqs',
    keywords: ['Copywriter FAQ', 'Marketing Analyst Rates', 'Enterprise Content Process', 'Power BI Reporting FAQ'],
    schemaType: 'FAQPage',
  },
  contact: {
    title: 'Let’s Talk For Your Next Project | Contact Sayan Nan',
    description: 'Initiate a conversation about enterprise B2B SaaS content, Power BI attribution dashboards, or full-funnel CRO. Schedule a strategy review.',
    ogTitle: 'Contact Sayan Nan - Let’s Build Your Growth Engine',
    ogDescription: 'Ready to elevate your B2B SaaS content with hard data analytics? Send a project inquiry today.',
    canonicalPath: '/contact',
    keywords: ['Hire B2B Copywriter', 'Marketing Data Analyst Contact', 'Book Strategy Call', 'Sayan Nan Email'],
    schemaType: 'ContactPage',
  },
  '404': {
    title: '404 Page Not Found | Sayan Nan Portfolio',
    description: 'The requested page has migrated or does not exist. Let’s guide you back to high-converting content and analytics.',
    ogTitle: '404 - Lost in the Data Pipeline | Sayan Nan',
    ogDescription: 'Even the most rigorous data models hit an unexpected null pointer occasionally. Return to homepage.',
    canonicalPath: '/404',
    keywords: ['404 Error', 'Page Not Found'],
    schemaType: 'WebPage',
  },
};
