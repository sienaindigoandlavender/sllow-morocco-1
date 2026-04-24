import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Google - explicitly allowed
      // /darija/ disallowed: all 11,580 paths redirect to darija.io (external).
      // Blocking stops crawl budget waste and clears "crawled - not indexed" accumulation.
      // /_next/static/ disallowed: CSS/JS build artifacts with Vercel dpl fingerprints.
      // /darija/ disallowed: ~10,000 dictionary pages migrated to darija.io (March 2026).
      // Google indexed them during Feb-Mar 2026. They 301 to darija.io and will
      // drop from GSC "page with redirect" count as Google processes the 301s over ~4-8 weeks.
      // No action needed — this is expected post-migration behavior.
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/admin/', '/client/', '/proposal/', '/darija/', '/_next/static/'],
      },
      // AI Search Crawlers - full access to content + knowledge APIs
      {
        userAgent: 'OAI-SearchBot',
        allow: ['/', '/api/glossary', '/api/knowledge/'],
      },
      {
        userAgent: 'GPTBot',
        allow: ['/', '/api/glossary', '/api/knowledge/'],
      },
      {
        userAgent: 'ChatGPT-User',
        allow: ['/', '/api/glossary', '/api/knowledge/'],
      },
      {
        userAgent: 'anthropic-ai',
        allow: ['/', '/api/glossary', '/api/knowledge/'],
      },
      {
        userAgent: 'Claude-Web',
        allow: ['/', '/api/glossary', '/api/knowledge/'],
      },
      {
        userAgent: 'PerplexityBot',
        allow: ['/', '/api/glossary', '/api/knowledge/'],
      },
      {
        userAgent: 'Bingbot',
        allow: ['/', '/api/glossary', '/api/knowledge/'],
      },
      {
        userAgent: 'Google-Extended',
        allow: ['/', '/api/glossary', '/api/knowledge/'],
      },
      // Default rules for all other crawlers
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/client/', '/proposal/'],
      },
    ],
    sitemap: 'https://www.slowmorocco.com/sitemap.xml',
  }
}
