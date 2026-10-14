import React, { useState } from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { 
  FileText, 
  BarChart3, 
  Terminal, 
  Cpu, 
  Sparkles, 
  Layers, 
  TrendingUp,
  CheckCircle2 
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface SkillDataPoint {
  pillar: string;
  shortLabel: string;
  proficiency: number;
  fullMark: number;
  category: 'copywriting' | 'data-analysis' | 'python' | 'power-bi';
  icon: React.ComponentType<{ className?: string }>;
  keyTools: string[];
  evidence: string;
  summary: string;
}

const SKILL_METRICS: SkillDataPoint[] = [
  {
    pillar: 'Enterprise Copywriting',
    shortLabel: 'Copywriting',
    proficiency: 96,
    fullMark: 100,
    category: 'copywriting',
    icon: FileText,
    keyTools: ['Sprinklr Ecosystem', 'SEO Topic Hubs', 'CRO Messaging', 'PLG Briefs'],
    evidence: '250+ enterprise assets produced, consistently claiming #1 organic rankings for high-intent keywords.',
    summary: 'Crafting persuasive, zero-fluff B2B narratives designed to convince skeptical C-suite buying committees.'
  },
  {
    pillar: 'Marketing Data Analysis',
    shortLabel: 'Data Analysis',
    proficiency: 92,
    fullMark: 100,
    category: 'data-analysis',
    icon: BarChart3,
    keyTools: ['SQL / PostgreSQL', 'GA4 & BigQuery', 'Cohort Telemetry', 'Attribution Modeling'],
    evidence: 'Replaced vanity metrics with closed-loop attribution, linking organic traffic to pipeline revenue.',
    summary: 'Analyzing user clickstreams, funnel drop-offs, and multi-touch conversions using relational database queries.'
  },
  {
    pillar: 'Python Engineering & NLP',
    shortLabel: 'Python',
    proficiency: 90,
    fullMark: 100,
    category: 'python',
    icon: Terminal,
    keyTools: ['Pandas & NumPy', 'BeautifulSoup / Scrapy', 'Scikit-learn', 'NLP Sentiment Scraping'],
    evidence: 'Built automated SERP entity mining algorithms scanning 50K+ search results to locate ranking gaps.',
    summary: 'Writing custom data pipelines to scrape competitor keywords, extract entities, and model buyer search intent.'
  },
  {
    pillar: 'Power BI & DAX Dashboards',
    shortLabel: 'Power BI',
    proficiency: 94,
    fullMark: 100,
    category: 'power-bi',
    icon: Cpu,
    keyTools: ['DAX Formulas', 'Power Query M ETL', 'Star Schemas', 'Executive Storyboards'],
    evidence: 'Engineered executive attribution dashboards tracking 3.4x organic pipeline expansion for SaaS leaders.',
    summary: 'Architecting end-to-end data models, calculating complex DAX measures, and visualizing pipeline velocity.'
  },
  {
    pillar: 'Conversion Rate Optimization',
    shortLabel: 'CRO Architecture',
    proficiency: 91,
    fullMark: 100,
    category: 'copywriting',
    icon: TrendingUp,
    keyTools: ['Neuromarketing', 'A/B Event Testing', 'Heatmap Telemetry', 'Friction Elimination'],
    evidence: 'Lifted trial-to-paid conversions by 62% by diagnosing friction points across technical onboarding flows.',
    summary: 'Applying neuromarketing principles and micro-copy refinements to eradicate buyer cognitive load.'
  },
  {
    pillar: 'Attribution & Econometrics',
    shortLabel: 'Attribution',
    proficiency: 89,
    fullMark: 100,
    category: 'data-analysis',
    icon: Layers,
    keyTools: ['W-Shaped Attribution', 'Time-Decay Models', 'CRM Sync', 'CAC/LTV Telemetry'],
    evidence: 'Built multi-touch models that accurately attributed $1.8M+ in closed-won ARR to organic touchpoints.',
    summary: 'Connecting disparate data silos across Google Analytics, HubSpot, and billing engines into unified attribution.'
  }
];

export const SkillsRadarChart: React.FC = () => {
  const { theme } = useTheme();
  const [activeSkill, setActiveSkill] = useState<SkillDataPoint>(SKILL_METRICS[0]);

  const isDark = theme === 'dark';

  // Theme-adaptive styling for Recharts elements
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.1)';
  const tickColor = isDark ? '#d4d4d4' : '#404040';

  // Custom Tooltip component for Recharts
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload as SkillDataPoint;
      return (
        <div className="p-3 rounded-xl bg-neutral-900/95 text-white border border-amber-500/40 shadow-xl backdrop-blur-md max-w-xs text-xs space-y-1.5 pointer-events-none">
          <div className="flex items-center justify-between gap-2 border-b border-neutral-700/60 pb-1">
            <span className="font-bold text-amber-400 font-display">{data.pillar}</span>
            <span className="font-mono font-extrabold text-amber-300">{data.proficiency}%</span>
          </div>
          <p className="text-neutral-300 text-[11px] leading-relaxed">
            {data.summary}
          </p>
          <div className="pt-1 flex flex-wrap gap-1">
            {data.keyTools.slice(0, 2).map((t, idx) => (
              <span key={idx} className="text-[9px] px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 font-mono">
                {t}
              </span>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div 
      id="skills-radar-chart-section" 
      className="p-6 sm:p-8 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-8 shadow-xs"
    >
      {/* Header with Title & Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-400/15 text-amber-700 dark:text-amber-300 border border-amber-400/20">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Hybrid Skill Matrix Radar</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] font-display">
            Visual Competency Telemetry
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
            A balanced quantitative evaluation across B2B Copywriting, Marketing Data Analysis, Python, and Power BI.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-[11px] font-mono text-[var(--text-muted)]">Verified Score:</span>
          <span className="text-xs font-mono font-bold px-2 py-1 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            92.0 / 100 Index
          </span>
        </div>
      </div>

      {/* Main Layout: Radar Chart on Left / Details on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Radar Chart Display Area */}
        <div className="lg:col-span-6 w-full flex flex-col items-center justify-center relative">
          <div className="w-full h-[320px] sm:h-[360px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart 
                cx="50%" 
                cy="50%" 
                outerRadius="75%" 
                data={SKILL_METRICS}
                margin={{ top: 10, right: 25, bottom: 10, left: 25 }}
              >
                <PolarGrid stroke={gridColor} strokeDasharray="3 3" />
                <PolarAngleAxis 
                  dataKey="shortLabel" 
                  tick={{ 
                    fill: tickColor, 
                    fontSize: 11, 
                    fontWeight: 600,
                    fontFamily: 'inherit'
                  }} 
                />
                <PolarRadiusAxis 
                  angle={90} 
                  domain={[0, 100]} 
                  stroke={gridColor}
                  tick={{ fill: tickColor, fontSize: 9 }} 
                />
                <Tooltip content={<CustomTooltip />} />
                <Radar
                  name="Sayan Nan"
                  dataKey="proficiency"
                  stroke="#f59e0b"
                  strokeWidth={2.5}
                  fill="#f59e0b"
                  fillOpacity={isDark ? 0.35 : 0.22}
                  activeDot={{
                    r: 6,
                    fill: '#fbbf24',
                    stroke: '#b45309',
                    strokeWidth: 2,
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="text-center text-[11px] text-[var(--text-muted)] font-mono flex items-center justify-center gap-1.5 mt-1">
            <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
            <span>Hover vertices or click skill cards below for verified execution proof</span>
          </div>
        </div>

        {/* Dynamic Detail Card for Active Selected Skill */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-6 rounded-2xl bg-[var(--bg-secondary)] border border-amber-500/30 space-y-4 shadow-2xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                  <activeSkill.icon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                    Selected Focus Area
                  </span>
                  <h3 className="text-lg font-bold text-[var(--text-primary)] font-display">
                    {activeSkill.pillar}
                  </h3>
                </div>
              </div>

              <div className="text-right">
                <span className="text-2xl font-black text-amber-500 font-display">
                  {activeSkill.proficiency}%
                </span>
                <span className="block text-[10px] font-mono text-[var(--text-muted)]">
                  Proficiency Index
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              {activeSkill.summary}
            </p>

            {/* Enterprise Evidence Box */}
            <div className="p-3.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-1.5">
              <span className="text-[10px] font-mono font-bold text-[var(--text-muted)] flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                <span>Enterprise Track Record & Evidence</span>
              </span>
              <p className="text-xs text-[var(--text-primary)] font-medium leading-relaxed">
                {activeSkill.evidence}
              </p>
            </div>

            {/* Core Tool Badges */}
            <div className="space-y-1.5 pt-1">
              <span className="block text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)]">
                Core Toolchain & Frameworks:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeSkill.keyTools.map((tool, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-mono px-2.5 py-1 rounded-md bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-primary)] font-semibold shadow-2xs"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* 4 Core Pillars Interactive Selector Cards */}
      <div className="pt-2">
        <span className="block text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-3">
          Explore The 4 Primary Pillars:
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {SKILL_METRICS.slice(0, 4).map((skill) => {
            const isCurrent = activeSkill.shortLabel === skill.shortLabel;
            const Icon = skill.icon;
            return (
              <button
                key={skill.shortLabel}
                onClick={() => setActiveSkill(skill)}
                className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between gap-2.5 ${
                  isCurrent
                    ? 'bg-amber-500/10 border-amber-500 text-[var(--text-primary)] shadow-sm'
                    : 'bg-[var(--bg-secondary)] border-[var(--border-subtle)] hover:border-amber-400/50 text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <div className={`p-1.5 rounded-lg ${isCurrent ? 'bg-amber-500 text-neutral-950' : 'bg-[var(--bg-card)] text-amber-500'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400">
                    {skill.proficiency}%
                  </span>
                </div>
                <div>
                  <span className="block text-xs font-bold text-[var(--text-primary)] leading-tight">
                    {skill.shortLabel}
                  </span>
                  <span className="block text-[10px] text-[var(--text-muted)] truncate">
                    {skill.keyTools[0]}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
};
