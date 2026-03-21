import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ToolPage from "@/components/ToolPage";
import { Thermometer } from "lucide-react";

type TempUnit = "C" | "F" | "K";

function convert(value: number, from: TempUnit): Record<TempUnit, number> {
  let celsius: number;
  switch (from) {
    case "C": celsius = value; break;
    case "F": celsius = (value - 32) * 5 / 9; break;
    case "K": celsius = value - 273.15; break;
  }
  return {
    C: Math.round(celsius * 100) / 100,
    F: Math.round((celsius * 9 / 5 + 32) * 100) / 100,
    K: Math.round((celsius + 273.15) * 100) / 100,
  };
}

const REFERENCES = [
  { label: "Water Freezes", C: 0, F: 32, K: 273.15 },
  { label: "Room Temp", C: 22, F: 71.6, K: 295.15 },
  { label: "Human Body", C: 37, F: 98.6, K: 310.15 },
  { label: "Water Boils", C: 100, F: 212, K: 373.15 },
  { label: "Oven Baking", C: 180, F: 356, K: 453.15 },
];

export default function TemperatureConverterPage() {
  const [value, setValue] = useState("100");
  const [from, setFrom] = useState<TempUnit>("C");
  const [result, setResult] = useState<Record<TempUnit, number> | null>(null);

  const handleConvert = () => {
    const v = parseFloat(value);
    if (isNaN(v)) return;
    setResult(convert(v, from));
  };

  const faqs = [
    { question: "How do I convert Celsius to Fahrenheit?", answer: "Multiply by 9/5 then add 32. Example: 100°C × 9/5 + 32 = 212°F." },
    { question: "What is absolute zero in Celsius?", answer: "Absolute zero is −273.15°C (0 Kelvin), the coldest possible temperature where all molecular motion stops." },
    { question: "What is normal human body temperature?", answer: "The average human body temperature is 37°C / 98.6°F. A fever is typically above 38°C / 100.4°F." },
    { question: "Why does the US use Fahrenheit?", answer: "The Fahrenheit scale was adopted before the metric system became standard. Most other countries use Celsius (Centigrade)." },
  ];

  const toolInterface = (
    <div className="space-y-5">
      <div>
        <label className="text-sm font-semibold mb-2 block">Temperature Value</label>
        <div className="flex gap-2">
          <input type="number" value={value} onChange={e => setValue(e.target.value)} onKeyDown={e => e.key === "Enter" && handleConvert()}
            className="flex-1 px-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
          <div className="flex border border-border rounded-lg overflow-hidden">
            {(["C", "F", "K"] as TempUnit[]).map(u => (
              <button key={u} onClick={() => setFrom(u)}
                className={`px-4 py-2 text-sm font-semibold transition-colors ${from === u ? "bg-primary text-white" : "hover:bg-muted"}`}>
                °{u}
              </button>
            ))}
          </div>
        </div>
      </div>

      <Button onClick={handleConvert} className="w-full bg-primary hover:bg-primary/90 text-white">
        <Thermometer className="w-4 h-4 mr-2" />Convert Temperature
      </Button>

      {result && (
        <Card className="p-5 border border-primary/20 bg-primary/5">
          <div className="grid grid-cols-3 gap-3 text-center mb-4">
            {(["C", "F", "K"] as TempUnit[]).map(u => (
              <div key={u} className={`rounded-lg p-3 ${from === u ? "bg-primary text-white" : "bg-white"}`}>
                <p className="text-2xl font-bold">{result[u]}</p>
                <p className="text-sm opacity-80">°{u === "K" ? "K" : u} {u === "C" ? "Celsius" : u === "F" ? "Fahrenheit" : "Kelvin"}</p>
              </div>
            ))}
          </div>
          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">Common References</p>
            <div className="space-y-1">
              {REFERENCES.map(r => (
                <div key={r.label} className="flex justify-between text-xs bg-white px-3 py-1.5 rounded">
                  <span className="text-muted-foreground">{r.label}</span>
                  <span className="font-medium">{r.C}°C / {r.F}°F / {r.K}K</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}
    </div>
  );

  return (
    <ToolPage
      toolName="Temperature Converter"
      toolDescription="Convert temperature between Celsius, Fahrenheit, and Kelvin instantly. Free online temperature converter with common reference points like body temperature, boiling point, and more."
      toolIcon={<Thermometer className="w-8 h-8" />}
      category="Utility Tools"
      keywords={["temperature converter", "celsius to fahrenheit", "fahrenheit to celsius", "kelvin converter", "temperature conversion", "degree converter"]}
      features={["Celsius, Fahrenheit and Kelvin", "Instant real-time conversion", "Common reference table included", "Keyboard-friendly (press Enter)", "No sign-up needed"]}
      faqs={faqs}
    >
      {toolInterface}
    </ToolPage>
  );
}
