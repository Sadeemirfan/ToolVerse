import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: "website" | "article" | "tool";
  author?: string;
  publishedDate?: string;
  modifiedDate?: string;
  schema?: Record<string, unknown>;
}

export default function SEOHead({
  title,
  description,
  keywords = [],
  image = "https://my-my-toolverse.netlify.app/og-image.png",
  url = typeof window !== "undefined" ? window.location.href : "",
  type = "website",
  author,
  publishedDate,
  modifiedDate,
  schema,
}: SEOHeadProps) {
  const fullTitle = `${title} | My ToolVerse`;
  const keywordString = keywords.join(", ");

  // Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "My ToolVerse",
    url: "https://my-my-toolverse.netlify.app",
    logo: "https://my-my-toolverse.netlify.app/logo.png",
    description: "Your All-in-One Digital Toolbox - Free online tools for productivity, SEO, development, and more",
    sameAs: [
      "https://twitter.com/my-toolverse",
      "https://facebook.com/my-toolverse",
      "https://linkedin.com/company/my-toolverse",
    ],
  };

  // Tool/SoftwareApplication Schema
  const toolSchema = type === "tool" ? {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: title,
    description: description,
    url: url,
    image: image,
    applicationCategory: "Utility",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  } : null;

  // Article Schema
  const articleSchema = type === "article" ? {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: description,
    image: image,
    url: url,
    author: {
      "@type": "Person",
      name: author || "My ToolVerse",
    },
    datePublished: publishedDate,
    dateModified: modifiedDate || publishedDate,
  } : null;

  // Merge custom schema
  const finalSchema = schema || (type === "tool" ? toolSchema : type === "article" ? articleSchema : organizationSchema);

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywordString && <meta name="keywords" content={keywordString} />}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1" />
      <meta charSet="UTF-8" />

      {/* Canonical Link */}
      <link rel="canonical" href={url} />

      {/* Open Graph Tags */}
      <meta property="og:type" content={type === "article" ? "article" : "website"} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="My ToolVerse" />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@my-toolverse" />

      {/* Additional Meta Tags */}
      <meta name="author" content={author || "My ToolVerse"} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />

      {/* Structured Data (JSON-LD) */}
      {finalSchema && (
        <script type="application/ld+json">
          {JSON.stringify(finalSchema)}
        </script>
      )}

      {/* Article Meta Tags */}
      {type === "article" && publishedDate && (
        <meta property="article:published_time" content={publishedDate} />
      )}
      {type === "article" && modifiedDate && (
        <meta property="article:modified_time" content={modifiedDate} />
      )}
    </Helmet>
  );
}
