import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ToolPage from "@/components/ToolPage";
import { Type, Copy } from "lucide-react";
import { useState } from "react";
import { convertCase } from "@/lib/tools";
import { toast } from "sonner";

type CaseType = "uppercase" | "lowercase" | "titlecase" | "sentencecase" | "alternating" | "camelcase";

export default function CaseConverterPage() {
  const [text, setText] = useState("");
  const [selectedCase, setSelectedCase] = useState<CaseType>("uppercase");

  const handleConvert = (caseType: CaseType) => {
    setSelectedCase(caseType);
  };

  const convertedText = convertCase(text, selectedCase);

  const handleCopy = () => {
    navigator.clipboard.writeText(convertedText);
    toast.success("Converted text copied to clipboard!");
  };

  const caseOptions = [
    { id: "uppercase", label: "UPPERCASE", example: "HELLO WORLD" },
    { id: "lowercase", label: "lowercase", example: "hello world" },
    { id: "titlecase", label: "Title Case", example: "Hello World" },
    { id: "sentencecase", label: "Sentence case", example: "Hello world" },
    { id: "alternating", label: "AlTeRnAtInG", example: "HeLlO wOrLd" },
    { id: "camelcase", label: "camelCase", example: "helloWorld" },
  ];

  const toolInterface = (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-semibold text-foreground mb-2 block">Input Text</label>
        <Textarea
          placeholder="Enter text to convert..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-32 p-4 font-mono text-sm"
        />
      </div>

      <div>
        <label className="text-sm font-semibold text-foreground mb-3 block">Select Case Type</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {caseOptions.map((option) => (
            <Button
              key={option.id}
              onClick={() => handleConvert(option.id as CaseType)}
              variant={selectedCase === option.id ? "default" : "outline"}
              className={selectedCase === option.id ? "bg-primary text-white" : ""}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-sm font-semibold text-foreground mb-2 block">Output</label>
        <Textarea
          value={convertedText}
          readOnly
          className="min-h-32 p-4 font-mono text-sm bg-secondary/50"
        />
      </div>

      <div className="flex gap-2">
        <Button onClick={handleCopy} className="flex-1 bg-primary hover:bg-primary/90">
          <Copy className="w-4 h-4 mr-2" />
          Copy Result
        </Button>
        <Button onClick={() => setText("")} variant="outline" className="flex-1">
          Clear
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {caseOptions.map((option) => (
          <Card key={option.id} className="p-3 bg-secondary/30 border-0 text-center">
            <div className="text-xs font-semibold text-foreground mb-1">{option.label}</div>
            <div className="text-xs text-foreground/70 font-mono">{option.example}</div>
          </Card>
        ))}
      </div>
    </div>
  );

  const faqs = [
    {
      question: "What is case conversion?",
      answer:
        "Case conversion is the process of changing the capitalization of text. Different cases are used for different purposes: UPPERCASE for emphasis, lowercase for simplicity, Title Case for headings, camelCase for programming, etc.",
    },
    {
      question: "When should I use each case type?",
      answer:
        "UPPERCASE is used for emphasis or acronyms. lowercase is for general text. Title Case is for headings. Sentence case is for standard sentences. camelCase is used in programming. Alternating case is mostly for fun or stylistic purposes.",
    },
    {
      question: "Is this tool free?",
      answer: "Yes! Our case converter is completely free to use. No sign-up, no limits, no hidden charges.",
    },
    {
      question: "Can I convert multiple paragraphs at once?",
      answer:
        "Absolutely! You can paste as much text as you want. The converter will process all of it and maintain the paragraph structure.",
    },
    {
      question: "Is my text stored or tracked?",
      answer:
        "No. All processing happens in your browser. Your text is never sent to our servers and is not stored anywhere.",
    },
  ];

  return (
    <ToolPage
      toolName="Case Converter"
      toolDescription="Instantly convert text between UPPERCASE, lowercase, Title Case, Sentence case, camelCase, and alternating case. Perfect for developers, writers, and content creators."
      toolIcon={<Type className="w-8 h-8" />}
      category="Text Tools"
      keywords={["case converter", "text converter", "uppercase", "lowercase", "title case"]}
      features={[
        "Convert to 6 different case types",
        "Real-time conversion",
        "Batch processing",
        "Copy to clipboard",
        "No character limits",
        "Privacy-first processing",
      ]}
      faqs={faqs}
    >
      {toolInterface}
    </ToolPage>
  );
}
