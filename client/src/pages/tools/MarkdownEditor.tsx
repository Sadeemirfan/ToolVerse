import { useState } from "react";
import { Button } from "@/components/ui/button";
import ToolPage from "@/components/ToolPage";
import { FileText, Copy, Download } from "lucide-react";
import { toast } from "sonner";

function parseMarkdown(md: string): string {
  return md
    .replace(/^# (.*$)/gim, "<h1 class='text-3xl font-bold my-3'>$1</h1>")
    .replace(/^## (.*$)/gim, "<h2 class='text-2xl font-bold my-3'>$1</h2>")
    .replace(/^### (.*$)/gim, "<h3 class='text-xl font-bold my-2'>$1</h3>")
    .replace(/\*\*(.*?)\*\*/gim, "<strong class='font-bold'>$1</strong>")
    .replace(/\*(.*?)\*/gim, "<em class='italic'>$1</em>")
    .replace(/~~(.*?)~~/gim, "<del>$1</del>")
    .replace(/`(.*?)`/gim, "<code class='bg-secondary/50 px-1 rounded font-mono text-sm'>$1</code>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/gim, "<a href='$2' class='text-primary underline' target='_blank'>$1</a>")
    .replace(/^> (.*$)/gim, "<blockquote class='border-l-4 border-primary pl-4 italic text-foreground/70 my-2'>$1</blockquote>")
    .replace(/^- (.*$)/gim, "<li class='ml-4 list-disc'>$1</li>")
    .replace(/^\d+\. (.*$)/gim, "<li class='ml-4 list-decimal'>$1</li>")
    .replace(/\n\n/gim, "</p><p class='my-2'>")
    .replace(/\n/gim, "<br/>");
}

const SAMPLE_MD = `# Welcome to Markdown Editor

## Features
- **Bold** and *italic* text
- \`Inline code\` support
- [Links](https://my-toolverse.com)

### How to Use
Write your markdown on the left and see a **live preview** on the right!

> Tip: You can download your work as an HTML file.
`;

export default function MarkdownEditorPage() {
  const [markdown, setMarkdown] = useState(SAMPLE_MD);

  const copy = () => {
    navigator.clipboard.writeText(markdown);
    toast.success("Markdown copied!");
  };

  const download = () => {
    const blob = new Blob([markdown], { type: "text/markdown" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "document.md";
    a.click();
    toast.success("Downloaded!");
  };

  const faqs = [
    { question: "What is Markdown?", answer: "Markdown is a lightweight markup language that converts plain text formatting into HTML. It's widely used for documentation, README files, and blog posts." },
    { question: "What syntax does Markdown support?", answer: "This editor supports headings (#, ##, ###), bold (**text**), italic (*text*), links, blockquotes, lists, and inline code." },
    { question: "Can I export my document?", answer: "Yes! You can copy the markdown or download it as a .md file using the buttons provided." },
    { question: "Is my content saved?", answer: "Your content exists only in your browser tab. Please copy or download it before closing the page." },
  ];

  const toolInterface = (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button onClick={copy} variant="outline" size="sm">
          <Copy className="w-4 h-4 mr-2" /> Copy
        </Button>
        <Button onClick={download} variant="outline" size="sm">
          <Download className="w-4 h-4 mr-2" /> Download .md
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Editor */}
        <div>
          <label className="text-sm font-semibold mb-2 block">Markdown Input</label>
          <textarea
            value={markdown}
            onChange={e => setMarkdown(e.target.value)}
            rows={20}
            className="w-full p-3 border border-border rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
            placeholder="Write your markdown here..."
          />
        </div>

        {/* Preview */}
        <div>
          <label className="text-sm font-semibold mb-2 block">Live Preview</label>
          <div
            className="w-full p-4 border border-border rounded-lg min-h-[20rem] bg-white prose max-w-none text-sm text-foreground"
            dangerouslySetInnerHTML={{ __html: `<p class='my-2'>${parseMarkdown(markdown)}</p>` }}
          />
        </div>
      </div>
    </div>
  );

  return (
    <ToolPage
      toolName="Markdown Editor & Preview"
      toolDescription="Write Markdown with a live side-by-side preview. Supports headings, bold, italic, links, lists, code, and blockquotes. Free online markdown editor."
      toolIcon={<FileText className="w-8 h-8" />}
      category="Text Tools"
      keywords={["markdown editor", "markdown preview", "markdown to html", "online markdown", "live preview editor"]}
      features={[
        "Live side-by-side preview",
        "Supports all common Markdown syntax",
        "Copy markdown to clipboard",
        "Download as .md file",
        "No sign-up required",
      ]}
      faqs={faqs}
    >
      {toolInterface}
    </ToolPage>
  );
}
