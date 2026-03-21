import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ToolPage from "@/components/ToolPage";
import { Twitter, Copy, RefreshCw } from "lucide-react";
import { toast } from "sonner";

const TEMPLATES = [
  { label: "Creator", template: "🎨 {niche} creator | Making content about {topic} | {cta} 👇" },
  { label: "Professional", template: "{role} at {company} | Passionate about {topic} | {cta}" },
  { label: "Entrepreneur", template: "🚀 Founder of {company} | Building in {niche} | {cta}" },
  { label: "Developer", template: "👨‍💻 {role} | Building {topic} | {cta} | DMs open" },
  { label: "Influencer", template: "✨ {niche} enthusiast | {topic} lover | {cta} 📩" },
];

function fillTemplate(template: string, fields: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => fields[key] || `[${key}]`);
}

export default function TwitterBioGeneratorPage() {
  const [template, setTemplate] = useState(0);
  const [fields, setFields] = useState<Record<string, string>>({
    niche: "Tech",
    topic: "AI & coding",
    role: "Software Developer",
    company: "My Startup",
    cta: "Check my work",
  });
  const [bio, setBio] = useState("");

  const generate = () => {
    const result = fillTemplate(TEMPLATES[template].template, fields);
    setBio(result);
  };

  const copy = () => {
    navigator.clipboard.writeText(bio);
    toast.success("Bio copied!");
  };

  const charCount = bio.length;

  const faqs = [
    { question: "How long can a Twitter/X bio be?", answer: "Twitter/X allows up to 160 characters for your profile bio. Make every character count!" },
    { question: "What makes a great Twitter bio?", answer: "A great bio clearly explains who you are, what you do, and includes a call-to-action. Use relevant keywords so the right people find you." },
    { question: "Should I use emojis in my Twitter bio?", answer: "Yes! Emojis make your bio more visual and engaging. Use 1-3 max so it doesn't look cluttered." },
    { question: "Can I use this for Instagram bio too?", answer: "Yes! Instagram also allows ~150 characters for bios, so these templates work great for Instagram too." },
  ];

  const toolInterface = (
    <div className="space-y-5">
      <div>
        <label className="text-sm font-semibold mb-2 block">Choose a Style</label>
        <div className="flex flex-wrap gap-2">
          {TEMPLATES.map((t, i) => (
            <button key={i} onClick={() => setTemplate(i)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${template === i ? "bg-primary text-white border-primary" : "border-border hover:border-primary/40"}`}>
              {t.label}
            </button>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-2 italic">Template: {TEMPLATES[template].template}</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {Object.entries(fields).map(([key, val]) => (
          <div key={key}>
            <label className="text-sm font-medium mb-1 block capitalize">{key.replace(/_/g, " ")}</label>
            <input type="text" value={val} onChange={e => setFields(f => ({ ...f, [key]: e.target.value }))}
              className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
        ))}
      </div>

      <Button onClick={generate} className="w-full bg-primary hover:bg-primary/90 text-white">
        <Twitter className="w-4 h-4 mr-2" />Generate Bio
      </Button>

      {bio && (
        <Card className="p-4 border border-primary/20 bg-primary/5">
          <div className="flex items-start justify-between gap-3 mb-2">
            <p className="text-sm font-semibold">Your Twitter/X Bio</p>
            <div className="flex gap-1 shrink-0">
              <Button size="sm" variant="ghost" onClick={generate}><RefreshCw className="w-4 h-4" /></Button>
              <Button size="sm" className="bg-primary text-white" onClick={copy}><Copy className="w-4 h-4 mr-1" /> Copy</Button>
            </div>
          </div>
          <div className="bg-white rounded-lg p-3 border">
            <p className="text-sm leading-relaxed">{bio}</p>
          </div>
          <p className={`text-xs mt-2 ${charCount > 160 ? "text-red-500" : "text-muted-foreground"}`}>
            {charCount}/160 characters {charCount > 160 ? "⚠️ Too long! Shorten your fields." : "✓"}
          </p>
        </Card>
      )}
    </div>
  );

  return (
    <ToolPage
      toolName="Twitter/X Bio Generator"
      toolDescription="Generate a professional and catchy Twitter/X bio in seconds. Free Twitter bio generator with templates for creators, developers, entrepreneurs, and professionals."
      toolIcon={<Twitter className="w-8 h-8" />}
      category="Social Media Tools"
      keywords={["twitter bio generator", "x bio generator", "twitter profile bio", "twitter bio ideas", "best twitter bio", "social media bio generator"]}
      features={["5 professional bio templates", "Customizable fields", "160-character limit checker", "Works for Instagram bio too", "One-click copy"]}
      faqs={faqs}
    >
      {toolInterface}
    </ToolPage>
  );
}
