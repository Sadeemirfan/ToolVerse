import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ToolPage from "@/components/ToolPage";
import { BarChart3, Copy } from "lucide-react";
import { useState } from "react";
import { countWords } from "@/lib/tools";
import { toast } from "sonner";

export default function WordCounterPage() {
  const [text, setText] = useState("");
  const [stats, setStats] = useState({
    words: 0,
    characters: 0,
    charactersNoSpaces: 0,
    sentences: 0,
    paragraphs: 0,
    readingTime: "Less than 1 minute",
  });

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    setStats(countWords(newText));
  };

  const handleCopy = () => {
    const statsText = `Words: ${stats.words}\nCharacters: ${stats.characters}\nCharacters (no spaces): ${stats.charactersNoSpaces}\nSentences: ${stats.sentences}\nParagraphs: ${stats.paragraphs}\nReading Time: ${stats.readingTime}`;
    navigator.clipboard.writeText(statsText);
    toast.success("Stats copied to clipboard!");
  };

  const handleClear = () => {
    setText("");
    setStats({
      words: 0,
      characters: 0,
      charactersNoSpaces: 0,
      sentences: 0,
      paragraphs: 0,
      readingTime: "Less than 1 minute",
    });
  };

  const toolInterface = (
    <div className="space-y-4">
      <Textarea
        placeholder="Paste or type your text here to count words, characters, and more..."
        value={text}
        onChange={handleTextChange}
        className="min-h-64 p-4 font-mono text-sm"
      />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Card className="p-4 bg-primary/5 border-primary/20">
          <div className="text-2xl font-bold text-primary">{stats.words}</div>
          <div className="text-xs text-muted-foreground">Words</div>
        </Card>
        <Card className="p-4 bg-accent/5 border-accent/20">
          <div className="text-2xl font-bold text-accent">{stats.characters}</div>
          <div className="text-xs text-muted-foreground">Characters</div>
        </Card>
        <Card className="p-4 bg-primary/5 border-primary/20">
          <div className="text-2xl font-bold text-primary">{stats.charactersNoSpaces}</div>
          <div className="text-xs text-muted-foreground">No Spaces</div>
        </Card>
        <Card className="p-4 bg-accent/5 border-accent/20">
          <div className="text-2xl font-bold text-accent">{stats.sentences}</div>
          <div className="text-xs text-muted-foreground">Sentences</div>
        </Card>
        <Card className="p-4 bg-primary/5 border-primary/20">
          <div className="text-2xl font-bold text-primary">{stats.paragraphs}</div>
          <div className="text-xs text-muted-foreground">Paragraphs</div>
        </Card>
        <Card className="p-4 bg-accent/5 border-accent/20">
          <div className="text-sm font-bold text-accent">{stats.readingTime}</div>
          <div className="text-xs text-muted-foreground">Reading Time</div>
        </Card>
      </div>

      <div className="flex gap-2">
        <Button onClick={handleCopy} className="flex-1 bg-primary hover:bg-primary/90">
          <Copy className="w-4 h-4 mr-2" />
          Copy Stats
        </Button>
        <Button onClick={handleClear} variant="outline" className="flex-1">
          Clear
        </Button>
      </div>
    </div>
  );

  const faqs = [
    {
      question: "How does the word counter work?",
      answer:
        "The word counter analyzes your text in real-time and counts all words, characters, sentences, and paragraphs. It also estimates reading time based on an average reading speed of 200 words per minute.",
    },
    {
      question: "Is my text stored anywhere?",
      answer:
        "No! All text processing happens entirely in your browser. Your text is never sent to our servers. Once you close the page, your text is completely gone.",
    },
    {
      question: "What's the difference between characters and characters without spaces?",
      answer:
        "Characters include all letters, numbers, punctuation, and spaces. Characters without spaces exclude all whitespace, giving you the actual character count of your content.",
    },
    {
      question: "How is reading time calculated?",
      answer:
        "Reading time is estimated based on an average reading speed of 200 words per minute. This is a standard metric used across the web.",
    },
    {
      question: "Can I use this for academic papers?",
      answer:
        "Absolutely! Many students and academics use our word counter to track their essay and paper word counts. It's perfect for meeting assignment requirements.",
    },
  ];

  return (
    <ToolPage
      toolName="Word Counter"
      toolDescription="Count words, characters, sentences, and paragraphs instantly. Perfect for writers, students, and content creators who need to track their writing metrics."
      toolIcon={<BarChart3 className="w-8 h-8" />}
      category="Text Tools"
      keywords={["word counter", "character counter", "word count", "text analyzer", "writing tool"]}
      features={[
        "Real-time word counting",
        "Character count with and without spaces",
        "Sentence and paragraph counter",
        "Reading time estimation",
        "Copy statistics to clipboard",
        "No data storage or tracking",
      ]}
      faqs={faqs}
    >
      {toolInterface}
    </ToolPage>
  );
}
