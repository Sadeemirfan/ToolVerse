import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ToolPage from "@/components/ToolPage";
import { Search, Copy } from "lucide-react";
import { useState } from "react";
import { generateMetaTags } from "@/lib/tools";
import { toast } from "sonner";

export default function MetaGeneratorPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [metaTags, setMetaTags] = useState<{ title: string; description: string; keywords: string } | null>(null);

  const handleGenerate = () => {
    if (!title.trim()) {
      toast.error("Please enter a title");
      return;
    }
    const keywordArray = keywords
      .split(",")
      .map((k) => k.trim())
      .filter((k) => k);
    const tags = generateMetaTags(title, description, keywordArray);
    setMetaTags(tags);
    toast.success("Meta tags generated!");
  };

  const handleCopyHTML = () => {
    if (!metaTags) return;
    const html = `<meta name="title" content="${metaTags.title}">
<meta name="description" content="${metaTags.description}">
<meta name="keywords" content="${metaTags.keywords}">
<meta property="og:title" content="${metaTags.title}">
<meta property="og:description" content="${metaTags.description}">`;
    navigator.clipboard.writeText(html);
    toast.success("HTML copied to clipboard!");
  };

  const toolInterface = (
    <div className="space-y-6">
      <div>
        <label className="text-sm font-semibold text-foreground mb-2 block">Page Title (50-60 chars)</label>
        <Input
          placeholder="e.g., Best Free Online Tools | My ToolVerse"
          value={title}
          onChange={(e) => setTitle(e.target.value.slice(0, 60))}
          maxLength={60}
          className="p-3"
        />
        <p className="text-xs text-muted-foreground mt-1">{title.length}/60 characters</p>
      </div>

      <div>
        <label className="text-sm font-semibold text-foreground mb-2 block">Meta Description (150-160 chars)</label>
        <Textarea
          placeholder="e.g., Free online tools for productivity, SEO, development, and more. No sign-up required."
          value={description}
          onChange={(e) => setDescription(e.target.value.slice(0, 160))}
          maxLength={160}
          className="p-3 min-h-20"
        />
        <p className="text-xs text-muted-foreground mt-1">{description.length}/160 characters</p>
      </div>

      <div>
        <label className="text-sm font-semibold text-foreground mb-2 block">Keywords (comma-separated)</label>
        <Textarea
          placeholder="e.g., online tools, free tools, productivity tools, SEO tools"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          className="p-3 min-h-20"
        />
      </div>

      <Button onClick={handleGenerate} size="lg" className="w-full bg-primary hover:bg-primary/90 text-white">
        Generate Meta Tags
      </Button>

      {metaTags && (
        <div className="space-y-4">
          <Card className="p-4 bg-secondary/30 border-0">
            <div className="space-y-3">
              <div>
                <p className="text-xs font-semibold text-muted-foreground mb-1">Title Tag</p>
                <p className="text-sm text-foreground font-mono break-all">{metaTags.title}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground mb-1">Meta Description</p>
                <p className="text-sm text-foreground font-mono break-all">{metaTags.description}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground mb-1">Keywords</p>
                <p className="text-sm text-foreground font-mono break-all">{metaTags.keywords}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-blue-50 border-blue-200">
            <p className="text-xs font-semibold text-blue-700 mb-2">HTML Code:</p>
            <pre className="text-xs text-blue-700 overflow-x-auto bg-white p-2 rounded border border-blue-200">
{`<meta name="title" content="${metaTags.title}">
<meta name="description" content="${metaTags.description}">
<meta name="keywords" content="${metaTags.keywords}">`}
            </pre>
          </Card>

          <Button onClick={handleCopyHTML} className="w-full bg-primary hover:bg-primary/90">
            <Copy className="w-4 h-4 mr-2" />
            Copy HTML
          </Button>
        </div>
      )}
    </div>
  );

  const faqs = [
    {
      question: "Why are meta tags important for SEO?",
      answer:
        "Meta tags help search engines understand your page content. The title tag and meta description appear in search results and influence click-through rates. Proper meta tags improve your SEO ranking.",
    },
    {
      question: "What's the ideal length for a title tag?",
      answer:
        "The ideal length is 50-60 characters. This ensures your title displays fully in search results without being cut off on desktop and mobile devices.",
    },
    {
      question: "How long should a meta description be?",
      answer:
        "Meta descriptions should be 150-160 characters. This is the optimal length to display fully in search results while providing enough information to encourage clicks.",
    },
    {
      question: "How many keywords should I include?",
      answer:
        "Include 5-10 relevant keywords that accurately describe your page content. Avoid keyword stuffing, as it can hurt your SEO ranking. Focus on quality over quantity.",
    },
    {
      question: "Do meta tags guarantee better rankings?",
      answer:
        "No. Meta tags are just one factor in SEO. Content quality, backlinks, page speed, and user experience are equally important. Use this tool as part of a comprehensive SEO strategy.",
    },
  ];

  return (
    <ToolPage
      toolName="SEO Meta Tag Generator"
      toolDescription="Generate optimized meta tags for your web pages. Create title tags, meta descriptions, and keywords that improve SEO and click-through rates."
      toolIcon={<Search className="w-8 h-8" />}
      category="SEO Tools"
      keywords={["meta tag generator", "SEO tool", "title tag", "meta description", "keywords"]}
      features={[
        "Generate optimized meta tags",
        "Title tag optimization",
        "Meta description generator",
        "Keyword suggestions",
        "Character count tracking",
        "Copy HTML code",
      ]}
      faqs={faqs}
    >
      {toolInterface}
    </ToolPage>
  );
}
