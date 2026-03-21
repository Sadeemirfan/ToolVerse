import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ToolPage from "@/components/ToolPage";
import { Search, Copy } from "lucide-react";
import { toast } from "sonner";

interface KeywordResult {
  word: string;
  count: number;
  density: number;
}

function analyzeKeywords(text: string): { results: KeywordResult[]; totalWords: number; totalSentences: number } {
  const cleaned = text.toLowerCase().replace(/[^\w\s]/g, " ").trim();
  const words = cleaned.split(/\s+/).filter(w => w.length > 2);
  const totalWords = words.length;
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;

  const STOP_WORDS = new Set(["the", "and", "for", "are", "but", "not", "you", "all", "can", "her", "was", "one", "our", "out", "how", "did", "its", "let", "may", "use", "per", "this", "that", "with", "have", "from", "they", "been", "will", "more", "also", "into", "than", "then", "when", "your", "what", "some", "just", "over", "such", "very", "even", "back", "well", "etc"]);

  const freq: Record<string, number> = {};
  words.forEach(w => {
    if (!STOP_WORDS.has(w)) freq[w] = (freq[w] || 0) + 1;
  });

  const results = Object.entries(freq)
    .map(([word, count]) => ({
      word,
      count,
      density: Math.round((count / totalWords) * 100 * 100) / 100,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 20);

  return { results, totalWords, totalSentences: sentences };
}

const SAMPLE_TEXT = `Search engine optimization (SEO) is the process of improving a website to increase its visibility in search engine results. Good SEO practices help websites rank higher on Google and attract more organic traffic. Content quality, keyword research, and backlink building are key components of a successful SEO strategy.`;

export default function KeywordDensityPage() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<ReturnType<typeof analyzeKeywords> | null>(null);

  const analyze = (t = text) => {
    if (!t.trim()) { toast.error("Paste some text first."); return; }
    setResult(analyzeKeywords(t));
  };

  const copyTable = () => {
    if (!result) return;
    const rows = result.results.map(r => `${r.word}\t${r.count}\t${r.density}%`).join("\n");
    navigator.clipboard.writeText(`Word\tCount\tDensity\n${rows}`);
    toast.success("Table copied!");
  };

  const getDensityColor = (density: number) => {
    if (density > 5) return "text-red-500"; // over-optimized
    if (density >= 1 && density <= 3) return "text-green-600"; // ideal
    return "text-muted-foreground";
  };

  const faqs = [
    { question: "What is keyword density?", answer: "Keyword density is the percentage of times a target word appears in content relative to total words. It helps gauge if a page is optimized for that keyword." },
    { question: "What is the ideal keyword density for SEO?", answer: "Most SEO experts recommend 1–2.5% for a primary keyword. Anything above 5% may look like keyword stuffing and hurt rankings." },
    { question: "Does Google still care about keyword density?", answer: "Google no longer uses keyword density as a direct ranking factor, but relevant, natural keyword usage still signals topic relevance." },
    { question: "What are stop words?", answer: "Stop words (the, and, for, etc.) are excluded from keyword density analysis since they appear in every text and have no SEO value." },
  ];

  const toolInterface = (
    <div className="space-y-5">
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-semibold">Paste Your Content</label>
          <button onClick={() => { setText(SAMPLE_TEXT); analyze(SAMPLE_TEXT); }} className="text-xs text-primary underline">Try sample text</button>
        </div>
        <textarea value={text} onChange={e => setText(e.target.value)} rows={8}
          placeholder="Paste your blog post, article, or any text here..."
          className="w-full p-3 border border-border rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50" />
      </div>

      <Button onClick={() => analyze()} className="w-full bg-primary hover:bg-primary/90 text-white">
        <Search className="w-4 h-4 mr-2" />Analyze Keyword Density
      </Button>

      {result && (
        <Card className="p-5 border border-primary/20 bg-primary/5 space-y-4">
          {/* Stats */}
          <div className="flex gap-4 flex-wrap">
            {[
              { label: "Total Words", value: result.totalWords },
              { label: "Sentences", value: result.totalSentences },
              { label: "Unique Keywords", value: result.results.length },
            ].map(s => (
              <div key={s.label} className="bg-white rounded-lg px-4 py-2 text-center">
                <p className="text-lg font-bold text-primary">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Table */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-semibold">Top Keywords</p>
              <Button size="sm" variant="outline" onClick={copyTable}>
                <Copy className="w-3 h-3 mr-1" />Copy Table
              </Button>
            </div>
            <div className="bg-white rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted text-muted-foreground text-xs">
                  <tr>
                    <th className="text-left py-2 px-3">Keyword</th>
                    <th className="text-right px-3">Count</th>
                    <th className="text-right px-3">Density</th>
                    <th className="text-right px-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {result.results.map((r, i) => (
                    <tr key={r.word} className={i % 2 === 0 ? "bg-white" : "bg-muted/30"}>
                      <td className="py-2 px-3 font-medium">{r.word}</td>
                      <td className="text-right px-3">{r.count}</td>
                      <td className={`text-right px-3 font-semibold ${getDensityColor(r.density)}`}>{r.density}%</td>
                      <td className="text-right px-3 text-xs">
                        {r.density > 5 ? "⚠️ High" : r.density >= 1 ? "✅ Good" : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-2">✅ 1–2.5% = ideal | ⚠️ &gt;5% = may be over-optimized</p>
          </div>
        </Card>
      )}
    </div>
  );

  return (
    <ToolPage
      toolName="Keyword Density Analyzer"
      toolDescription="Analyze keyword density and frequency in your content for free. Check if your blog post is over-optimized, find top keywords, and improve your SEO content strategy."
      toolIcon={<Search className="w-8 h-8" />}
      category="SEO Tools"
      keywords={["keyword density analyzer", "keyword density checker", "keyword frequency", "seo content analyzer", "keyword density tool", "content optimization"]}
      features={["Top 20 keywords ranked by frequency", "Density percentage with color coding", "Stop words filtered automatically", "Sentence and word count stats", "Copy results as table"]}
      faqs={faqs}
    >
      {toolInterface}
    </ToolPage>
  );
}
