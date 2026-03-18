import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Copy, Download } from "lucide-react";
import ToolPage from "@/components/ToolPage";
import { Map } from "lucide-react";
import { toast } from "sonner";

interface UrlEntry {
  url: string;
  priority: string;
  changefreq: string;
}

export default function SitemapGeneratorPage() {
  const [domain, setDomain] = useState("example.com");
  const [urlsInput, setUrlsInput] = useState("/\n/about\n/contact\n/blog");
  const [sitemapContent, setSitemapContent] = useState("");

  const generateSitemap = () => {
    let content = '<?xml version="1.0" encoding="UTF-8"?>\n';
    content += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    const urls = urlsInput
      .split("\n")
      .filter((url) => url.trim())
      .map((url) => url.trim());

    const today = new Date().toISOString().split("T")[0];

    urls.forEach((url, index) => {
      const isHome = url === "/";
      const priority = isHome ? "1.0" : "0.8";
      const changefreq = isHome ? "weekly" : "monthly";

      content += "  <url>\n";
      content += `    <loc>https://${domain}${url}</loc>\n`;
      content += `    <lastmod>${today}</lastmod>\n`;
      content += `    <changefreq>${changefreq}</changefreq>\n`;
      content += `    <priority>${priority}</priority>\n`;
      content += "  </url>\n";
    });

    content += "</urlset>";

    setSitemapContent(content);
    toast.success("Sitemap.xml generated successfully!");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(sitemapContent);
    toast.success("Copied to clipboard!");
  };

  const downloadFile = () => {
    const element = document.createElement("a");
    const file = new Blob([sitemapContent], { type: "text/xml" });
    element.href = URL.createObjectURL(file);
    element.download = "sitemap.xml";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success("File downloaded!");
  };

  return (
    <ToolPage
      toolName="Sitemap Generator"
      toolDescription="Create XML sitemaps to help search engines discover and index all your website pages."
      toolIcon={<Map className="w-8 h-8" />}
      category="SEO Tools"
      keywords={["sitemap", "sitemap.xml", "SEO", "indexing", "search engines"]}
      features={[
        "Generate XML sitemaps",
        "Add multiple URLs",
        "Set priority levels",
        "Configure change frequency",
        "Auto-set lastmod dates",
        "Download or copy results",
      ]}
      faqs={[
        {
          question: "What is a sitemap?",
          answer:
            "A sitemap is an XML file that lists all the URLs on your website. It helps search engines discover and crawl all your pages more efficiently.",
        },
        {
          question: "How do I use this tool?",
          answer:
            "Enter your domain and list all your URLs (one per line). Click Generate to create your sitemap.xml file, then download it and upload to your website root.",
        },
        {
          question: "What's the priority field?",
          answer:
            "Priority indicates the relative importance of pages on your site (0.0 to 1.0). The homepage is usually 1.0, and other pages are lower. It's a hint to search engines, not a guarantee.",
        },
        {
          question: "What does changefreq mean?",
          answer:
            "Changefreq tells search engines how often a page is likely to change. Options include always, hourly, daily, weekly, monthly, yearly, and never.",
        },
        {
          question: "How do I submit my sitemap to Google?",
          answer:
            "Upload your sitemap.xml to your website root, then submit it through Google Search Console. You can also add it to your robots.txt file.",
        },
      ]}
    >
      <div className="space-y-6">
        {/* Domain Input */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Your Domain
          </label>
          <Input
            placeholder="example.com"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="w-full"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Enter your domain without https:// or www
          </p>
        </div>

        {/* URLs Input */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            URLs (one per line)
          </label>
          <Textarea
            placeholder="/" value={urlsInput}
            onChange={(e) => setUrlsInput(e.target.value)}
            className="w-full h-32"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Start with / for root. Example: /, /about, /blog, /contact
          </p>
        </div>

        {/* Generate Button */}
        <Button onClick={generateSitemap} className="w-full bg-primary hover:bg-primary/90">
          Generate Sitemap.xml
        </Button>

        {/* Output */}
        {sitemapContent && (
          <Card className="p-4 bg-secondary/20 border-border">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-foreground">Generated sitemap.xml</h3>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={copyToClipboard}
                  className="flex items-center gap-2"
                >
                  <Copy className="w-4 h-4" />
                  Copy
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={downloadFile}
                  className="flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download
                </Button>
              </div>
            </div>
            <pre className="bg-white p-4 rounded border border-border overflow-x-auto text-sm font-mono text-foreground/80">
              {sitemapContent}
            </pre>
          </Card>
        )}
      </div>
    </ToolPage>
  );
}
