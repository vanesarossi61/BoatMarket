import { prisma } from '@/lib/db/client';

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://boatmarket.com.ar';

interface SitemapEntry {
  loc: string;
  lastmod?: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

function buildSitemapXml(entries: SitemapEntry[]): string {
  const urls = entries
    .map(
      (entry) => `  <url>
    <loc>${entry.loc}</loc>${entry.lastmod ? `\n    <lastmod>${entry.lastmod}</lastmod>` : ''}
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority.toFixed(1)}</priority>
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

function toISODate(date: Date | string | null | undefined): string | undefined {
  if (!date) return undefined;
  return new Date(date).toISOString().split('T')[0];
}

export async function GET() {
  try {
    // Fetch datos en paralelo
    const [boats, products, blogPosts] = await Promise.all([
      prisma.boat.findMany({
        where: { status: 'active' },
        select: { slug: true, updatedAt: true },
        orderBy: { updatedAt: 'desc' },
      }),
      prisma.product.findMany({
        where: { published: true },
        select: { slug: true, updatedAt: true },
        orderBy: { updatedAt: 'desc' },
      }),
      prisma.blogPost.findMany({
        where: { published: true },
        select: { slug: true, updatedAt: true },
        orderBy: { updatedAt: 'desc' },
      }),
    ]);

    const now = toISODate(new Date());

    const entries: SitemapEntry[] = [
      // Paginas principales
      {
        loc: SITE_URL,
        lastmod: now,
        changefreq: 'daily',
        priority: 1.0,
      },
      {
        loc: `${SITE_URL}/embarcaciones`,
        lastmod: now,
        changefreq: 'daily',
        priority: 0.9,
      },
      {
        loc: `${SITE_URL}/productos`,
        lastmod: now,
        changefreq: 'daily',
        priority: 0.8,
      },
      {
        loc: `${SITE_URL}/blog`,
        lastmod: now,
        changefreq: 'weekly',
        priority: 0.6,
      },

      // Embarcaciones individuales
      ...boats.map((boat) => ({
        loc: `${SITE_URL}/embarcaciones/${boat.slug}`,
        lastmod: toISODate(boat.updatedAt),
        changefreq: 'weekly' as const,
        priority: 0.8,
      })),

      // Productos individuales
      ...products.map((product) => ({
        loc: `${SITE_URL}/productos/${product.slug}`,
        lastmod: toISODate(product.updatedAt),
        changefreq: 'weekly' as const,
        priority: 0.7,
      })),

      // Blog posts
      ...blogPosts.map((post) => ({
        loc: `${SITE_URL}/blog/${post.slug}`,
        lastmod: toISODate(post.updatedAt),
        changefreq: 'monthly' as const,
        priority: 0.5,
      })),
    ];

    const xml = buildSitemapXml(entries);

    return new Response(xml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (error) {
    console.error('[Sitemap]', error);

    // Fallback sitemap minimo
    const fallback = buildSitemapXml([
      { loc: SITE_URL, changefreq: 'daily', priority: 1.0 },
      { loc: `${SITE_URL}/embarcaciones`, changefreq: 'daily', priority: 0.9 },
      { loc: `${SITE_URL}/productos`, changefreq: 'daily', priority: 0.8 },
      { loc: `${SITE_URL}/blog`, changefreq: 'weekly', priority: 0.6 },
    ]);

    return new Response(fallback, {
      headers: { 'Content-Type': 'application/xml' },
    });
  }
}
