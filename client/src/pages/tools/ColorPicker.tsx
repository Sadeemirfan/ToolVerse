import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ToolPage from "@/components/ToolPage";
import { Pipette, Copy, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

function hexToHsl(hex: string) {
  let { r, g, b } = hexToRgb(hex);
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function generatePalette(hex: string): string[] {
  const { h, s } = hexToHsl(hex);
  return [20, 35, 50, 65, 80].map(l => {
    const r = Math.round(255 * hslToRgbComponent(h / 360, s / 100, l / 100, 0));
    const g = Math.round(255 * hslToRgbComponent(h / 360, s / 100, l / 100, 8));
    const b = Math.round(255 * hslToRgbComponent(h / 360, s / 100, l / 100, 4));
    return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
  });
}

function hslToRgbComponent(h: number, s: number, l: number, n: number) {
  const k = (n + h * 12) % 12;
  const a = s * Math.min(l, 1 - l);
  return l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
}

export default function ColorPickerPage() {
  const [color, setColor] = useState("#6366f1");
  const [savedColors, setSavedColors] = useState<string[]>([]);

  const rgb = hexToRgb(color);
  const hsl = hexToHsl(color);
  const palette = generatePalette(color);

  const copy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied!`);
  };

  const saveColor = () => {
    if (!savedColors.includes(color)) {
      setSavedColors([...savedColors, color]);
      toast.success("Color saved!");
    }
  };

  const faqs = [
    { question: "What is HEX color?", answer: "HEX is a 6-digit hexadecimal code (#RRGGBB) used in web design to define colors." },
    { question: "What is RGB?", answer: "RGB stands for Red, Green, Blue — values from 0-255 defining each color channel." },
    { question: "What is HSL?", answer: "HSL stands for Hue (0-360°), Saturation (%), and Lightness (%) — a more intuitive way to describe colors." },
    { question: "How do I copy the color value?", answer: "Click the copy button next to HEX, RGB, or HSL to copy it to your clipboard." },
  ];

  const toolInterface = (
    <div className="space-y-6">
      {/* Color Picker */}
      <div className="flex flex-col sm:flex-row items-start gap-6">
        <div className="flex flex-col items-center gap-3">
          <label className="text-sm font-semibold">Pick a Color</label>
          <input
            type="color"
            value={color}
            onChange={e => setColor(e.target.value)}
            className="w-24 h-24 rounded-xl cursor-pointer border-2 border-border"
          />
        </div>
        <div
          className="flex-1 h-24 rounded-xl border-2 border-border"
          style={{ backgroundColor: color }}
        />
      </div>

      {/* Color Values */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { label: "HEX", value: color },
          { label: "RGB", value: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` },
          { label: "HSL", value: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` },
        ].map(({ label, value }) => (
          <Card key={label} className="p-3 flex items-center justify-between gap-2 bg-secondary/30 border-0">
            <div>
              <p className="text-xs text-muted-foreground font-semibold">{label}</p>
              <p className="text-sm font-mono">{value}</p>
            </div>
            <Button size="sm" variant="ghost" onClick={() => copy(value, label)}>
              <Copy className="w-4 h-4" />
            </Button>
          </Card>
        ))}
      </div>

      {/* Palette */}
      <div>
        <p className="text-sm font-semibold mb-3">Generated Palette</p>
        <div className="flex gap-2">
          {palette.map(c => (
            <button
              key={c}
              title={c}
              onClick={() => copy(c, "Color")}
              className="flex-1 h-14 rounded-lg border-2 border-border hover:scale-105 transition-transform"
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
      </div>

      {/* Save Color */}
      <div className="flex gap-2">
        <Button onClick={saveColor} className="bg-primary hover:bg-primary/90 text-white">
          <Plus className="w-4 h-4 mr-2" /> Save Color
        </Button>
      </div>

      {/* Saved Colors */}
      {savedColors.length > 0 && (
        <div>
          <p className="text-sm font-semibold mb-2">Saved Colors</p>
          <div className="flex flex-wrap gap-2">
            {savedColors.map(c => (
              <div key={c} className="flex items-center gap-1 bg-secondary/30 rounded-lg px-2 py-1">
                <div className="w-5 h-5 rounded" style={{ backgroundColor: c }} />
                <span className="text-xs font-mono">{c}</span>
                <button onClick={() => setSavedColors(savedColors.filter(x => x !== c))}>
                  <Trash2 className="w-3 h-3 text-red-400 hover:text-red-600" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <ToolPage
      toolName="Color Picker & Palette Generator"
      toolDescription="Pick any color and instantly get HEX, RGB, and HSL values. Generate beautiful color palettes for your design projects. Free online color tool."
      toolIcon={<Pipette className="w-8 h-8" />}
      category="Developer Tools"
      keywords={["color picker", "color palette generator", "hex color", "rgb color", "hsl color", "web design tool"]}
      features={[
        "Visual color picker",
        "HEX, RGB, HSL values",
        "One-click copy",
        "Automatic palette generation",
        "Save favorite colors",
      ]}
      faqs={faqs}
    >
      {toolInterface}
    </ToolPage>
  );
}
