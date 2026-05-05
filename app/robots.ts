import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Google - explicitly allowed
      // /darija/* is now ALLOWED so Google can fetch it and follow the 301
      // redirects to darija.io. Was previously blocked here, which made the
      // pages "indexed though blocked" and stalled migration of ~10,000 dictionary
      // pages off slowmorocco.com. Removing the disallow lets Google process
      // the redirects normally — the URLs will deindex from slowmorocco.com
      // and the link equity transfers to darija.io.
      // /_next/static/ stays disallowed: CSS/JS build artifacts.
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/admin/', '/client/', '/proposal/', '/_next/static/'],
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
