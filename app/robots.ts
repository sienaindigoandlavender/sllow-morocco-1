import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Googlebot Core - Optimized to allow rendering while protecting data
      {
        userAgent: 'Googlebot',
        allow: [
          '/', 
          '/_next/static/css/', // Explicitly let Googlebot read your beautiful styling
          '/_next/static/chunks/' 
        ],
        disallow: [
          '/api/', 
          '/admin/', 
          '/client/', 
          '/proposal/', 
          '/_next/development/', // Block dev code
          '/_next/data/'        // Protect underlying JSON data hydration paths
        ],
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
      // Default rules for all other crawlers - mirroring the optimization
      {
        userAgent: '*',
        allow: ['/', '/_next/static/css/', '/_next/static/chunks/'],
        disallow: [
          '/api/', 
          '/admin/', 
          '/client/', 
          '/proposal/',
          '/_next/development/',
          '/_next/data/'
        ],
      },
    ],
    sitemap: 'https://www.slowmorocco.com/sitemap.xml',
  }
}
