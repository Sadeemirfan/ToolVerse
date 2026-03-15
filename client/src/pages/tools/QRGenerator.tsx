import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import ToolPage from "@/components/ToolPage";
import { QrCode, Download, Copy } from "lucide-react";
import { useState } from "react";
import { generateQRCode } from "@/lib/tools";
import { toast } from "sonner";

export default function QRGeneratorPage() {
  const [text, setText] = useState("");
  const [size, setSize] = useState(200);
  const [qrCode, setQrCode] = useState("");

  const handleGenerate = () => {
    if (!text.trim()) {
      toast.error("Please enter text or URL");
      return;
    }
    const qr = generateQRCode(text);
    setQrCode(qr);
    toast.success("QR code generated!");
  };

  const handleDownload = () => {
    if (!qrCode) {
      toast.error("Generate a QR code first");
      return;
    }
    const link = document.createElement("a");
    link.href = qrCode;
    link.download = "qrcode.png";
    link.click();
    toast.success("QR code downloaded!");
  };

  const handleCopy = () => {
    if (!qrCode) {
      toast.error("Generate a QR code first");
      return;
    }
    navigator.clipboard.writeText(qrCode);
    toast.success("QR code URL copied!");
  };

  const toolInterface = (
    <div className="space-y-6">
      {/* Input */}
      <div>
        <label className="text-sm font-semibold text-foreground mb-2 block">Text or URL</label>
        <Input
          placeholder="Enter text, URL, or data to encode..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="p-3"
        />
      </div>

      {/* Size Slider */}
      <div>
        <label className="text-sm font-semibold text-foreground mb-4 block">
          QR Code Size: <span className="text-primary">{size}px</span>
        </label>
        <Slider value={[size]} onValueChange={(val) => setSize(val[0])} min={100} max={500} step={10} />
      </div>

      {/* Generate Button */}
      <Button onClick={handleGenerate} size="lg" className="w-full bg-primary hover:bg-primary/90 text-white">
        Generate QR Code
      </Button>

      {/* QR Code Display */}
      {qrCode && (
        <Card className="p-6 bg-white border-border flex flex-col items-center">
          <img src={qrCode} alt="Generated QR Code" style={{ width: `${size}px`, height: `${size}px` }} />
          <p className="text-xs text-muted-foreground mt-4">Scan with any QR code reader</p>
        </Card>
      )}

      {/* Action Buttons */}
      {qrCode && (
        <div className="flex gap-2">
          <Button onClick={handleDownload} className="flex-1 bg-primary hover:bg-primary/90">
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
          <Button onClick={handleCopy} variant="outline" className="flex-1">
            <Copy className="w-4 h-4 mr-2" />
            Copy URL
          </Button>
        </div>
      )}
    </div>
  );

  const faqs = [
    {
      question: "What is a QR code?",
      answer:
        "A QR (Quick Response) code is a two-dimensional barcode that can be scanned with a smartphone or QR code reader. It can encode text, URLs, contact information, and more.",
    },
    {
      question: "What can I encode in a QR code?",
      answer:
        "You can encode URLs, text, email addresses, phone numbers, WiFi credentials, contact information (vCard), and more. Our tool supports any text data.",
    },
    {
      question: "How do I scan a QR code?",
      answer:
        "Most modern smartphones have a built-in QR code scanner in the camera app. Simply point your camera at the QR code and tap the notification that appears. You can also use dedicated QR code reader apps.",
    },
    {
      question: "Can I customize the QR code appearance?",
      answer:
        "Our tool allows you to adjust the size of the QR code. For more advanced customization (colors, logos), you may need to use specialized QR code generators.",
    },
    {
      question: "Is the QR code stored anywhere?",
      answer:
        "No. All QR code generation happens in your browser. The QR code is generated locally and never sent to our servers. You can download it immediately after generation.",
    },
  ];

  return (
    <ToolPage
      toolName="QR Code Generator"
      toolDescription="Create QR codes instantly for URLs, text, contact info, and more. Download as PNG or share the generated code. Perfect for marketing, business cards, and sharing information."
      toolIcon={<QrCode className="w-8 h-8" />}
      category="Developer Tools"
      keywords={["QR code generator", "QR code maker", "barcode generator", "QR code"]}
      features={[
        "Generate QR codes instantly",
        "Encode URLs, text, and data",
        "Adjustable size (100-500px)",
        "Download as PNG image",
        "Copy QR code URL",
        "No data storage",
      ]}
      faqs={faqs}
    >
      {toolInterface}
    </ToolPage>
  );
}
