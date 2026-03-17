import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLocation } from "wouter";
import { Calendar, User, ArrowRight, CheckCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

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
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }
    // In production, send to your email service (Mailchimp, ConvertKit, etc.)
    setSubscribed(true);
    toast.success("Thanks for subscribing! Check your email for confirmation.");
    setEmail("");
    setTimeout(() => setSubscribed(false), 3000);
  };

  const blogPosts: BlogPost[] = [
    {
      id: "1",
      title: "How to Use Word Counter for Academic Writing",
      excerpt:
        "Learn how to track your essay word counts, meet assignment requirements, and improve your writing productivity with our free word counter tool.",
      author: "ToolVerse Team",
      date: "March 15, 2026",
      category: "Writing Tips",
      readTime: "5 min read",
      slug: "word-counter-academic-writing",
    },
    {
      id: "2",
      title: "Password Security: Why Strong Passwords Matter",
      excerpt:
        "Discover why strong passwords are essential for protecting your accounts and learn how to generate secure passwords that hackers cannot crack.",
      author: "ToolVerse Team",
      date: "March 14, 2026",
      category: "Security",
      readTime: "6 min read",
      slug: "password-security-guide",
    },
    {
      id: "3",
      title: "SEO Meta Tags: The Complete Guide to Optimizing Your Website",
      excerpt:
        "Understand the importance of meta tags for SEO, learn how to write effective title tags and descriptions, and boost your search rankings.",
      author: "ToolVerse Team",
      date: "March 13, 2026",
      category: "SEO",
      readTime: "8 min read",
      slug: "seo-meta-tags-guide",
    },
    {
      id: "4",
      title: "JSON Formatting Best Practices for Developers",
      excerpt:
        "Master JSON formatting, learn validation techniques, and discover how to debug common JSON errors in your API integrations.",
      author: "ToolVerse Team",
      date: "March 12, 2026",
      category: "Development",
      readTime: "7 min read",
      slug: "json-formatting-guide",
    },
    {
      id: "5",
      title: "Unit Conversion Made Easy: A Complete Reference Guide",
      excerpt:
        "Quick reference guide for converting between different units of length, weight, and temperature. Perfect for students and professionals.",
      author: "ToolVerse Team",
      date: "March 11, 2026",
      category: "Reference",
      readTime: "4 min read",
      slug: "unit-conversion-guide",
    },
    {
      id: "6",
      title: "QR Codes in 2026: Uses, Benefits, and Best Practices",
      excerpt:
        "Explore modern applications of QR codes in marketing, business, and everyday life. Learn how to create and use QR codes effectively.",
      author: "ToolVerse Team",
      date: "March 10, 2026",
      category: "Marketing",
      readTime: "6 min read",
      slug: "qr-codes-guide",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary/10 to-accent/10 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-primary mb-4">ToolVerse Blog</h1>
          <p className="text-lg text-foreground/80">
            Tips, guides, and best practices for using our tools and improving your productivity.
          </p>
        </div>
      </header>

      {/* Blog Posts */}
      <main className="container mx-auto px-4 py-12">
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

        {/* Newsletter Section */}
        <section className="mt-16 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Stay Updated</h2>
          <p className="text-foreground/80 mb-6 max-w-2xl mx-auto">
            Get the latest tips, tool updates, and productivity guides delivered to your inbox.
          </p>
          {subscribed ? (
            <div className="flex items-center justify-center gap-2 text-primary font-semibold">
              <CheckCircle className="w-5 h-5" />
              <span>Successfully subscribed!</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-2 rounded-lg border border-border bg-white text-foreground"
              />
              <Button type="submit" className="bg-primary hover:bg-primary/90 text-white">
                Subscribe
              </Button>
            </form>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-foreground text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-white/70 text-sm">
          <p>&copy; 2026 ToolVerse. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
