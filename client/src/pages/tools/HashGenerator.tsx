import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ToolPage from "@/components/ToolPage";
import { Shield, Copy } from "lucide-react";
import { toast } from "sonner";

async function hashText(text: string, algorithm: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest(algorithm, data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

export default function HashGeneratorPage() {
  const [input, setInput] = useState("");
  const [hashes, setHashes] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!input.trim()) { toast.error("Enter some text first."); return; }
    setLoading(true);
    const results: Record<string, string> = {};
    try {
      results["SHA-1"] = await hashText(input, "SHA-1");
      results["SHA-256"] = await hashText(input, "SHA-256");
      results["SHA-384"] = await hashText(input, "SHA-384");
      results["SHA-512"] = await hashText(input, "SHA-512");
      setHashes(results);
    } catch {
      toast.error("Hash generation failed.");
    }
    setLoading(false);
  };

  const copy = (val: string, label: string) => {
    navigator.clipboard.writeText(val);
    toast.success(`${label} hash copied!`);
  };

  const faqs = [
    { question: "What is a hash?", answer: "A cryptographic hash is a fixed-size string generated from input data. Even a tiny change in input produces a completely different hash." },
    { question: "What is SHA-256 used for?", answer: "SHA-256 is used in blockchain, SSL certificates, file integrity checks, and password storage. It is part of the SHA-2 family and considered very secure." },
    { question: "What is the difference between SHA-1 and SHA-256?", answer: "SHA-1 produces a 160-bit hash and is considered weak. SHA-256 produces a 256-bit hash and is recommended for security purposes." },
    { question: "Is hashing the same as encryption?", answer: "No. Hashing is one-way — you cannot reverse a hash to get the original text. Encryption is two-way — data can be decrypted with a key." },
    { question: "What about MD5?", answer: "MD5 is not supported by the Web Crypto API used in browsers. Use SHA-256 for security purposes instead." },
  ];

  const toolInterface = (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-semibold mb-2 block">Text to Hash</label>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          rows={4}
          placeholder="Enter any text to generate its hash..."
          className="w-full p-3 border border-border rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      <Button onClick={generate} disabled={loading} className="bg-primary hover:bg-primary/90 text-white">
        <Shield className="w-4 h-4 mr-2" />
        {loading ? "Generating..." : "Generate Hashes"}
      </Button>

      {Object.keys(hashes).length > 0 && (
        <div className="space-y-3">
          {Object.entries(hashes).map(([alg, hash]) => (
            <Card key={alg} className="p-3 bg-secondary/30 border-0">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-primary uppercase">{alg}</span>
                <Button size="sm" variant="ghost" onClick={() => copy(hash, alg)}>
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs font-mono break-all text-foreground/80">{hash}</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <ToolPage
      toolName="Hash Generator"
      toolDescription="Generate SHA-1, SHA-256, SHA-384, and SHA-512 cryptographic hashes from any text. Free, browser-based, and secure — your data never leaves your device."
      toolIcon={<Shield className="w-8 h-8" />}
      category="Developer Tools"
      keywords={["hash generator", "sha256 generator", "sha1 hash", "sha512 hash", "cryptographic hash", "checksum generator"]}
      features={[
        "SHA-1, SHA-256, SHA-384, SHA-512",
        "Instant hash generation",
        "Copy any hash to clipboard",
        "100% browser-based",
        "No data sent to server",
      ]}
      faqs={faqs}
    >
      {toolInterface}
    </ToolPage>
  );
}
