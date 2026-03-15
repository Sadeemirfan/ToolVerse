import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Menu,
  X,
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
  {
    id: "ai-detector",
    name: "AI Content Detector",
    description: "Detect if text is AI-generated or human-written",
    icon: <Zap className="w-8 h-8" />,
    category: "SEO Tools",
    keywords: "AI detector, GPT detector, content checker",
    href: "/tools/ai-detector",
  },
  {
    id: "meta-generator",
    name: "SEO Meta Tag Generator",
    description: "Create optimized meta titles and descriptions",
    icon: <FileText className="w-8 h-8" />,
    category: "SEO Tools",
    keywords: "Meta tags, SEO, title generator",
    href: "/tools/meta-generator",
  },
  {
    id: "word-counter",
    name: "Word Counter",
    description: "Count words, characters, and paragraphs instantly",
    icon: <BarChart3 className="w-8 h-8" />,
    category: "Text Tools",
    keywords: "Word counter, character counter",
    href: "/tools/word-counter",
  },
  {
    id: "case-converter",
    name: "Case Converter",
    description: "Convert text between uppercase, lowercase, and more",
    icon: <Type className="w-8 h-8" />,
    category: "Text Tools",
    keywords: "Case converter, text converter",
    href: "/tools/case-converter",
  },
  {
    id: "json-formatter",
    name: "JSON Formatter",
    description: "Format and validate JSON code instantly",
    icon: <Code className="w-8 h-8" />,
    category: "Developer Tools",
    keywords: "JSON formatter, validator, beautifier",
    href: "/tools/json-formatter",
  },
  {
    id: "password-generator",
    name: "Password Generator",
    description: "Generate secure, customizable passwords",
    icon: <Lock className="w-8 h-8" />,
    category: "Utility Tools",
    keywords: "Password generator, secure password",
    href: "/tools/password-generator",
  },
  {
    id: "unit-converter",
    name: "Unit Converter",
    description: "Convert between length, weight, temperature, and more",
    icon: <Ruler className="w-8 h-8" />,
    category: "Utility Tools",
    keywords: "Unit converter, length, weight, temperature",
    href: "/tools/unit-converter",
  },
  {
    id: "qr-generator",
    name: "QR Code Generator",
    description: "Create QR codes from URLs and text",
    icon: <QrCode className="w-8 h-8" />,
    category: "Developer Tools",
    keywords: "QR code generator, QR code maker",
    href: "/tools/qr-generator",
  },
  {
    id: "lorem-ipsum",
    name: "Lorem Ipsum Generator",
    description: "Generate placeholder text for designs",
    icon: <BookOpen className="w-8 h-8" />,
    category: "Text Tools",
    keywords: "Lorem ipsum, placeholder text",
    href: "/tools/lorem-ipsum",
  },
  {
    id: "image-resizer",
    name: "Image Resizer",
    description: "Resize and compress images online",
    icon: <Image className="w-8 h-8" />,
    category: "Utility Tools",
    keywords: "Image resizer, compressor, resize",
    href: "/tools/image-resizer",
  },
];

const categories = ["All", "Text Tools", "Developer Tools", "SEO Tools", "Utility Tools"];

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-primary hidden sm:block">ToolVerse</h1>
          </div>

          {/* Desktop Navigation *          <nav className="flex gap-6">
            <a href="#tools" className="text-foreground/80 hover:text-primary transition-colors">
              Tools
            </a>
            <a href="/blog" className="text-foreground/80 hover:text-primary transition-colors">
              Blog
            </a>
            <a href="#features" className="text-foreground/80 hover:text-primary transition-colors">
              About
            </a>
            <a href="#contact" className="text-foreground/80 hover:text-primary transition-colors">
              Contact
            </a>
          </nav>     {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-secondary rounded-lg transition"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-white">
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
              <a href="#tools" className="text-foreground hover:text-primary transition">
                Tools
              </a>
              <a href="#about" className="text-foreground hover:text-primary transition">
                About
              </a>
              <a href="#contact" className="text-foreground hover:text-primary transition">
                Contact
              </a>
            </nav>
          </div>
        )}
      </header>

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
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Your All-in-One Digital Toolbox
            </h2>
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
            {[
              {
                title: "100% Free",
                description: "All tools are completely free to use. No hidden charges or premium plans.",
                icon: "💰",
              },
              {
                title: "No Sign-Up",
                description: "Start using tools instantly. No account creation or personal data required.",
                icon: "⚡",
              },
              {
                title: "Fast & Secure",
                description: "All processing happens in your browser. Your data never leaves your device.",
                icon: "🔒",
              },
            ].map((feature, idx) => (
              <Card key={idx} className="p-8 text-center bg-secondary/50 border-0">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="text-foreground/70">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-16 md:py-24 text-white relative overflow-hidden"
        style={{
          backgroundImage:
            "url('https://d2xsxph8kpxj0f.cloudfront.net/310519663439487236/k2fqQDXXUFzDUUCqwnbFsv/feature_section_bg-2fnd2ScY3U4dpaaWaDQ6Wz.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-accent/90"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Boost Your Productivity?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Explore our collection of powerful tools designed to save you time and effort.
          </p>
          <Button size="lg" variant="outline" className="bg-white text-primary hover:bg-white/90">
            Browse All Tools
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4">ToolVerse</h3>
              <p className="text-white/70 text-sm">Your all-in-one digital toolbox for productivity and creativity.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Tools</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="#" className="hover:text-white transition">Text Tools</a></li>
                <li><a href="#" className="hover:text-white transition">Developer Tools</a></li>
                <li><a href="#" className="hover:text-white transition">SEO Tools</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="/about" className="hover:text-white transition">About Us</a></li>
                <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
                <li><a href="/blog" className="hover:text-white transition">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="/privacy" className="hover:text-white transition">Privacy Policy</a></li>
                <li><a href="/terms" className="hover:text-white transition">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 text-center text-white/70 text-sm">
            <p>&copy; 2026 ToolVerse. All rights reserved. Built with ❤️ for productivity.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
