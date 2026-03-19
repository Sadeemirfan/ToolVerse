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
        <section className="relative py-20 md:py-32 overflow-hidden hero-gradient">
          {/* Decorative Blobs */}
          <div className="absolute top-0 left-0 w-72 h-72 bg-purple-600 rounded-full opacity-20 blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-400 rounded-full opacity-10 blur-3xl translate-x-1/3 translate-y-1/3" />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-violet-500 rounded-full opacity-10 blur-3xl -translate-x-1/2 -translate-y-1/2" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              {/* Floating Logo */}
              <div className="flex justify-center mb-8">
                <div className="relative animate-float">
                  <img src="/logo.png" alt="ToolVerse Logo" className="w-24 h-24 rounded-2xl shadow-2xl shadow-purple-500/50" />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/20 to-cyan-400/20 blur-md" />
                </div>
              </div>

              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm px-4 py-1.5 rounded-full mb-6 font-medium">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                22 Free Tools — No Sign-Up Required
              </div>

              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                Your All-in-One{" "}
                <span className="gradient-text">Digital Toolbox</span>
              </h1>
              <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
                Free, fast, and powerful online tools for productivity, SEO, development, and more.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
                <a href="#tools" className="btn-primary-gradient text-white px-8 py-3 rounded-xl font-semibold text-lg shadow-lg shadow-purple-500/30">
                  🚀 Explore Tools
                </a>
                <a href="/blog" className="glass text-white px-8 py-3 rounded-xl font-semibold text-lg hover:bg-white/15 transition">
                  📖 Read Blog
                </a>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap justify-center gap-8">
                {[["22+", "Free Tools"], ["100%", "Private"], ["0", "Sign-up"]].map(([n, l]) => (
                  <div key={l} className="text-center">
                    <div className="text-3xl font-bold gradient-text">{n}</div>
                    <div className="text-white/60 text-sm">{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section id="tools" className="py-14">
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
                  <div
                    key={tool.id}
                    className="card-glow bg-white rounded-2xl p-6 cursor-pointer group border border-[#E0E7FF]"
                    onClick={() => navigate(tool.href)}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="relative w-14 h-14 icon-gradient rounded-xl flex items-center justify-center text-white shadow-lg flex-shrink-0">
                        {tool.icon}
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-base font-bold text-foreground leading-tight">{tool.name}</h3>
                        <span className="inline-block text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full mt-1">{tool.category}</span>
                      </div>
                    </div>
                    <p className="text-foreground/60 text-sm mb-5 leading-relaxed">{tool.description}</p>
                    <div className="btn-primary-gradient text-white text-sm text-center py-2 rounded-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                      Open Tool →
                    </div>
                  </div>
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
        <section className="py-20 md:py-28 hero-gradient">
          <div className="container mx-auto px-4">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Why Choose <span className="gradient-text">ToolVerse?</span>
              </h2>
              <p className="text-white/60 text-lg max-w-xl mx-auto">Everything you need. Nothing you don't.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[{emoji: '💰', title: '100% Free Forever', desc: 'All tools are completely free. No hidden charges, no premium plans, no subscriptions.'},
                {emoji: '⚡', title: 'Instant & No Sign-Up', desc: 'Start using any tool instantly. No account creation or personal data required ever.'},
                {emoji: '🔒', title: 'Fast & Private', desc: 'All calculations happen in your browser. Your data never leaves your device.'}]
                .map(({emoji, title, desc}) => (
                <div key={title} className="glass rounded-2xl p-8 text-center hover:bg-white/15 transition-all duration-300">
                  <div className="text-5xl mb-5">{emoji}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-28 bg-background">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold mb-5">
                Ready to <span className="gradient-text">Boost Your Productivity?</span>
              </h2>
              <p className="text-foreground/60 text-lg mb-10">
                Explore our collection of 22 powerful free tools designed to save your time and effort.
              </p>
              <button
                className="btn-primary-gradient text-white px-10 py-4 rounded-xl font-bold text-lg shadow-xl shadow-purple-500/30"
                onClick={() => {
                  const toolsSection = document.getElementById("tools");
                  toolsSection?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                🚀 Browse All 22 Tools
              </button>
            </div>
          </div>
        </section>

      </Layout>
    </>
  );
}
