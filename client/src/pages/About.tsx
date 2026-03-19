import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { Card } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function About() {
  const [, navigate] = useLocation();

  return (
    <>
      <SEOHead
        title="About Us"
        description="Learn about ToolVerse — your all-in-one digital toolbox. Free online tools for productivity, SEO, text processing, and development. Built by Sadeem."
        keywords={["about toolverse", "free online tools", "productivity tools", "SEO tools", "who we are"]}
        url="https://my-toolverse.netlify.app/about"
      />
      <Layout variant="page" title="About Us">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <h1 className="text-4xl font-bold text-primary mb-4">About ToolVerse</h1>
          <p className="text-lg text-foreground/80 mb-12">
            Your all-in-one digital toolbox for productivity, creativity, and development.
          </p>

          <div className="space-y-12">
            {/* Mission Section */}
            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">Our Mission</h2>
              <p className="text-foreground/80 mb-4">
                At ToolVerse, we believe that everyone deserves access to powerful, free tools that enhance productivity
                and creativity. Our mission is to provide a comprehensive collection of high-quality, easy-to-use online
                tools that help individuals and businesses work smarter, not harder.
              </p>
              <p className="text-foreground/80">
                We are committed to maintaining the highest standards of privacy, security, and user experience. All our
                tools are designed to be fast, reliable, and completely free to use.
              </p>
            </section>

            {/* Why Choose Us Section */}
            <section>
              <h2 className="text-3xl font-bold text-foreground mb-6">Why Choose ToolVerse?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { title: "100% Free", description: "All tools are completely free. No hidden charges, no premium plans, no subscriptions." },
                  { title: "No Sign-Up Required", description: "Start using tools instantly without creating an account or providing personal data." },
                  { title: "Privacy First", description: "All data processing happens in your browser. Your information never leaves your device." },
                  { title: "Lightning Fast", description: "Optimized for speed and performance. Get results instantly without waiting." },
                  { title: "Regularly Updated", description: "We continuously add new tools and improve existing ones based on user feedback." },
                  { title: "No Ads or Tracking", description: "Clean, distraction-free interface. We respect your privacy and browsing experience." },
                ].map((feature, idx) => (
                  <Card key={idx} className="p-6 bg-secondary/50 border-0">
                    <div className="flex items-start gap-4">
                      <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-bold text-foreground mb-2">{feature.title}</h3>
                        <p className="text-foreground/70 text-sm">{feature.description}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            {/* Our Tools Section */}
            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">Our Tools</h2>
              <p className="text-foreground/80 mb-6">ToolVerse offers a diverse collection of tools across multiple categories:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { category: "Text Tools", tools: "Word Counter, Case Converter, Lorem Ipsum Generator" },
                  { category: "Developer Tools", tools: "JSON Formatter, QR Code Generator" },
                  { category: "SEO Tools", tools: "AI Content Detector, Meta Tag Generator, Robots.txt Generator, Sitemap Generator" },
                  { category: "Utility Tools", tools: "Password Generator, Unit Converter, Image Resizer" },
                ].map((item, idx) => (
                  <Card key={idx} className="p-4 bg-secondary/30 border-border">
                    <h3 className="font-bold text-foreground mb-2">{item.category}</h3>
                    <p className="text-foreground/70 text-sm">{item.tools}</p>
                  </Card>
                ))}
              </div>
            </section>

            {/* Technology Section */}
            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">Built with Modern Technology</h2>
              <p className="text-foreground/80 mb-6">
                ToolVerse is built using cutting-edge web technologies to ensure the best performance and user experience:
              </p>
              <ul className="space-y-2 text-foreground/80">
                {[
                  "React 19 for a responsive, dynamic user interface",
                  "TypeScript for type-safe, maintainable code",
                  "Tailwind CSS for beautiful, responsive design",
                  "Client-side processing for maximum privacy and security",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Contact Section */}
            <section className="bg-gradient-to-r from-primary/10 to-accent/10 p-8 rounded-lg">
              <h2 className="text-3xl font-bold text-foreground mb-4">Get in Touch</h2>
              <p className="text-foreground/80 mb-6">Have questions, suggestions, or feedback? We would love to hear from you!</p>
              <div className="space-y-2">
                <p className="text-foreground"><strong>Email:</strong> support@toolverse.manus.space</p>
                <p className="text-foreground"><strong>Website:</strong> my-toolverse.netlify.app</p>
              </div>
            </section>

            {/* Footer CTA */}
            <section className="text-center">
              <h2 className="text-2xl font-bold text-foreground mb-4">Ready to Explore Our Tools?</h2>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white" onClick={() => navigate("/")}>
                Back to ToolVerse
              </Button>
            </section>
          </div>
        </div>
      </Layout>
    </>
  );
}
