import { ReactNode, useState } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, Zap, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LayoutProps {
  children?: ReactNode;
  /** "home" shows full site header with nav links; "page" shows a back-button sub-header */
  variant?: "home" | "page";
  /** Page title shown next to the back button on sub-pages */
  title?: string;
}

const footerLinks = {
  tools1: [
    { label: "AI Detector", href: "/tools/ai-detector" },
    { label: "Meta Generator", href: "/tools/meta-generator" },
    { label: "Word Counter", href: "/tools/word-counter" },
    { label: "JSON Formatter", href: "/tools/json-formatter" },
    { label: "QR Code Generator", href: "/tools/qr-generator" },
    { label: "Password Generator", href: "/tools/password-generator" },
    { label: "Unit Converter", href: "/tools/unit-converter" },
    { label: "Case Converter", href: "/tools/case-converter" },
    { label: "Lorem Ipsum", href: "/tools/lorem-ipsum" },
    { label: "Image Resizer", href: "/tools/image-resizer" },
    { label: "Robots.txt Generator", href: "/tools/robots-generator" },
  ],
  tools2: [
    { label: "Sitemap Generator", href: "/tools/sitemap-generator" },
    { label: "Color Picker", href: "/tools/color-picker" },
    { label: "Base64 Encoder", href: "/tools/base64" },
    { label: "URL Encoder", href: "/tools/url-encoder" },
    { label: "Markdown Editor", href: "/tools/markdown-editor" },
    { label: "Regex Tester", href: "/tools/regex-tester" },
    { label: "Timestamp Converter", href: "/tools/timestamp-converter" },
    { label: "Hash Generator", href: "/tools/hash-generator" },
    { label: "CSS Minifier", href: "/tools/css-minifier" },
    { label: "Text to Speech", href: "/tools/text-to-speech" },
    { label: "Invoice Generator", href: "/tools/invoice-generator" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

function SiteHeader() {
  const [, navigate] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#E0E7FF] shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2.5 focus:outline-none group"
          aria-label="Go to homepage"
        >
          <img src="/logo.png" alt="ToolVerse Logo" className="w-10 h-10 rounded-xl object-cover group-hover:scale-105 transition-transform" />
          <span className="text-2xl font-bold gradient-text hidden sm:block">ToolVerse</span>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <a href="/#tools" className="text-foreground/70 hover:text-primary transition-colors">Tools</a>
          <a href="/about" className="text-foreground/70 hover:text-primary transition-colors">About</a>
          <a href="/blog" className="text-foreground/70 hover:text-primary transition-colors">Blog</a>
          <a href="/contact" className="text-foreground/70 hover:text-primary transition-colors">Contact</a>
          <a href="/#tools" className="btn-primary-gradient text-white text-sm px-4 py-2 rounded-lg font-semibold shadow-sm">
            🚀 All Tools
          </a>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-secondary transition"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#E0E7FF] bg-white/95 backdrop-blur-md">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4 text-sm font-medium">
            <a href="/#tools" className="text-foreground hover:text-primary transition-colors" onClick={() => setMobileOpen(false)}>Tools</a>
            <a href="/about" className="text-foreground hover:text-primary transition-colors" onClick={() => setMobileOpen(false)}>About</a>
            <a href="/blog" className="text-foreground hover:text-primary transition-colors" onClick={() => setMobileOpen(false)}>Blog</a>
            <a href="/contact" className="text-foreground hover:text-primary transition-colors" onClick={() => setMobileOpen(false)}>Contact</a>
          </nav>
        </div>
      )}
    </header>
  );
}

function PageHeader({ title }: { title?: string }) {
  const [, navigate] = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-primary hover:text-primary/80 hover:bg-primary/5"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
        {title && (
          <span className="text-lg font-semibold text-foreground hidden sm:block">{title}</span>
        )}
        {/* Logo pill on right */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 focus:outline-none"
          aria-label="Go to homepage"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-bold text-primary hidden sm:block">ToolVerse</span>
        </button>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="bg-gray-950 text-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-10">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">ToolVerse</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Your all-in-one digital toolbox for productivity, SEO, and development. Free, fast, and private.
            </p>
          </div>

          {/* Tools Column 1 */}
          <div>
            <h4 className="font-semibold text-white mb-4 uppercase tracking-wider text-xs">Tools</h4>
            <ul className="space-y-2">
              {footerLinks.tools1.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-white/60 text-sm hover:text-white transition-colors duration-200">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools Column 2 */}
          <div>
            <h4 className="font-semibold text-white mb-4 uppercase tracking-wider text-xs">More Tools</h4>
            <ul className="space-y-2">
              {footerLinks.tools2.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-white/60 text-sm hover:text-white transition-colors duration-200">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="font-semibold text-white mb-4 uppercase tracking-wider text-xs">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-white/60 text-sm hover:text-white transition-colors duration-200">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="font-semibold text-white mb-4 uppercase tracking-wider text-xs">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-white/60 text-sm hover:text-white transition-colors duration-200">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-white/60">
          <p>© 2026 ToolVerse. All rights reserved.</p>
          <p>Designed and Developed by <span className="font-semibold text-white">Sadeem</span></p>
        </div>
      </div>
    </footer>
  );
}

export default function Layout({ children, variant = "home", title }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {variant === "home" ? <SiteHeader /> : <PageHeader title={title} />}
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
