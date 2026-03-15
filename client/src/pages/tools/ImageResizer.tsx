import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import ToolPage from "@/components/ToolPage";
import { Image as ImageIcon, Download } from "lucide-react";
import { useState, useRef } from "react";
import { toast } from "sonner";

export default function ImageResizerPage() {
  const [image, setImage] = useState<string | null>(null);
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [maintainAspect, setMaintainAspect] = useState(true);
  const [quality, setQuality] = useState(85);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        setImage(event.target?.result as string);
        setWidth(Math.min(img.width, 800));
        setHeight(Math.min(img.height, 600));
        toast.success("Image loaded!");
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleResize = () => {
    if (!image || !canvasRef.current) {
      toast.error("Please upload an image first");
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);
      toast.success("Image resized!");
    };
    img.src = image;
  };

  const handleDownload = () => {
    if (!canvasRef.current) {
      toast.error("Please resize an image first");
      return;
    }

    const link = document.createElement("a");
    link.href = canvasRef.current.toDataURL("image/jpeg", quality / 100);
    link.download = `resized-image-${width}x${height}.jpg`;
    link.click();
    toast.success("Image downloaded!");
  };

  const handleWidthChange = (newWidth: number) => {
    setWidth(newWidth);
    if (maintainAspect && image) {
      const img = new Image();
      img.onload = () => {
        const aspectRatio = img.height / img.width;
        setHeight(Math.round(newWidth * aspectRatio));
      };
      img.src = image;
    }
  };

  const toolInterface = (
    <div className="space-y-6">
      {/* Image Upload */}
      <div>
        <label className="text-sm font-semibold text-foreground mb-2 block">Upload Image</label>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
        <Button
          onClick={() => fileInputRef.current?.click()}
          variant="outline"
          className="w-full"
        >
          Choose Image
        </Button>
      </div>

      {image && (
        <>
          {/* Width */}
          <div>
            <label className="text-sm font-semibold text-foreground mb-4 block">
              Width: <span className="text-primary">{width}px</span>
            </label>
            <Slider
              value={[width]}
              onValueChange={(val) => handleWidthChange(val[0])}
              min={100}
              max={2000}
              step={10}
            />
          </div>

          {/* Height */}
          <div>
            <label className="text-sm font-semibold text-foreground mb-4 block">
              Height: <span className="text-primary">{height}px</span>
            </label>
            <Slider
              value={[height]}
              onValueChange={(val) => setHeight(val[0])}
              min={100}
              max={2000}
              step={10}
            />
          </div>

          {/* Quality */}
          <div>
            <label className="text-sm font-semibold text-foreground mb-4 block">
              Quality: <span className="text-primary">{quality}%</span>
            </label>
            <Slider
              value={[quality]}
              onValueChange={(val) => setQuality(val[0])}
              min={10}
              max={100}
              step={5}
            />
          </div>

          {/* Preview */}
          <Card className="p-4 bg-secondary/30 border-0">
            <img
              src={image}
              alt="Preview"
              style={{
                maxWidth: "100%",
                maxHeight: "300px",
                objectFit: "contain",
              }}
            />
          </Card>

          {/* Buttons */}
          <div className="flex gap-2">
            <Button onClick={handleResize} className="flex-1 bg-primary hover:bg-primary/90">
              Resize
            </Button>
            <Button onClick={handleDownload} className="flex-1 bg-primary hover:bg-primary/90">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>

          {/* Canvas for resizing (hidden) */}
          <canvas ref={canvasRef} style={{ display: "none" }} />
        </>
      )}

      {/* Info */}
      <Card className="p-4 bg-blue-50 border-blue-200">
        <p className="text-sm text-blue-700">
          <strong>Tip:</strong> Upload an image, adjust dimensions and quality, then download your resized image.
        </p>
      </Card>
    </div>
  );

  const faqs = [
    {
      question: "What image formats are supported?",
      answer:
        "We support all common image formats including JPEG, PNG, GIF, WebP, and more. The output is always JPEG for compatibility.",
    },
    {
      question: "How does quality affect file size?",
      answer:
        "Higher quality (closer to 100%) results in larger file sizes but better image clarity. Lower quality reduces file size but may show compression artifacts. 85% is a good balance.",
    },
    {
      question: "Can I maintain aspect ratio?",
      answer:
        "Yes, you can toggle the maintain aspect ratio option. When enabled, changing width automatically adjusts height proportionally.",
    },
    {
      question: "What's the maximum image size I can resize?",
      answer:
        "You can resize images up to 2000x2000 pixels. For larger images, resize them in steps or use specialized image editing software.",
    },
    {
      question: "Is my image stored anywhere?",
      answer:
        "No. All image processing happens in your browser. Your image is never sent to our servers and is not stored anywhere.",
    },
  ];

  return (
    <ToolPage
      toolName="Image Resizer"
      toolDescription="Resize images instantly without losing quality. Adjust dimensions, maintain aspect ratio, and control compression. Perfect for web optimization and social media."
      toolIcon={<ImageIcon className="w-8 h-8" />}
      category="Utility Tools"
      keywords={["image resizer", "resize image", "image compressor", "image optimizer"]}
      features={[
        "Resize images instantly",
        "Maintain aspect ratio",
        "Adjust quality/compression",
        "Download resized images",
        "Support for all formats",
        "No data storage",
      ]}
      faqs={faqs}
    >
      {toolInterface}
    </ToolPage>
  );
}
