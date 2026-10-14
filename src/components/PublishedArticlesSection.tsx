import React, { useState, useMemo } from 'react';
import { 
  ExternalLink, 
  BookOpen, 
  Check, 
  Copy, 
  Sparkles, 
  CreditCard, 
  Activity, 
  Clock, 
  Users, 
  CheckCircle2, 
  FileCheck, 
  Search, 
  X, 
  SlidersHorizontal, 
  RotateCcw, 
  ArrowUpDown, 
  Tag,
  Eye
} from 'lucide-react';
import { PUBLISHED_ARTICLES } from '../data/portfolioData';
import { PublishedArticle } from '../types';
import { highlightText, matchesSearch } from '../utils/searchUtils';
import { ArticlePreviewModal } from './ArticlePreviewModal';

interface PublishedArticlesSectionProps {
  className?: string;
  limit?: number;
  showFilters?: boolean;
  initialQuery?: string;
}

type SortOption = 'default' | 'time-asc' | 'time-desc' | 'title-asc';

const QUICK_TOPICS = [
  'AI in Marketing',
  'Social Listening',
  'Hashtag Analytics',
  'Instant Payments',
  'Hospital Operations',
  'Healthcare Burnout',
  '5G Patient Care'
];

export const PublishedArticlesSection: React.FC<PublishedArticlesSectionProps> = ({
  className = '',
  limit,
  showFilters = true,
  initialQuery = ''
}) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [activePublication, setActivePublication] = useState<'all' | 'Sprinklr' | 'YU-Pay' | 'BestDoc'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortOption, setSortOption] = useState<SortOption>('default');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [previewArticle, setPreviewArticle] = useState<PublishedArticle | null>(null);

  const handleOpenPreview = (article: PublishedArticle, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setPreviewArticle(article);
  };

  // Extract unique categories dynamically
  const categories = useMemo(() => {
    const set = new Set<string>();
    PUBLISHED_ARTICLES.forEach(a => set.add(a.category));
    return Array.from(set);
  }, []);

  // Compute counts per publication
  const sprinklrCount = PUBLISHED_ARTICLES.filter(a => a.publication === 'Sprinklr').length;
  const yupayCount = PUBLISHED_ARTICLES.filter(a => a.publication === 'YU-Pay').length;
  const bestdocCount = PUBLISHED_ARTICLES.filter(a => a.publication === 'BestDoc').length;

  // Filter and search articles
  const filteredArticles = useMemo(() => {
    let result = PUBLISHED_ARTICLES.filter((article) => {
      // 1. Publication Filter
      if (activePublication !== 'all' && article.publication !== activePublication) {
        return false;
      }

      // 2. Category Filter
      if (selectedCategory !== 'all' && article.category !== selectedCategory) {
        return false;
      }

      // 3. Keyword Search (title, description, keyTopics, targetAudience, publication, category, highlightTag)
      if (searchQuery.trim()) {
        const searchableFields = [
          article.title,
          article.description,
          article.category,
          article.publication,
          article.targetAudience,
          article.highlightTag || '',
          ...article.keyTopics
        ];
        if (!matchesSearch(searchableFields, searchQuery)) {
          return false;
        }
      }

      return true;
    });

    // 4. Sorting
    if (sortOption === 'time-asc') {
      result = [...result].sort((a, b) => {
        const timeA = parseInt(a.readTime) || 0;
        const timeB = parseInt(b.readTime) || 0;
        return timeA - timeB;
      });
    } else if (sortOption === 'time-desc') {
      result = [...result].sort((a, b) => {
        const timeA = parseInt(a.readTime) || 0;
        const timeB = parseInt(b.readTime) || 0;
        return timeB - timeA;
      });
    } else if (sortOption === 'title-asc') {
      result = [...result].sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [activePublication, selectedCategory, searchQuery, sortOption]);

  const displayArticles = limit ? filteredArticles.slice(0, limit) : filteredArticles;
  const isFiltered = searchQuery.trim() !== '' || activePublication !== 'all' || selectedCategory !== 'all' || sortOption !== 'default';

  const handleResetFilters = () => {
    setSearchQuery('');
    setActivePublication('all');
    setSelectedCategory('all');
    setSortOption('default');
  };

  const handleCopy = (article: PublishedArticle, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(article.url);
    setCopiedId(article.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleTopicClick = (topic: string) => {
    if (searchQuery.toLowerCase() === topic.toLowerCase()) {
      setSearchQuery('');
    } else {
      setSearchQuery(topic);
    }
  };

  return (
    <section 
      id="published-articles-hub" 
      aria-label="Live Published Articles and Bylines"
      className={`w-full ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[var(--border-subtle)] pb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Verifiable Live Publications</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight font-display">
              Live Published Articles & Bylines
            </h2>
            <p className="text-base text-[var(--text-secondary)] leading-relaxed">
              Explore 12 live, bylined articles authored for global enterprise CXM platforms (<span className="bg-amber-100 dark:bg-amber-900/30 text-amber-900 dark:text-amber-200 px-1 py-0.5 rounded font-medium">Sprinklr</span>, NYSE: CXM), next-gen payment facilitators (<span className="bg-amber-100 dark:bg-amber-900/30 text-amber-900 dark:text-amber-200 px-1 py-0.5 rounded font-medium">YU-Pay</span>), and digital healthcare innovators (<span className="bg-amber-100 dark:bg-amber-900/30 text-amber-900 dark:text-amber-200 px-1 py-0.5 rounded font-medium">BestDoc</span>). Click <strong>Preview</strong> on any article card to inspect the executive snippet, strategic takeaways, and audience taxonomy without navigating away.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-4 text-xs font-medium text-[var(--text-muted)] bg-[var(--bg-card)] px-4 py-2.5 rounded-2xl border border-[var(--border-subtle)] self-start md:self-end shadow-xs">
            <div className="flex items-center gap-1.5 text-emerald-500">
              <CheckCircle2 className="w-4 h-4" />
              <span className="font-semibold text-[var(--text-primary)]">{PUBLISHED_ARTICLES.length} / {PUBLISHED_ARTICLES.length} Verified Live</span>
            </div>
            <span>&bull;</span>
            <span>MarTech, FinTech & HealthTech</span>
          </div>
        </div>

        {/* Client-Side Search & Filter Bar */}
        {showFilters && (
          <div className="space-y-4 p-5 sm:p-6 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-xs">
            
            {/* Top Row: Search Input & Sort Selector */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
              
              {/* Keyword Search Input */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles by keyword (e.g. AI, telemetry, payments, patient, burnout)..."
                  className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] focus:border-amber-500 focus:outline-none text-xs sm:text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] transition-colors"
                  aria-label="Search published articles"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)] p-0.5 rounded-md cursor-pointer transition-colors"
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Category Dropdown */}
              <div className="relative min-w-[200px]">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full py-2.5 pl-3 pr-8 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] focus:border-amber-500 focus:outline-none text-xs text-[var(--text-primary)] cursor-pointer appearance-none"
                  aria-label="Filter by article category"
                >
                  <option value="all">All Topic Categories ({PUBLISHED_ARTICLES.length})</option>
                  {categories.map((cat) => {
                    const count = PUBLISHED_ARTICLES.filter(a => a.category === cat).length;
                    return (
                      <option key={cat} value={cat}>
                        {cat} ({count})
                      </option>
                    );
                  })}
                </select>
                <SlidersHorizontal className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none" />
              </div>

              {/* Sort Dropdown */}
              <div className="relative min-w-[170px]">
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value as SortOption)}
                  className="w-full py-2.5 pl-3 pr-8 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] focus:border-amber-500 focus:outline-none text-xs text-[var(--text-primary)] cursor-pointer appearance-none"
                  aria-label="Sort articles"
                >
                  <option value="default">Sort: Default Order</option>
                  <option value="time-asc">Sort: Shortest Read</option>
                  <option value="time-desc">Sort: Longest Read</option>
                  <option value="title-asc">Sort: Title (A-Z)</option>
                </select>
                <ArrowUpDown className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none" />
              </div>

              {/* Reset button if filtered */}
              {isFiltered && (
                <button
                  onClick={handleResetFilters}
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-amber-600 dark:text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 transition-colors cursor-pointer shrink-0"
                  title="Reset all search filters"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              )}

            </div>

            {/* Publication Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-[var(--border-subtle)]">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mr-1 hidden sm:inline">
                Publication:
              </span>

              <button
                onClick={() => setActivePublication('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activePublication === 'all'
                    ? 'bg-amber-500 text-neutral-950 font-bold shadow-xs'
                    : 'bg-[var(--bg-secondary)] hover:bg-[var(--bg-secondary)]/80 text-[var(--text-secondary)] border border-[var(--border-subtle)]'
                }`}
              >
                <BookOpen className="w-3 h-3" />
                <span>All ({PUBLISHED_ARTICLES.length})</span>
              </button>

              <button
                onClick={() => setActivePublication('Sprinklr')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activePublication === 'Sprinklr'
                    ? 'bg-purple-600 text-white font-bold shadow-xs'
                    : 'bg-[var(--bg-secondary)] hover:bg-[var(--bg-secondary)]/80 text-[var(--text-secondary)] border border-[var(--border-subtle)]'
                }`}
              >
                <Sparkles className="w-3 h-3 text-purple-400" />
                <span>Sprinklr ({sprinklrCount})</span>
              </button>

              <button
                onClick={() => setActivePublication('YU-Pay')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activePublication === 'YU-Pay'
                    ? 'bg-sky-600 text-white font-bold shadow-xs'
                    : 'bg-[var(--bg-secondary)] hover:bg-[var(--bg-secondary)]/80 text-[var(--text-secondary)] border border-[var(--border-subtle)]'
                }`}
              >
                <CreditCard className="w-3 h-3 text-sky-400" />
                <span>YU-Pay ({yupayCount})</span>
              </button>

              <button
                onClick={() => setActivePublication('BestDoc')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activePublication === 'BestDoc'
                    ? 'bg-emerald-600 text-white font-bold shadow-xs'
                    : 'bg-[var(--bg-secondary)] hover:bg-[var(--bg-secondary)]/80 text-[var(--text-secondary)] border border-[var(--border-subtle)]'
                }`}
              >
                <Activity className="w-3 h-3 text-emerald-400" />
                <span>BestDoc ({bestdocCount})</span>
              </button>
            </div>

            {/* Quick Keyword Topic Chips */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[11px] font-semibold text-[var(--text-muted)] flex items-center gap-1 mr-1">
                <Tag className="w-3 h-3 text-amber-500" />
                <span>Quick Topics:</span>
              </span>
              {QUICK_TOPICS.map((topic) => {
                const isSelected = searchQuery.toLowerCase() === topic.toLowerCase();
                return (
                  <button
                    key={topic}
                    onClick={() => handleTopicClick(topic)}
                    className={`text-[11px] px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-amber-500 text-neutral-950 font-bold shadow-xs'
                        : 'bg-[var(--bg-secondary)] hover:bg-amber-500/10 text-[var(--text-muted)] hover:text-amber-600 dark:hover:text-amber-400 border border-[var(--border-subtle)]'
                    }`}
                  >
                    #{topic}
                  </button>
                );
              })}
            </div>

            {/* Results Feedback Counter */}
            <div className="flex items-center justify-between text-xs text-[var(--text-muted)] pt-2 border-t border-[var(--border-subtle)]">
              <span>
                Showing <strong className="text-[var(--text-primary)] font-mono">{filteredArticles.length}</strong> of{' '}
                <span className="font-mono">{PUBLISHED_ARTICLES.length}</span> published articles
                {searchQuery && (
                  <span> matching "<span className="text-amber-600 dark:text-amber-400 font-semibold">{searchQuery}</span>"</span>
                )}
              </span>
              {isFiltered && (
                <button
                  onClick={handleResetFilters}
                  className="text-amber-600 dark:text-amber-400 hover:underline cursor-pointer font-medium"
                >
                  Clear all filters
                </button>
              )}
            </div>

          </div>
        )}

        {/* Empty State if No Results */}
        {filteredArticles.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-[var(--text-primary)] font-display">
                No articles match your search criteria
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-md mx-auto">
                We couldn't find any published articles matching "{searchQuery}". Try searching for terms like "AI", "Payments", "Hashtag", or reset the category filters.
              </p>
            </div>
            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={handleResetFilters}
                className="px-5 py-2.5 rounded-full text-xs font-bold bg-amber-500 hover:bg-amber-400 text-neutral-950 transition-colors shadow-xs cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        ) : (
          /* Articles Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayArticles.map((article) => {
              const isSprinklr = article.publication === 'Sprinklr';
              const isYuPay = article.publication === 'YU-Pay';

              return (
                <article
                  key={article.id}
                  className="group relative flex flex-col justify-between rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-amber-500/40 p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  {/* Top Badges */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide ${
                          isSprinklr
                            ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20'
                            : isYuPay
                            ? 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20'
                            : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                        }`}
                      >
                        {isSprinklr ? (
                          <Sparkles className="w-3 h-3" />
                        ) : isYuPay ? (
                          <CreditCard className="w-3 h-3" />
                        ) : (
                          <Activity className="w-3 h-3" />
                        )}
                        <span>{article.publication}</span>
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={(e) => handleOpenPreview(article, e)}
                          title="Click to preview article snippet & data findings"
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold text-amber-600 dark:text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/25 transition-all cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Preview</span>
                        </button>

                        <span className="text-[11px] font-semibold text-[var(--text-muted)] flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{article.readTime}</span>
                        </span>
                      </div>
                    </div>

                    {/* Category Label */}
                    <div className="text-[11px] font-semibold text-amber-600 dark:text-amber-400">
                      {article.category}
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-[var(--text-primary)] leading-snug group-hover:text-amber-500 transition-colors">
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline focus:outline-hidden"
                        title={`Open live article on ${article.publicationDomain}`}
                      >
                        {highlightText(article.title, searchQuery)}
                      </a>
                    </h3>

                    {/* Summary / Description */}
                    <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                      {highlightText(article.description, searchQuery)}
                    </p>

                    {/* Key Topic Chips */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {article.keyTopics.map((topic, i) => (
                        <button
                          key={i}
                          onClick={() => handleTopicClick(topic)}
                          className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[var(--bg-secondary)] hover:bg-amber-500/15 text-[var(--text-muted)] hover:text-amber-600 dark:hover:text-amber-400 border border-[var(--border-subtle)] transition-colors cursor-pointer"
                        >
                          {highlightText(topic, searchQuery)}
                        </button>
                      ))}
                    </div>

                    {/* Target Audience Micro Badge */}
                    <div className="flex items-center gap-1.5 text-[11px] text-[var(--text-muted)] pt-2 border-t border-[var(--border-subtle)]">
                      <Users className="w-3.5 h-3.5 text-amber-500" />
                      <span>Audience: </span>
                      <span className="font-medium text-[var(--text-secondary)]">
                        {highlightText(article.targetAudience, searchQuery)}
                      </span>
                    </div>
                  </div>

                  {/* Footer Action Links */}
                  <div className="pt-5 mt-4 border-t border-[var(--border-subtle)] flex items-center justify-between gap-2 flex-wrap sm:flex-nowrap">
                    <div className="flex items-center gap-1 sm:gap-2">
                      <button
                        type="button"
                        onClick={(e) => handleOpenPreview(article, e)}
                        title="Preview article snippet & findings without leaving list"
                        className="inline-flex items-center gap-1.5 text-xs text-[var(--text-secondary)] hover:text-amber-600 dark:hover:text-amber-400 px-2 py-1 rounded-lg hover:bg-[var(--bg-secondary)] border border-transparent hover:border-[var(--border-subtle)] transition-colors cursor-pointer font-semibold"
                      >
                        <Eye className="w-3.5 h-3.5 text-amber-500" />
                        <span>Preview</span>
                      </button>

                      <button
                        onClick={(e) => handleCopy(article, e)}
                        title="Copy Article URL"
                        className="inline-flex items-center gap-1.5 text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] p-1.5 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors cursor-pointer"
                      >
                        {copiedId === article.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-500" />
                            <span className="text-emerald-500 font-bold">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Copy</span>
                          </>
                        )}
                      </button>
                    </div>

                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/article-btn inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-neutral-950 shadow-xs hover:shadow-md hover:shadow-amber-500/25 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 active:scale-95 cursor-pointer"
                    >
                      <span>Read on {article.publicationDomain}</span>
                      <ExternalLink className="w-3.5 h-3.5 transition-all duration-300 ease-out group-hover/article-btn:translate-x-1 group-hover/article-btn:-translate-y-1 group-hover/article-btn:scale-110" />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Bottom Callout */}
        <div className="rounded-2xl p-6 bg-gradient-to-r from-amber-500/10 via-transparent to-amber-500/5 border border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <FileCheck className="w-6 h-6 text-amber-500 shrink-0" />
            <div>
              <p className="text-sm font-bold text-[var(--text-primary)]">
                Need similar high-authority bylines or technical whitepapers for your brand?
              </p>
              <p className="text-xs text-[var(--text-secondary)]">
                I research, architect, and draft authoritative C-suite content that ranks #1 and converts executive buyers.
              </p>
            </div>
          </div>
          <a
            href="mailto:sayan.contentwriter@gmail.com"
            className="shrink-0 px-5 py-2.5 rounded-full text-xs font-bold bg-amber-500 hover:bg-amber-400 text-neutral-950 transition-all shadow-xs"
          >
            Commission an Article
          </a>
        </div>

        {/* Hover & Quick Preview Modal */}
        <ArticlePreviewModal
          article={previewArticle}
          onClose={() => setPreviewArticle(null)}
          onSelectTopic={(topic) => {
            handleTopicClick(topic);
          }}
        />

      </div>
    </section>
  );
};
