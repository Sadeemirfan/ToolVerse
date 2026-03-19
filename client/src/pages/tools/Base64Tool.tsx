import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ToolPage from "@/components/ToolPage";
import { Binary, Copy, ArrowLeftRight } from "lucide-react";
import { toast } from "sonner";

export default function Base64ToolPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [error, setError] = useState("");

  const process = () => {
    setError("");
    try {
      if (mode === "encode") {
        setOutput(btoa(unescape(encodeURIComponent(input))));
      } else {
        setOutput(decodeURIComponent(escape(atob(input))));
      }
    } catch {
      setError("Invalid input. Please check your text and try again.");
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
    { question: "What is Base64?", answer: "Base64 is a binary-to-text encoding scheme that converts binary data into ASCII characters. It is commonly used to encode data in email, URLs, and web pages." },
    { question: "When should I use Base64?", answer: "Use Base64 when you need to store or transmit binary data (like images or files) in a text-based medium such as JSON, XML, or HTML." },
    { question: "Is Base64 the same as encryption?", answer: "No! Base64 is encoding, not encryption. It can be easily decoded by anyone. Do not use it to hide sensitive information." },
    { question: "What characters does Base64 use?", answer: "Base64 uses A-Z, a-z, 0-9, +, and / characters, with = as padding." },
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
          {mode === "encode" ? "Plain Text Input" : "Base64 Input"}
        </label>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder={mode === "encode" ? "Enter text to encode..." : "Enter Base64 to decode..."}
          rows={5}
          className="w-full p-3 border border-border rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-2">
        <Button onClick={process} className="bg-primary hover:bg-primary/90 text-white">
          {mode === "encode" ? "Encode" : "Decode"}
        </Button>
        {output && (
          <Button onClick={swap} variant="outline">
            <ArrowLeftRight className="w-4 h-4 mr-2" /> Swap
          </Button>
        )}
      </div>

      {/* Error */}
      {error && <p className="text-sm text-red-600 font-medium">{error}</p>}

      {/* Output */}
      {output && (
        <div>
          <label className="text-sm font-semibold text-foreground mb-2 block">Output</label>
          <Card className="p-3 bg-secondary/30 border-0 relative">
            <pre className="text-sm font-mono whitespace-pre-wrap break-all">{output}</pre>
            <Button
              size="sm"
              variant="ghost"
              onClick={copy}
              className="absolute top-2 right-2"
            >
              <Copy className="w-4 h-4" />
            </Button>
          </Card>
        </div>
      )}
    </div>
  );

  return (
    <ToolPage
      toolName="Base64 Encoder / Decoder"
      toolDescription="Encode plain text to Base64 or decode Base64 back to plain text instantly. Free, browser-based, and privacy-safe tool for developers."
      toolIcon={<Binary className="w-8 h-8" />}
      category="Developer Tools"
      keywords={["base64 encoder", "base64 decoder", "base64 converter", "encode decode", "developer tool"]}
      features={[
        "Encode text to Base64",
        "Decode Base64 to text",
        "Swap encode/decode with one click",
        "Copy output instantly",
        "No server — 100% browser-based",
      ]}
      faqs={faqs}
    >
      {toolInterface}
    </ToolPage>
  );
}
