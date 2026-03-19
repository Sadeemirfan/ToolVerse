import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ToolPage from "@/components/ToolPage";
import { Link2, Copy, ArrowLeftRight } from "lucide-react";
import { toast } from "sonner";

export default function URLEncoderPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [error, setError] = useState("");

  const process = () => {
    setError("");
    try {
      if (mode === "encode") {
        setOutput(encodeURIComponent(input));
      } else {
        setOutput(decodeURIComponent(input));
      }
    } catch {
      setError("Invalid input. Please check your URL and try again.");
      setOutput("");
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(output);
    toast.success("Copied to clipboard!");
  };

  const swap = () => {
    setInput(output);
    setOutput("");
    setMode(mode === "encode" ? "decode" : "encode");
  };

  const faqs = [
    { question: "What is URL encoding?", answer: "URL encoding converts special characters in a URL into a format that can be transmitted over the internet. For example, spaces become %20." },
    { question: "Why do I need URL encoding?", answer: "URLs can only contain a limited set of characters. Special characters like spaces, &, =, and others must be encoded to be safely included in URLs." },
    { question: "What is the difference between encodeURI and encodeURIComponent?", answer: "encodeURI encodes an entire URL while encodeURIComponent encodes individual query parameters. This tool uses encodeURIComponent for maximum compatibility." },
    { question: "Is URL encoding reversible?", answer: "Yes! You can decode any URL-encoded string back to its original form using the decode function." },
  ];

  const toolInterface = (
    <div className="space-y-4">
      {/* Mode Toggle */}
      <div className="flex gap-2">
        <Button
          onClick={() => setMode("encode")}
          variant={mode === "encode" ? "default" : "outline"}
          className={mode === "encode" ? "bg-primary text-white" : ""}
        >
          Encode
        </Button>
        <Button
          onClick={() => setMode("decode")}
          variant={mode === "decode" ? "default" : "outline"}
          className={mode === "decode" ? "bg-primary text-white" : ""}
        >
          Decode
        </Button>
      </div>

      {/* Input */}
      <div>
        <label className="text-sm font-semibold text-foreground mb-2 block">
          {mode === "encode" ? "URL or Text to Encode" : "Encoded URL to Decode"}
        </label>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder={mode === "encode" ? "https://example.com/search?q=hello world&lang=en" : "https%3A%2F%2Fexample.com%2Fsearch%3Fq%3Dhello%20world"}
          rows={4}
          className="w-full p-3 border border-border rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-2">
        <Button onClick={process} className="bg-primary hover:bg-primary/90 text-white">
          {mode === "encode" ? "Encode URL" : "Decode URL"}
        </Button>
        {output && (
          <Button onClick={swap} variant="outline">
            <ArrowLeftRight className="w-4 h-4 mr-2" /> Swap
          </Button>
        )}
      </div>

      {error && <p className="text-sm text-red-600 font-medium">{error}</p>}

      {output && (
        <div>
          <label className="text-sm font-semibold text-foreground mb-2 block">Output</label>
          <Card className="p-3 bg-secondary/30 border-0 relative">
            <pre className="text-sm font-mono whitespace-pre-wrap break-all">{output}</pre>
            <Button size="sm" variant="ghost" onClick={copy} className="absolute top-2 right-2">
              <Copy className="w-4 h-4" />
            </Button>
          </Card>
        </div>
      )}
    </div>
  );

  return (
    <ToolPage
      toolName="URL Encoder / Decoder"
      toolDescription="Encode or decode URLs and query parameters instantly. Convert special characters to percent-encoded format and back. Free browser-based URL tool."
      toolIcon={<Link2 className="w-8 h-8" />}
      category="Developer Tools"
      keywords={["url encoder", "url decoder", "percent encoding", "url encode decode", "query string encoder"]}
      features={[
        "Encode URLs with special characters",
        "Decode percent-encoded URLs",
        "Swap input/output instantly",
        "Copy result to clipboard",
        "100% browser-based",
      ]}
      faqs={faqs}
    >
      {toolInterface}
    </ToolPage>
  );
}
