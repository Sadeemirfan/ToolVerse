import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ToolPage from "@/components/ToolPage";
import { FileText, Copy } from "lucide-react";
import { useState } from "react";
import { generateLoremIpsum } from "@/lib/tools";
import { toast } from "sonner";

type LoremType = "paragraphs" | "sentences" | "words";

export default function LoremIpsumPage() {
  const [type, setType] = useState<LoremType>("paragraphs");
  const [count, setCount] = useState(3);
  const [output, setOutput] = useState("");

  const handleGenerate = () => {
    const lorem = generateLoremIpsum(count, type);
    setOutput(lorem);
    toast.success("Lorem ipsum generated!");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    toast.success("Lorem ipsum copied to clipboard!");
  };

  const toolInterface = (
    <div className="space-y-6">
      {/* Type Selection */}
      <div>
        <label className="text-sm font-semibold text-foreground mb-3 block">Generate</label>
        <Tabs value={type} onValueChange={(val) => setType(val as LoremType)}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="paragraphs">Paragraphs</TabsTrigger>
            <TabsTrigger value="sentences">Sentences</TabsTrigger>
            <TabsTrigger value="words">Words</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Count Slider */}
      <div>
        <label className="text-sm font-semibold text-foreground mb-4 block">
          Number of {type}: <span className="text-primary">{count}</span>
        </label>
        <Slider value={[count]} onValueChange={(val) => setCount(val[0])} min={1} max={type === "paragraphs" ? 20 : 100} step={1} />
      </div>

      {/* Generate Button */}
      <Button onClick={handleGenerate} size="lg" className="w-full bg-primary hover:bg-primary/90 text-white">
        Generate Lorem Ipsum
      </Button>

      {/* Output */}
      {output && (
        <div>
          <label className="text-sm font-semibold text-foreground mb-2 block">Output</label>
          <Textarea value={output} readOnly className="min-h-64 p-4 font-serif text-sm bg-secondary/50" />
        </div>
      )}

      {/* Copy Button */}
      {output && (
        <Button onClick={handleCopy} className="w-full bg-primary hover:bg-primary/90">
          <Copy className="w-4 h-4 mr-2" />
          Copy to Clipboard
        </Button>
      )}

      {/* Info Cards */}
      <div className="grid grid-cols-3 gap-2">
        <Card className="p-3 bg-secondary/30 border-0 text-center">
          <div className="text-xs font-semibold text-foreground">Paragraphs</div>
          <div className="text-xs text-foreground/70">Full blocks</div>
        </Card>
        <Card className="p-3 bg-secondary/30 border-0 text-center">
          <div className="text-xs font-semibold text-foreground">Sentences</div>
          <div className="text-xs text-foreground/70">Single lines</div>
        </Card>
        <Card className="p-3 bg-secondary/30 border-0 text-center">
          <div className="text-xs font-semibold text-foreground">Words</div>
          <div className="text-xs text-foreground/70">Individual</div>
        </Card>
      </div>
    </div>
  );

  const faqs = [
    {
      question: "What is Lorem Ipsum?",
      answer:
        "Lorem Ipsum is placeholder text commonly used in design and publishing. It's derived from Latin and helps designers visualize how text will look in a layout without using actual content.",
    },
    {
      question: "Why use Lorem Ipsum?",
      answer:
        "Lorem Ipsum allows designers to focus on layout and design without being distracted by the meaning of the text. It provides a realistic representation of how text will fill space.",
    },
    {
      question: "Can I use Lorem Ipsum in my projects?",
      answer:
        "Yes! Lorem Ipsum is free to use and widely accepted in the design industry. It's perfect for mockups, prototypes, and presentations.",
    },
    {
      question: "What's the difference between paragraphs, sentences, and words?",
      answer:
        "Paragraphs are full blocks of text. Sentences are single lines. Words are individual terms. Choose based on how much placeholder text you need.",
    },
    {
      question: "Is this the original Lorem Ipsum?",
      answer:
        "Our Lorem Ipsum generator uses the classic text derived from De Finibus Bonorum et Malorum by Cicero, written in 45 BC. It's the standard placeholder text used worldwide.",
    },
  ];

  return (
    <ToolPage
      toolName="Lorem Ipsum Generator"
      toolDescription="Generate placeholder text instantly for your designs and projects. Create paragraphs, sentences, or individual words. Perfect for mockups and prototypes."
      toolIcon={<FileText className="w-8 h-8" />}
      category="Text Tools"
      keywords={["lorem ipsum", "placeholder text", "dummy text", "design tool"]}
      features={[
        "Generate paragraphs, sentences, or words",
        "Customizable quantity",
        "Classic Lorem Ipsum text",
        "Copy to clipboard",
        "Perfect for design mockups",
        "No limits on generation",
      ]}
      faqs={faqs}
    >
      {toolInterface}
    </ToolPage>
  );
}
