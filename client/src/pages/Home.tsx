import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SEOHead from "@/components/SEOHead";
import Layout from "@/components/Layout";
import {
  Zap,
  FileText,
  BarChart3,
  Type,
  Code,
  Lock,
  Ruler,
  QrCode,
  BookOpen,
  Image,
  Search,
  Map,
  Pipette,
  Binary,
  Link2,
  Clock,
  Shield,
  Code2,
  Volume2,
  Receipt,
} from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

interface Tool {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  keywords: string;
  href: string;
}

const tools: Tool[] = [
  // ── Existing 12 tools ──
  { id: "ai-detector", name: "AI Content Detector", description: "Detect if text is AI-generated or human-written", icon: <Zap className="w-8 h-8" />, category: "SEO Tools", keywords: "AI detector, GPT detector, content checker", href: "/tools/ai-detector" },
  { id: "meta-generator", name: "SEO Meta Tag Generator", description: "Create optimized meta titles and descriptions", icon: <FileText className="w-8 h-8" />, category: "SEO Tools", keywords: "Meta tags, SEO, title generator", href: "/tools/meta-generator" },
  { id: "word-counter", name: "Word Counter", description: "Count words, characters, and paragraphs instantly", icon: <BarChart3 className="w-8 h-8" />, category: "Text Tools", keywords: "Word counter, character counter", href: "/tools/word-counter" },
  { id: "case-converter", name: "Case Converter", description: "Convert text between uppercase, lowercase, and more", icon: <Type className="w-8 h-8" />, category: "Text Tools", keywords: "Case converter, text converter", href: "/tools/case-converter" },
  { id: "json-formatter", name: "JSON Formatter", description: "Format and validate JSON code instantly", icon: <Code className="w-8 h-8" />, category: "Developer Tools", keywords: "JSON formatter, validator, beautifier", href: "/tools/json-formatter" },
  { id: "password-generator", name: "Password Generator", description: "Generate secure, customizable passwords", icon: <Lock className="w-8 h-8" />, category: "Utility Tools", keywords: "Password generator, secure password", href: "/tools/password-generator" },
  { id: "unit-converter", name: "Unit Converter", description: "Convert between length, weight, temperature, and more", icon: <Ruler className="w-8 h-8" />, category: "Utility Tools", keywords: "Unit converter, length, weight, temperature", href: "/tools/unit-converter" },
  { id: "qr-generator", name: "QR Code Generator", description: "Create QR codes from URLs and text", icon: <QrCode className="w-8 h-8" />, category: "Developer Tools", keywords: "QR code generator, QR code maker", href: "/tools/qr-generator" },
  { id: "lorem-ipsum", name: "Lorem Ipsum Generator", description: "Generate placeholder text for designs", icon: <BookOpen className="w-8 h-8" />, category: "Text Tools", keywords: "Lorem ipsum, placeholder text", href: "/tools/lorem-ipsum" },
  { id: "image-resizer", name: "Image Resizer", description: "Resize and compress images online", icon: <Image className="w-8 h-8" />, category: "Utility Tools", keywords: "Image resizer, compressor, resize", href: "/tools/image-resizer" },
  { id: "robots-generator", name: "Robots.txt Generator", description: "Generate optimized robots.txt files for SEO", icon: <FileText className="w-8 h-8" />, category: "SEO Tools", keywords: "Robots.txt, SEO, crawling, indexing", href: "/tools/robots-generator" },
  { id: "sitemap-generator", name: "Sitemap Generator", description: "Create XML sitemaps for search engines", icon: <Map className="w-8 h-8" />, category: "SEO Tools", keywords: "Sitemap, sitemap.xml, SEO, indexing", href: "/tools/sitemap-generator" },

  // ── 10 New Tools ──
  { id: "color-picker", name: "Color Picker & Palette", description: "Pick colors and generate beautiful palettes instantly", icon: <Pipette className="w-8 h-8" />, category: "Developer Tools", keywords: "color picker, hex color, rgb, hsl, palette generator", href: "/tools/color-picker" },
  { id: "base64", name: "Base64 Encoder / Decoder", description: "Encode or decode Base64 strings instantly", icon: <Binary className="w-8 h-8" />, category: "Developer Tools", keywords: "base64 encoder, base64 decoder, encode decode", href: "/tools/base64" },
  { id: "url-encoder", name: "URL Encoder / Decoder", description: "Encode or decode URLs and query parameters", icon: <Link2 className="w-8 h-8" />, category: "Developer Tools", keywords: "url encoder, url decoder, percent encoding", href: "/tools/url-encoder" },
  { id: "markdown-editor", name: "Markdown Editor", description: "Write Markdown with a live side-by-side preview", icon: <FileText className="w-8 h-8" />, category: "Text Tools", keywords: "markdown editor, markdown preview, live markdown", href: "/tools/markdown-editor" },
  { id: "regex-tester", name: "Regex Tester", description: "Test and debug regular expressions in real time", icon: <Search className="w-8 h-8" />, category: "Developer Tools", keywords: "regex tester, regular expression, regex debugger", href: "/tools/regex-tester" },
  { id: "timestamp-converter", name: "Timestamp Converter", description: "Convert Unix timestamps to readable dates and back", icon: <Clock className="w-8 h-8" />, category: "Utility Tools", keywords: "timestamp converter, unix timestamp, epoch converter", href: "/tools/timestamp-converter" },
  { id: "hash-generator", name: "Hash Generator", description: "Generate SHA-256, SHA-512 and more cryptographic hashes", icon: <Shield className="w-8 h-8" />, category: "Developer Tools", keywords: "hash generator, sha256, sha512, checksum", href: "/tools/hash-generator" },
  { id: "css-minifier", name: "CSS Minifier & Beautifier", description: "Minify or beautify CSS to optimize your stylesheets", icon: <Code2 className="w-8 h-8" />, category: "Developer Tools", keywords: "css minifier, css beautifier, compress css, format css", href: "/tools/css-minifier" },
  { id: "text-to-speech", name: "Text to Speech", description: "Convert text to audio with adjustable speed and pitch", icon: <Volume2 className="w-8 h-8" />, category: "Utility Tools", keywords: "text to speech, tts, read aloud, voice generator", href: "/tools/text-to-speech" },
  { id: "invoice-generator", name: "Invoice Generator", description: "Create and download professional invoices as PDF", icon: <Receipt className="w-8 h-8" />, category: "Utility Tools", keywords: "invoice generator, free invoice maker, pdf invoice", href: "/tools/invoice-generator" },
];

const categories = ["All", "Text Tools", "Developer Tools", "SEO Tools", "Utility Tools"];


export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [, navigate] = useLocation();

  const filteredTools = tools.filter((tool) => {
    const matchesCategory = selectedCategory === "All" || tool.category === selectedCategory;
    const matchesSearch =
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.keywords.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const homepageSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ToolVerse",
    url: "https://my-toolverse.netlify.app",
    description: "Your All-in-One Digital Toolbox - Free online tools for productivity, SEO, development, and more",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://my-toolverse.netlify.app/?search={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <SEOHead
        title="Your All-in-One Digital Toolbox"
        description="Free online tools for productivity, SEO, development, and more. AI content detector, meta tag generator, word counter, and 10+ essential tools."
        keywords={["online tools", "SEO tools", "productivity tools", "free tools", "text tools", "developer tools", "utility tools"]}
        url="https://my-toolverse.netlify.app"
        schema={homepageSchema}
      />
      <Layout variant="home">

        {/* Hero Section */}
        <section
          className="relative py-16 md:py-24 overflow-hidden"
          style={{
            backgroundImage:
              "url('https://d2xsxph8kpxj0f.cloudfront.net/310519663439487236/k2fqQDXXUFzDUUCqwnbFsv/hero_background-7GkXA27LRv4FzPa6GQ7WZc.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                Your All-in-One Digital Toolbox
              </h1>
              <p className="text-lg text-foreground/80 mb-8">
                Free, fast, and powerful online tools for productivity, SEO, development, and more. No sign-up required.
              </p>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
                Explore Tools
              </Button>
            </div>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section id="tools" className="py-12 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <div className="relative mb-6">
                <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search tools..."
                  className="pl-10 py-2 h-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Category Tabs */}
              <Tabs
                value={selectedCategory}
                onValueChange={setSelectedCategory}
                className="w-full"
              >
                <TabsList className="w-full justify-start overflow-x-auto bg-transparent border-b border-border">
                  {categories.map((category) => (
                    <TabsTrigger
                      key={category}
                      value={category}
                      className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
                    >
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>

            {/* Tools Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTools.length > 0 ? (
                filteredTools.map((tool) => (
                  <Card
                    key={tool.id}
                    className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group hover:-translate-y-1 bg-white"
                    onClick={() => navigate(tool.href)}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg flex items-center justify-center text-primary group-hover:text-accent transition">
                        {tool.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-foreground">{tool.name}</h3>
                        <p className="text-sm text-muted-foreground">{tool.category}</p>
                      </div>
                    </div>
                    <p className="text-foreground/70 text-sm mb-4">{tool.description}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                    >
                      Open Tool
                    </Button>
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-muted-foreground text-lg">No tools found matching your search.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12">
              Why Choose ToolVerse?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="p-8 text-center bg-secondary/20 border-0">
                <div className="text-4xl mb-4">💰</div>
                <h3 className="text-xl font-bold text-foreground mb-2">100% Free</h3>
                <p className="text-foreground/70">
                  All tools are completely free to use. No hidden charges or premium plans.
                </p>
              </Card>
              <Card className="p-8 text-center bg-secondary/20 border-0">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-bold text-foreground mb-2">No Sign-Up</h3>
                <p className="text-foreground/70">
                  Start using tools instantly. No account creation or personal data required.
                </p>
              </Card>
              <Card className="p-8 text-center bg-secondary/20 border-0">
                <div className="text-4xl mb-4">🔒</div>
                <h3 className="text-xl font-bold text-foreground mb-2">Fast & Secure</h3>
                <p className="text-foreground/70">
                  All processing happens in your browser. Your data never leaves your device.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-primary/10 to-accent/10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Boost Your Productivity?
            </h2>
            <p className="text-lg text-foreground/70 mb-8 max-w-2xl mx-auto">
              Explore our collection of powerful tools designed to save you time and effort.
            </p>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white"
              onClick={() => {
                const toolsSection = document.getElementById("tools");
                toolsSection?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Browse All Tools
            </Button>
          </div>
        </section>

      </Layout>
    </>
  );
}
