import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ToolPage from "@/components/ToolPage";
import { Code, Copy } from "lucide-react";
import { useState } from "react";
import { formatJSON, minifyJSON } from "@/lib/tools";
import { toast } from "sonner";

export default function JSONFormatterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState("");

  const handleFormat = () => {
    const result = formatJSON(input);
    setIsValid(result.isValid);
    setOutput(result.formatted);
    if (!result.isValid) {
      setError(result.error || "Invalid JSON");
      toast.error("Invalid JSON format");
    } else {
      setError("");
      toast.success("JSON formatted successfully!");
    }
  };

  const handleMinify = () => {
    const result = minifyJSON(input);
    setIsValid(result.isValid);
    setOutput(result.minified);
    if (!result.isValid) {
      setError("Invalid JSON");
      toast.error("Invalid JSON format");
    } else {
      setError("");
      toast.success("JSON minified successfully!");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    toast.success("JSON copied to clipboard!");
  };

  const toolInterface = (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-semibold text-foreground mb-2 block">Input JSON</label>
          <Textarea
            placeholder='Paste your JSON here, e.g., {"name":"John","age":30}'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-64 p-4 font-mono text-sm"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-foreground mb-2 block">Output JSON</label>
          <Textarea
            value={output}
            readOnly
            className="min-h-64 p-4 font-mono text-sm bg-secondary/50"
          />
        </div>
      </div>

      {error && (
        <Card className="p-4 bg-red-50 border-red-200">
          <p className="text-sm text-red-700">
            <strong>Error:</strong> {error}
          </p>
        </Card>
      )}

      <div className="flex flex-wrap gap-2">
        <Button onClick={handleFormat} className="bg-primary hover:bg-primary/90">
          Format
        </Button>
        <Button onClick={handleMinify} variant="outline">
          Minify
        </Button>
        <Button onClick={handleCopy} variant="outline">
          <Copy className="w-4 h-4 mr-2" />
          Copy
        </Button>
        <Button onClick={() => { setInput(""); setOutput(""); setError(""); }} variant="outline">
          Clear
        </Button>
      </div>

      <Card className="p-4 bg-blue-50 border-blue-200">
        <p className="text-sm text-blue-700">
          <strong>Status:</strong> {isValid ? "Valid JSON" : "Invalid JSON"}
        </p>
      </Card>
    </div>
  );

  const faqs = [
    {
      question: "What is JSON?",
      answer:
        "JSON (JavaScript Object Notation) is a lightweight data format used for exchanging data between servers and web applications. It is easy for both humans to read and machines to parse.",
    },
    {
      question: "What does formatting do?",
      answer:
        "Formatting makes JSON more readable by adding proper indentation and line breaks. This is useful for debugging and understanding the structure of your data.",
    },
    {
      question: "What does minifying do?",
      answer:
        "Minifying removes all unnecessary whitespace from JSON, making the file smaller. This is useful for reducing file size when transmitting data over the internet.",
    },
    {
      question: "How do I know if my JSON is valid?",
      answer:
        "Our tool will automatically validate your JSON and display an error message if there are any syntax issues. The status indicator will show whether your JSON is valid or not.",
    },
    {
      question: "Can I use this for large JSON files?",
      answer:
        "Yes! Our JSON formatter can handle large files. All processing happens in your browser, so there are no size limitations imposed by our servers.",
    },
  ];

  return (
    <ToolPage
      toolName="JSON Formatter & Validator"
      toolDescription="Format, validate, and beautify JSON code instantly. Identify errors and debug JSON files with ease. Perfect for developers working with APIs and data."
      toolIcon={<Code className="w-8 h-8" />}
      category="Developer Tools"
      keywords={["JSON formatter", "JSON validator", "JSON beautifier", "JSON minifier", "developer tool"]}
      features={[
        "Format and beautify JSON",
        "Minify JSON for smaller file size",
        "Validate JSON syntax",
        "Error detection and reporting",
        "Copy formatted JSON",
        "Support for large files",
      ]}
      faqs={faqs}
    >
      {toolInterface}
    </ToolPage>
  );
}
