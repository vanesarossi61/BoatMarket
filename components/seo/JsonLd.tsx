/**
 * Server Component -- Renders JSON-LD structured data for SEO.
 *
 * Usage:
 *   <JsonLd data={{ "@context": "https://schema.org", "@type": "Product", ... }} />
 */

interface JsonLdProps {
  data: Record<string, any>;
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
