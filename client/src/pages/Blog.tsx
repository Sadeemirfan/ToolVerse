import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Calendar, User, ArrowRight } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  slug: string;
}

export default function Blog() {
  const [, navigate] = useLocation();

  const blogPosts: BlogPost[] = [
    {
      id: "1",
      title: "How to Use Word Counter for Academic Writing",
      excerpt: "Learn how to track your essay word counts, meet assignment requirements, and improve your writing productivity with our free word counter tool.",
      author: "ToolVerse Team",
      date: "March 15, 2026",
      category: "Writing Tips",
      readTime: "5 min read",
      slug: "word-counter-academic-writing",
    },
    {
      id: "2",
      title: "Password Security: Why Strong Passwords Matter",
      excerpt: "Discover why strong passwords are essential for protecting your accounts and learn how to generate secure passwords that hackers cannot crack.",
      author: "ToolVerse Team",
      date: "March 14, 2026",
      category: "Security",
      readTime: "6 min read",
      slug: "password-security-guide",
    },
    {
      id: "3",
      title: "SEO Meta Tags: The Complete Guide to Optimizing Your Website",
      excerpt: "Understand the importance of meta tags for SEO, learn how to write effective title tags and descriptions, and boost your search rankings.",
      author: "ToolVerse Team",
      date: "March 13, 2026",
      category: "SEO",
      readTime: "8 min read",
      slug: "seo-meta-tags-guide",
    },
    {
      id: "4",
      title: "JSON Formatting Best Practices for Developers",
      excerpt: "Master JSON formatting, learn validation techniques, and discover how to debug common JSON errors in your API integrations.",
      author: "ToolVerse Team",
      date: "March 12, 2026",
      category: "Development",
      readTime: "7 min read",
      slug: "json-formatting-guide",
    },
    {
      id: "5",
      title: "Unit Conversion Made Easy: A Complete Reference Guide",
      excerpt: "Quick reference guide for converting between different units of length, weight, and temperature. Perfect for students and professionals.",
      author: "ToolVerse Team",
      date: "March 11, 2026",
      category: "Reference",
      readTime: "4 min read",
      slug: "unit-conversion-guide",
    },
    {
      id: "6",
      title: "QR Codes in 2026: Uses, Benefits, and Best Practices",
      excerpt: "Explore modern applications of QR codes in marketing, business, and everyday life. Learn how to create and use QR codes effectively.",
      author: "ToolVerse Team",
      date: "March 10, 2026",
      category: "Marketing",
      readTime: "6 min read",
      slug: "qr-codes-guide",
    },
    {
      id: "7",
      title: "The Ultimate Guide to Image Optimization for Web",
      excerpt: "Learn how resizing and compressing images can drastically improve your website's load speed, user experience, and SEO rankings.",
      author: "ToolVerse Team",
      date: "March 19, 2026",
      category: "Web Design",
      readTime: "6 min read",
      slug: "image-optimization-web-guide",
    },
    {
      id: "8",
      title: "Why You Still Need Lorem Ipsum in Modern Web Design",
      excerpt: "Discover the history of Lorem Ipsum and why generating placeholder text remains a crucial step in modern UI/UX design workflows.",
      author: "ToolVerse Team",
      date: "March 18, 2026",
      category: "Design Tools",
      readTime: "5 min read",
      slug: "lorem-ipsum-modern-design",
    },
    {
      id: "9",
      title: "Robots.txt Explained: How to Control Search Engine Crawlers",
      excerpt: "Take control of your website's SEO by understanding how to properly configure your Robots.txt file to guide search engine bots.",
      author: "ToolVerse Team",
      date: "March 17, 2026",
      category: "Technical SEO",
      readTime: "7 min read",
      slug: "robots-txt-explained-seo",
    },
    {
      id: "10",
      title: "Mastering Text Formatting: When to Use Different Case Types",
      excerpt: "From Title Case to camelCase, learn the rules of text formatting and how our Case Converter can save you hours of manual editing.",
      author: "ToolVerse Team",
      date: "March 16, 2026",
      category: "Writing Tips",
      readTime: "4 min read",
      slug: "mastering-text-formatting-cases",
    },
    {
      id: "11",
      title: "XML Sitemaps: The Secret to Faster Google Indexing",
      excerpt: "Learn why an XML Sitemap is essential for technical SEO and how generating one can help Google index your pages significantly faster.",
      author: "ToolVerse Team",
      date: "March 15, 2026",
      category: "Technical SEO",
      readTime: "6 min read",
      slug: "xml-sitemaps-google-indexing",
    },
    {
      id: "12",
      title: "Base64 Encoding Explained: What It Is and When to Use It",
      excerpt: "Learn what Base64 encoding is, why developers use it daily, and how to encode or decode any data instantly using our free online tool.",
      author: "ToolVerse Team",
      date: "March 19, 2026",
      category: "Developer Tools",
      readTime: "7 min read",
      slug: "base64-encoding-guide",
    },
    {
      id: "13",
      title: "Regular Expressions (Regex) for Beginners: A Practical Guide",
      excerpt: "Master regex with real-world examples. Learn to validate emails, extract numbers, and test patterns with our free Regex Tester tool.",
      author: "ToolVerse Team",
      date: "March 19, 2026",
      category: "Developer Tools",
      readTime: "10 min read",
      slug: "regex-guide-beginners",
    },
    {
      id: "14",
      title: "SHA Hashing Explained: SHA-256, SHA-512 and Why They Matter",
      excerpt: "Understand cryptographic hash functions, the difference between SHA-256 and SHA-512, and why they are critical to modern internet security.",
      author: "ToolVerse Team",
      date: "March 19, 2026",
      category: "Security",
      readTime: "8 min read",
      slug: "sha-hashing-explained",
    },
    {
      id: "15",
      title: "CSS Minification: How to Speed Up Your Website",
      excerpt: "CSS minification removes whitespace and comments, reducing file size by 20–40%. Learn how to do it and why it improves your SEO rankings.",
      author: "ToolVerse Team",
      date: "March 19, 2026",
      category: "Web Performance",
      readTime: "7 min read",
      slug: "css-minification-performance",
    },
  ];

  return (
    <>
      <SEOHead
        title="Blog"
        description="Tips, guides, and best practices for using ToolVerse tools and improving your productivity, SEO, and development workflow."
        keywords={["toolverse blog", "SEO tips", "productivity guides", "developer tools", "word counter tips", "online tools"]}
        url="https://my-toolverse.netlify.app/blog"
      />
      <Layout variant="page" title="Blog">
        {/* Page Hero */}
        <section className="bg-gradient-to-r from-primary/10 to-accent/10 py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-primary mb-4">ToolVerse Blog</h1>
            <p className="text-lg text-foreground/80">
              Tips, guides, and best practices for using our tools and improving your productivity.
            </p>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <Card
                key={post.id}
                className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer border-border"
                onClick={() => navigate(`/blog/${post.slug}`)}
              >
                {/* Category Badge */}
                <div className="px-6 pt-6 pb-0">
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                    {post.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h2 className="text-xl font-bold text-foreground mb-3 line-clamp-2">{post.title}</h2>
                  <p className="text-foreground/70 text-sm mb-4 line-clamp-3">{post.excerpt}</p>

                  {/* Meta Info */}
                  <div className="space-y-2 text-xs text-muted-foreground mb-4 border-t border-border pt-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="text-primary font-semibold">{post.readTime}</div>
                  </div>

                  {/* Read More Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary hover:text-primary/80 p-0"
                    onClick={() => navigate(`/blog/${post.slug}`)}
                  >
                    Read More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </Layout>
    </>
  );
}
