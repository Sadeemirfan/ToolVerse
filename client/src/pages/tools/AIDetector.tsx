import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import ToolPage from "@/components/ToolPage";
import { Brain, Copy } from "lucide-react";
import { useState } from "react";
import { analyzeAIContent } from "@/lib/tools";
import { toast } from "sonner";

export default function AIDetectorPage() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<{ isAI: number; confidence: number } | null>(null);

  const handleAnalyze = () => {
    if (!text.trim()) {
      toast.error("Please enter text to analyze");
      return;
    }
    const analysis = analyzeAIContent(text);
    setResult(analysis);
    toast.success("Analysis complete!");
  };

  const getResultColor = () => {
    if (!result) return "text-gray-600";
    if (result.isAI > 70) return "text-red-600";
    if (result.isAI > 40) return "text-yellow-600";
    return "text-green-600";
  };

  const getResultLabel = () => {
    if (!result) return "Analyze text";
    if (result.isAI > 70) return "Likely AI-Generated";
    if (result.isAI > 40) return "Mixed Content";
    return "Likely Human-Written";
  };

  const toolInterface = (
    <div className="space-y-6">
      <div>
        <label className="text-sm font-semibold text-foreground mb-2 block">Text to Analyze</label>
        <Textarea
          placeholder="Paste text here to detect if it's AI-generated or human-written..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-64 p-4 font-mono text-sm"
        />
      </div>

      <Button onClick={handleAnalyze} size="lg" className="w-full bg-primary hover:bg-primary/90 text-white">
        Analyze Text
      </Button>

      {result && (
        <div className="space-y-4">
          <Card className="p-6 bg-secondary/30 border-0">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-foreground">AI Score</span>
                  <span className={`text-2xl font-bold ${getResultColor()}`}>{result.isAI}%</span>
                </div>
                <Progress value={result.isAI} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-foreground">Confidence</span>
                  <span className="text-sm font-bold text-primary">{Math.round(result.confidence)}%</span>
                </div>
                <Progress value={result.confidence} className="h-2" />
              </div>

              <div className="pt-4 border-t border-border">
                <p className="text-sm text-foreground mb-2">
                  <strong>Result:</strong>
                </p>
                <p className={`text-lg font-bold ${getResultColor()}`}>{getResultLabel()}</p>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4 bg-red-50 border-red-200">
              <div className="text-2xl font-bold text-red-600">{result.isAI}%</div>
              <div className="text-xs text-red-700">AI Probability</div>
            </Card>
            <Card className="p-4 bg-green-50 border-green-200">
              <div className="text-2xl font-bold text-green-600">{100 - result.isAI}%</div>
              <div className="text-xs text-green-700">Human Probability</div>
            </Card>
          </div>
        </div>
      )}

      {text && (
        <Button onClick={() => navigator.clipboard.writeText(text)} variant="outline" className="w-full">
          <Copy className="w-4 h-4 mr-2" />
          Copy Text
        </Button>
      )}
    </div>
  );

  const faqs = [
    {
      question: "How does AI detection work?",
      answer:
        "Our AI detector analyzes text patterns, vocabulary, sentence structure, and linguistic markers that are commonly found in AI-generated content. It compares these against patterns typical of human writing.",
    },
    {
      question: "Is this 100% accurate?",
      answer:
        "No detection tool is 100% accurate. Our tool provides a probability score based on text analysis. Use it as a guide, not as definitive proof. High-quality AI writing may score lower, and poorly written human text may score higher.",
    },
    {
      question: "What makes text look AI-generated?",
      answer:
        "AI-generated text often has formal language, repetitive phrases, perfect grammar, and lacks personal opinions or emotional expressions. Human writing typically includes personal touches, casual language, and unique perspectives.",
    },
    {
      question: "Can I use this to detect plagiarism?",
      answer:
        "This tool detects AI-generated content, not plagiarism. For plagiarism detection, use specialized plagiarism checkers like Turnitin or Copyscape.",
    },
    {
      question: "Is my text stored or analyzed on servers?",
      answer:
        "No. All analysis happens in your browser. Your text is never sent to our servers and is not stored anywhere. Complete privacy is guaranteed.",
    },
  ];

  return (
    <ToolPage
      toolName="AI Content Detector"
      toolDescription="Detect AI-generated content instantly. Analyze text to determine if it was written by humans or AI. Perfect for educators, content creators, and researchers."
      toolIcon={<Brain className="w-8 h-8" />}
      category="SEO Tools"
      keywords={["AI detector", "AI content detector", "plagiarism checker", "content analysis"]}
      features={[
        "Detect AI-generated content",
        "Real-time analysis",
        "Probability scoring",
        "Confidence metrics",
        "No data storage",
        "Instant results",
      ]}
      faqs={faqs}
    >
      {toolInterface}
    </ToolPage>
  );
}
