import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ToolPage from "@/components/ToolPage";
import { Search, Copy } from "lucide-react";
import { toast } from "sonner";

export default function RegexTesterPage() {
  const [pattern, setPattern] = useState("\\d+");
  const [flags, setFlags] = useState("g");
  const [testString, setTestString] = useState("I have 3 cats and 12 dogs. Phone: 555-1234.");

  const result = useMemo(() => {
    if (!pattern) return { matches: [], error: "" };
    try {
      const regex = new RegExp(pattern, flags);
      const matches: Array<{ match: string; index: number }> = [];
      let m: RegExpExecArray | null;
      const r = new RegExp(pattern, flags.includes("g") ? flags : flags + "g");
      while ((m = r.exec(testString)) !== null) {
        matches.push({ match: m[0], index: m.index });
        if (!flags.includes("g")) break;
      }
      return { matches, error: "" };
    } catch (e: any) {
      return { matches: [], error: e.message };
    }
  }, [pattern, flags, testString]);

  const highlightedText = useMemo(() => {
    if (!pattern || result.error || result.matches.length === 0) return testString;
    try {
      const regex = new RegExp(pattern, flags.includes("g") ? flags : flags + "g");
      return testString.replace(regex, match =>
        `<mark class='bg-yellow-200 text-yellow-900 rounded px-0.5'>${match}</mark>`
      );
    } catch {
      return testString;
    }
  }, [pattern, flags, testString, result]);

  const copyPattern = () => {
    navigator.clipboard.writeText(`/${pattern}/${flags}`);
    toast.success("Pattern copied!");
  };

  const COMMON = [
    { label: "Email", pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}", flags: "g" },
    { label: "URL", pattern: "https?:\\/\\/[^\\s]+", flags: "g" },
    { label: "Phone", pattern: "\\+?[\\d\\s\\-()]{7,}", flags: "g" },
    { label: "Numbers", pattern: "\\d+", flags: "g" },
    { label: "Words", pattern: "\\b\\w+\\b", flags: "g" },
  ];

  const faqs = [
    { question: "What is a regular expression?", answer: "A regular expression (regex) is a sequence of characters that forms a search pattern. It is used to match, search, or manipulate text." },
    { question: "What do the flags mean?", answer: "g=global (find all matches), i=case-insensitive, m=multiline. You can combine flags like 'gi'." },
    { question: "How do I test my regex?", answer: "Type your pattern in the pattern field, set optional flags, and type or paste your test string. Matches are highlighted automatically." },
    { question: "What characters need to be escaped?", answer: "Special regex characters like ., *, +, ?, (, ), [, ], {, }, ^, $, | need to be escaped with a backslash (\\) to be treated as literals." },
  ];

  const toolInterface = (
    <div className="space-y-4">
      {/* Pattern Input */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
        <div className="sm:col-span-3">
          <label className="text-sm font-semibold mb-2 block">Regex Pattern</label>
          <div className="flex items-center border border-border rounded-lg overflow-hidden">
            <span className="px-3 text-muted-foreground font-mono text-lg">/</span>
            <input
              value={pattern}
              onChange={e => setPattern(e.target.value)}
              className="flex-1 p-2 font-mono text-sm focus:outline-none"
              placeholder="Enter regex pattern..."
            />
            <span className="px-3 text-muted-foreground font-mono text-lg">/</span>
          </div>
        </div>
        <div>
          <label className="text-sm font-semibold mb-2 block">Flags</label>
          <input
            value={flags}
            onChange={e => setFlags(e.target.value)}
            className="w-full p-2 border border-border rounded-lg font-mono text-sm focus:outline-none"
            placeholder="g, i, m"
          />
        </div>
      </div>

      {/* Quick Patterns */}
      <div>
        <p className="text-xs text-muted-foreground mb-2 font-medium">Quick Patterns</p>
        <div className="flex flex-wrap gap-2">
          {COMMON.map(c => (
            <button
              key={c.label}
              onClick={() => { setPattern(c.pattern); setFlags(c.flags); }}
              className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition"
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Test String */}
      <div>
        <label className="text-sm font-semibold mb-2 block">Test String</label>
        <textarea
          value={testString}
          onChange={e => setTestString(e.target.value)}
          rows={4}
          className="w-full p-3 border border-border rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      {/* Error */}
      {result.error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 p-2 rounded-lg">
          ⚠️ {result.error}
        </p>
      )}

      {/* Highlighted Result */}
      {!result.error && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-semibold">
              Matches: <span className="text-primary">{result.matches.length}</span>
            </label>
            <Button size="sm" variant="ghost" onClick={copyPattern}>
              <Copy className="w-4 h-4 mr-1" /> Copy Pattern
            </Button>
          </div>
          <Card className="p-3 bg-secondary/30 border-0">
            <p
              className="text-sm font-mono whitespace-pre-wrap break-all leading-relaxed"
              dangerouslySetInnerHTML={{ __html: highlightedText }}
            />
          </Card>
        </div>
      )}

      {/* Match List */}
      {result.matches.length > 0 && (
        <div>
          <p className="text-sm font-semibold mb-2">Match Details</p>
          <div className="flex flex-wrap gap-2">
            {result.matches.map((m, i) => (
              <span key={i} className="text-xs font-mono bg-yellow-100 text-yellow-800 px-2 py-1 rounded border border-yellow-200">
                [{m.index}] "{m.match}"
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <ToolPage
      toolName="Regex Tester"
      toolDescription="Test and debug regular expressions in real time. Highlights all matches, shows match details, and includes quick patterns for email, URL, phone, and more."
      toolIcon={<Search className="w-8 h-8" />}
      category="Developer Tools"
      keywords={["regex tester", "regular expression tester", "regex debugger", "regex matcher", "online regex"]}
      features={[
        "Real-time regex matching",
        "Highlighted matches in text",
        "Support for g, i, m flags",
        "Match index details",
        "Quick pattern library",
        "Copy regex pattern",
      ]}
      faqs={faqs}
    >
      {toolInterface}
    </ToolPage>
  );
}
