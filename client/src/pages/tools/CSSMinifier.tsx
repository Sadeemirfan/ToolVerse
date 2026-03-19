import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ToolPage from "@/components/ToolPage";
import { Code2, Copy, Download } from "lucide-react";
import { toast } from "sonner";

function minifyCSS(css: string): string {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s*{\s*/g, "{")
    .replace(/\s*}\s*/g, "}")
    .replace(/\s*:\s*/g, ":")
    .replace(/\s*;\s*/g, ";")
    .replace(/\s*,\s*/g, ",")
    .replace(/\s+/g, " ")
    .replace(/;\s*}/g, "}")
    .trim();
}

function beautifyCSS(css: string): string {
  const min = minifyCSS(css);
  let indent = 0;
  let result = "";
  for (let i = 0; i < min.length; i++) {
    const c = min[i];
    if (c === "{") { result += " {\n" + "  ".repeat(++indent); }
    else if (c === "}") { indent = Math.max(0, indent - 1); result += "\n" + "  ".repeat(indent) + "}\n\n"; }
    else if (c === ";") { result += ";\n" + "  ".repeat(indent); }
    else result += c;
  }
  return result.trim();
}

const SAMPLE_CSS = `/* Main styles */
body { margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #ffffff; }
.container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
h1, h2, h3 { color: #333333; font-weight: bold; }`;

export default function CSSMinifierPage() {
  const [input, setInput] = useState(SAMPLE_CSS);
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"minify" | "beautify">("minify");

  const process = () => {
    if (!input.trim()) { toast.error("Enter some CSS first."); return; }
    setOutput(mode === "minify" ? minifyCSS(input) : beautifyCSS(input));
  };

  const savings = output && mode === "minify" && input.length > 0
    ? Math.round((1 - output.length / input.length) * 100)
    : 0;

  const copy = () => { navigator.clipboard.writeText(output); toast.success("Copied!"); };
  const download = () => {
    const blob = new Blob([output], { type: "text/css" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = mode === "minify" ? "styles.min.css" : "styles.css";
    a.click();
    toast.success("Downloaded!");
  };

  const faqs = [
    { question: "What does CSS minification do?", answer: "It removes whitespace, comments, and unnecessary characters to reduce file size and improve page load speed." },
    { question: "Is minified CSS still valid?", answer: "Yes! The styles work identically — only formatting is removed." },
    { question: "How much does minification reduce file size?", answer: "Typically 20-40% reduction, depending on how much whitespace and comments exist." },
    { question: "What is CSS beautification?", answer: "It adds proper indentation and spacing to minified or unformatted CSS to make it human-readable." },
  ];

  const toolInterface = (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button onClick={() => setMode("minify")} variant={mode === "minify" ? "default" : "outline"} className={mode === "minify" ? "bg-primary text-white" : ""}>Minify</Button>
        <Button onClick={() => setMode("beautify")} variant={mode === "beautify" ? "default" : "outline"} className={mode === "beautify" ? "bg-primary text-white" : ""}>Beautify</Button>
      </div>
      <div>
        <label className="text-sm font-semibold mb-2 block">Input CSS</label>
        <textarea value={input} onChange={e => setInput(e.target.value)} rows={8} className="w-full p-3 border border-border rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50" />
      </div>
      <Button onClick={process} className="bg-primary hover:bg-primary/90 text-white">
        <Code2 className="w-4 h-4 mr-2" />{mode === "minify" ? "Minify CSS" : "Beautify CSS"}
      </Button>
      {output && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <label className="text-sm font-semibold">Output</label>
              {mode === "minify" && savings > 0 && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">{savings}% smaller</span>}
            </div>
            <div className="flex gap-1">
              <Button size="sm" variant="ghost" onClick={copy}><Copy className="w-4 h-4" /></Button>
              <Button size="sm" variant="ghost" onClick={download}><Download className="w-4 h-4" /></Button>
            </div>
          </div>
          <Card className="p-3 bg-secondary/30 border-0">
            <pre className="text-xs font-mono whitespace-pre-wrap break-all max-h-48 overflow-y-auto">{output}</pre>
          </Card>
          <p className="text-xs text-muted-foreground mt-1">{input.length} → {output.length} characters</p>
        </div>
      )}
    </div>
  );

  return (
    <ToolPage
      toolName="CSS Minifier & Beautifier"
      toolDescription="Minify CSS to reduce file size and improve page load speed, or beautify minified CSS for readability. Free, browser-based CSS optimizer."
      toolIcon={<Code2 className="w-8 h-8" />}
      category="Developer Tools"
      keywords={["css minifier", "css beautifier", "css formatter", "minify css", "css optimizer", "compress css"]}
      features={["Minify CSS to reduce file size", "Beautify/format CSS", "Shows percentage size savings", "Copy or download result", "Removes comments and whitespace"]}
      faqs={faqs}
    >
      {toolInterface}
    </ToolPage>
  );
}
