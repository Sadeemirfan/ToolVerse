import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import SEOHead from "./SEOHead";
import Layout from "./Layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Copy, Download } from "lucide-react";
import { useLocation } from "wouter";
import { ReactNode } from "react";
import RelatedTools from "./RelatedTools";
import SocialShare from "./SocialShare";

interface RelatedTool {
  name: string;
  description: string;
  path: string;
}

interface ToolPageProps {
  toolName: string;
  toolDescription: string;
  toolIcon: ReactNode;
  category: string;
  keywords: string[];
  features: string[];
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  relatedTools?: RelatedTool[];
  children: ReactNode; // Tool interface component
}

export default function ToolPage({
  toolName,
  toolDescription,
  toolIcon,
  category,
  keywords,
  features,
  faqs,
  relatedTools,
  children,
}: ToolPageProps) {
  const [location, navigate] = useLocation();
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: toolName,
    description: toolDescription,
    url: currentUrl,
    applicationCategory: "Utility",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    keywords: keywords.join(", "),
  };

  return (
    <>
      <SEOHead
        title={toolName}
        description={toolDescription}
        keywords={keywords}
        url={currentUrl}
        type="tool"
        schema={toolSchema}
      />
    <Layout variant="page" title={toolName}>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Tool Interface - Left/Top */}
          <div className="lg:col-span-2">
            <Card className="p-8 bg-secondary/20 border-border">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center text-white">
                  {toolIcon}
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-primary">{toolName}</h1>
                  <p className="text-sm text-muted-foreground">{category}</p>
                </div>
              </div>
              <p className="text-foreground/80 mb-6">{toolDescription}</p>

              {/* Tool Component */}
              <div className="bg-white rounded-lg p-6 border border-border">{children}</div>
            </Card>
          </div>

          {/* Sidebar - Right */}
          <div className="space-y-6">
            {/* Features */}
            <Card className="p-6 bg-secondary/30 border-0">
              <h3 className="text-lg font-bold text-foreground mb-4">Features</h3>
              <ul className="space-y-2">
                {features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-foreground/80">
                    <span className="text-primary font-bold mt-1">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Keywords */}
            <Card className="p-6 bg-secondary/30 border-0">
              <h3 className="text-lg font-bold text-foreground mb-4">Keywords</h3>
              <div className="flex flex-wrap gap-2">
                {keywords.map((keyword, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </Card>

            {/* Social Share */}
            <Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 border-0">
              <SocialShare
                toolName={toolName}
                toolUrl={currentUrl}
                toolDescription={toolDescription}
              />
            </Card>
          </div>
        </div>

        {/* How to Use Section */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">How to Use</h2>
          <Card className="p-8 bg-secondary/20 border-border">
            <ol className="space-y-4 list-decimal list-inside">
              <li className="text-foreground/80">
                <strong>Enter your data:</strong> Paste or type your content into the input field above.
              </li>
              <li className="text-foreground/80">
                <strong>Configure options:</strong> Adjust any settings specific to this tool if available.
              </li>
              <li className="text-foreground/80">
                <strong>Get results:</strong> The tool will process your data instantly in your browser.
              </li>
              <li className="text-foreground/80">
                <strong>Copy or download:</strong> Copy the results to clipboard or download them as a file.
              </li>
            </ol>
          </Card>
        </section>

        {/* FAQ Section */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((faq, idx) => (
              <AccordionItem key={idx} value={`faq-${idx}`} className="border border-border rounded-lg">
                <AccordionTrigger className="px-6 py-4 hover:bg-secondary/20">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 text-foreground/80">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* Benefits Section */}
        <section className="mt-12 mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Why Use This Tool?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "100% Free",
                description: "No subscription or hidden charges. Use this tool as many times as you want.",
              },
              {
                title: "Privacy Protected",
                description: "All processing happens in your browser. Your data is never sent to our servers.",
              },
              {
                title: "Instant Results",
                description: "Get results in milliseconds. No waiting, no delays, no complicated processes.",
              },
            ].map((benefit, idx) => (
              <Card key={idx} className="p-6 bg-secondary/30 border-0 text-center">
                <h3 className="font-bold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-sm text-foreground/70">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Related Tools */}
        {relatedTools && relatedTools.length > 0 && (
          <RelatedTools currentTool={toolName} tools={relatedTools} />
        )}
      </main>

      </Layout>
    </>
  );
}
